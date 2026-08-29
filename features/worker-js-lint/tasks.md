# Task Atomici — Worker.js Lint

---

## Dipendenze tra Task

```
Task 1 → Task 2
```

---

## Task 1: Aggiungere contesto worker a eslint.config.js

**File interessati:** `eslint.config.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `eslint.config.js` attuale per capire la struttura dei contesti esistenti
- [ ] **Task 1.2:** Aggiungere un nuovo oggetto nel flat config per `src/assets/js/worker.js` con `files: ["src/assets/js/worker.js"]`, usando `globals.serviceworker` e definendo `env` come global

---

## Task 2: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 2.1:** `npm run lint` → exit 0 (include ora anche worker.js)
- [ ] **Task 2.2:** Verificare che `npx eslint src/assets/js/worker.js` non riporti errori
