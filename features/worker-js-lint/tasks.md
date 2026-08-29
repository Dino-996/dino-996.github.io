# Task Atomici — Worker JS Lint

---

## Task 1: Aggiornare `eslint.config.js` ✅

**File interessati:** `eslint.config.js`
**Durata stimata:** < 5 minuti

- [x] **Task 1.1:** Rimuovere `src/assets/js/worker.js` dalla lista `ignores`
- [x] **Task 1.2:** Aggiungere blocco dedicato per `worker.js` con:
  - `files: ["src/assets/js/worker.js"]`
  - `globals.serviceworker` (Response, Request, Headers, fetch, JSON, etc.)
  - Cloudflare Workers: `env`, `waitUntil`
- [x] **Task 1.3:** Rimuovere `ctx` dalla lista globals (non più usato in worker.js)

---

## Task 2: Validazione ✅

**File interessati:** —
**Durata stimata:** < 2 minuti

- [x] **Task 2.1:** `npm run lint` → exit 0 ✅ (nessun errore)
- [x] **Task 2.2:** Verificare che `worker.js` sia incluso nel lint senza errori

---

## Task 3: Documentazione ✅

**File interessati:** `features/worker-js-lint/`
**Durata stimata:** < 1 minuto

- [x] **Task 3.1:** Aggiornare `spec.md` con stato completato
- [x] **Task 3.2:** Creare `plan.md`
- [x] **Task 3.3:** Creare `tasks.md`

---

## Task 4: Commit ✅

- [x] **Task 4.1:** `git add` dei file modificati
- [x] **Task 4.2:** Commit con messaggio in inglese

---

## Criteri di Accettazione

- [x] `npm run lint` include `worker.js` e termina senza errori
- [x] Nessun falso positivo per `env`, `waitUntil`, `Response`, `Request`, `fetch`, `Headers`, `JSON`
- [x] La configurazione non richiede pacchetti aggiuntivi
