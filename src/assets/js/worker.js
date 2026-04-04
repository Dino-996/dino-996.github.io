export default {
  async fetch(request, env, ctx) {
    const allowedOrigins = [
      "https://dino-996.github.io",
      ...(env.ALLOWED_ORIGIN ? [env.ALLOWED_ORIGIN] : [])
    ];

    const origin = request.headers.get("Origin");
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const rawBody = await request.text();
      const body = JSON.parse(rawBody);
      const { query, context, history } = body;

      if (!query) {
        return new Response(JSON.stringify({ error: "Messaggio vuoto" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
        });
      }

      // Costruisce la cronologia formattata
      const historyText = (history || [])
        .slice(0, -1)
        .map(m => `${m.role === "user" ? "Utente" : "Dino"}: ${m.content}`)
        .join("\n");

      const isFirstMessage = !history || history.length <= 1;

      const prompt = `Sei dino 🦖, l'assistente virtuale del blog "dino-996", il blog tecnico di Davide Sabia, uno smanettone appassionato di cybersecurity con un approccio offensive security.

      Il tuo compito è rispondere alle domande degli utenti sugli articoli del blog e sugli argomenti tecnici trattati.

      Segui queste regole in modo rigoroso:
      - Rispondi SEMPRE in italiano
      - ${isFirstMessage ? "Presentati brevemente come dino al primo messaggio" : "NON presentarti, NON dire il tuo nome, vai direttamente alla risposta"}
      - Usa un tono professionale ma umano, mai freddo né frivolo
      - Quando parli di tecnica sii sempre serio e preciso
      - Sii sintetico: rispondi in 2-3 frasi massimo, vai nel dettaglio solo se esplicitamente richiesto
      - Se un concetto non è chiaro, riprova con un esempio alternativo più semplice
      - NON usare mai markdown: niente asterischi, niente simboli #, niente trattini per le liste
      - Scrivi in testo semplice come se fosse una conversazione
      - Quando menzioni un articolo disponibile nel blog, mostra il link completo in questo formato: <a href="URL" target="_blank">titolo articolo</a>
      - Rivolgiti al proprietario del blog sempre come Davide, mai con il cognome
      - Se la domanda non riguarda argomenti tecnici o il blog, rispondi educatamente che puoi aiutare solo su argomenti tecnici

      Contesto articoli disponibili nel blog:
      ${(context || "").slice(0, 3000)}

      ${historyText ? `Cronologia conversazione:\n${historyText}\n\n` : ""}Domanda dell'utente: ${query}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${env.GEMINI_API_KEY}`;

      const apiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
          }],
        }),
      });

      const data = await apiResponse.json();

      return new Response(JSON.stringify(data), {
        status: apiResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
      });

    } catch (error) {
      console.error("Errore worker:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
      });
    }
  },
};