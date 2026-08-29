# Piano Tecnico — Test Coverage

---

## 1. Componenti e Modelli

### Stack scelto: Vitest

- Veloce (eseguito in parallelo)
- Compatibile con la sintassi ESM già in uso nel progetto
- Configurazione minima
- Output leggibile con coverage report

### File di configurazione

```js
// vitest.config.js
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
```

### Directory test

```
src/
  lib/
    utils.test.js   ← un file di test per ogni modulo
```

---

## 2. Contratti API / Interfacce

Nessun nuovo contratto. I test verificano il comportamento delle funzioni esistenti.

---

## 3. Flusso dei Dati

```
npm test
    ↓
vitest carica src/**/*.test.js
    ↓
ogni test chiama la funzione con input noti e verifica l'output
    ↓
report PASS/FAIL con coverage
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `vitest.config.js` | CREATE | Configurazione Vitest con coverage abilitato |
| `package.json` | MODIFY | Aggiungere `test` script e `vitest` in `devDependencies` |
| `src/lib/utils.test.js` | CREATE | Test per le funzioni in `utils.js` |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| vitest | ^2.x | Test runner |
| @vitest/coverage-v8 | ^2.x | Coverage report |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Nessuna funzione testabile in utils.js | Media | Basso | Creare test per qualsiasi funzione, anche banale |
| CI lenta per via dei test | Bassa | Basso | Vitest è veloce e parallelizza i test |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
