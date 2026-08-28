# Specifica — Setup Loop Engineering (SDD)

---

## 1. Contesto e Obiettivo

**Problema di business:**
`.specify/constitution.md` definisce un workflow SDD (spec → plan → tasks →
esecuzione → validazione → commit) mai adottato in pratica: `features/`
conteneva solo un README, nessun commit ha mai toccato quella cartella, e le
soglie qualitative dichiarate (lint, coverage) non erano nemmeno verificabili
perché mancava la configurazione ESLint.

**Risultato atteso:**
Il loop SDD diventa eseguibile e verificabile: un hook di pre-commit
versionato impedisce modifiche a `src/`/`lib/` senza traccia in `features/`,
il linting è configurato e passa, ed esiste un modo rapido per avviare una
nuova feature senza copiare i template a mano.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Sviluppatore lancia `npm run new-feature <nome>` | Viene creata `features/<nome>/` con `spec.md`, `plan.md`, `tasks.md` da template |
| 2 | Sviluppatore fa `git commit` toccando solo `src/`/`lib/` | Il commit viene rifiutato con messaggio esplicativo |
| 3 | Sviluppatore fa `git commit` toccando `src/`/`lib/` + `features/` | Il commit procede a `npx eslint` |
| 4 | `npx eslint` non trova errori | Il commit va a buon fine |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Nome feature non in kebab-case | Script `new-feature` rifiuta con errore |
| Cartella feature già esistente | Script `new-feature` rifiuta senza sovrascrivere |
| Errori ESLint preesistenti nel codice | Commit bloccato finché non risolti (nessuna eccezione "codice legacy") |
| `npm install` non ancora eseguito (mancano `.husky`/hook) | `npm run prepare` (via `postinstall` di npm, automatico) reinstalla l'hook |

---

## 4. Criteri di Accettazione

- [x] Un commit che tocca `src/lib/` senza `features/` viene rifiutato dall'hook
- [x] Un commit che tocca `src/lib/` + `features/` con codice pulito viene accettato
- [x] `npm run lint` termina senza errori sul codice esistente (dopo fix dei 3 errori legacy in `main.js`)
- [x] L'hook è versionato in `.husky/` e quindi arriva con `git clone` + `npm install`
- [x] `npm run new-feature <nome>` genera la struttura corretta da `.specify/templates/`

---

## 5. Dipendenze

- [x] `husky` e `eslint` in `devDependencies`
- [x] `.specify/templates/{spec,plan,tasks}_template.md` esistenti

---

## 6. Retrocompatibilità

Il vecchio hook non versionato in `.git/hooks/pre-commit` viene sostituito
dal meccanismo Husky (`core.hooksPath` punta a `.husky/`). Non c'è impatto
sul comportamento di build/deploy: `npm run build` non cambia.
