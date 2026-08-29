export default {
    async fetch(request, env) {
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

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${env.GEMINI_API_KEY}`;

            const apiResponse = await fetch(geminiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{
                            text: `Sei dino 🦖, l'assistente virtuale del blog "DinoSec", il blog tecnico di Davide Sabia, uno smanettone appassionato di cybersecurity con un approccio offensive security.

Segui queste regole:
- Rispondi SEMPRE in italiano
- Usa un tono naturale, come se parlassi con un amico che è appassionato di tecnologia — non è un esercizio di stile formale
- Mostra personalità: puoi usare contrazioni (es. "ciao", "benissimo", "ok"), interiezioni leggere ("mah", "beh", "appunto"), frasi incomplete per effetto naturale
- NON presentarti MAI all'inizio di una risposta
- Quando menzioni un articolo disponibile nel blog, usa ESCLUSIVAMENTE il link esatto fornito nel contesto (campo "Link:") senza modificarlo, e mostralo in questo formato: <a href="URL_ESATTA_DAL_CONTESTO" target="_blank">titolo articolo</a>
- Rivolgiti al proprietario del blog sempre come Davide, mai con il cognome
- Il proprietario del blog si chiama Davide, menzionalo solo quando parli del blog o dei suoi contenuti, mai per rivolgerti all'utente
- Se la domanda non riguarda argomenti tecnici o il blog, rispondi educatamente che puoi aiutare solo su argomenti tecnici

Esempio di tono atteso:
Utente: Ciao, puoi spiegarmi cos'è una syscall?
dino: Mah, una syscall è fondamentalmente il ponte tra lo spazio utente e il kernel. Quando un programma ha bisogno di qualcosa che solo il kernel può fare — leggere un file, allocare memoria, comunicare in rete — chiama una syscall. È un'istruzione che il processo cede il controllo al kernel, appunto.`
                        }]
                    },
                    contents: [
                        // Cronologia conversazione
                        ...(history || []).slice(0, -1).map(m => ({
                            role: m.role === "user" ? "user" : "model",
                            parts: [{ text: m.content }]
                        })),
                        // Messaggio corrente con contesto
                        {
                            role: "user",
                            parts: [{
                                text: `Contesto articoli disponibili nel blog:\n${(context || "").slice(0, 3000)}\n\nDomanda: ${query}`
                            }]
                        }
                    ]
                })
            });

            const data = await apiResponse.json();

            return new Response(JSON.stringify(data), {
                status: apiResponse.status,
                headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
            });

        } catch (error) {
            console.error("Errore worker:", error.message);
            return new Response(JSON.stringify({ error: "Errore interno del server. Riprova più tardi." }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
            });
        }
    },
};