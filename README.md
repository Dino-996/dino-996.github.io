# dino-996.github.io

![Lighthouse Performance](https://img.shields.io/badge/Lighthouse_Performance-100-brightgreen)
![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse_Accessibility-100-brightgreen)
![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse_Best_Practices-100-brightgreen)
![Lighthouse SEO](https://img.shields.io/badge/Lighthouse_SEO-100-brightgreen)

Personal blog and portfolio built with [Eleventy](https://www.11ty.dev/) 3.1 and content from [Strapi CMS](https://strapi.io/). Design inspired by Il Post — clean, editorial, no Bootstrap.

## Tech Stack

- **Static site generator:** Eleventy v3.1
- **Templating:** Nunjucks
- **Design system:** Custom CSS (Material Design 3 palette, CSS Grid 12-col, zero frameworks)
- **Typography:** Libre Caslon Text (serif headings), Inter (sans)
- **CMS:** Strapi (headless) on Render
- **AI features:** Google Gemini for TL;DR summaries and chat assistant
- **Comments:** Giscus (GitHub Discussions)
- **Newsletter:** Supabase (DB + RLS) + EmailJS (transactional emails)
- **Deployment:** GitHub Pages via GitHub Actions
- **API backend:** Cloudflare Workers (AI chat proxy)

## Features

- Blog with pagination, tags, and search
- Courses section grouping posts by topic (via Strapi `course` field)
- Light/dark mode with persistence via `localStorage`
- AI-generated article summaries (TL;DR)
- AI chat assistant ("dino") for technical questions
- KaTeX math rendering
- Syntax highlighting for code blocks
- **Newsletter** with Supabase storage and EmailJS delivery
  - Subscribe with email validation and DB insert
  - Confirmation email with responsive HTML template
  - One-click unsubscribe via unique token
  - Auto-cleanup of unsubscribed users every 5 days (GitHub Actions cron)
- Responsive design
- **Lighthouse 100/100** on all categories

## Newsletter Architecture

```
User email → Supabase INSERT (RLS-protected) → EmailJS confirmation
                                                    ↓
                                             User clicks "Cancellati"
                                                    ↓
                                      /unsubscribe/?token=xxx → PATCH Supabase
                                                    ↓
                                          5s redirect to home
```

Unsubscribed users are automatically deleted every 5 days by a scheduled GitHub Action (`cleanup-newsletter.yml`).

## Getting Started

```bash
# Install dependencies
npm install

# Create .env file with your values (see below)
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
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID for confirmation |
| `ALLOWED_ORIGIN` | Allowed CORS origin for the AI worker |

## Project Structure

```
src/
├── _data/           # Global data files (posts from Strapi, courses, TL;DR)
├── _includes/       # Partials (navbar, head, footer)
├── _layouts/        # Page layouts (base, page, post)
├── assets/
│   ├── css/         # Custom styles (full design system, no Bootstrap)
│   ├── email/       # Email template reference (confirmation.html)
│   └── js/          # Client-side scripts + cleanup script
├── courses/         # Course detail pages
├── posts/           # Strapi post pagination template (post.njk)
├── tags/            # Tag listing pages
├── index.njk        # Homepage
├── blog.njk         # Blog listing
├── courses.njk      # Course listing
├── unsubscribe.njk  # Newsletter unsubscribe page
└── feed.njk         # Atom feed

.github/workflows/
├── deploy.yml              # Build + deploy to GitHub Pages
└── cleanup-newsletter.yml  # Cron cleanup of unsubscribed users (every 5 days)
```

## Newsletter RLS Policies

Run these in Supabase SQL Editor if recreating the `subscribers` table:

```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  unsubscribe_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anon" ON subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable select for anon" ON subscribers FOR SELECT TO anon USING (true);
CREATE POLICY "Enable update for anon" ON subscribers FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for anon" ON subscribers FOR DELETE TO anon USING (true);
```

## Courses

Posts are grouped into courses via a `course` field in Strapi. Each post's `course` value (e.g. `"Sistemi Operativi"`) determines which course it belongs to. The courses listing lives at `/courses/` and individual course pages at `/courses/:slug/`.

Course pages are generated by `src/courses/course.njk` (pagination over the `courses` data).

## AI Chat

The chat widget ("dino") consists of:

1. **Inline JS** in `base.njk` — frontend logic (send messages, typewriter effect)
2. **Cloudflare Worker** (`src/assets/js/worker.js`) — proxies requests to Google Gemini API
3. **CSS** (`custom.css`) — chat UI styling

Deploy the worker:
```bash
npx wrangler deploy
```
