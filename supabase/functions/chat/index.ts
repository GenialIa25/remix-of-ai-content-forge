import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk@0.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    const {
      messages,
      systemPrompt,
      agentId,
      userId,
      modelId,
      extendedThinking,
      maxTokens,
      contextDocuments,
    } = await req.json();

    const anthropic = new Anthropic({ apiKey });

    // Build system prompt with context
    let fullSystemPrompt = systemPrompt || "Você é um assistente útil e inteligente.";

    // If userId and agentId provided, try RAG-based context injection
    if (userId && agentId) {
      const openaiKey = Deno.env.get("OPENAI_API_KEY");
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (openaiKey && supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get agent prompt from DB (if available)
        const { data: agentPrompt } = await supabase
          .from("agent_prompts")
          .select("*")
          .eq("agent_id", agentId)
          .single();

        if (agentPrompt) {
          fullSystemPrompt = agentPrompt.system_prompt;
        }

        // Get last user message for RAG search
        const lastUserMessage = messages
          ?.filter((m: any) => m.role === "user")
          ?.pop();

        if (lastUserMessage?.content) {
          try {
            // Generate embedding for the query
            const embResponse = await fetch("https://api.openai.com/v1/embeddings", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${openaiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "text-embedding-ada-002",
                input: lastUserMessage.content,
              }),
            });

            if (embResponse.ok) {
              const embData = await embResponse.json();
              const queryEmbedding = embData.data[0].embedding;

              // Search for relevant chunks
              const filterTypes = agentPrompt?.requires_documents?.length > 0
                ? agentPrompt.requires_documents
                : null;

              const { data: relevantChunks } = await supabase.rpc("search_documents", {
                query_embedding: JSON.stringify(queryEmbedding),
                match_count: 10,
                filter_user_id: userId,
                filter_document_types: filterTypes,
              });

              if (relevantChunks && relevantChunks.length > 0) {
                fullSystemPrompt += "\n\n## CONTEXTO DOS DOCUMENTOS DO USUÁRIO:\n\n";
                relevantChunks.forEach((chunk: any, index: number) => {
                  fullSystemPrompt += `[Trecho ${index + 1} (relevância: ${(chunk.similarity * 100).toFixed(1)}%)]:\n${chunk.content}\n\n`;
                });
              }
            }
          } catch (ragError) {
            console.error("RAG search error (non-fatal):", ragError);
            // Continue without RAG context
          }
        }
      }
    }

    // Also append manual context documents if provided
    if (contextDocuments) {
      fullSystemPrompt += "\n\n## DOCUMENTOS DE CONTEXTO ADICIONAIS:\n";
      for (const [key, value] of Object.entries(contextDocuments)) {
        if (value) {
          fullSystemPrompt += `\n### ${key}:\n${value}\n`;
        }
      }
    }

    // Build API messages
    const apiMessages = messages
      .filter((msg: any) => msg.role === "user" || msg.role === "assistant")
      .map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));

    // Build request params
    const requestParams: any = {
      model: modelId || "claude-sonnet-4-5-20250514",
      max_tokens: maxTokens || 8000,
      system: fullSystemPrompt,
      messages: apiMessages,
    };

    // Extended thinking
    if (extendedThinking) {
      requestParams.thinking = {
        type: "enabled",
        budget_tokens: 10000,
      };
      requestParams.max_tokens = Math.max(requestParams.max_tokens, 16000);
    }

    const startTime = Date.now();
    const response = await anthropic.messages.create(requestParams);
    const thinkingDuration = (Date.now() - startTime) / 1000;

    // Process response
    let content = "";
    let thinking = "";

    for (const block of response.content) {
      if (block.type === "text") {
        content += block.text;
      } else if (block.type === "thinking") {
        thinking = (block as any).thinking;
      }
    }

    return new Response(
      JSON.stringify({
        content,
        thinking: thinking || undefined,
        thinkingDuration: extendedThinking ? thinkingDuration : undefined,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro interno do servidor",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
