# Task Atomici — Setup Loop Engineering (SDD)

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Versionare l'hook pre-commit con Husky

**File interessati:** `.husky/pre-commit`, `package.json`
**Durata stimata:** < 3 minuti

- [x] **Task 1.1:** `npm install --save-dev husky` + `npx husky init`
- [x] **Task 1.2:** Migrare la logica del vecchio `.git/hooks/pre-commit` (non versionato) in `.husky/pre-commit`

---

## Task 2: Configurare ESLint (mancava del tutto)

**File interessati:** `eslint.config.js`, `package.json`
**Durata stimata:** < 3 minuti

- [x] **Task 2.1:** `npm install --save-dev eslint globals`
- [x] **Task 2.2:** Creare `eslint.config.js` con split Node (`src/lib/`, `src/_data/`) / Node-script (`src/assets/js/*.mjs`) / Browser (`src/assets/js/*.js`)
- [x] **Task 2.3:** Aggiungere script `npm run lint`
- [x] **Task 2.4:** Collegare `npx eslint --max-warnings=0` all'hook pre-commit

---

## Task 3: Sanare gli errori di lint preesistenti

**File interessati:** `src/assets/js/main.js`
**Durata stimata:** < 3 minuti

- [x] **Task 3.1:** Sostituire `var iframe` con `const` (sync tema Giscus)
- [x] **Task 3.2:** Rimuovere `lastScroll` (assegnata ma mai letta)
- [x] **Task 3.3:** Rimuovere assegnazione inutilizzata di `links` nel ramo mobile ToC (nota: nel ramo desktop alimenta `setupScrollSpy` — valutare in una feature futura se va aggiunto anche al mobile)

---

## Task 4: Scaffolding automatico per nuove feature

**File interessati:** `scripts/new-feature.mjs`, `package.json`
**Durata stimata:** < 3 minuti

- [x] **Task 4.1:** Script che copia `.specify/templates/*` in `features/<nome>/`
- [x] **Task 4.2:** Validazione nome kebab-case + protezione anti-overwrite
- [x] **Task 4.3:** Aggiungere script `npm run new-feature`

---

## Esecuzione

Per ogni task completato:
1. Spuntare la checkbox
2. Eseguire: `npm run build` → verificare exit code 0
3. Se test esistono: `npm test`
4. Commit: `git add . && git commit -m "feat(<scope>): completato task <N> — <breve descrizione>"`

---

## Gestione Errori

Se un task fallisce dopo 2 tentativi:
```bash
git reset --hard HEAD~1
# Ripulire chat e ridefinire il task
```
