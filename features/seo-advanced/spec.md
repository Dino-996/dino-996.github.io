# Specifica — SEO Advanced

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog manca di structured data per migliorare la visibilità nei motori di ricerca. Google non trova i dati semanticamente strutturati per articoli, homepage e pagine di categorie.

**Obiettivo:**
Aggiungere JSON-LD structured data per:
- **WebSite** (search box) nella homepage
- **Article** (blog post) in ogni articolo
- **BreadcrumbList** per le pagine dei post

---

## 2. Structured Data Richiesti

### WebSite Schema (homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "dino-996 blog",
  "url": "https://dino-996.github.io/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dino-996.github.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Article Schema (ogni post)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titolo articolo",
  "url": "https://dino-996.github.io/percorso/articolo",
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-20",
  "author": {
    "@type": "Person",
    "name": "Davide Sabia"
  },
  "image": "https://dino-996.github.io/immagini/cover.jpg"
}
```

### BreadcrumbList Schema (post)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dino-996.github.io/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dino-996.github.io/blog/" },
    { "@type": "ListItem", "position": 3, "name": "Titolo Articolo" }
  ]
}
```

---

## 3. Output Atteso

- Homepage: tag `<script type="application/ld+json">` con WebSite schema nel `<head>`
- Post: tag `<script type="application/ld+json">` con Article schema nel `<head>`
- Post: tag `<script type="application/ld+json">` con BreadcrumbList schema nel `<head>`
- Pagina tag: nessuno schema (non necessario per ora)

---

## 4. Vincoli

- I tag JSON-LD vanno nel `<head>` (via `{% block head_extra %}`)
- Non modificare la struttura HTML esistente
- Nessuna logica di business nei template — usare filtri esistenti o creare filtri ad-hoc
- Reutilizzare le variabili esistenti: `title`, `page.url`, `date`, `image`, `author`

---

## 5. Criteri di Accettazione

- [ ] `npm run build` → exit 0
- [ ] Homepage contiene WebSite schema valido
- [ ] Post contiene Article schema + BreadcrumbList schema
- [ ] Nessun errore di validazione JSON-LD
- [ ] `npm run lint` → exit 0
- [ ] `npm test` → exit 0

---

## 6. File da Modificare

- `src/_layouts/base.njk` — iniettare WebSite schema nella homepage
- `src/_layouts/post.njk` — iniettare Article + BreadcrumbList schema nel blocco `head_extra`
