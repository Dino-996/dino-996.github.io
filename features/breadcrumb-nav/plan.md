# Piano Tecnico — Breadcrumb Navigation

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. Il breadcrumb è markup inline generato nei layout.

### Schema HTML generato

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog/">Post</a></li>
    <!-- per post con tag: -->
    <li><a href="/tags/nome-tag/">Nome Tag</a></li>
    <li aria-current="page">Titolo Articolo</li>
  </ol>
</nav>
```

---

## 2. Contratti API / Interfacce

Nessuna nuova funzione in `src/lib/`. Il markup breadcrumb viene generato direttamente nei template Nunjucks dei layout, usando le variabili disponibili:
- `page.url` — URL della pagina corrente
- `title` — titolo della pagina/post
- `tags` — array di tag del post (se presenti, primo elemento = tag principale)
- `site.url` — URL base del sito

---

## 3. Flusso dei Dati

```
page.url + title + tags (variabili Eleventy/Nunjucks)
    ↓
Template Nunjucks genera markup <nav> breadcrumb
    ↓
Browser renderizza breadcrumb sopra il contenuto
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_layouts/post.njk` | MODIFY | Aggiunge markup breadcrumb sopra il titolo del post |
| `src/_layouts/page.njk` | MODIFY | Aggiunge markup breadcrumb sopra il contenuto |
| `src/assets/css/custom.css` | MODIFY | Aggiunge stile `.breadcrumb`, `.breadcrumb ol`, `.breadcrumb li`, `.breadcrumb a` |

---

## 5. Dipendenze Esterne

Nessuna nuova dipendenza.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Breadcrumb duplicato su homepage | Bassa | Basso | Controllo `{% if page.url != "/" %}` nei layout |
| CSS breadcrumb in conflitto con stili esistenti | Molto bassa | Basso | Usare classi specifiche con prefisso `.breadcrumb-` dove serve, non sovrascrivere selectors generici |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
- [ ] Non ci sono modifiche a `src/assets/js/worker.js` o `src/assets/js/ai-widget.js`
