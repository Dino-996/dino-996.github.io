# ✒️ dino-996 blog

## English

Personal blog and technical portfolio of **Davide Sabia**, built with [Eleventy](https://www.11ty.dev/) and [Bootstrap](https://getbootstrap.com/).

🌐 **Live:** [dino-996.github.io](https://dino-996.github.io)

---

## Technologies

* **[Eleventy (11ty)](https://www.11ty.dev/)** — Static Site Generator
* **[Bootstrap 5](https://getbootstrap.com/)** — CSS Framework
* **[KaTeX](https://katex.org/)** — Mathematical formula rendering
* **[markdown-it](https://github.com/markdown-it/markdown-it)** — Markdown parser
* **[slugify](https://github.com/simov/slugify)** — URL-safe slug generation

---

## Project Structure

```
.
├── src/
│   ├── _data/
│   │   └── site.json          # Global site data (title, author, URL...)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk       # Base layout with navbar and footer
│   │   │   ├── page.njk       # Layout for generic pages
│   │   │   └── post.njk       # Layout for blog posts
│   │   └── partials/
│   │       ├── head.njk       # Meta tags, SEO, CSS
│   │       ├── navbar.njk     # Navigation and dark mode
│   │       └── footer.njk     # Footer with social links
│   ├── posts/                 # Blog articles in Markdown
│   │   └── YYYY/MM/
│   │       └── YYYY-MM-DD-title.md
│   ├── tags/
│   │   └── tag.njk            # Page for each tag
│   ├── assets/
│   │   ├── css/               # Custom CSS
│   │   ├── js/                # JavaScript
│   │   └── img/               # Static images
│   ├── index.md               # Home page
│   ├── blog.md                # Article list with pagination
│   ├── about.md               # About page
│   ├── 404.md                 # 404 page
│   └── sitemap.njk            # XML sitemap
├── docs/                      # Build output (published on GitHub Pages)
├── eleventy.config.js         # Eleventy configuration
└── package.json
```

---

## Local Setup

### Prerequisites

* [Node.js](https://nodejs.org/) >= 18

### Installation

```bash
git clone https://github.com/Dino-996/dino-996.github.io.git
cd dino-996.github.io
npm install
```

### Development

```bash
npm start
```

The site will be available at `http://localhost:8080` with automatic hot reload.

### Build

```bash
npm run build
```

The generated files are placed in the `docs/` folder.

---

## Writing a New Article

1. Create a `.md` file in `src/posts/YYYY/MM/`

```
src/posts/2026/02/2026-02-20-article-title.md
```

2. Add the required front matter:

```yaml
---
layout: layouts/post.njk
title: Article Title
description: Short description of the article.
date: 2026-02-20
tags:
  - posts
  - tag1
  - tag2
permalink: "/blog/{{ title | slug }}/"
---
```

3. Optional available fields:

| Field      | Description                    |
| ---------- | ------------------------------ |
| `image`    | Cover image URL                |
| `imageAlt` | Alternative text for the image |
| `excerpt`  | Custom article preview         |

---

## Features

* **Dark mode** — manual toggle with persistence in `localStorage`
* **Pagination** — 5 articles per page in the blog section
* **Tags** — each tag generates a dedicated page with related articles
* **SEO** — Open Graph and Twitter Card meta tags generated automatically
* **Sitemap** — automatically generated at `/sitemap.xml`
* **RSS Feed** — available at `/feed.xml`
* **Mathematical formulas** — KaTeX support for LaTeX rendering
* **External links** — automatically open in a new tab with `rel="noopener noreferrer"`

---

## Deployment

The site is automatically published on **GitHub Pages** from the `docs/` folder on every push to the `main` branch.

---

## Contacts

* **GitHub:** [@Dino-996](https://github.com/Dino-996)
* **LinkedIn:** [davidesabia](https://linkedin.com/in/davidesabia)
* **Email:** [davidesabia22@gmail.com](mailto:davidesabia22@gmail.com)


---
 
# dino-996 blog

## Italiano

Blog personale e portfolio tecnico di **Davide Sabia**, realizzato con [Eleventy](https://www.11ty.dev/) e [Bootstrap](https://getbootstrap.com/).

🌐 **Live:** [dino-996.github.io](https://dino-996.github.io)

---

## Tecnologie

- **[Eleventy (11ty)](https://www.11ty.dev/)** — Static Site Generator
- **[Bootstrap 5](https://getbootstrap.com/)** — Framework CSS
- **[KaTeX](https://katex.org/)** — Rendering formule matematiche
- **[markdown-it](https://github.com/markdown-it/markdown-it)** — Parser Markdown
- **[slugify](https://github.com/simov/slugify)** — Generazione slug URL-safe

---

## Struttura del progetto

```
.
├── src/
│   ├── _data/
│   │   └── site.json          # Dati globali del sito (titolo, autore, URL...)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk       # Layout base con navbar e footer
│   │   │   ├── page.njk       # Layout per pagine generiche
│   │   │   └── post.njk       # Layout per i post del blog
│   │   └── partials/
│   │       ├── head.njk       # Meta tag, SEO, CSS
│   │       ├── navbar.njk     # Navigazione e dark mode
│   │       └── footer.njk     # Footer con link social
│   ├── posts/                 # Articoli del blog in Markdown
│   │   └── YYYY/MM/
│   │       └── YYYY-MM-DD-titolo.md
│   ├── tags/
│   │   └── tag.njk            # Pagina per ogni tag
│   ├── assets/
│   │   ├── css/               # CSS personalizzato
│   │   ├── js/                # JavaScript
│   │   └── img/               # Immagini statiche
│   ├── index.md               # Home page
│   ├── blog.md                # Lista articoli con paginazione
│   ├── about.md               # Pagina about
│   ├── 404.md                 # Pagina 404
│   └── sitemap.njk            # Sitemap XML
├── docs/                      # Output build (pubblicato su GitHub Pages)
├── eleventy.config.js         # Configurazione Eleventy
└── package.json
```

---

## Avvio locale

### Prerequisiti

- [Node.js](https://nodejs.org/) >= 18

### Installazione

```bash
git clone https://github.com/Dino-996/dino-996.github.io.git
cd dino-996.github.io
npm install
```

### Sviluppo

```bash
npm start
```

Il sito sarà disponibile su `http://localhost:8080` con hot reload automatico.

### Build

```bash
npm run build
```

I file vengono generati nella cartella `docs/`.

---

## Scrivere un nuovo articolo

1. Crea un file `.md` in `src/posts/YYYY/MM/`

```
src/posts/2026/02/2026-02-20-titolo-articolo.md
```

2. Aggiungi il front matter obbligatorio:

```yaml
---
layout: layouts/post.njk
title: Titolo dell'articolo
description: Breve descrizione dell'articolo.
date: 2026-02-20
tags:
  - posts
  - tag1
  - tag2
permalink: "/blog/{{ title | slug }}/"
---
```

3. Campi opzionali disponibili:

| Campo | Descrizione |
|---|---|
| `image` | URL immagine di copertina |
| `imageAlt` | Testo alternativo dell'immagine |
| `excerpt` | Anteprima personalizzata dell'articolo |

---

## Funzionalità

- **Dark mode** — toggle manuale con persistenza in `localStorage`
- **Paginazione** — 5 articoli per pagina nella sezione blog
- **Tag** — ogni tag genera una pagina dedicata con gli articoli correlati
- **SEO** — meta tag Open Graph e Twitter Card generati automaticamente
- **Sitemap** — generata automaticamente in `/sitemap.xml`
- **Feed RSS** — disponibile in `/feed.xml`
- **Formule matematiche** — supporto KaTeX per rendering LaTeX
- **Link esterni** — apertura automatica in nuovo tab con `rel="noopener noreferrer"`

---

## Deployment

Il sito viene pubblicato automaticamente su **GitHub Pages** dalla cartella `docs/` ad ogni push sul branch `main`.

---

## Contatti

- **GitHub:** [@Dino-996](https://github.com/Dino-996)
- **LinkedIn:** [davidesabia](https://linkedin.com/in/davidesabia)

- **Email:** davidesabia22@gmail.com

