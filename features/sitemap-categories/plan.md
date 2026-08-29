# Piano Tecnico — Sitemap per Categorie

---

## 1. Componenti e Modelli

### Sitemap tags

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dino-996.github.io/tags/cybersecurity/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Priorità calcolata

| Numero di post con quel tag | Priority |
|---|---|
| 1-2 | 0.4 |
| 3-5 | 0.6 |
| 6-10 | 0.7 |
| > 10 | 0.8 |

---

## 2. Contratti API / Interfacce

Nessun contratto. File XML statico generato da Eleventy.

---

## 3. Flusso dei Dati

```
Build Eleventy
    ↓
posts.js → estrae tutti i tag unici con conteggio post
    ↓
sitemap-tags.njk (template) → genera sitemap-tags.xml
    ↓
sitemap.njk esistente → link a sitemap-tags.xml
    ↓
robots.njk → conferma sitemap in robots.txt (già presente)
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/sitemap-tags.njk` | CREATE | Template per la generazione di sitemap-tags.xml |
| `src/sitemap.njk` | MODIFY | Aggiungere <sitemap> link a sitemap-tags.xml |
| `eleventy.config.js` | MODIFY | Registrare sitemap-tags.xml come output file |
| `src/_data/posts.js` | MODIFY | Esportare `getAllTags()` con conteggio post |

---

## 5. Dipendenze Esterne

Nessuna. La sitemap è un file XML standard.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| URL tag non esistente nel build | Bassa | Basso | I tag vengono estratti solo dai post effettivamente presenti |
| Sitemap vuota | Bassa | Basso | Se non ci sono tag, il file non viene generato |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
