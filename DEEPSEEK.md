# DEEPSEEK.md — Cronologia modifiche — DinoSec

> Log delle operazioni sul progetto. Mantienilo allineato allo stato reale del codice:
> quando una modifica è revertita o non applicata, aggiorna il log di conseguenza.
> Il file è in `.gitignore` e non viene versionato.

## Decisioni stabili e pattern da non riproporre

- Titolo articolo è `<h1>` Nunjucks nel layout; il primo heading del markdown viene trasformato in `<h2>` via Eleventy transform (`fix-heading-hierarchy`). — rif. [2026-07-26]
- Focus visibile: usare `:focus-visible` globale con `outline: 2px solid var(--primary)`. Mai rimuovere `outline` senza sostituirlo. — rif. [2026-07-26]
- `prefers-reduced-motion` deve essere sempre rispettato: CSS globale azzera animazioni, JS controlla prima di `behavior: 'smooth'`. — rif. [2026-07-26]
- Touch target minimo 44×44px per elementi interattivi (bottoni AI, nav link mobili). — rif. [2026-07-26]
- Skip link: primo elemento focusabile del `<body>`, visibile solo on focus. — rif. [2026-07-26]
- `aria-live="polite"` su tutti i contenuti dinamici (ricerca, newsletter, chat). — rif. [2026-07-26]
- `<label>` sempre presente per ogni `<input>`, anche se visivamente nascosto. — rif. [2026-07-26]
- Mobile ToC: pulsante "Indice" collassabile sotto `768px` con toggle JS; stesso JS della sidebar desktop. — rif. [2026-07-26]
- Doppio padding mobile evitato: `.post-article-content` su mobile usa `padding: 16px 0 48px` (eredita gutter dal container). — rif. [2026-07-26]
- `body { font-size: 100% }` (non px) per rispettare zoom utente. — rif. [2026-07-26]
- URL immagini per meta OG/Twitter: usare filtro `absoluteImageUrl` che non prefixa `site.url` se l'URL è già assoluto (Cloudinary). — rif. [2026-07-26]
- **Typography**: titoli serif `Libre Caslon Text`, testo e label **Inter** (variable, 300–700, optical sizing). Inter è il font del corpo/label dall'08-2026 (prima: Red Hat Text/Display). Scelto per leggibilità su schermo e accessibilità visiva dei contenuti tecnici. — rif. [2026-07-28], [2026-08-03]
- **Zero CSS framework**: Bootstrap è stato aggiunto e poi rimosso completamente (2026-07-29). Tutto il CSS è custom (palette Material Design 3, CSS Grid 12-col). Verificare prima di reintrodurre dipendenze di styling. — rif. [2026-07-29]
- Sidebar indice: **sinistra, fixed, 280px**, scroll indipendente. Non sidebar destra sticky. — rif. [2026-07-26]
- Variabile `--sidebar-bg` dedicata per distinguere sfondo sidebar dal contenuto. — rif. [2026-07-26]
- Breadcrumb: `Home » Blog` per post normali, `Home » Percorsi » [corso]` per post in corsi. Usare filtro `courseForUrl` sui dati globali `courses`, non la variabile `course` del post (non popolata). — rif. [2026-07-26]
- Nunjucks frontmatter YAML NON processa variabili di template (es. `{{ course.name }}`). Usare `{% block head_extra %}` con JS per titoli dinamici. — rif. [2026-07-26]
- Il tema può seguire `prefers-color-scheme` dell'OS **ma** supporta anche override manuale tramite toggle nel navbar + localStorage. — rif. [2026-08-29] (sostituisce la regola del 2026-07-26)
- TL;DR ("In breve") va posizionato come primo elemento del contenuto dell'articolo (dentro `.post-layout`), non tra header e contenuto. — rif. [2026-07-26]
- **E-E-A-T (pianificato, NON ancora applicato)**: contenuti GDPR/cybersecurity richiedono credenziali autore esplicite. La pagina "Chi sono" deve elencare certificazioni (ISO 27001, privacy officer, etc.) ed esperienza professionale concreta. Al momento elenca solo bio, temi, stack. — rif. [2026-07-26]

---

## Changelog dettagliato

## [2026-07-26] Sitemap.xml + robots.txt

### Prima
- Nessun sitemap.xml o robots.txt presenti.

