# Tasks: Refactoring del design system e del responsive design

> **STATO: eseguito 2026-09-23.** Le task 3, 4, 5, 6, 7 sono state **annullate** dopo verifica sul
> codice reale: le funzionalità risultavano già implementate. Il plan originale era stato scritto
> senza leggere `main.js` / `sitemap.njk` / `worker.js`. Vedi «Motivo» per ciascuna.

| # | Task | Stato |
|---|---|---|
| 1 | Design token mancanti in `:root` | ✅ FATTO |
| 2 | Breakpoint mobile ≤480px | ✅ FATTO |
| 3 | Pulsante tema toggle in navbar | ⛔ ANNULLATO — già presente |
| 4 | Creare `src/assets/js/theme-toggle.js` | ⛔ ANNULLATO — logica già in `main.js` |
| 5 | Includere theme-toggle in `base.njk` | ⛔ ANNULLATO — dipende da 4 |
| 6 | Sitemap per categorie in `src/sitemap.njk` | ⛔ ANNULLATO — già `sitemap-tags.njk` |
| 7 | Rimuovere `ctx` da `worker.js` | ⛔ ANNULLATO — nessun `ctx` nel file |
| 8 | Token per contrasto ad alto contrasto | ⏸ RIMANDATO — serve un meccanismo di attivazione |
| 9 | Verifica (lint/build/test) + commit | ✅ VERIFICA OK · ⏳ commit in attesa di conferma |

---

## Task 1 — Design token mancanti in `:root` ✅

**File:** `src/assets/css/custom.css`

- [x] Aggiunte `--border: #d0d0d0`, `--text: #1a1c1c`, `--border-subtle: #e0e0e0`,
      `--surface-raised: #ffffff` al blocco `:root`.
- [x] Verificato che i `var()` che le usavano (`.theme-toggle-btn` righe 64-68, hover riga 75)
      ora si risolvono.
