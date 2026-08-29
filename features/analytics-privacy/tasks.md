# Task Atomici — Analytics Privacy

---

## Task 1: Verifica Implementazione ✅

**File verificati:** `eleventy.config.js`, `src/_includes/head.njk`, `.env.example`
**Durata stimata:** < 5 minuti

- [x] **Task 1.1:** Verificare che `analyticsWebsiteId` sia esposto in `eleventy.config.js` (riga 45)
- [x] **Task 1.2:** Verificare che `analyticsScriptUrl` sia esposto in `eleventy.config.js` (riga 46)
- [x] **Task 1.3:** Verificare che `head.njk` contenga lo snippet Umami condizionale (righe 68-74)
- [x] **Task 1.4:** Verificare che `.env.example` documenti le variabili `ANALYTICS_*`

---

## Task 2: Validazione ✅

**File interessati:** —
**Durata stimata:** < 5 minuti

- [x] **Task 2.1:** `npm run build` → exit 0 ✅
- [x] **Task 2.2:** `npm run lint` → exit 0 ✅
- [x] **Task 2.3:** `npm test` → exit 0 ✅

---

## Task 3: Documentazione ✅

**File interessati:** `features/analytics-privacy/`
**Durata stimata:** < 2 minuti

- [x] **Task 3.1:** Creare `tasks.md`
- [x] **Task 3.2:** Creare `plan.md`

---

## Criteri di Accettazione

- [x] `npm run lint` termina senza errori
- [x] `npm run build` termina con exit code 0
- [x] Lo snippet Umami è condizionale (solo se `ANALYTICS_WEBSITE_ID` è impostato)
- [x] Lo snippet usa `data-do-not-track="true"` per rispettare DNT
- [x] Le variabili d'ambiente sono documentate in `.env.example`
- [x] Nessun cookie creato (Umami è cookie-free)
