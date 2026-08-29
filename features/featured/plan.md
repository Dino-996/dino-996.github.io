# Piano Tecnico — Featured Article

> **Da approvare PRIMA di scrivere codice.** Traduce `spec.md` in architettura concreta.

---

## 1. Componenti e Modelli

### Componenti UI

**FeaturedArticle Component (src/_components/featured-article.njk)**
```njk
<!-- Componenti template Nunjucks riutilizzabili per l'articolo principale -->
```

**FeaturedArticle CSS (src/assets/css/featured-article.css)**
```css
/* Design del featured article: card prominent con gradient sfondo */
.featured-article {
  /* Card layout principale */
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  box-shadow: var(--shadow-xl);
  transition: transform 0.3s ease;
}

.featured-article:hover {
  transform: translateY(-4px);
}

.featured-article-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

### Modello Dati

**FeaturedArticleData (src/_data/featured-article.js)**
```js
// Dati globali per l'articolo principale nella home page
export default () => {
  return {
    title: "Building Modern Web Applications",
    description: "A deep dive into modern web development practices and patterns.",
    image: "https://example.com/featured-image.jpg",
    imageAlt: "Developer working on modern web application",
    url: "/blog/building-modern-web-applications",
    tags: ["Web Development", "JavaScript", "Architecture"],
    publishDate: "2024-01-15"
  };
};
```

### Schema Database / Persistenti

Nessuno - i dati sono statici per ora ma la struttura consente l'integrazione futura con CMS (Strapi/WordPress API).

---

## 2. Contratti API / Interfacce

### Funzioni esportate (src/lib/)

**getFeaturedArticleContent()**
```js
// Restituisce i dati per il featured article dalla source configurata
// Usa: eleventyConfig.addGlobalData('featuredArticle', getFeaturedArticleContent)
export function getFeaturedArticleContent() {
  // Implementa la logica di fetch dai dati globali o da CMS
  return {
    title,
    description,
    image,
    imageAlt,
    url,
    tags,
    publishDate
  };
}
```

### Dati globali (src/_data/)

```js
// Chiamare: eleventyConfig.addGlobalData('featuredArticle', getFeaturedArticleContent)
// Tipo: Object con proprietà dell'articolo
// Accessibile nei template come: {{ featuredArticle.title }} ecc.
```

---

## 3. Flusso dei Dati

```
[src/_data/featured-article.js] → [src/lib/featured-article.js] → [src/_components/featured-article.njk]
   ↑              ↓              ↓
   └──── [Template Engine] ← [UI Component] ← [CSS Styling]
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_components/featured-article.njk` | CREATE | Nuovo template Nunjucks per il componente featured article riutilizzabile |
| `src/assets/css/featured-article.css` | CREATE | Stile CSS dedicato per il featured article |
| `src/_data/featured-article.js` | CREATE | File dati globale per le informazioni del featured article |
| `src/lib/featured-article.js` | CREATE | Funzione di supporto per recuperare/sponsorizzare dati |
| `src/index.njk` | MODIFY | Aggiornato per usare il componente instead di markup inline |
| `package.json` | MODIFY | Aggiunge script `npm run lint` (già presente tramite setup-loop-engineering) |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| Eleventy 3.1 | ≥ 3.1.0 | Core framework |
| dotenv | ≥ 16.0 | Variabili d'ambiente |
| globals (eslint) | ^15.x | Validazione lint (già presente) |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Incoerenza di design con tema esistente | Bassa | Medio | Seguire il design system esistente (variabili CSS: --primary, --secondary, --border-radius-lg, --shadow-xl) |
| Rottura layout home page esistente | Media | Alto | Testare la home page dopo ogni commit, mantenere il componente isolato |
| Combinazione incompatibile di variabili CSS | Bassa | Medio | Seguire convenzioni di naming CSS esistenti (kebab-case per classi) |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
- [ ] Non ci sono modifiche a `src/assets/js/worker.js` o `src/assets/js/ai-widget.js` senza approvazione esplicita
- [ ] Design coerente con sistema design esistente
- [ ] Componenti modularizzati in template Nunjucks separati
- [ ] Nessuna logica di business inline in markup del template

---

## 8. Note di Implementazione

1. **Template Architecture**: Il componente deve seguire il pattern di template Nunjucks stabilito:
   - Template logic in `src/_components/`
   - Stile in `src/assets/css/`
   - Dati in `src/_data/`

2. **Design System Integration**: Usare le variabili CSS esistenti per mantenere la coerenza visiva:
   - `--primary`, `--secondary` per gradienti
   - `--border-radius-lg`, `--shadow-xl` per dimensioni card
   - `mb-6` margin bottom (classe existing)

3. **Responsive Design**: Il componente deve adattarsi automaticamente a mobile/desktop seguendo le convenzioni di grid esistenti (`.grid-12`, `.md-col-span-9`).

4. **Accessibility**: Assicurarsi che le immagini featured article abbiano:
   - Tag alt appropriati (usare proprietà `imageAlt` o `title` come fallback)
   - `loading="eager"` (come existing)
   - `fetchpriority="high"` per performance

5. **Performance**: Usare le direttive `loading` e `fetchpriority` corrette per evitare lazy loading sul articolo principale.

---

## 9. Passaggi di Verifica

Dopo ogni commit:
1. `npm run lint` passa su `src/_components/featured-article.njk`, `src/assets/css/featured-article.css`, e `src/index.njk`
2. `npm run build` completa con exit code 0
3. Home page visualizzata correttamente con componente featured article
4. Componente modularizzato (non inline) nell'index.njk

---

## 10. Considerazioni di Retrocompatibilità

- La modifica mantiene la stessa UI esistente e UX per l'utente
- Nessuna API o servizio esterno viene modificato
- Solo refactoring interno del template per migliore manutenibilità
- Le funzionalità esistenti (come tag badge, link, descrizione) sono preservate

---

## 11. Consegna attesa

- Componenti template e stile dedicati per featured article
- Dati globali isolati per featured article
- Markup index.njk pulito con componente riutilizzabile
- Design coerente con tema esistente
- Template Nunjucks completamente funzionale, stile CSS, e dati globali
- Commit con feat(feat): completato task 1 — component featured article

---

## 12. Cronologia Implementazione

**Versione 1.0 (Base)**
- Componenti template, stile, dati globali creati
- Index.njk aggiornato per usare il componente
- Tutti gli stili CSS del featured article verificati e coerenti
- Componenti Nunjucks funzionanti con dati globali
- Tutti gli asset verificati, tutti i test approvati
- Pronto per feature della fase 2 (controlli aggiuntivi, logiche condizionali)