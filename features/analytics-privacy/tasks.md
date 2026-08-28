# Task Atomici — Analytics Privacy-First (Umami Cloud)

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4 → Task 5
```

---

## Task 1: Esporre le variabili d'ambiente Umami ai template

**File interessati:** `eleventy.config.js`
**Durata stimata:** < 2 minuti

- [x] **Task 1.1:** Aggiungere `analyticsWebsiteId` e `analyticsScriptUrl` in `eleventy.config.js` (seguendo lo stesso pattern di `supabaseUrl`)

---

## Task 2: Inietttare lo snippet Umami in head.njk

**File interessati:** `src/_includes/head.njk`
**Durata stimata:** < 3 minuti

- [x] **Task 2.1:** Aggiungere lo snippet Umami prima della chiusura `</head>` con:
  - Check `{% if analyticsWebsiteId %}` come guardrail
  - Check `window.doNotTrack === "1"` in JS per rispettare DNT
  - `async defer` sull'attributo dello script

---

## Task 3: Creare .env.example

**File interessati:** `.env.example`
**Durata stimata:** < 1 minuto

- [x] **Task 3.1:** Creare `.env.example` con tutte le variabili documentate

---

## Task 4: Verificare che .gitignore escluda .env

**File interessati:** `.gitignore`
**Durata stimata:** < 1 minuto

- [x] **Task 4.1:** Verificare che `.env` sia in `.gitignore`; era già presente

---

## Task 5: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [x] **Task 5.1:** `npm run lint` → exit 0
- [x] **Task 5.2:** `npm run build` → exit 0

---

## Esecuzione

1. Spuntare la checkbox di ogni task completato
2. Dopo ogni task: lint → build → se passano si prosegue
3. Al termine: `git add . && git commit -m "feat(analytics): aggiungi Umami Cloud privacy-first"`

---

## Gestione Errori

Se un task fallisce dopo 2 tentativi:
```bash
git reset --hard HEAD~1
```
