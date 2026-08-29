# Task Atomici — Sitemap per Categorie

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Leggere i file esistenti

**File interessati:** `src/sitemap.njk`, `src/_data/posts.js`, `eleventy.config.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Leggere `sitemap.njk` esistente per capire la struttura e come viene generato il file
- [ ] **Task 1.2:** Leggere `posts.js` per capire come vengono estratti i tag
- [ ] **Task 1.3:** Leggere `eleventy.config.js` per capire come vengono registrati i template statici

---

## Task 2: Creare funzione getAllTags in posts.js

**File interessati:** `src/_data/posts.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Aggiungere funzione `getAllTags()` che estrae tutti i tag unici con il conteggio dei post
- [ ] **Task 2.2:** Esportare la funzione come global data

---

## Task 3: Creare sitemap-tags.njk

**File interessati:** `src/sitemap-tags.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 3.1:** Creare il template `sitemap-tags.njk` che genera `sitemap-tags.xml`
- [ ] **Task 3.2:** Iterare su tutti i tag con relative URL, priority e changefreq
- [ ] **Task 3.3:** Aggiungere `<sitemap>` link in `sitemap.njk` esistente

---

## Task 4: Registrare sitemap-tags.xml in Eleventy

**File interessati:** `eleventy.config.js`
**Durata stimata:** < 3 minuti

- [ ] **Task 4.1:** Aggiungere la registrazione di `sitemap-tags.xml` come output file statico in `eleventy.config.js`

---

## Task 5: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 5.1:** `npm run lint` → exit 0
- [ ] **Task 5.2:** `npm run build` → exit 0
- [ ] **Task 5.3:** Verificare che `dist/sitemap-tags.xml` sia stato generato (se ci sono tag)
