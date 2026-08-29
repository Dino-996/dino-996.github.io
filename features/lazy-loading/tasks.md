# Task Atomici — Lazy Loading Immagini

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Identificare i template che generano immagini

**File interessati:** `src/_layouts/post.njk`, `src/_includes/article-card.njk`, `src/_includes/head.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `post.njk` e identificare dove vengono generate le immagini dei post
- [ ] **Task 1.2:** Leggere `article-card.njk` (o crearlo se non esiste) per le immagini nelle card
- [ ] **Task 1.3:** Verificare `head.njk` per l'OG image

---

## Task 2: Applicare loading="lazy" ai template

**File interessati:** `src/_layouts/post.njk`, `src/_includes/article-card.njk`, `src/_includes/head.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Aggiungere `loading="lazy"` alle immagini dei post in `post.njk` (eccetto hero)
- [ ] **Task 2.2:** Aggiungere `loading="lazy"` alle immagini delle card in `article-card.njk`
- [ ] **Task 2.3:** Verificare che OG image in `head.njk` abbia `loading="eager"` esplicito

---

## Task 3: Stili CSS per placeholder e fade-in

**File interessati:** `src/assets/css/custom.css`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Aggiungere stile skeleton/placeholder con `background-color` per immagini lazy
- [ ] **Task 3.2:** Aggiungere `transition: opacity 0.3s ease` per fade-in fluido

---

## Task 4: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 4.1:** `npm run lint` → exit 0
- [ ] **Task 4.2:** `npm run build` → exit 0
