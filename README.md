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
│   │   └── tag.njk            # Page for each tag (generated from tagList collection)
│   ├── assets/
│   │   ├── css/               # Custom CSS
│   │   ├── js/
│   │   │   ├── main.js        # Main JavaScript
│   │   │   └── worker.js      # Cloudflare Worker for AI chat
│   │   └── img/               # Static images
│   ├── index.njk              # Home page
│   ├── blog.njk               # Article list with pagination
│   ├── about.njk              # About page
│   ├── 404.njk                # 404 page
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
STRAPI_URL=your_strapi_instance_url
STRAPI_TOKEN=your_strapi_api_token
ALLOWED_ORIGIN=http://localhost:8080
```

* `GEMINI_API_KEY` — API key from [Google AI Studio](https://aistudio.google.com/apikey)
* `STRAPI_URL` — Base URL of your Strapi instance (default: `http://localhost:1337`)
* `STRAPI_TOKEN` — Strapi API token with read access to posts
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

1. Create a post in Strapi with the required fields.

2. Required fields:

| Field         | Description                        |
| ------------- | ---------------------------------- |
| `title`       | Article title                      |
| `description` | Short description of the article   |
| `content`     | Article body (Markdown)            |
| `date`        | Publication date                   |
| `strapiTags`  | Comma-separated tags (e.g. `linux, shell`) |

3. Optional fields:

| Field       | Description                    |
| ----------- | ------------------------------ |
| `image`     | Cover image URL                |
| `imageAlt`  | Alternative text for the image |
| `excerpt`   | Custom article preview         |
| `author`    | Author display name            |

---

## Eleventy Configuration

The `.eleventy.js` file defines several custom filters and collections used throughout the site.

### Custom Filters

* **`dateHuman`** — formats a date as a readable string (e.g. `9 maggio 2026`)
* **`dateIso`** — formats a date as ISO 8601 (e.g. `2026-05-09`)
* **`slugify`** — converts a string to a URL-safe slug
* **`limit`** — returns the first N items of an array: `collection | limit(3)`
* **`markdownBlock`** — renders a Markdown string to HTML
* **`truncate`** — truncates a string to N characters
* **`jsonParse`** — parses a JSON string to an object

### Custom Collections

* **`posts`** — all blog posts from Strapi, sorted by date descending
* **`tagList`** — sorted list of all unique tags extracted from `strapiTags`
* **`postsByTag`** — map of `tag → posts[]`, used by tag pages to list related articles

---

## Features

* **Dark mode** — manual toggle with persistence in `localStorage`
* **Pagination** — 5 articles per page in the blog section
* **Tags** — each tag generates a dedicated page at `/tags/[tag]/` with related articles
* **SEO** — Open Graph and Twitter Card meta tags generated automatically
* **Sitemap** — automatically generated at `/sitemap.xml`
* **RSS Feed** — available at `/feed.xml`
* **Mathematical formulas** — KaTeX support for LaTeX rendering
* **External links** — automatically open in a new tab with `rel="noopener noreferrer"`
* **AI TL;DR summaries** — automatic article summaries generated via Gemini API, cached to avoid token waste
* **dino 🦖 AI chat assistant** — contextual chat assistant powered by Gemini API via Cloudflare Workers, with full article context and conversation history

---

## AI Features

### TL;DR Summaries

Each article automatically gets a 2-sentence summary generated by the Gemini API during the build process. Summaries are cached in `.cache/tldr-cache.json` and only regenerated when an article's content actually changes (detected via a checksum, not just character count).

The cache key in the GitHub Actions workflow is tied to the run ID so each deploy saves a fresh snapshot while still restoring the most recent one as a starting point.

### dino 🦖 Chat Assistant

A chat widget available on every page, powered by a Cloudflare Worker that calls the Gemini API. Features include:

* Full article list passed as context (title, description, URL for every post)
* Explicit total article count communicated to the model to avoid hallucinations
* Context window of 12 000 characters, enough for 30–40 articles
* Conversation history for contextual responses
* CORS protection with environment-based whitelist
* Plain text responses without markdown

---

## Deployment

The site is automatically published on **GitHub Pages** via GitHub Actions on every push to the `main` branch.

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret           | Description                              |
| ---------------- | ---------------------------------------- |
| `GEMINI_API_KEY` | Gemini API key for TL;DR generation      |
| `STRAPI_URL`     | Base URL of your Strapi instance         |
| `STRAPI_TOKEN`   | Strapi API token with read access        |

Without `STRAPI_TOKEN` and `STRAPI_URL` the build falls back to the existing cache and no new TL;DR summaries are generated.

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
│   │   └── tag.njk            # Pagina per ogni tag (generata dalla collection tagList)
│   ├── assets/
│   │   ├── css/               # CSS personalizzato
│   │   ├── js/
│   │   │   ├── main.js        # JavaScript principale
│   │   │   └── worker.js      # Cloudflare Worker per la chat AI
│   │   └── img/               # Immagini statiche
│   ├── index.njk              # Home page
│   ├── blog.njk               # Lista articoli con paginazione
│   ├── about.njk              # Pagina about
│   ├── 404.njk                # Pagina 404
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
STRAPI_URL=url_della_tua_istanza_strapi
STRAPI_TOKEN=il_tuo_token_strapi
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