- [x] `--surface-container-high` era già presente (#e8e8e8) — nessuna azione necessaria.
- **Motivo:** bug reale — variabili usate ma non dichiarate → in tema chiaro il pulsante toggle
  tema perdeva bordo, colore del testo/icona e sfondo in hover.

## Task 2 — Breakpoint mobile ≤480px ✅

**File:** `src/assets/css/custom.css`

- [x] Aggiunto `@media (max-width: 480px)` dopo la sezione Responsive esistente, prima di
      `@media (min-width: 768px)`.
- [x] Contiene 6 regole additive: `.card` / `.card-body` / `.sidebar-card` padding 24→16px,
      `.featured-article` gap 24→12px, `.font-headline-xl` e `.font-headline-lg` clamp ridotti.
- [x] Verificato che nessun breakpoint precedente venga sovrascritto (il nuovo blocco agisce
      solo sotto 480px, dove non esistevano regole dedicate).
- **Revisione in corso d'opera:** rimosse 6 regole superflue dalla prima stesura — 5 ridondanti
  con il blocco `max-width: 1199px` (`container`, `post-header`, `post-breadcrumb`,
  `post-header h1`, `post-description`) e una (`.post-article-content { padding: 12px 0 32px }`)
  in conflitto con la decisione stabile documentata in `DEEPSEEK.md`: «Doppio padding mobile
  evitato: `.post-article-content` su mobile usa `padding: 16px 0 48px`».

## Task 3 — Pulsante tema toggle in navbar ⛔ ANNULLATO

**Motivo:** il pulsante **esiste già** in `src/_includes/navbar.njk`:

```html
<button id="theme-toggle" class="theme-toggle-btn" aria-label="Cambia tema" title="Cambia tema">
  <svg id="theme-icon-sun" ...></svg>
  <svg id="theme-icon-moon" ...></svg>
</button>
```

Durante il lavoro l'id era stato rinominato in `theme-toggle-btn` ed è stato **revertito**:
`main.js` riga 8 usa `getElementById('theme-toggle')` → la rinomina avrebbe disattivato il toggle.
Stato finale verificato: `git status` non mostra `navbar.njk` come modificato.

## Task 4 — Creare `src/assets/js/theme-toggle.js` ⛔ ANNULLATO

**Motivo:** la logica completa è già in `src/assets/js/main.js`, funzione `initThemeToggle()`
(riga 7), invocata a riga 490:

- legge `localStorage.theme`, fallback `prefers-color-scheme`;
- scrive `data-bs-theme` su `<html>` e `window.__bsTheme` (usato da Giscus, cfr. `post.njk`);
- gestisce la visibilità delle icone sole/luna;
- sincronizza il tema di Giscus via `postMessage` (`syncGiscusTheme`).

Creare un secondo file avrebbe prodotto due listener sul click, doppia scrittura in
`localStorage` con chiavi diverse (`theme` vs `theme-preference`) e race sul tema iniziale.
Il file **non è stato creato**.

## Task 5 — Includere theme-toggle in `base.njk` ⛔ ANNULLATO

**Motivo:** dipende dal Task 4. `base.njk` carica già `main.js` (riga 133) e contiene lo script
pre-render (righe 41-52) che imposta `data-bs-theme` da `prefers-color-scheme` evitando il flash.

## Task 6 — Sitemap per categorie ⛔ ANNULLATO

**Motivo:** già implementata in `src/tags/sitemap-tags.njk` (`permalink: /sitemap-tags.xml`) che
itera `collections.tagList`. Verificato nel build: `dist/sitemap-tags.xml` con **144 URL**.
Aggiungere un loop in `src/sitemap.njk` avrebbe duplicato le stesse URL in due file sitemap.

## Task 7 — `ctx` in `worker.js` ⛔ ANNULLATO

**Motivo:** `worker.js` non contiene `ctx` — la firma è `async fetch(request, env)`.
`eslint.config.js` include già il file con `globals.serviceworker` + `env`/`waitUntil`.
`npm run lint` → exit 0. Il task era già coperto dalla feature `worker-js-lint`.

## Task 8 — Contrasto ad alto contrasto ⏸ RIMANDATO

**Motivo:** un blocco `:root.high-contrast` senza un meccanismo che lo attivi è codice morto.
Da progettare come feature separata, decidendo prima l'attivazione (terzo stato del toggle tema
oppure `@media (prefers-contrast: high)`).

## Task 9 — Verifica + commit

- [x] `npm run lint` → exit 0
- [x] `npm run build` → exit 0 (221 file scritti, nessun warning)
- [x] `npm test` → exit 0 (6/6 pass)
- [x] Verifica su `dist/`: token `--border:#d0d0d0` presente nel CSS minificato; regole
      `@media (width<=480px)` presenti e integre; `id="theme-toggle"` presente in `dist/index.html`;
      `dist/sitemap-tags.xml` con 144 `<loc>`
- [x] `git status` controllato: `M src/assets/css/custom.css` + `features/` (untracked)
- [ ] **Commit — in attesa di "Procedi" dall'utente**

**Comando previsto (dopo conferma):**

```bash
git add src/assets/css/custom.css features/refactoring-design-system/
git commit -m "feat(design-system): add missing light-theme tokens and <=480px mobile breakpoint"
```

Messaggio di commit in inglese come da convenzione. Nessun push, nessun commit automatico.

**Nota:** `.cache/tldr-cache.json` risulta modificato dal build (rigenerazione TL;DR): è un
artefatto di build, **non** va incluso nel commit.

---

## Riassunto modifiche

| File | Righe | Tipo |
|---|---|---|
| `src/assets/css/custom.css` | +15 / -0 | 4 design token + 1 media query |
| `DEEPSEEK.md` | +28 | voce di changelog (gitignored) |
| `~/Scrivania/Report modifiche.md` | nuovo | report di intervento |
| `features/refactoring-design-system/` | 3 file | spec / plan / tasks |

**File intenzionalmente NON modificati:** `navbar.njk` (toccato e revertito), `main.js`,
`worker.js`, `sitemap.njk`, `eslint.config.js`, `eleventy.config.js`, `base.njk`.
