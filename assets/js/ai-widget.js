"use strict";
(function () {
    const WORKER_URL = "https://dino996githubio.davidesabia22.workers.dev/";
    const toggle = document.getElementById("ai-toggle");
    const win = document.getElementById("ai-chat-window");
    const closeBtn = document.getElementById("ai-close");
    const input = document.getElementById("ai-input");
    const send = document.getElementById("ai-send");
    const messages = document.getElementById("ai-messages");

    if (!toggle || !win || !closeBtn || !input || !send || !messages) {
        console.error("Elementi AI widget non trovati nel DOM!");
        return;
    }

    toggle.addEventListener("click", () => {
        const isHidden = win.hasAttribute("hidden");
        win.toggleAttribute("hidden", !isHidden);
        toggle.setAttribute("aria-expanded", String(isHidden));
        if (isHidden) input.focus();
    });

    closeBtn.addEventListener("click", () => {
        win.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") sendMessage();
    });

    send.addEventListener("click", sendMessage);

    function addMessage(text, role) {
        const div = document.createElement("div");
        div.className = `ai-msg ai-msg-${role}`;
        div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function typeWriter(text, element, speed = 15) {
        let i = 0;
        let currentHtml = "";
        element.innerHTML = "";

        function type() {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    const tagEnd = text.indexOf(">", i);
                    if (tagEnd !== -1) {
                        currentHtml += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    }
                } else {
                    currentHtml += text.charAt(i);
                    i++;
                }
                element.innerHTML = currentHtml;
                messages.scrollTop = messages.scrollHeight;
                setTimeout(type, speed);
            }
        }
        type();
    }

    async function sendMessage() {
        const query = input.value.trim();
        if (!query) return;

        send.disabled = true;
        input.disabled = true;

        addMessage(query, "user");
        input.value = "";
        const responseContainer = addMessage('Sto cercando…', "bot");

        let context = "";
        try {
            const idx = await fetch("/search.json").then(r => r.json());
            const baseUrl = window.location.origin;
            context = idx
                .slice(0, idx.length)
                .map(p => `- "${p.title}" - ${p.description}\n  Link: <a href="${baseUrl}${p.url}" target="_blank">${p.title}</a>`)
                .join("\n\n");
        } catch (err) {
            console.warn("Impossibile caricare search.json:", err);
        }

        try {
            const res = await fetch(WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, context }),
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error("Errore dal worker:", res.status, errText);
                responseContainer.innerHTML = `Errore dal server (${res.status}). Riprova più tardi.`;
                return;
            }

            const data = await res.json();

            let answer = "";
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                answer = data.candidates[0].content.parts[0].text;
            } else if (data?.error?.message) {
                answer = `Errore dall'AI: ${data.error.message}`;
            } else {
                console.warn("Struttura risposta inattesa:", data);
                answer = "Mi dispiace, non sono riuscito a generare una risposta.";
            }
            responseContainer.innerHTML = "";
            typeWriter(answer, responseContainer);

        } catch (err) {
            console.error("Errore fetch:", err);
            responseContainer.innerHTML = "Errore di comunicazione con l'assistente.";
        } finally {
            send.disabled = false;
            input.disabled = false;
            input.focus();
        }
    }
})();