1. Crea un post in Strapi con i campi obbligatori.

2. Campi obbligatori:

| Campo        | Descrizione                                        |
| ------------ | -------------------------------------------------- |
| `title`      | Titolo dell'articolo                               |
| `description`| Breve descrizione                                  |
| `content`    | Corpo dell'articolo (Markdown)                     |
| `date`       | Data di pubblicazione                              |
| `strapiTags` | Tag separati da virgola (es. `linux, shell`)       |

3. Campi opzionali:

| Campo       | Descrizione                          |
| ----------- | ------------------------------------ |
| `image`     | URL immagine di copertina            |
| `imageAlt`  | Testo alternativo dell'immagine      |
| `excerpt`   | Anteprima personalizzata             |
| `author`    | Nome dell'autore da visualizzare     |

---

## Configurazione Eleventy

Il file `.eleventy.js` definisce i filtri e le collection personalizzate usate nel sito.

### Filtri personalizzati

- **`dateHuman`** — formatta una data in forma leggibile (es. `9 maggio 2026`)
- **`dateIso`** — formatta una data in ISO 8601 (es. `2026-05-09`)
- **`slugify`** — converte una stringa in uno slug URL-safe
- **`limit`** — restituisce i primi N elementi di un array: `collection | limit(3)`
- **`markdownBlock`** — renderizza una stringa Markdown in HTML
- **`truncate`** — tronca una stringa a N caratteri
- **`jsonParse`** — deserializza una stringa JSON in oggetto

### Collection personalizzate

- **`posts`** — tutti i post del blog da Strapi, ordinati per data decrescente
- **`tagList`** — lista ordinata di tutti i tag univoci estratti da `strapiTags`
- **`postsByTag`** — mappa `tag → post[]`, usata dalle pagine tag per elencare gli articoli correlati

---

## Funzionalità

- **Dark mode** — toggle manuale con persistenza in `localStorage`
- **Paginazione** — 5 articoli per pagina nella sezione blog
- **Tag** — ogni tag genera una pagina dedicata in `/tags/[tag]/` con gli articoli correlati
- **SEO** — meta tag Open Graph e Twitter Card generati automaticamente
- **Sitemap** — generata automaticamente in `/sitemap.xml`
- **Feed RSS** — disponibile in `/feed.xml`
- **Formule matematiche** — supporto KaTeX per rendering LaTeX
- **Link esterni** — apertura automatica in nuovo tab con `rel="noopener noreferrer"`
- **Riassunti AI TL;DR** — riassunti automatici generati via Gemini API, con cache per evitare sprechi di token
- **Assistente chat dino 🦖** — widget di chat con contesto completo degli articoli e cronologia della conversazione

---

## Funzionalità AI

### Riassunti TL;DR

Ogni articolo ottiene automaticamente un riassunto di 2 frasi generato dalla Gemini API durante la build. I riassunti vengono salvati in `.cache/tldr-cache.json` e rigenerati solo quando il contenuto di un articolo cambia realmente (rilevato tramite checksum, non solo lunghezza). La cache key nel workflow GitHub Actions è legata al `run_id` per garantire che ogni deploy salvi uno snapshot aggiornato, recuperando comunque quello più recente come punto di partenza.

### Assistente chat dino 🦖

Widget di chat disponibile su ogni pagina, alimentato da un Cloudflare Worker che chiama la Gemini API. Funzionalità incluse:

- Lista completa degli articoli passata come contesto (titolo, descrizione, URL per ogni post)
- Numero totale di articoli comunicato esplicitamente al modello per evitare allucinazioni
- Finestra di contesto da 12 000 caratteri, sufficiente per 30-40 articoli
- Cronologia della conversazione per risposte contestuali
- Protezione CORS con whitelist basata su variabili d'ambiente
- Risposte in testo semplice senza markdown

---

## Deployment

Il sito viene pubblicato automaticamente su **GitHub Pages** tramite GitHub Actions ad ogni push sul branch `main`.

### Secret GitHub richiesti

Vai su **Settings → Secrets and variables → Actions** e aggiungi:

| Secret           | Descrizione                                    |
| ---------------- | ---------------------------------------------- |
| `GEMINI_API_KEY` | Chiave API Gemini per la generazione TL;DR     |
| `STRAPI_URL`     | URL base dell'istanza Strapi                   |
| `STRAPI_TOKEN`   | Token API Strapi con accesso in lettura        |

Senza `STRAPI_TOKEN` e `STRAPI_URL` la build ricade sulla cache esistente e non vengono generati nuovi riassunti TL;DR.