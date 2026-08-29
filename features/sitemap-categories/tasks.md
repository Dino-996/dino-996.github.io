# Task Atomici — Sitemap Categories

---

## Task 1: Creare `src/tags/sitemap-tags.njk` ✅

**File interessati:** `src/tags/sitemap-tags.njk` (nuovo)
**Durata stimata:** < 2 minuti

- [x] **Task 1.1:** Creare file con frontmatter `permalink: /sitemap-tags.xml`
- [x] **Task 1.2:** Iterare su `collections.tagList` e generare `<url><loc>` per ogni tag
- [x] **Task 1.3:** Usare filtro `slugify` per normalizzare i tag negli URL

---

## Task 2: Validazione ✅

**File interessati:** —
**Durata stimata:** < 2 minuti

- [x] **Task 2.1:** `npm run build` → exit 0, 178 file (+1 sitemap-tags.xml)
- [x] **Task 2.2:** Verificare che `dist/sitemap-tags.xml` contenga 113 tag URL
- [x] **Task 2.3:** Verificare formato URL valido `/tags/<slug>/`
- [x] **Task 2.4:** `npm run lint` → exit 0
- [x] **Task 2.5:** `npm test` → exit 0 (6/6 pass)

---

## Task 3: Documentazione ✅

**File interessati:** `features/sitemap-categories/`
**Durata stimata:** < 1 minuto

- [x] **Task 3.1:** Aggiornare `spec.md` con stato implementato
- [x] **Task 3.2:** Creare `plan.md`
- [x] **Task 3.3:** Creare `tasks.md`

---

## Task 4: Commit ✅

- [x] **Task 4.1:** `git add` dei file modificati
- [x] **Task 4.2:** Commit con messaggio in inglese
