import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const API_KEY = Deno.env.get("ADDEVENT_API_KEY");
    const CALENDAR_ID = Deno.env.get("ADDEVENT_CALENDAR_ID");

    if (!API_KEY || !CALENDAR_ID) {
      return new Response(
        JSON.stringify({ error: "ADDEVENT_API_KEY ou ADDEVENT_CALENDAR_ID não configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Try multiple AddEvent API endpoints
    const endpoints = [
      // v2 - list all events
      { url: "https://api.addevent.com/calevent/v2/events", auth: "bearer" },
      // v2 - list calendars  
      { url: "https://api.addevent.com/calevent/v2/calendars", auth: "bearer" },
      // v2 - calendar events
      { url: `https://api.addevent.com/calevent/v2/calendars/${CALENDAR_ID}/events`, auth: "bearer" },
    ];

    let events: any[] = [];

    for (const ep of endpoints) {
      console.log("Trying:", ep.url);
      const headers: Record<string, string> = { Accept: "application/json" };
      if (ep.auth === "bearer") {
        headers["Authorization"] = `Bearer ${API_KEY}`;
      }

      const res = await fetch(ep.url, { headers });
      const text = await res.text();
      console.log(`Status: ${res.status}, Body (${text.length}): ${text.slice(0, 500)}`);

      if (res.ok && text.length > 2) {
        try {
          const data = JSON.parse(text);
          
          // If this is a calendars list, find our calendar and get its events
          if (data.data && data.data[0]?.type === "calendar") {
            console.log("Found calendars:", data.data.length);
            for (const cal of data.data) {
              console.log(`Calendar: id=${cal.id}, title=${cal.title || cal.name}`);
            }
            // Get events from the first/matching calendar
            const targetCal = data.data.find((c: any) => 
              c.uniquekey === CALENDAR_ID || 
              c.id === CALENDAR_ID ||
              String(c.id) === CALENDAR_ID
            ) || data.data[0];
            
            if (targetCal) {
              const evUrl = `https://api.addevent.com/calevent/v2/calendars/${targetCal.id}/events`;
              console.log("Fetching events from:", evUrl);
              const evRes = await fetch(evUrl, { headers });
              const evText = await evRes.text();
              console.log(`Events status: ${evRes.status}, body: ${evText.slice(0, 500)}`);
              if (evRes.ok) {
                const evData = JSON.parse(evText);
                events = mapEvents(evData.data || evData.events || []);
              }
            }
            break;
          }
          
          // If this is an events list directly
          if (data.data && Array.isArray(data.data)) {
            events = mapEvents(data.data);
            break;
          }
          if (data.events && Array.isArray(data.events)) {
            events = mapEvents(data.events);
            break;
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      }
    }

    console.log("Final events:", events.length);

    return new Response(JSON.stringify(events), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function mapEvents(rawEvents: any[]): any[] {
  return rawEvents.map((e: any) => ({
    id: String(e.id || e.uid || crypto.randomUUID()),
    title: e.title || e.summary || e.name || "",
    description: e.description || e.notes || null,
    start: e.date_start || e.start_date || e.start || e.date_start_date || null,
    end: e.date_end || e.end_date || e.end || e.date_end_date || null,
    location: e.location || null,
    url: e.url || e.link || null,
    timezone: e.timezone || null,
    allday: e.all_day_event === "true" || e.allday === true || e.all_day === true,
  })).filter((e: any) => e.title);
}
