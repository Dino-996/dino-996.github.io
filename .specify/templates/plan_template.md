# Piano Tecnico — [Nome Feature]

> **Da approvare PRIMA di scrivere codice.** Traduce `spec.md` in architettura concreta.

---

## 1. Componenti e Modelli

### Strutture Dati

```js
// [Nome struttura] — [breve descrizione]
{
  // proprietà: tipo, descrizione
}
```

### Schema Database / Persistenti

[Se la feature coinvolge Supabase o localStorage, documentare qui]

---

## 2. Contratti API / Interfacce

### Funzioni esportate (src/lib/)

```js
// export function nomeFunzione(parametri): tipoRestituito
// Descrizione: ...
```

### Dati globali (src/_data/)

```js
// Chiamare: eleventyConfig.addGlobalData('nomeVariabile', () => ...)
// Tipo: ...
// Accessibile nei template come: {{ nomeVariabile }}
```

---

## 3. Flusso dei Dati

```
[Input] → [Elaborazione] → [Output]
   ↑              ↓
   └──── [Persistenza/State] ←
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/` | CREATE / MODIFY / DELETE | [cosa cambia] |
| `src/_data/` | CREATE / MODIFY / DELETE | [cosa cambia] |
| `src/lib/` | CREATE / MODIFY / DELETE | [cosa cambia] |
| `tests/` | CREATE / MODIFY / DELETE | [cosa cambia] |
| `eleventy.config.js` | MODIFY | [se necessario] |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| [es. Eleventy 3.1] | ≥ 3.1.0 | Core framework |
| [es. dotenv] | ≥ 16.0 | Env vars |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| [Rischio 1] | Alta/Media/Bassa | Alto/Medio/Basso | [Strategia] |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
- [ ] Non ci sono modifiche a `src/assets/js/worker.js` o `src/assets/js/ai-widget.js` senza approvazione esplicita
