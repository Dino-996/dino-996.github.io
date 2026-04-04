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
* **[Google Gemini API](https://ai.google.dev/)** — AI-powered TL;DR summaries and chat assistant
* **[Cloudflare Workers](https://workers.cloudflare.com/)** — Serverless backend for AI chat

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions workflow for automated deployment
├── src/
│   ├── _data/
│   │   ├── site.json          # Global site data (title, author, URL...)
│   │   └── tldr.js            # AI-generated TL;DR summaries via Gemini API
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk       # Base layout with navbar, footer and AI chat widget
│   │   │   ├── page.njk       # Layout for generic pages
│   │   │   └── post.njk       # Layout for blog posts with TL;DR summary
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
│   │   ├── js/
│   │   │   ├── main.js        # Main JavaScript
│   │   │   └── worker.js      # Cloudflare Worker for AI chat
│   │   └── img/               # Static images
│   ├── index.md               # Home page
│   ├── blog.md                # Article list with pagination
│   ├── about.md               # About page
│   ├── 404.md                 # 404 page
│   └── sitemap.njk            # XML sitemap
├── docs/                      # Build output (published on GitHub Pages)
├── .cache/
│   └── tldr-cache.json        # TL;DR cache to avoid regenerating on every deploy
├── .eleventy.js               # Eleventy configuration
├── wrangler.jsonc             # Cloudflare Workers configuration
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

### Environment Variables

Create a `.env` file in the root of the project:

```env
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGIN=http://localhost:8080
```

* `GEMINI_API_KEY` — API key from [Google AI Studio](https://aistudio.google.com/apikey)
* `ALLOWED_ORIGIN` — Allowed origin for local development CORS

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:8080` with automatic hot reload.

### Build

```bash
# Local build (loads .env)
npm run build:local

# Production build (used by GitHub Actions and Cloudflare)
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
* **AI TL;DR summaries** — automatic article summaries generated via Gemini API, cached to avoid token waste
* **dino 🦖 AI chat assistant** — contextual chat assistant powered by Gemini API via Cloudflare Workers, with conversation history and blog article context

---

## AI Features

### TL;DR Summaries
Each article automatically gets a 2-sentence summary generated by the Gemini API during the build process. Summaries are cached in `.cache/tldr-cache.json` and only regenerated when an article is added or modified.

### dino 🦖 Chat Assistant
A chat widget available on every page, powered by a Cloudflare Worker that calls the Gemini API. Features include:
- Conversation history for contextual responses
- Blog article context passed to the AI
- CORS protection with environment-based whitelist
- Plain text responses without markdown

---

## Deployment

The site is automatically published on **GitHub Pages** via GitHub Actions on every push to the `main` branch.

---

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
- **[Google Gemini API](https://ai.google.dev/)** — Riassunti AI e assistente chat
- **[Cloudflare Workers](https://workers.cloudflare.com/)** — Backend serverless per la chat AI

---

## Struttura del progetto

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml         # Workflow GitHub Actions per il deploy automatico
├── src/
│   ├── _data/
│   │   ├── site.json          # Dati globali del sito (titolo, autore, URL...)
│   │   └── tldr.js            # Riassunti AI generati via Gemini API
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk       # Layout base con navbar, footer e widget chat AI
│   │   │   ├── page.njk       # Layout per pagine generiche
│   │   │   └── post.njk       # Layout per i post del blog con riassunto TL;DR
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
│   │   ├── js/
│   │   │   ├── main.js        # JavaScript principale
│   │   │   └── worker.js      # Cloudflare Worker per la chat AI
│   │   └── img/               # Immagini statiche
│   ├── index.md               # Home page
│   ├── blog.md                # Lista articoli con paginazione
│   ├── about.md               # Pagina about
│   ├── 404.md                 # Pagina 404
│   └── sitemap.njk            # Sitemap XML
├── docs/                      # Output build (pubblicato su GitHub Pages)
├── .cache/
│   └── tldr-cache.json        # Cache TL;DR per evitare rigenerazioni ad ogni deploy
├── .eleventy.js               # Configurazione Eleventy
├── wrangler.jsonc             # Configurazione Cloudflare Workers
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

### Variabili d'ambiente

Crea un file `.env` nella root del progetto:

```env
GEMINI_API_KEY=la_tua_chiave_gemini
ALLOWED_ORIGIN=http://localhost:8080
```

### Sviluppo

```bash
npm run dev
```

Il sito sarà disponibile su `http://localhost:8080` con hot reload automatico.

### Build

```bash
# Build locale (carica .env)
npm run build:local

# Build produzione (usata da GitHub Actions e Cloudflare)
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
- **Riassunti AI TL;DR** — riassunti automatici generati via Gemini API, con cache per evitare sprechi di token
- **Assistente chat dino 🦖** — widget di chat contestuale con cronologia della conversazione e contesto degli articoli del blog

---

## Funzionalità AI

### Riassunti TL;DR
Ogni articolo ottiene automaticamente un riassunto di 2 frasi generato dalla Gemini API durante la build. I riassunti vengono salvati in `.cache/tldr-cache.json` e rigenerati solo quando un articolo viene aggiunto o modificato.

### Assistente chat dino 🦖
Un widget di chat disponibile su ogni pagina, alimentato da un Cloudflare Worker che chiama la Gemini API. Funzionalità incluse:
- Cronologia della conversazione per risposte contestuali
- Contesto degli articoli del blog passato all'AI
- Protezione CORS con whitelist basata su variabili d'ambiente
- Risposte in testo semplice senza markdown

---

## Deployment

Il sito viene pubblicato automaticamente su **GitHub Pages** tramite GitHub Actions ad ogni push sul branch `main`.