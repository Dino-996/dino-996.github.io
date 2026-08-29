# Task Atomici — [Nome Feature]

> Ogni task riguarda **un solo componente/file**. Durata stimata: < 3 minuti.

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: [Titolo]

**File interessati:** `[elenco file]`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** [Sotto-task atomica]
- [ ] **Task 1.2:** [Sotto-task atomica]

---

## Task 2: [Titolo]

**File interessati:** `[elenco file]`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** [Sotto-task atomica]

---

## Task 3: [Titolo]

**File interessati:** `[elenco file]`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** [Sotto-task atomica]
- [ ] **Task 3.2:** [Sotto-task atomica]
- [ ] **Task 3.3:** [Sotto-task atomica]

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
