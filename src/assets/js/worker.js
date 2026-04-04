export default {
    async fetch(request, env, ctx) {
        // --- Preflight ---
        const corsHeaders = {
            "Access-Control-Allow-Origin": "https://dino-996.github.io",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        // --- CHIAMATA API A GEMINI ---
        try {
            const { query, context } = await request.json();

            const apiPayload = {
                contents: [{
                    parts: [{
                        text: `Sei l'assistente del blog tecnico di Davide. 
                            Rispondi in italiano in modo tecnico e cordiale.

                            REGOLE MANDATORIE:
                            1. NON usare Markdown (niente asterischi, cancelletti o grassetti).
                            2. Se l'articolo è pertinente, DEVI inserire il link esatto trovato nel contesto.
                            3. Formatta il link ESCLUSIVAMENTE come tag HTML, in questo esatto modo:
                            <a href="URL_DEL_LINK" target="_blank" style="color: #0d6efd; text-decoration: underline;">Titolo Articolo</a>
                            4. Usa solo testo piano per il resto della risposta. Non usare altri tag HTML.

                            CONTESTO ESTRATTO DAL BLOG:
                            ${(context || "").slice(0, 4000)}

                            DOMANDA UTENTE: ${query}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            };

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${env.GEMINI_API_KEY}`;

            const response = await fetch(geminiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiPayload)
            });

            const data = await response.json();

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
};