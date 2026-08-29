# Specifica — Sitemap Categories

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog usa tag per organizzare i contenuti, ma manca una sitemap dedicata ai tag per aiutare i motori di ricerca a indicizzare le pagine tag.

**Obiettivo:**
Creare `/sitemap-tags.xml` con tutte le pagine tag del blog per migliorare l'indicizzazione SEO.

---

## 2. Requisiti Funzionali

- generare un file XML valido in `/sitemap-tags.xml`
- includere tutti i tag presenti in `collections.tagList`
- ogni URL deve avere il formato `/tags/<tag-slug>/`
- il file deve essere accessibile pubblicamente

---

## 3. Criteri di Accettazione

- [x] `/sitemap-tags.xml` generato nel build
- [x] Contiene tutti i tag presenti nel blog
- [x] URL formato valido per Google sitemap
- [x] Build exit 0
