# Task Atomici — Related Posts

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Aggiungere funzione getRelatedPosts in posts.js

**File interessati:** `src/_data/posts.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `posts.js` per capire la struttura dati esistente
- [ ] **Task 1.2:** Aggiungere funzione `getRelatedPosts(post, allPosts, limit)` con algoritmo di scoring (tag in comune + recenza)
- [ ] **Task 1.3:** Popolare `related` nel frontmatter di ogni post usando la funzione

---

## Task 2: Creare partial article-card per post correlati

**File interessati:** `src/_includes/article-card.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Creare il partial `article-card.njk` con titolo, data, e almeno un tag
- [ ] **Task 2.2:** Verificare che il partial sia riutilizzabile anche per le card normali (se non esiste già)

---

## Task 3: Iniettare la sezione correlati in post.njk

**File interessati:** `src/_layouts/post.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Leggere `post.njk` per capire dove inserire la sezione (alla fine del contenuto, prima del footer)
- [ ] **Task 3.2:** Aggiungere il blocco condizionale `{% if post.related %}` con sezione "Potrebbe interessarti"
- [ ] **Task 3.3:** Iterare su `post.related` usando il partial `article-card.njk`

---

## Task 4: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 4.1:** `npm run lint` → exit 0
- [ ] **Task 4.2:** `npm run build` → exit 0
