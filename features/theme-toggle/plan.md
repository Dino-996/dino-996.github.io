# Piano Tecnico — Theme Toggle

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. L'intervento è su HTML (toggle), CSS (tema switch) e JS (persistenza).

### Schema HTML del toggle

```html
<button
  id="theme-toggle"
  aria-label="Attiva tema scuro"
  title="Cambia tema">
  <!-- icona sole o luna, commutata via JS -->
</button>
```

### Schema CSS

```css
:root { --bg: #ffffff; --text: #1a1a1a; }
[data-theme="dark"] { --bg: #1a1a1a; --text: #ffffff; }
```

---

## 2. Contratti API / Interfacce

Nessun contratto API. L'interfaccia è un bottone nel DOM che:
- Al click commuta `data-theme` su `<html>`
- Salva/legge da `localStorage` la chiave `theme`

---

## 3. Flusso dei Dati

```
Prima visita (nessun localStorage)
    ↓
JS legge prefers-color-scheme → imposta data-theme sull'html
    ↓
Utente clicca toggle
    ↓
JS toggla data-theme (dark↔light) + salva in localStorage
    ↓
CSS applica le variabili in base a data-theme
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_includes/navbar.njk` | MODIFY | Aggiungere il bottone toggle nel navbar |
| `src/assets/js/main.js` | MODIFY | Aggiungere logica toggle + localStorage + prefers-color-scheme init |
| `src/assets/css/custom.css` | MODIFY | Aggiungere stili per il bottone toggle e animazione |

---

## 5. Dipendenze Esterne

Nessuna. Solo CSS e JS vanilla.

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| FOUC (flash of unstyled content) al primo caricamento | Media | Basso | Inline `<script>` nel `<head>` che setta il tema prima del render |
| localStorage non disponibile | Bassa | Basso | Fallback a prefers-color-scheme |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
