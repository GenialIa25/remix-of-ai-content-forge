import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    const { documentId, content, userId } = await req.json();

    if (!documentId || !content || !userId) {
      throw new Error("Missing required fields: documentId, content, userId");
    }

    // 1. Split document into chunks
    const chunks = splitIntoChunks(content, CHUNK_SIZE, CHUNK_OVERLAP);

    if (chunks.length === 0) {
      throw new Error("Document content is empty");
    }

    // 2. Generate embeddings for all chunks (batch, max 2048 inputs per request)
    const batchSize = 100;
    const allEmbeddings: number[][] = [];

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const embeddingsResponse = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-ada-002",
          input: batch,
        }),
      });

      if (!embeddingsResponse.ok) {
        const errText = await embeddingsResponse.text();
        console.error("OpenAI embeddings error:", errText);
        throw new Error(`OpenAI embeddings error: ${embeddingsResponse.status}`);
      }

      const embData = await embeddingsResponse.json();
      for (const item of embData.data) {
        allEmbeddings.push(item.embedding);
      }
    }

    // 3. Delete existing chunks for this document (re-processing)
    await supabase
      .from("document_chunks")
      .delete()
      .eq("document_id", documentId);

    // 4. Insert chunks with embeddings
    const chunksToInsert = chunks.map((chunkContent, index) => ({
      document_id: documentId,
      user_id: userId,
      content: chunkContent,
      chunk_index: index,
      embedding: JSON.stringify(allEmbeddings[index]),
      tokens: estimateTokens(chunkContent),
    }));

    // Insert in batches of 50
    for (let i = 0; i < chunksToInsert.length; i += 50) {
      const batch = chunksToInsert.slice(i, i + 50);
      const { error: insertError } = await supabase
        .from("document_chunks")
        .insert(batch);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Failed to insert chunks: ${insertError.message}`);
      }
    }

    // 5. Update document timestamp
    await supabase
      .from("documents")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", documentId);

    return new Response(
      JSON.stringify({
        success: true,
        chunksCreated: chunks.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Process document error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function splitIntoChunks(text: string, chunkSize: number, overlap: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const chunks: string[] = [];
  let i = 0;

  while (i < words.length) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
    i += chunkSize - overlap;
    if (i >= words.length && chunks.length === 0) break;
  }

  return chunks;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3);
}
