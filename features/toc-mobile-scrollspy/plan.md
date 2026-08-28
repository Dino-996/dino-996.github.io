# Piano Tecnico — ToC Mobile Scroll-Spy

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. L'unica modifica è una chiamata di funzione.

---

## 2. Contratti API / Interfacce

Nessuna modifica a contratti esistenti. Le funzioni `buildToc()`, `setupTocClick()`, `setupScrollSpy()` restano invariate nella loro firma.

---

## 3. Flusso dei Dati

```
buildToc(tocMobileList, headings) → array di link
       ↓
setupScrollSpy(tocMobileList, headings, links) → void
       ↓
IntersectionObserver → aggiunge/rimuove .active sui link
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/assets/js/main.js` | MODIFY | Aggiungere `setupScrollSpy()` alla ToC mobile (riga ~319) |

---

## 5. Dipendenze Esterne

Nessuna.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Nessuno identificato | — | — | La funzione esiste già e funziona sulla ToC desktop |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
- [ ] La modifica è limitata a `main.js`, un solo punto
