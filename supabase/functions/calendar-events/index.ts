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

    // Step 1: List calendars to verify API key and find correct calendar
    const calListUrl = `https://www.addevent.com/api/v1/me/calendars/list/?token=${API_KEY}`;
    console.log("Listing calendars...");
    const calListRes = await fetch(calListUrl);
    const calListText = await calListRes.text();
    console.log("Calendar list status:", calListRes.status, "body:", calListText.slice(0, 1000));

    let calendarApiId: string | null = null;

    if (calListRes.ok) {
      try {
        const calData = JSON.parse(calListText);
        console.log("Calendar data keys:", Object.keys(calData));
        if (calData.calendars) {
          console.log("Found calendars:", calData.calendars.length);
          for (const cal of calData.calendars) {
            console.log("Calendar:", JSON.stringify(cal).slice(0, 200));
            // Match by uniquekey, id, or part of the ID
            if (
              cal.uniquekey === CALENDAR_ID ||
              cal.id === CALENDAR_ID ||
              String(cal.id) === CALENDAR_ID.replace('cal_', '') ||
              cal.uniquekey?.includes(CALENDAR_ID.replace('cal_', ''))
            ) {
              calendarApiId = cal.id;
              break;
            }
          }
          // If not found by ID match, use the first calendar
          if (!calendarApiId && calData.calendars.length > 0) {
            calendarApiId = calData.calendars[0].id;
            console.log("Using first calendar:", calendarApiId);
          }
        }
      } catch (e) {
        console.error("Parse calendars error:", e);
      }
    }

    // Step 2: List events
    let events: any[] = [];

    if (calendarApiId) {
      const eventsUrl = `https://www.addevent.com/api/v1/me/calendars/events/list/?token=${API_KEY}&calendar_id=${calendarApiId}`;
      console.log("Fetching events for calendar:", calendarApiId);
      const eventsRes = await fetch(eventsUrl);
      const eventsText = await eventsRes.text();
      console.log("Events status:", eventsRes.status, "body:", eventsText.slice(0, 500));

      if (eventsRes.ok) {
        try {
          const eventsData = JSON.parse(eventsText);
          const rawEvents = eventsData.events || eventsData.data || [];
          events = rawEvents.map((e: any) => ({
            id: String(e.id || e.uid || crypto.randomUUID()),
            title: e.title || e.summary || "",
            description: e.description || e.notes || null,
            start: e.date_start || e.start_date || e.start || null,
            end: e.date_end || e.end_date || e.end || null,
            location: e.location || null,
            url: e.url || e.link || null,
            timezone: e.timezone || null,
            allday: e.all_day_event === "true" || e.allday === true,
          }));
        } catch (e) {
          console.error("Parse events error:", e);
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
