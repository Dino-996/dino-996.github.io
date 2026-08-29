# Plan — Theme Toggle

---

## 1. Approccio Architetturale

**Obiettivo:** Bottone toggle nel navbar per alternare manualmente tra tema chiaro e scuro, con persistenza in localStorage.

---

## 2. File da Modificare

| File | Modifica |
|------|----------|
| `src/_includes/navbar.njk` | Aggiungere bottone toggle con SVG sun/moon icons |
| `src/assets/css/custom.css` | Stili per `.theme-toggle-btn` + completare CSS variables dark |
| `src/assets/js/main.js` | Funzione `initThemeToggle()` con logica completa |

---

## 3. Logica JS

1. `getPreferredTheme()`: legge `localStorage.theme` → fallback `prefers-color-scheme`
2. `applyTheme(theme)`: setta `data-bs-theme` su `<html>`, salva in localStorage, gestisce icon visibility, sincronizza Giscus
3. Click listener sul bottone: alterna light ↔ dark
4. Init: applica tema preferito all'avvio

---

## 4. Casi Limite

| Caso | Comportamento |
|------|---------------|
| localStorage non disponibile | Fallback `prefers-color-scheme` |
| JS disabilitato | CSS media query gestisce il tema (comportamento invariato) |
| Nessuna preferenza OS | Default light |

---

## 5. Verifica

- [x] `npm run build` → exit 0
- [x] Bottone toggle visibile nel navbar (header-right)
- [x] Sun/Moon icons presenti
- [x] `npm run lint` → exit 0
- [x] `npm test` → exit 0
