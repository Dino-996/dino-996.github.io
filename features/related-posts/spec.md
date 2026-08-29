# Specifica — Related Posts

---

## 1. Contesto e Obiettivo

**Problema di business:**
I post del blog hanno un buon sistema di tag e categorie, ma in fondo a ogni articolo non esiste alcun suggerimento di lettura correlata. L'utente che termina un articolo non ha un percorso naturale per continuare l'esplorazione, perdendo tempo sulla navigazione manuale.

**Risultato atteso:**
Alla fine di ogni post viene mostrata una sezione "Potrebbe interessarti" con 2-3 articoli correlati, selezionati in base ai tag in comune e alla vicinanza temporale.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Utente scrolla fino alla fine di un post | Vede la sezione "Potrebbe interessarti" con 2-3 post correlati |
| 2 | I post correlati condividono almeno un tag con il post corrente | L'ordinamento privilegia il maggior numero di tag in comune |
| 3 | A parità di tag, i post più recenti appaiono prima | Il criterio secondario è la data decrescente |
| 4 | Non ci sono post correlati (post unico, nessun tag) | La sezione non viene mostrata |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Il post corrente è l'unico con quei tag | La sezione mostra al massimo i post più recenti (fill con fallback) |
| Post senza tag | La sezione non viene mostrata |
| Solo un post correlato disponibile | Mostrarne solo uno, non mostrare placeholder |
| L'utente è sulla homepage o su una pagina statica | La sezione non viene mostrata |

---

## 4. Criteri di Accettazione

- [ ] La sezione "Potrebbe interessarti" appare in fondo a ogni post con almeno un post correlato
- [ ] La sezione mostra 2-3 articoli (o meno se non disponibili)
- [ ] Ogni card correlata mostra: titolo, data, e almeno un tag
- [ ] La sezione non appare se non ci sono post correlati
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] `posts.js` in `src/_data/` per accedere alla lista dei post e ai loro tag
- [ ] `post.njk` come punto di iniezione della sezione (alla fine del contenuto)
- [ ] Un partial `article-card.njk` esistente da riutilizzare per le card correlate

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. La sezione viene aggiunta in coda al post, dopo tutti i contenuti esistenti. Se non ci sono post correlati, non viene renderizzato nulla.