### Fatto
- `src/sitemap.njk` → permalink `/sitemap.xml`, itera `collections.posts` + pagine statiche + corsi.
- `src/robots.njk` → permalink `/robots.txt`, `Allow: /` + blocchi per bot AI/CCBot.
- **Nota di coerenza**: la riga `Sitemap:` di `robots.njk` usa l'URL assoluto **hardcoded** `https://dino-996.github.io/sitemap.xml`, non `site.url` (il "dinamico" scritto in passato nel log non corrisponde al codice).

### Lezione
- Sitemap XML senza template invalidabile da JSON: generare sempre da dati globali/collezioni.

## [2026-07-26] Fix metadata OG/Twitter — URL immagine assoluto

### Problema
- `og:image` e `twitter:image` concatenavano `site.url` + `image` anche quando `image` era già URL assoluto Cloudinary → `https://dino-996.github.iohttps://res.cloudinary.com/...`.

### Fatto
- Filtro `absoluteImageUrl(url, baseUrl)`: restituisce `url` invariato se inizia con `http`, altrimenti fa il prepend di `baseUrl`.

### File
- `eleventy.config.js` (filtro), `src/_includes/head.njk` (uso).

### Lezione
- Non assumere mai che `image` sia un path relativo — Cloudinary restituisce URL assoluti.

## [2026-07-26] Tema automatico basato su OS (prefers-color-scheme)

### Problema
- Il tema non seguiva il `prefers-color-scheme` dell'OS; esisteva un toggle manuale mai richiesto (stato stale via localStorage).

### Fatto
- Rimosso ogni toggle manuale e logica localStorage.
- `matchMedia('(prefers-color-scheme: dark)')` per rilevare il tema, listener `change` per aggiornare `data-bs-theme` sul `documentElement` e `window.__bsTheme`.
- Script inline nel `<head>` (evita il flash del tema sbagliato).
- giscus legge `window.__bsTheme` (v. `src/_layouts/post.njk`); `main.js` sincronizza giscus via `postMessage` al cambio runtime.

### File
- `src/_layouts/base.njk`, `src/_layouts/post.njk`, `src/assets/js/main.js`, `src/_includes/navbar.njk` (rimozione markup `.theme-toggle`).

## [2026-07-26] Accessibilità + Responsive — correzioni bulk

### Audit
**Responsive:** ToC assente su mobile, doppio padding sul contenuto post, bottoni prev/next senza wrap, tabelle senza scroll orizzontale.
**Accessibilità (19 criteri):** skip link assente, `<h1>` duplicato, `outline: none` su input, no `aria-live`, no `<label>`, menu mobile senza gestione focus/aria, scroll-to-top focusabile da nascosto, no `prefers-reduced-motion`, touch target insufficienti, `body` in px, no `aria-current="page"`.

### Fatto (WCAG 2.1 AA)
- `html`/`body`: `font-size: 100%`; `:focus-visible` globale; `.skip-link` visibile solo on focus; rimossi `outline: none`.
- Aggiunto `@media (prefers-reduced-motion: reduce)` che azzera animazioni/transition/scroll.
- Touch target → 44×44 (AI close/send, nav link padding 12px).
- `.content .table-wrapper` con `overflow-x: auto`.
- `aria-live`, `<label>`, `aria-current="page"`, focus management sul menu mobile.
- Transform `fix-heading-hierarchy`: demote primo `<h1>` in `.content` a `<h2>` sui post.

### File
- `src/assets/css/custom.css`, `src/_layouts/base.njk`, `src/_includes/navbar.njk`, `src/blog.njk`, `src/index.njk`, `src/_layouts/post.njk`, `src/assets/js/main.js`, `eleventy.config.js`.

### Lezione
- Eleventy transform `outputPath` è assoluto: usare `.includes()` non `.startsWith()`.

## [2026-07-26] Fix uppercase e allineamento pulsanti condivisione

- "Condividi" / "in" / "𝕏" normalizzati con stessa qualità `font-label` e `align-items-center`.

## [2026-07-26] Breadcrumb reale per articoli e avatar autore

- Filtro `courseForUrl(courses, url)` per decidere breadcrumb `Home » Blog` vs `Home » Percorsi » [corso]`.
- Avatar autore reinserito nel meta con fallback a immagine predefinita.

### Lezione
- La variabile `course` del post non è popolata: usare i dati globali `courses` e cercare per URL.

## [2026-07-26] Layout due colonne: sidebar indice sinistra fissa + contenuto

