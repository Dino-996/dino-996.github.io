# Plan — Sitemap Categories

---

## 1. Approccio Architetturale

**Obiettivo:** Creare `/sitemap-tags.xml` con tutte le pagine tag.

**Approccio:** Nuovo file Nunjucks che itera su `collections.tagList` già disponibile in Eleventy.

---

## 2. File da Creare

| File | Azione |
|------|--------|
| `src/tags/sitemap-tags.njk` | Nuovo file con permalink `/sitemap-tags.xml` |

---

## 3. Logica

- Usare `collections.tagList` per ottenere tutti i tag
- Per ogni tag, generare un `<url>` con `<loc>` in formato `/tags/<tag | slugify>/`
- Struttura XML identica a `sitemap.njk` esistente

---

## 4. Verifica

- [x] `npm run build` → exit 0, sitemap-tags.xml generato
- [x] Contiene tutti i tag (113 URL)
- [x] URL formattati correttamente
- [x] `npm run lint` → exit 0
- [x] `npm test` → exit 0
