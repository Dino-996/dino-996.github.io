# dino-996.github.io

Personal blog and portfolio built with [Eleventy](https://www.11ty.dev/), [Bootstrap 5.3](https://getbootstrap.com/), and content from [Strapi CMS](https://strapi.io/).

## Tech Stack

- **Static site generator:** Eleventy v3
- **Templating:** Nunjucks
- **CSS framework:** Bootstrap 5.3 with custom dark mode
- **CMS:** Strapi (headless)
- **AI features:** Google Gemini for TL;DR summaries and chat assistant
- **Comments:** Giscus (GitHub Discussions)
- **Deployment:** GitHub Pages via GitHub Actions
- **API backend:** Cloudflare Workers (AI chat proxy)

## Features

- Blog with pagination, tags, and search
- Light/dark mode with persistance via `localStorage`
- AI-generated article summaries (TL;DR)
- AI chat assistant ("dino") for technical questions
- KaTeX math rendering
- Syntax highlighting for code blocks
- Responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Create .env file with your values
# (Strapi URL/token, Gemini API key)
# See "Environment Variables" section below
npm run dev

# Build for production (no .env loaded — for CI)
npm run build

# Build locally (loads .env file)
npm run build-local
```

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (TL;DR + chat) |
| `STRAPI_URL` | Strapi CMS API endpoint |
| `STRAPI_TOKEN` | Strapi API authentication token |
| `ALLOWED_ORIGIN` | Allowed CORS origin for the AI worker |

## Project Structure

```
src/
├── _data/           # Global data files (posts from Strapi, TL;DR)
├── _includes/       # Partials (navbar, head, footer)
├── _layouts/        # Page layouts (base, page, post)
├── assets/
│   ├── css/         # Custom styles
│   └── js/          # Client-side scripts + Cloudflare Worker
├── posts/           # Strapi post template
├── tags/            # Tag listing pages
├── index.njk        # Homepage
├── blog.njk         # Blog listing
└── feed.njk         # Atom feed
```

## AI Chat

The chat widget ("dino") consists of:

1. **Inline JS** in `base.njk` — frontend logic (send messages, typewriter effect)
2. **Cloudflare Worker** (`src/assets/js/worker.js`) — proxies requests to Google Gemini API
3. **CSS** (`custom.css`) — chat UI styling

Deploy the worker:
```bash
npx wrangler deploy
