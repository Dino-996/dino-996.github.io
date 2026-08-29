# Specifica — Worker.js Lint

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il file `worker.js` (Cloudflare Worker per l'AI widget) è completamente escluso dalla configurazione ESLint esistente. Non essendo coperto da lint, errori di sintassi o pattern problematici possono raggiungere produzione senza essere rilevati. Il Worker espone API key e gestisce richieste esterne: merita controllo.

**Risultato atteso:**
Il file `worker.js` viene lintato con regole appropriate per l'ambiente Cloudflare Worker (API Runtime, Service Worker fetch, globals specifici), e `npm run lint` lo include senza errori.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Sviluppatore lancia `npm run lint` | `worker.js` viene controllato insieme a `src/assets/js/` e `src/lib/` senza errori |
| 2 | `worker.js` contiene un errore di sintassi | Il lint lo rileva e il commit viene bloccato |
| 3 | Il lint viene eseguito in CI | Nessun falso positivo causato da globals Cloudflare Worker |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| `worker.js` usa `env.GEMINI_API_KEY` (variabile Cloudflare) | Non viene segnalato come "variabile non definita" |
| `worker.js` usa `ctx` (context Cloudflare) | Non viene segnalato come "non definito" |
| Globals come `Response`, `Request`, `fetch` nativi | Non vengono segnalati come "non definiti" |
| `console.error` usato per logging | Rispettato — non è un errore in ambiente Workers |

---

## 4. Criteri di Accettazione

- [ ] `npm run lint` include `worker.js` e termina senza errori
- [ ] Nessun falso positivo per `env`, `ctx`, `Response`, `Request`, `fetch`, `Headers`, `JSON`
- [ ] La configurazione non richiede l'installazione di pacchetti aggiuntivi (solo globals già usati altrove)

---

## 5. Dipendenze

- [ ] `eslint.config.js` esistente con configurazione flat ESLint 9
- [ ] `globals` già in `devDependencies`
- [ ] `worker.js` esistente in `src/assets/js/`

---

## 6. Retrocompatibilità

Nessuna modifica al codice di `worker.js`. Solo la configurazione ESLint viene aggiornata per includere il file nel linting.
