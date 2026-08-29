# Costituzione del Progetto — dino-996.github.io

> Documento letto dall'agente **prima** di qualsiasi generazione di codice.
> Vincola tutte le decisioni tecniche e organizzative.

---

## 1. Stack Tecnologico

| Componente | Versione esatta |
|---|---|
| Node.js | ≥ 20.x (verificare con `node -v`) |
| Eleventy | 3.1.x |
| Nunjucks | (template engine di Eleventy) |
| npm | ≥ 10.x |

### Dipendenze ammesse (package.json)

Solo packages presenti in `node_modules` e elencati in `package.json`.
**Divieto assoluto** di installare pacchetti non in `package.json` senza approvazione esplicita.

### Hook pre-commit

Prima di ogni commit che tocchi file in `src/` o `lib/`, verificare che esista almeno un file modificato in `features/`. Se manca, il commit viene rifiutato.

---

## 2. Architettura del Progetto

### Directory principali

```
src/                      → sorgenti Eleventy (input)
  _data/                  → dati globali (JSON/JS)
  _includes/              → partial Nunjucks riutilizzabili
  _layouts/               → layout page/post
  assets/                 → CSS, JS, immagini (copiati in dist/)
  posts/                  → file markdown dei post
  lib/                    → utility JS (moduli condivisi)
dist/                     → output build (generato, non modificato a mano)
tests/                    → test unitari e di configurazione
```

### Pattern architetturali obbligatori

- **Layer di template**: `_layouts/` → `_includes/` → `lib/` → `src/_data/`
- **Separazione dati/logica**: i file in `src/_data/` espongono solo dati; la logica va in `src/lib/`
- **Nessun codice inline in template Nunjucks**: tutta la logica in moduli JS
- **CSS custom**: unico file `src/assets/css/custom.css` (no framework CSS)
- **JS modulare**: un file per modulo in `src/assets/js/`, ESM (`type: "module"`)

### Convenzioni di naming

| Tipo | Convenzione | Esempio |
|---|---|---|
| Template Nunjucks | kebab-case | `article-card.njk` |
| File JS | kebab-case | `cleanup-subscribers.mjs` |
| Dati globali | camelCase | `site.json`, `posts.js` |
| Post markdown | kebab-case nel filename | `2025-01-15-my-post.md` |
| Variabili JS | camelCase | `const postTitle = …` |
| Costanti JS | UPPER_SNAKE_CASE | `const MAX_RETRY = 3;` |
| Classi CSS | kebab-case | `.article-card` |

---

## 3. Soglie Qualitative

| Metrica | Soglia |
|---|---|
| Test coverage (unit test) | ≥ 70% per `src/lib/` e `src/_data/` |
| Linting JS | Nessun errore `eslint` su `src/assets/js/` e `src/lib/` |
| Build Eleventy | Zero errori, zero warning in quietMode |
| Tempo di risposta AI widget | < 3s (verificato manualmente) |
| Link ipertestuali | Tutti i link verificati almeno visivamente |

### Gestione dei segreti

- **Tutti** i secret sono in `.env` (mai committato — già in `.gitignore`)
- Accesso via `process.env.NOME_VARIABILE` nel codice
- In `eleventy.config.js`: `addGlobalData()` per esporre secrets ai template (lato server only)
- I template Nunjucks **non devono mai** loggare o stampare il contenuto di variabili d'ambiente

---

## 4. Workflow di Sviluppo (SDD)

Ogni feature segue il ciclo:

```
[.specify/constitution.md]        ← LETTO PRIMA DI TUTTO
[features/<nome>/spec.md]         ← requisiti, senza dettagli implementativi
[features/<nome>/plan.md]         ← architettura, approvato PRIMA di scrivere codice
[features/<nome>/tasks.md]         ← task atomici checklisted
[Esecuzione task]                  ← un task alla volta
[Validazione]                      ← linter + build + test
[Git commit]                       ← con feat(scope): completato task N
```

### Regole anti-allucinazione

1. Mai generare codice senza prima aver letto `constitution.md` e il `spec.md` della feature
2. Mai inventare dipendenze non presenti in `package.json`
3. Mai modificare file fuori dal perimetro del task corrente
4. Se un task richiede più di 2 file da modificare, **dividere** in sotto-task

---

## 5. Criteri di Accettazione Generali

- Il build `npm run build` termina con **exit code 0**
- `npm run dev` avvia il server di sviluppo senza errori
- I template Nunjucks non lanciano eccezioni a runtime
- I link simbolici `.cursorrules` e `CLAUDE.md` puntano a `.specify/constitution.md`
- Il file `DEEPSEEK.md` (changelog) è aggiornato dopo ogni feature completata

---

## 6. File Critici (non modificare senza approvazione esplicita)

- `eleventy.config.js` — configurazione core del sito
- `src/_data/site.json` — metadati globali del blog
- `src/_layouts/base.njk` — layout radice (XSS guard, struttura HTML)
- `src/assets/js/worker.js` — Cloudflare Worker per AI widget (API key)
- `src/assets/js/ai-widget.js` — widget AI lato client

