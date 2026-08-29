# Task Atomici — Test Coverage

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3
```

---

## Task 1: Installare Vitest

**File interessati:** `package.json`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `package.json` per vedere le dipendenze attuali
- [ ] **Task 1.2:** Aggiungere `vitest` e `@vitest/coverage-v8` in `devDependencies`
- [ ] **Task 1.3:** Aggiungere lo script `"test": "vitest"` in `package.json`

---

## Task 2: Creare vitest.config.js

**File interessati:** `vitest.config.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Creare `vitest.config.js` con ambiente Node, coverage provider v8, e pattern di inclusione `src/**/*.test.js`

---

## Task 3: Scrivere i primi test

**File interessati:** `src/lib/utils.test.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Leggere `src/lib/utils.js` per identificare le funzioni testabili
- [ ] **Task 3.2:** Creare `src/lib/utils.test.js` con test per le funzioni principali (decodeHtml, emptyPost, e qualsiasi altra funzione di utility)

---

## Task 4: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 4.1:** `npm test` → exit 0 con tutti i test passanti
- [ ] **Task 4.2:** `npm run lint` → exit 0
