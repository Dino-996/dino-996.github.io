# Specifica — Test Coverage

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog non ha test automatizzati. Qualsiasi regressione viene scoperta manualmente o dagli utenti. Con l'aggiunta di nuove feature (analytics, breadcrumb, related posts), il rischio di regressioni silenziose aumenta.

**Risultato atteso:**
Una test suite minimale che copre le funzioni critiche del blog (filter, sort, URL parsing, utils) e può essere eseguita con `npm test`. La copertura iniziale è bassa ma sufficiente a garantire che le utility fondamentali non siano rotte.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Sviluppatore lancia `npm test` | La suite viene eseguita e riporta PASS/FAIL |
| 2 | Un test fallisce | L'output indica quale test è fallito e perché |
| 3 | Tutti i test passano | Exit code 0, output verde |
| 4 | Nuovo codice rompe una funzione esistente | Il test corrispondente fallisce e blocca il merge |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Nessun test disponibile | Il test runner termina con exit code 0 (no-op) |
| Test asincrono che fallisce per timeout | Il test viene segnalato come failed con messaggio di timeout |
| Un file JS senza test | Nessun obbligo, i test sono per le funzioni critiche |

---

## 4. Criteri di Accettazione

- [ ] `npm test` esegue una test suite senza errori
- [ ] Almeno le funzioni in `src/lib/utils.js` hanno test coverage
- [ ] La configurazione del test runner è in `vitest.config.js` o equivalente
- [ ] I test sono eseguibili in CI (GitHub Actions)
- [ ] `npm run lint` termina senza errori

---

## 5. Dipendenze

- [ ] `vitest` o `node:test` (stdlib) come test runner
- [ ] La directory `src/lib/` contiene funzioni testabili

---

## 6. Retrocompatibilità

Nessun file esistente viene modificato. L'unico effetto collaterale è l'aggiunta di una dipendenza `devDependencies` per il test runner.
