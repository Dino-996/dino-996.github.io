# Task Atomici — SEO Advanced

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Leggere i template esistenti

**File interessati:** `src/_includes/head.njk`, `src/_layouts/post.njk`, `src/_layouts/base.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `head.njk` per capire la struttura del `<head>` e dove sono gli meta tag esistenti
- [ ] **Task 1.2:** Leggere `post.njk` e `base.njk` per capire come vengono passati i dati di pagina

---

## Task 2: Aggiungere schema WebSite in head.njk

**File interessati:** `src/_includes/head.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Aggiungere `<script type="application/ld+json">` con schema `WebSite` e `SearchAction` nel `<head>`

---

## Task 3: Aggiungere schema Article in post.njk

**File interessati:** `src/_layouts/post.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Aggiungere `<script type="application/ld+json">` con schema `Article` (headline, author, datePublished, dateModified, image)
- [ ] **Task 3.2:** Usare i dati del frontmatter del post per popolare i campi dello schema

---

## Task 4: Ottimizzare title tag

**File interessati:** `src/_layouts/base.njk`, `src/_includes/head.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 4.1:** Verificare che ogni pagina abbia un title unico nel formato `Titolo Pagina · DinoSec`
- [ ] **Task 4.2:** Aggiungere canonical URL se non presente

---

## Task 5: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 5.1:** `npm run lint` → exit 0
- [ ] **Task 5.2:** `npm run build` → exit 0
