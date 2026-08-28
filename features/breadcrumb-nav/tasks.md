# Task Atomici — Breadcrumb Navigation

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4
```

---

## Task 1: Creare il partial Nunjucks del breadcrumb

**File interessati:** `src/_includes/breadcrumb.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 1.1:** Creare `src/_includes/breadcrumb.njk` con markup `<nav aria-label="Breadcrumb">` che accetta le variabili `crumbs` (array di `{label, url}`)

---

## Task 2: Aggiungere breadcrumb a post.njk

**File interessati:** `src/_layouts/post.njk`
**Durata stimata:** < 3 minuti

- [ ] **Task 2.1:** Generare l'array `crumbs` per un post (Home → Blog → [Tag] → Titolo) e includere `breadcrumb.njk` sopra il titolo del post

---

## Task 3: Aggiungere breadcrumb a page.njk

**File interessati:** `src/_layouts/page.njk`
**Durata stimata:** < 2 minuti

- [ ] **Task 3.1:** Generare l'array `crumbs` per una pagina (Home → Titolo) e includere `breadcrumb.njk` sopra `{{ content | safe }}`

---

## Task 4: Stilare il breadcrumb in custom.css

**File interessati:** `src/assets/css/custom.css`
**Durata stimata:** < 3 minuti

- [ ] **Task 4.1:** Aggiungere regole CSS per `.breadcrumb` (layout flex, gap, font-size, colors, separatori)
- [ ] **Task 4.2:** Aggiungere regole per `.breadcrumb a` (hover effect)
- [ ] **Task 4.3:** Stilare `aria-current="page"` (es. font-weight bold, colore diverso)

---

## Task 5: Validazione

**File interessati:** —
**Durata stimata:** < 1 minuto

- [ ] **Task 5.1:** `npm run lint` → exit 0
- [ ] **Task 5.2:** `npm run build` → exit 0

---

## Esecuzione

1. Spuntare la checkbox di ogni task completato
2. Dopo ogni task: lint → build → se passano si prosegue
3. Al termine: `git add . && git commit -m "feat(ux): aggiungi breadcrumb navigation a post e pagine"`

---

## Gestione Errori

Se un task fallisce dopo 2 tentativi:
```bash
git reset --hard HEAD~1
```
