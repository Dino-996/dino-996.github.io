# Task Atomici — Theme Toggle

---

## Task 1: Aggiungere toggle button in `navbar.njk` ✅

**File interessati:** `src/_includes/navbar.njk`
**Durata stimata:** < 3 minuti

- [x] **Task 1.1:** Aggiungere bottone toggle con sun/moon SVG icons nel `header-right`
- [x] **Task 1.2:** Aggiungere `id="theme-toggle"`, `aria-label="Cambia tema"`
- [x] **Task 1.3:** Sun icon visibile in light mode, Moon icon in dark mode

---

## Task 2: Aggiungere stili CSS per il bottone ✅

**File interessati:** `src/assets/css/custom.css`
**Durata stimata:** < 3 minuti

- [x] **Task 2.1:** Aggiungere stile `.theme-toggle-btn` con border, padding, hover
- [x] **Task 2.2:** Aggiungere `:focus-visible` per accessibilità keyboard
- [x] **Task 2.3:** Completare le CSS variables mancanti nel blocco `[data-bs-theme="dark"]`
- [x] **Task 2.4:** Rimuovere le variabili orfane fuori dal selettore dark

---

## Task 3: Aggiungere logica `initThemeToggle()` in `main.js` ✅

**File interessati:** `src/assets/js/main.js`
**Durata stimata:** < 5 minuti

- [x] **Task 3.1:** Creare funzione `initThemeToggle()` con:
  - Lettura `localStorage.theme` → fallback `prefers-color-scheme`
  - `applyTheme(theme)` che setta `data-bs-theme` su `<html>`
  - Toggle click listener che alterna light/dark
  - Sincronizzazione Giscus theme
  - Icon visibility management (sun/moon)
- [x] **Task 3.2:** Chiamare `initThemeToggle()` alla fine dell'IIFE

---

## Task 4: Validazione ✅

**File interessati:** —
**Durata stimata:** < 2 minuti

- [x] **Task 4.1:** `npm run build` → exit 0
- [x] **Task 4.2:** Verificare `theme-toggle` button nel build HTML (2 occorrenze ✅)
- [x] **Task 4.3:** Verificare `theme-icon-sun` e `theme-icon-moon` nel build
- [x] **Task 4.4:** Verificare `data-bs-theme` attribute setato
- [x] **Task 4.5:** `npm run lint` → exit 0
- [x] **Task 4.6:** `npm test` → exit 0 (6/6 pass)

---

## Task 5: Documentazione ✅

**File interessati:** `features/theme-toggle/`
**Durata stimata:** < 1 minuto

- [x] **Task 5.1:** Aggiornare `spec.md` con stato completato
- [x] **Task 5.2:** Creare `plan.md`
- [x] **Task 5.3:** Creare `tasks.md`

---

## Task 6: Commit ✅

- [x] **Task 6.1:** `git add` dei file modificati
- [x] **Task 6.2:** Commit con messaggio in inglese
