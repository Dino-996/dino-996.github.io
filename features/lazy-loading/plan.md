# Piano Tecnico — Lazy Loading Immagini

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. L'intervento è sui template Nunjucks che generano tag `<img>`.

### Classificazione immagini

| Tipo | Attributo | Esempi |
|---|---|---|
| Above-the-fold | `loading="eager"` | Hero image, avatar autore, og:image |
| Nel viewport iniziale | `loading="eager"` | Immagini nei primi 600px |
| Fuori dal viewport | `loading="lazy"` | Tutte le altre immagini post |

### Placeholder CSS

```css
img[loading="lazy"] {
  background: var(--skeleton-bg, #f0f0f0);
  transition: opacity 0.3s ease;
}
img[loading="lazy"]:not([src]) { opacity: 0; }
img[loading="lazy"][src] { opacity: 1; }
```

---

## 2. Contratti API / Interfacce

Nessun contratto. I template Nunjucks che generano `<img>` vengono arricchiti con `loading="lazy"` o `loading="eager"` a seconda della posizione.

---

## 3. Flusso dei Dati

```
Build Eleventy
    ↓
Template post.njk / article-card.njk genera <img>
    ↓
Se l'immagine è "above the fold" o esplicita eager → loading="eager"
Altrimenti → loading="lazy" + classe skeleton placeholder
    ↓
CSS gestisce il fade-in con transition
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_layouts/post.njk` | MODIFY | Aggiungere `loading="lazy"` alle immagini dei post (eccetto hero) |
| `src/_includes/article-card.njk` | MODIFY | Immagini nelle card con loading="lazy" |
| `src/_includes/head.njk` | MODIFY | OG image con loading="eager" |
| `src/assets/css/custom.css` | MODIFY | Stili skeleton e fade-in per lazy images |

---

## 5. Dipendenze Esterne

Nessuna. Solo CSS nativo e attributo HTML `loading`.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Immagini decorative con lazy loading ritardano il layout | Bassa | Basso | Le immagini lazy hanno sempre dimensioni width/height esplicite (aspect-ratio CSS) |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
