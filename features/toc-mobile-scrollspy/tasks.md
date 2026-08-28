# Task Atomici — ToC Mobile Scroll-Spy

---

## Dipendenze tra Task

```
Task 1 (solo)
```

---

## Task 1: Aggiungere scroll-spy alla ToC mobile

**File interessati:** `src/assets/js/main.js`
**Durata stimata:** < 1 minuto

- [x] **Task 1.1:** Nel blocco "Mobile ToC", catturare il valore di ritorno di `buildToc(tocMobileList, headings)` e passarlo a `setupScrollSpy(tocMobileList, headings, links)`

---

## Esecuzione

1. Spuntare la checkbox
2. `npm run lint` → verificare exit 0
3. `npm run build` → verificare exit 0
4. Commit: `git add . && git commit -m "feat(blog): completato task 1 — scroll-spy ToC mobile"`

---

## Gestione Errori

Se il task fallisce dopo 2 tentativi:
```bash
git reset --hard HEAD~1
```
