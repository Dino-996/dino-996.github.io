// src/assets/js/worker.js
export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://dino-996.github.io",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // Cache del preflight per 24 ore
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { 
        status: 204, // No Content, standard per OPTIONS
        headers: corsHeaders 
      });
    }

    // Da qui in poi gestiamo la POST vera e propria
    if (request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const userQuery = body.query || body.message;
        const context = body.context || "";

        if (!userQuery) {
          return new Response(JSON.stringify({ error: "Messaggio vuoto" }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${env.GEMINI_API_KEY}`;
        
        const apiResponse = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Contesto: ${context.slice(0, 3000)}\n\nDomanda: ${userQuery}`
              }]
            }]
          })
        });

        const data = await apiResponse.json();
        
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    return new Response("OK", { headers: corsHeaders });
  }
};