# Piano Tecnico — Related Posts

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. L'algoritmo di correlazione opera su array di post già disponibili in Eleventy.

### Algoritmo di scoring

Per ogni post `P` nel blog:
1. `score = count(tags_in_common(P, current_post))`
2. `score += 1` se il post è pubblicato entro 6 mesi dal post corrente
3. Ordinare per score decrescente, poi per data decrescente

### Output

Array di massimo 3 post correlati, già preparato nel frontmatter o come global data.

---

## 2. Contratti API / Interfacce

Nessun contratto API. Filtaggio in fase di build Eleventy.

---

## 3. Flusso dei Dati

```
Build Eleventy
    ↓
posts.js espone tutti i post con tags e date
    ↓
Per ogni post, calcola i 3 correlati ( algoritmo di scoring )
    ↓
Il risultato è disponibile come proprietà del post nel template
    ↓
post.njk → sezione "Potrebbe interessarti" → partial article-card.njk
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_data/posts.js` | MODIFY | Aggiungere funzione `getRelatedPosts(post, limit)` e popolare `related` nel frontmatter |
| `src/_layouts/post.njk` | MODIFY | Aggiungere sezione相关性 in fondo al post |
| `src/_includes/article-card.njk` | CREATE | Partial card per un singolo post correlato |

---

## 5. Dipendenze Esterne

Nessuna. Solo Eleventy e Nunjucks.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Build-time lento con molti post | Bassa | Medio | Caching dei post correlati; calcolo on-demand nel loop |
| Ciclo di dipendenze (post A ← post B ← post A) | Impossibile | — | L'algoritmo è unidirezionale |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