- Sidebar: `position: fixed; left; 280px;` scroll indipendente; contenuto con margine sinistro ~328px, max-width 800px.
- Breadcrumb, description, border-radius 14px su hero image, metadati separati da "·".
- Aggiornata palette dark (`--on-surface`, `--secondary`, `--tertiary`, `--border-subtle`) + variabile `--sidebar-bg`.

### File
- `src/_layouts/post.njk` (riscritto), `src/assets/css/custom.css`, `eleventy.config.js`.

### Lezione
- Specificare "sidebar sinistra fissa" vs "destra sticky" senza ambiguità.

## [2026-07-26] TL;DR dentro il contenuto

- "(In breve)" spostato tra header e toc → **dentro** `article`, come primo elemento prima di `section.content`, in `.post-layout`.

## [2026-07-26] Fix pulsanti prev/next e titolo pagina corso

- prev/next: `nowrap` + ellipsis + `min-width: 0` su titoli lunghi.
- Pagina corso: `title` **non** in frontmatter (YAML non processa Nunjucks) ma `document.title` via `head_extra` con `| json`.

## [2026-07-26] Pulsante scroll to top

- Pulsante flottante in basso a destra (`z-index` sotto il widget AI), visibile dopo 400px di scroll, `tabindex` toggle e check `prefersReducedMotion`.

### File
- `src/_layouts/base.njk` (+script), `src/assets/css/custom.css`.

## [2026-07-28] Scroll orizzontale — overflow-x su html

### Problema
- Su mobile lo scroll orizzontale appariva malgrado `body { overflow-x: hidden }`.

### Fatto
- `overflow-x: hidden` anche su `html` (root element), subito dopo `box-sizing`.

### Lezione
- Lo scroll viewport è controllato da `html`, non da `body`.

## [2026-07-28] TOC collapse button — nascosto su desktop

- `#toc-collapse-btn` aggiunta la classe `hide-desktop` (su desktop sidebar fixed sempre aperta).

## [2026-07-28] Copy button code snippet — fisso rispetto al wrapper

### Problema
- Il bottone "Copia" era assoluto rispetto al `<pre>` che ha `overflow-x: auto` → scrollando il codice il bottone spariva.

### Fatto
- Wrapper `<div class="code-block-wrapper">` (non scrollabile), bottone assoluto rispetto al wrapper, `z-index: 1`. Plus guard `bfcache` per evitare doppio wrapper (round-trip avanti/indietro).

### File
- `src/assets/js/main.js` (+ guard `pre.parentElement.classList.contains('code-block-wrapper')`), `custom.css`.

### Lezione
- `position: absolute` dentro un elemento con `overflow: auto` fa scrollare anche l'elemento assoluto.

## [2026-07-28] Prev/Next nav — sempre affiancati su mobile

### Problema
- `flex-wrap` + `max-width: 50%` + `gap` facevano impilare i bottoni su mobile (50%+50%+gap > 100%).

### Fatto
- Rimossi `flex-wrap`; `max-width: calc(50% - 4px)` per compensare metà del `gap`.

### Lezione
- Con `gap` su flex container, figli al 50% eccedono il 100%: sottrarre metà del gap.

## [2026-07-28] Condividi — sempre a destra

### Problema
- `justify-content-between` allinea solo sulla riga corrente; se i tag wrapnavano, la sezione share restava a sinistra.

### Fatto
- `margin-left: auto` sul blocco share → sempre spinto a destra anche dopo un wrap.

## [2026-07-28] Rebrand dino-996 → DinoSec + immagini profilo

- Testuale in 6+ file (`site.json`, navbar, footer, email template, main.js, worker.js system prompt).
- Immagini Cloudinary integrate: home CTA (`dino-cta-img`), about (`about-avatar`), 404 (`dino-404-img`).

### Lezione
- URL Cloudinary usati direttamente in HTML/CSS, non scaricati. Il rename è solo display name: URL/GitHub restano invariati.

## [2026-07-28] Palette gialla → verde Dino

