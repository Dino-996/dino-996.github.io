# Specifica — ToC Mobile Scroll-Spy

---

## 1. Contesto e Obiettivo

**Problema di business:**
La ToC desktop chiama `setupScrollSpy()` per evidenziare la sezione corrente durante lo scroll. La ToC mobile esegue `buildToc()` e `setupTocClick()` ma ignora il valore di ritorno di `buildToc()` (l'array dei link) e non chiama mai `setupScrollSpy()`. L'utente su mobile non ha quindi feedback visivo sulla sezione in lettura.

**Risultato atteso:**
La ToC mobile evidenzia la sezione corrente durante lo scroll, con lo stesso comportamento della ToC desktop.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Utente scrolla l'articolo su mobile | La ToC mobile evidenzia il link corrispondente alla sezione visibile |
| 2 | Utente clicca un link della ToC mobile | Scroll fluido alla sezione + highlight del link attivo |
| 3 | Utente raggiunge la fine dell'articolo | L'ultimo heading della ToC risulta attivo |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Nessun heading con id nell'articolo | Nessuna voce in entrambe le ToC (comportamento invariato) |
| Un solo heading nell'articolo | La classe `active` viene applicata correttamente |
| L'utente scrolla molto velocemente | `IntersectionObserver` gestisce la frequenza, nessun lag |
| La ToC mobile è chiusa (display:none) | `setupScrollSpy` funziona comunque — lo stato `active` si applica e appare quando la ToC viene aperta |

---

## 4. Criteri di Accettazione

- [ ] La ToC mobile mostra la classe `active` sul link corrispondente all'heading visibile
- [ ] Il comportamento è identico alla ToC desktop per lo stesso articolo
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [x] `main.js` contiene già `buildToc()`, `setupTocClick()`, `setupScrollSpy()`
- [x] La struttura HTML `#toc-list-mobile` esiste in `post.njk`

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. Si aggiunge solo la chiamata mancante a `setupScrollSpy()` nel ramo mobile.
