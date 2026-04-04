const models = ["gemini-3.1-flash-lite-preview", "gemini-2.0-flash-lite"];

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://dino-996.github.io",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const { query, context } = body;

      if (!query) {
        return new Response(JSON.stringify({ error: "Messaggio vuoto" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${models[0]}:generateContent?key=${env.GEMINI_API_KEY}`;

      const apiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Sei un assistente del blog di Davide Sabia. Rispondi in italiano.\n\nContesto articoli disponibili:\n${(context || "").slice(0, 3000)}\n\nDomanda: ${query}`,
            }],
          }],
        }),
      });

      const data = await apiResponse.json();

      return new Response(JSON.stringify(data), {
        status: apiResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};