# Task Atomici — SEO Advanced

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3
```

---

## Task 1: Aggiungere WebSite Schema in `base.njk` ✅
**File interessati:** `src/_layouts/base.njk`
**Durata stimata:** < 3 minuti

- [x] **Task 1.1:** Aggiungere WebSite JSON-LD schema nel `<head>` di base.njk (solo homepage `page.url == "/"`)
- [x] **Task 1.2:** Includere SearchAction per la search box

---

## Task 2: Aggiungere Article + BreadcrumbList Schema in `post.njk` ✅
**File interessati:** `src/_layouts/post.njk`
**Durata stimata:** < 3 minuti

- [x] **Task 2.1:** Aggiungere Article schema nel blocco `head_extra`
- [x] **Task 2.2:** Aggiungere BreadcrumbList schema usando il filter `breadcrumbs`
- [x] **Task 2.3:** Gestire i casi limine (senza image, senza updatedAt, label finale senza URL)

---

## Task 3: Validazione e Test ✅
**File interessati:** —
**Durata stimata:** < 2 minuti

- [x] **Task 3.1:** `npm run build` → exit 0
- [x] **Task 3.2:** Verificare WebSite schema nella homepage (JSON.parse valido ✅)
- [x] **Task 3.3:** Verificare Article schema nei post
- [x] **Task 3.4:** Verificare BreadcrumbList schema nei post
- [x] **Task 3.5:** `npm run lint` → exit 0
- [x] **Task 3.6:** `npm test` → exit 0 (6/6 pass)

---

## Stato dei Task

- [x] **Task 1: Aggiungere WebSite Schema in `base.njk`**
- [x] **Task 2: Aggiungere Article + BreadcrumbList Schema in `post.njk`**
- [x] **Task 3: Validazione e Test**
