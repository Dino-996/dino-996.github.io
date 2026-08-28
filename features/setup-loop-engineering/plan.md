# Piano Tecnico — Setup Loop Engineering (SDD)

---

## 1. Componenti e Modelli

Nessuna struttura dati applicativa: è tooling di sviluppo (hook Git, config
linter, script Node di scaffolding).

---

## 2. Contratti API / Interfacce

### Script (scripts/new-feature.mjs)

```
node scripts/new-feature.mjs <nome-kebab-case>
→ crea features/<nome>/{spec.md, plan.md, tasks.md} da .specify/templates/
```

---

## 3. Flusso dei Dati

```
git commit --cached
   ↓
.husky/pre-commit
   ├─ diff --cached: src/|lib/ modificati senza features/? → exit 1
   └─ altrimenti → npx eslint src/assets/js src/lib --max-warnings=0
        ├─ errori → exit 1
        └─ pulito → commit procede
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `.husky/pre-commit` | CREATE | Hook versionato: gate SDD + lint |
| `eslint.config.js` | CREATE | Config flat ESLint 9, split Node/browser |
| `scripts/new-feature.mjs` | CREATE | Scaffolding automatico feature da template |
| `package.json` | MODIFY | Aggiunge `prepare`, `lint`, `new-feature`; devDependencies `husky`, `eslint`, `globals` |
| `src/assets/js/main.js` | MODIFY | Fix 3 errori ESLint preesistenti (var, unused vars) |
| `.git/hooks/pre-commit` | DELETE (di fatto ignorato) | Sostituito da `core.hooksPath=.husky` |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| husky | ^9.x | Gestione hook versionati |
| eslint | ^9.x | Linting flat config |
| globals | ^15.x | Set di globals standard (node/browser) |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Hook troppo severo blocca commit legittimi urgenti (hotfix) | Media | Medio | Documentare `git commit --no-verify` come via di fuga esplicita e tracciata, non silenziosa |
| ESLint troppo permissivo (regole minime) nasconde bug reali | Bassa | Medio | Rivedere le regole dopo 2-3 feature reali, aggiungere `eslint-config-recommended` se serve più rigore |
| worker.js escluso dal lint resta scoperto | Media | Basso | Aggiungere blocco dedicato con `globals.serviceworker` in una feature successiva |

---

## 7. Approvazione

- [x] Piano rivisto e approvato
- [x] File Impact List validato
- [x] Non ci sono modifiche a `src/assets/js/worker.js` o `src/assets/js/ai-widget.js` (solo lint config, nessuna logica toccata)