- Token `--primary-*` da giallo a verde foresta (#2e7a32 light / #81c784 dark), aggiornati `--on-surface-variant`, `--outline`, `--outline-variant` (23 valori in custom.css).

### Lezione
- Con CSS custom properties basta cambiare i token, tutto il resto segue.

## [2026-07-28] Home — articoli responsive

- Wrapper immagini con padding-bottom 56.25% (16:9, trick compatibile iOS Safari), immagine assoluta `object-fit: cover`.
- Griglia 1 → 2 → 3 colonne (non più 4).
- `min-width: 0` su flex/grid item + `width: 100%` sull'immagine dino (1408px intrinseci).

### File
- `src/assets/css/custom.css`.

### Lezione
- `aspect-ratio` su iOS Safari è ballerino: preferire il padding-bottom trick.
- Le immagini con taglia intrinseca grande in una grid richiedono `min-width: 0`.

## [2026-07-28] Font: valutazione Red Hat → Inter — poi applicata (2026-08-03)

- 2026-07-28: valutato il passaggio a **Inter** (leggibilità su schermo) ma la patch non era stata applicata; restava `Red Hat Text`/`Red Hat Display`.
- 2026-08-03: **applicato**. Stato attuale: `--font-serif: 'Libre Caslon Text'`, `--font-sans: 'Inter'`, `--font-label: 'Inter'` (custom.css), caricati via `<link>` in `head.njk` + `@import` in custom.css (Inter variable `14..32` opsz, 300–700). Aggiornati anche README ed `email/confirmation.html`.
- Scelta: font adatto a letture lunghe/tecniche su schermo, ottimo x-height e differenziazione dei glifi, meno affaticamento visivo.

## [2026-07-28] Bootstrap — ciclo completo fino alla rimozione

### 1. Aggiunta (2026-07-28, commit `d30de11`)
- Introduzione di Bootstrap 5.3.8 per "styling e interactivity" (dipendenza npm + `<script>`).

### 2. Integrazione problematica (2026-07-28)
- CSS Bootstrap non importato (layer `@layer bootstrap-raw, site;` dichiarato ma vuoto) → componenti Strapi (alert, accordion, tabs) senza stile.
- Correzione temporanea: `@import url('...') layer(bootstrap-raw);` + override `.content .alert/.accordion-*/.nav-tabs`.
- **Sprite Bootstrap Icons**: tentato inline a build (mancava +~200KB/pagina) → caricato via `fetch` CDN + inject nel `<body>`; guardia per `#info-fill` → clone di `info-circle-fill`.
- Bottone copia e altri angoli stondati uniformati a `var(--bs-border-radius-lg, 0.5rem)`, accordion colore verde, immagine corso neltagliato nel listing.

### 3. Rimozione completa (2026-07-29)
- Problemi accumulati (layer vuoto, FOUC, dipendenza di rete) → **zero Bootstrap in `src/`**:
  - `@layer` e `@import` rimossi da `custom.css` (-11KB).
  - `<script src="...bootstrap.min.js">` rimosso da `base.njk`.
  - dipendenza npm rimossa da `package.json`.
  - **Nota**: `base.njk` usa ancora CSS critical-css inline nel `<head>` per evitare FOUC; il caricamento è via `<link>` paralleli.
  - I componenti Strapi con HTML Bootstrap restano **non stilizzati** (coerente col sito: nessun framework); eventuali `.alert`/`.accordion` vanno gestiti a monte in Strapi.
- Tutti gli override precedentemente aggiunti per Bootstrap (`.content .accordion-*` ecc.) sono stati rimossi — il codice non contiene riferimenti a Bootstrap.

### 4. Lezioni
- Se dichiari un `@layer` per un framework, devi importarvelo dentro — non basta il nome.
- Dispatch via cReverse; servire sprite naive — CDN + caching, non inlining (150KB vs 1.1MB ogni pagina).
- I contenuti Strapi (Bootstrap HTML) richiedevano CSS+JS: la strategia vera è eliminare Bootstrap, non patcharlo.

## [2026-07-28] Fix flash bianco — @import bloccante rimosso

## [2026-07-28] Critical CSS inline (FOUC)

Con Bootstrap rimosso, `@import` del font nel `head` bloccante via `<link>`/`connect`:
- `head.njk`: `<link rel="stylesheet">` + `<style>` col CSS di layout critico (`body`, `.site-header`, `.header-spacer`, `.container`, variante dark).
- Il primo paint ha la struttura corretta anche prima che arrivi `custom.css`.

### Lezione
- L'`@import` in CSS blocca il rendering: preferire `<link>` e CSS critico inline per il layout.

## [2026-07-29] Rimozione completa Bootstrap — riepilogo

Vedi entry del ciclo Bootstrap sopra (stato finale: zero riferimenti).

---

## [2026-08-03] Ambiente Node → v22 LTS + fix build-local

### Problemi
- Wrangler 4 richiede Node ≥22: su Node 18 npm emetteva `EBADENGINE` per wrangler, miniflare, kv-asset-handler, sharp, undici.
- `npm run build-local` falliva con `node: --env-file= is not allowed in NODE_OPTIONS`.

### Causa
- Il sistema (Zorin/Ubuntu) forniva Node 18.19.1 via apt; `npx --node-options='--env-file=.env'` non è un cap escript: `--env-file` **non è ammesso in NODE_OPTIONS** (allowlist Node) né su v18 né su v22.

### Fatto
- Installato Node 22.23.2 via nvm (default alias `22`, isolato in `~/.nvm`, sistema/invariati).
- `package.json`: script `build-local` ora:
  ```
  "build-local": "node --env-file=.env ./node_modules/.bin/eleventy"
  ```
- Verificato: build senza warning `EBADENGINE`, `.env` letto correttamente.

### Lezione
- `--env-file` va passato a `node` direttamente in CLI, mai in `NODE_OPTIONS`.

## [2026-08-03] Refactoring + bug fix — sessione di revisione

Log disallineato dallo stato reale (font, robots, Bootstrap, duplicate/mislabeled). Riportato a coerenza (vedi sopra).

### Bug ad alta priorità
- **`.nojekyll` mai copiato**: `eleventy.config.js` copiava `.nojekill` (typo). Corretto → `.nojekyll` ora presente in `dist/`.
- **feed.xml 1MB**: il feed includeva il contenuto completo di tutti i post. Ora limitato agli ultimi 15 (`limit(15)`) → ~380KB.
- **Self-XSS nella ricerca**: `main.js` iniettava la query utente in `innerHTML` senza escape. Aggiunto `escapeHtml` applicato a query, titoli, descrizioni, URL.
- **Doppio scroll sui link ToC**: il handler generico `a[href^="#"]` e `setupTocClick` giravano entrambi. Il generico ora ignora i link dentro `.toc-list` (l'offset `NAV_OFFSET` resta valido).
- **Dead transform `minify-css`**: i CSS passano da passthrough copy e non attraversano i transform; rimosso. Minify unificato nell'hook `eleventy.after` con **lightningcss** (devDep) al posto delle regex (robuste per `calc()`, data URI, ecc.).

### Refactoring medio
- **Partial card articoli**: nuovo `src/_includes/article-card.njk` con macro `gridCard`/`listCard` (normalizza post piatti vs item di collezione). Usato in `index.njk`, `blog.njk`, `courses/course.njk`, `tags/tag.njk`. Eliminata la duplicazione di badge/titolo/descrizione/meta.
- **Card corso (post-verifica)**: nella pagina di un corso (`courses/course.njk`) i tag sugli articoli sono stati **rimossi** e aggiunta l'**immagine di copertina a destra** come nella sezione blog (`image: "right"` invece di `showTags: true`).
- **Inline styles → classi CSS** in `post.njk` (share, prev/next, commenti): `.share-block`, `.article-nav-*`, `.post-section`, `.comment-heading`, `.card-compact`, `.article-item-title-sm`, `.badge-tag-mini`.
- **Widget AI estratto**: `base.njk` inline (127 righe) → `src/assets/js/ai-widget.js`.
- **`tldr.js`**: cache con hash sha1 reale del contenuto (prima: lunghezza → collisioni), generazione con concorrenza 3, niente log a ogni build. **Nota**: il cambio formato hash ha invalidato la cache → al primo build tutti i TL;DR vengono rigenerati (rischio quota Gemini free-tier).
- **Dedupe dati**: rimosso `displayTags` (identico a `strapiTags`), fallback unificato in `emptyPost()` (`src/lib/utils.js`), slug corsi e tag coerenti via `slugifyIt` condiviso.
- **KaTeX/Prism solo sui post**: rimossi da `head.njk`/`base.njk` (incluso il CSS KaTeX duplicato), caricati via `head_extra`/`{% block scripts %}` in `post.njk`.
- **`package.json`**: `dev`/`build` usano il bin locale `eleventy` (non `npx`); `test` → `node --test tests/*.test.js` (6 test sui filtri e le utility).
- **`src/lib/utils.js`**: `decodeHtml`, `slugifyIt`, `emptyPost` condivisi e testabili.

### Fix minori
- Navbar: classi `btn-subscribe*` → `nav-btn*` (residuo nome Bootstrap).
- Footer: indentazione + copyright "DinoSec" (era "Dino-996").
- `main.js`: scroll header throttlato con `requestAnimationFrame`.
- Worker: niente leak di `error.message` interno al client.
- `eleventy.config.js`: commento `setQuietMode` corretto.
- `keep-alive.mjs`: validazione `SUPABASE_URL`/`SUPABASE_ANON_KEY` come in `cleanup-subscribers.mjs`.

### Verifiche
- `npm test`: 6/6 pass.
- `npm run build-local` e `npm run build`: 173 file, 0 errori; `dist/.nojekyll` presente; feed 15 entry; CSS minificato 40KB → ~29.6KB.

## [2026-08-03] Share esplicita + fix search bar

### Fatto
- **Sezione share articolo**: il testo criptico `Condividi / SU / 𝕏` (SU = LinkedIn, non esplicito) è stato sostituito da due bottoni `btn btn-outline btn-sm` con icona SVG inline (LinkedIn + logo X) e testo esplicito "Condividi su LinkedIn" / "Condividi su X", `target="_blank" rel="noopener"`, `aria-label` dedicati.
- Rimossa la coppia `.share-label`/`.share-link`; aggiunta `.share-btn { display: inline-flex; align-items: center; gap: 8px }`. `.share-block` invariato (`margin-left: auto`).
- **Search bar — X blu**: il pulsante clear nativo di WebKit (`::-webkit-search-cancel-button`) è restylizzato via `appearance: none` + SVG a X mascherato, colore `var(--tertiary)` (hover `var(--secondary)`) → coerente con la palette. (Firefox non mostra il clear nativo.)
- **Search bar — bottone Cerca**: non riempiva il contenitore perché più basso dell'input (~7px, font label 0.75rem vs 1rem). `.search-bar` ora usa `align-items: stretch` → il bottone si estende a tutta l'altezza del contenitore.

### File
- `src/_layouts/post.njk`, `src/assets/css/custom.css`.

### Verifica
- `npm run build-local`: 173 file, 0 errori.

## [2026-08-03] Paginazione nascosta durante la ricerca

### Problema
- Durante la ricerca i pulsanti "Precedente"/"Successivo" restavano visibili: `main.js` cercava `#pagination` (per nascondere/ripristinare la paginazione) ma il `<nav>` di `blog.njk` aveva solo la classe `.pagination-bar`, senza `id` → il toggle non scattava mai.

### Fatto
- Aggiunto `id="pagination"` al `<nav class="pagination-bar">` in `src/blog.njk`.
- La logica JS già esistente ora funziona: con query attiva la paginazione viene nascosta, tornando visibile appena l'input viene svuotato (handler `input`).

### Verifica
- Build: 173 file, 0 errori; `id="pagination"` presente in `dist/blog/index.html`.

## [2026-08-03] Rollback ordinamento ricerca + cache-busting

- Annullate integralmente le modifiche relative all'ordinamento dei risultati di ricerca (bottoni "Data"/"Ultima modifica") e al cache-busting (`?v=` sugli asset), su richiesta dell'utente dopo test non riusciti.
- File riportati allo stato precedente: `src/assets/css/custom.css` (regole `.search-sort`/`.sort-btn` rimosse, `.article-item:last-child` ripristinato — poi rimosso del tutto, v. entry successiva), `src/blog.njk` (blocco `.search-sort` rimosso), `src/assets/js/main.js` (logica sort rimossa), `eleventy.config.js` (`updatedAt` rimosso da `searchIndex`, `buildVersion` rimosso, hook `eleventy.after` ripristinato a leggere da `dist`), `src/_includes/head.njk` e `src/_layouts/base.njk` (senza `?v=`).
- **Non ripristinate** (rimaste attive): share esplicita `.share-btn`, fix X blu search bar, `align-items: stretch`, `id="pagination"`.

## [2026-08-03] Linea inferiore visibile sull'ultimo articolo della feed list

### Fatto
- Rimossa la regola `.article-item:last-child { border-bottom: none; }` da `custom.css`: la linea di fondo del contenitore dell'ultimo articolo (es. ultimo post del blog) è ora sempre visibile, senza lo spazio bianco in basso.
- La regola `.sidebar-news-item:last-child` (sidebar newsletter, diversa) è rimasta invariata.
- Nota: prima del rollback dell'ordinamento questa regola era stata momentaneamente esclusa solo per le search result card (`.article-item:last-child:not(.search-result-item)`); dopo il rollback è stata rimossa del tutto perché l'utente vuole la linea visibile anche in feed list.

### Verifica
- Build: 173 file, 0 errori; regola assente in `dist/assets/css/custom.css`.

## [2026-08-03] "Aggiornato il" — confronto date per giorno

### Problema
- La meta del post mostrava "Aggiornato il" su **tutte** le pagine: il confronto `(updatedAt | dateIso) > (postDate | dateIso)` avveniva sui timestamp interi. `postDate` è il campo data di Strapi (mezzanotte), `updatedAt` include sempre l'orario → `>` quasi sempre vero anche per post mai modificati (es. "Pubblicato 31/07, Aggiornato 31/07").

### Fatto
- Nuovo filtro `dateDay` in `eleventy.config.js`: ritorna `""` per null/date invalide, altrimenti `YYYY-MM-DD` (`toISOString().slice(0, 10)`).
- `src/_layouts/post.njk`: condizione `{% if updatedAt and (updatedAt | dateDay) > (postDate | dateDay) %}` → si mostra "Aggiornato il" solo se la modifica è in un giorno successivo alla pubblicazione; a parità di giorno appare solo "Pubblicato il".
- Nota: confronto a livello di giorno — una modifica nello stesso giorno non viene segnalata (scelta accettata).

### Verifica
- `npm test` 6/6; build 173 file, 0 errori; post stesso-giorno senza "Aggiornato il", post modificato con entrambe le date.

## [2026-08-29] Theme Toggle — modalità manuale dark/light

### Problema
- Il tema seguiva solo `prefers-color-scheme` dell'OS, senza possibilità di override manuale.

### Fatto
- Aggiunto bottone toggle nel navbar (`.theme-toggle-btn`) con icone sun/moon SVG.
- `initThemeToggle()` in `main.js`: toggle `data-bs-theme` + persistenza `localStorage` + fallback `prefers-color-scheme`.
- Giscus sync con `syncGiscusTheme()` al cambio tema.
- CSS: stili `.theme-toggle-btn`, variabili dark-mode corrette (bug preesistente: variabili fuori dal selettore `[data-bs-theme="dark"]`).

### File
- `src/_includes/navbar.njk`, `src/assets/js/main.js`, `src/assets/css/custom.css`.

## [2026-08-29] Worker JS Lint — worker.js incluso in ESLint

### Problema
- `worker.js` era escluso da ESLint (`ignores` list), non veniva lintato.

### Fatto
- Rimosso dalla lista `ignores`.
- Aggiunto blocco dedicato in `eslint.config.js` con `globals.serviceworker` + Cloudflare Workers globals (`env`, `waitUntil`).
- Rimosso parametro `ctx` non usato da `worker.js`.

### File
- `eslint.config.js`, `src/assets/js/worker.js`.

## [2026-08-29] Analytics Privacy — Umami Cloud integrato

### Fatto
- Snippet Umami Cloud in `head.njk` (righe 68-74), condizionale a `ANALYTICS_WEBSITE_ID`.
- `data-do-not-track="true"` per rispetto DNT.
- Variabili d'ambiente in `.env.example`: `ANALYTICS_WEBSITE_ID`, `ANALYTICS_SCRIPT_URL`.
- Esposto via `addGlobalData()` in `eleventy.config.js`.

### Criteri
- Nessun cookie creato (Umami è cookie-free).
- Se `ANALYTICS_WEBSITE_ID` non è impostato, nessuno script caricato.
- Rispetto DNT nativo via attributo.

## [2026-08-29] Related Posts — fix layout e grafica

### Problema
- Dark mode: background non si scuriva nella sezione "Potrebbe interessarti".
- Heading aveva un bordo visibile.
- Card con angoli arrotondati (border-radius: 12px).

### Fatto
- Background: `var(--surface-raised)` che eredita dal tema.
- Heading: `border: none`.
- Card: `border-radius: 0` (spigoli vivi).
- Aggiunto `margin-bottom` per distanziare da "Commenti".

### File
- `src/assets/css/custom.css`.

## [2026-08-29] UI Fix — tag padding e separatore autore

### Fatto
- Tag badge: `padding: 3px 6px` (da `3px 0`) — ora hanno respiro.
- Separatore autore in `featured-article.njk`: spazio attorno a `·` (` · `).

### File
- `src/assets/css/custom.css`, `src/_includes/featured-article.njk`.

## [2026-08-29] Sitemap Tags — /sitemap-tags.xml

### Fatto
- Nuovo file `src/tags/sitemap-tags.njk` con `permalink: /sitemap-tags.xml`.
- Itera `collections.tagList` → 113 URL tag.

### File
- `src/tags/sitemap-tags.njk`.

## [2026-08-29] SEO — JSON-LD Advanced

### Fatto
- Homepage: WebSite schema con `potentialAction`.
- Post: Article schema + BreadcrumbList schema.
- Rispettivamente nei template `index.njk` e `post.njk`.

## [2026-08-29] Featured Article — componente homepage

### Fatto
- Componente `featured-article` in `src/_includes/featured-article.njk`.
- Mostra articolo in evidenza con titolo, descrizione, meta, immagine hero.
- Usato in `index.njk`.

## [2026-08-29] Lazy Loading immagini

### Fatto
- Tutte le immagini nei post con `loading="lazy"`.
- Above-the-fold (avatar, hero, og:image) senza lazy per preservare LCP.

## [2026-08-29] TOC Mobile Scrollspy

### Fatto
- Toggle "Indice" su mobile (< 1200px).
- Scrollspy attivo (classe `active` sull'heading corrente).
- Stesso JS della sidebar desktop.

## [2026-08-29] Commit linguaggio — inglese

### Regola
- Tutti i commit messages in inglese, dal commit `a4822d3` in poi.

---

## [2026-08-28] AI widget — contesto completo e tono naturale

### Problema
- Il widget mandava solo i primi 15 articoli da `search.json` (`.slice(0, 15)`). Articoli oltre l'indice 15 (es. gnu-linux a idx 26) erano esclusi dal contesto → il modello Gemini negava l'esistenza dell'articolo nonostante l'URL fosse fornito dall'utente.
- Il system prompt era troppo rigido (divieto saluto, "2-3 frasi massimo", "in modo assoluto e inderogabile") → risposte piatte e robotiche prive di personalità.

### Fatto
- `src/assets/js/ai-widget.js`: rimosso `.slice(0, 15)` → ora tutti i 43 articoli in `search.json` vengono mandati come contesto (nessun limite).
- `src/assets/js/worker.js`: riscritto il system prompt — rimosse le restrizioni troppo rigide, aggiunto spazio per personalità (contrazioni, interiezioni, frasi incomplete), aggiunto esempio di tono atteso nel prompt stesso.

### Verifica
- `curl` al worker con query su gnu-linux → il modello risponde correttamente con il link all'articolo.
- Risposta precedente: "Non posso rispondere... non ho trovato articoli relativi a GNU/Linux".
- Risposta dopo fix: "Ah, benissimo! Se hai letto l'articolo... sei nel posto giusto!"

## [2026-08-28] CSS responsive — sidebar nascosta e ToC mobile su tablet

### Problema
- Sidebar ToC nascosta solo a `max-width: 1023px` → a 1024px (tablet landscape) la sidebar era visibile ma il viewport insufficiente per sidebar (280px) + contenuto → testo troncato.
- Mobile ToC aveva `hide-desktop` → nascosto già a 768px, non riappendo mai nella zona 768-1199px.

### Fatto
- `src/assets/css/custom.css`: breakpoint `.toc-sidebar { display: none }` portato da `max-width: 1023px` a `max-width: 1199px`.
- `@media (min-width: 1200px)` su `.toc-mobile-wrapper { display: none }` (prima 1024px).
- `src/_layouts/post.njk`: rimosso `hide-desktop` dal wrapper mobile ToC — la visibilità ora gestita esclusivamente dal CSS.

### Decisioni stabili e pattern da non riproporre
- Sidebar ToC e mobile ToC: breakpoint 1200px (non 1024px). Sidebar fissa a sinistra (280px) + contenuto readable solo >= 1200px. Mobile ToC visibile < 1200px.
- Contenuto tablet/mobile: `max-width: 800px; margin-inline: auto` — allineato in larghezza al testo dell'articolo (stessa misura del desktop). Mobile ToC (toggle Indice) e titolo/descrizione occupano la stessa larghezza.

### Verifica
- 1026x812px (tablet): sidebar nascosta, toggle Indice visibile, contenuto centrato 800px.
- >= 1200px: sidebar visibile, mobile ToC nascosto.