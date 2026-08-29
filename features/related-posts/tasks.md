# Task Atomici — Related Posts

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Aggiungere Filter `relatedPosts` ✅
**File interessati:** `eleventy.config.js`
**Durata stimata:** < 3 minuti

- [x] **Task 1.1:** Aggiungere il filter `relatedPosts` per calcolare i post correlati basandosi su tag in comune e data decrescente
- [x] **Task 1.2:** Verificare che il filter non includa il post corrente
- [x] **Task 1.3:** Testare che se non ci sono tag in comune, faccia fallback sui post più recenti

---

## Task 2: Modificare Template `post.njk` ✅
**File interessati:** `src/_layouts/post.njk`
**Durata stimata:** < 2 minuti

- [x] **Task 2.1:** Iniettare la sezione "Potrebbe interessarti" dopo Prev/Next e prima di Commenti
- [x] **Task 2.2:** Usare il filter `relatedPosts` passando `posts` globali, `page.url` e `tags`
- [x] **Task 2.3:** Assicurarsi che la sezione non venga visualizzata se l'array è vuoto

---

## Task 3: Aggiungere Stili in `custom.css` ✅
**File interessati:** `src/assets/css/custom.css`
**Durata stimata:** < 2 minuti

- [x] **Task 3.1:** Aggiungere gli stili `.related-posts` in fondo a `custom.css`
- [x] **Task 3.2:** Mantenere la coerenza con il layout esistente del blog (grid, card, font)

---

## Task 4: Validazione e Test ✅
**File interessati:** —
**Durata stimata:** < 2 minuti

- [x] **Task 4.1:** `npm run build` → exit 0
- [x] **Task 4.2:** Verificare che l'HTML generato per un post contenga la sezione e le card correlate (3 card ✅)
- [x] **Task 4.3:** `npm run lint` → exit 0
- [x] **Task 4.4:** `npm test` → exit 0 (6/6 pass)

---

## Task 5: Fix Layout ✅
**File interessati:** `src/assets/css/custom.css`

- [x] **Task 5.1:** Dark mode background — usa `var(--surface-raised)` che eredita dal tema
- [x] **Task 5.2:** Rimuovi bordo heading — `border: none` su `h2`
- [x] **Task 5.3:** Card rettangolari — `border-radius: 0`

---

## Stato dei Task

- [x] **Task 1: Aggiungere Filter `relatedPosts`**
- [x] **Task 2: Modificare Template `post.njk`**
- [x] **Task 3: Aggiungere Stili in `custom.css`**
- [x] **Task 4: Validazione e Test**
- [x] **Task 5: Fix Layout**
