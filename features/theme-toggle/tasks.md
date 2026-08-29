# Task Atomici — Theme Toggle

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3
```

---

## Task 1: Aggiungere il toggle nel navbar

**File interessati:** `src/_includes/navbar.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `navbar.njk` per capire la struttura esistente e dove inserire il toggle
- [ ] **Task 1.2:** Aggiungere il bottone toggle `<button id="theme-toggle">` con icona SVG commutabile

---

## Task 2: Implementare la logica JavaScript

**File interessati:** `src/assets/js/main.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Aggiungere funzione `initTheme()` che legge localStorage e prefers-color-scheme
- [ ] **Task 2.2:** Aggiungere event listener sul toggle che commuta data-theme e salva in localStorage

---

## Task 3: Stili CSS per il toggle

**File interessati:** `src/assets/css/custom.css`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Aggiungere stili per il bottone toggle (posizione, dimensioni, cursore)
- [ ] **Task 3.2:** Aggiungere animazione transizione tra temi (se non già presente)

---

## Task 4: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 4.1:** `npm run lint` → exit 0
- [ ] **Task 4.2:** `npm run build` → exit 0
