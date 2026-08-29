# Piano Tecnico — Worker.js Lint

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. L'intervento è solo sulla configurazione ESLint.

---

## 2. Contratti API / Interfacce

Nessuna modifica a contratti. Lo script `npm run lint` continua a chiamare `eslint src/assets/js src/lib`.

---

## 3. Flusso dei Dati

```
npm run lint
    ↓
eslint.config.js — aggiungere un 4° contesto per worker.js
    ↓
ESLint valida worker.js con globals Cloudflare Workers
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `eslint.config.js` | MODIFY | Aggiungere contesto `worker` per `src/assets/js/worker.js` con `globals.serviceworker` + `globals.env` |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| globals | ^15.x | `globals.serviceworker` già presente, `globals.env` per `env` |
| ESLint flat config | ^9.x | Struttura già in uso |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Errore di configurazione che rompe il lint per tutti i file | Bassa | Alto | Testare su worker.js in isolation prima del merge |
| Falsi positivi su `env` (non è un global standard) | Media | Basso | Definire `env` come commento `/* global env */` o nel globals config |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
