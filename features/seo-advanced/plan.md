# Piano Tecnico — SEO Advanced

---

## 1. Componenti e Modelli

### Schema Article (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titolo del post",
  "author": { "@type": "Person", "name": "Davide Sabia" },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-16",
  "image": "https://url-immagine.jpg"
}
```

### Schema WebSite (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DinoSec",
  "url": "https://dino-996.github.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dino-996.github.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## 2. Contratti API / Interfacce

Nessun contratto. Markup inline nei template Nunjucks.

---

## 3. Flusso dei Dati

```
Build Eleventy
    ↓
head.njk → schema WebSite JSON-LD (tutte le pagine)
post.njk → schema Article JSON-LD (solo post)
    ↓
I tag <script type="application/ld+json"> sono nel <head>
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_includes/head.njk` | MODIFY | Aggiungere schema WebSite JSON-LD nel <head> |
| `src/_layouts/post.njk` | MODIFY | Aggiungere schema Article JSON-LD nel <head> del post |
| `src/_layouts/base.njk` | MODIFY | Canonical URL e title dinamico |
| `src/assets/css/custom.css` | MODIFY | Eventuali micro-correzioni CSS per meta display |

---

## 5. Dipendenze Esterne

Nessuna. I structured data sono markup statico generato da Eleventy.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Schema malformato invalidato da Google Rich Results Test | Media | Medio | Validare con Google Rich Results Test dopo il deploy |
| Duplicate schema (stesso article in più pagine) | Bassa | Basso | Article schema solo in post, mai in page o tag |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
