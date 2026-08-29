# Specifica — Sitemap per Categorie

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog ha una sitemap.xml valida per tutti i post, ma non esiste una sitemap separata per le pagine tag/categorie. I motori di ricerca potrebbero non indicizzare efficiently tutte le pagine archivio (`/tags/[tag]/`), che rappresentano pagine di valore per la navigazione e la SEO.

**Risultato atteso:**
Una sitemap `/sitemap-tags.xml` che elenca tutti gli URL dei tag utilizzati nel blog, con priorità e change frequency appropriati, linkata nella sitemap principale.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Motore di ricerca visita `sitemap.xml` | Trova un `<sitemap>` link a `/sitemap-tags.xml` |
| 2 | Motore di ricerca visita `/sitemap-tags.xml` | Trova tutti gli URL dei tag (`/tags/[tag]/`) |
| 3 | Un tag non ha post associati | Non appare nella sitemap (nessun URL vuoto) |
| 4 | Nuovo post con nuovo tag viene pubblicato | Il tag appare nella sitemap al prossimo build |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Un tag è stato rimosso da tutti i post | Non appare nella sitemap (viene ricalcolato ad ogni build) |
| Il file sitemap.xml originale è stato modificato manualmente | La modifica viene sovrascritta dal build Eleventy |
| Il blog non ha ancora post con tag | La sitemap tags non viene generata o è vuota |

---

## 4. Criteri di Accettazione

- [ ] `/sitemap-tags.xml` viene generato da Eleventy al build
- [ ] La sitemap contiene tutti gli URL unici dei tag presenti nei post
- [ ] La `sitemap.xml` principale include un link a `/sitemap-tags.xml`
- [ ] La priority dei tag è calcolata in base al numero di post (tag con più post = priority maggiore)
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] `sitemap.njk` esistente in `src/` come template per la sitemap
- [ ] `posts.js` per accedere a tutti i tag unici dei post
- [ ] `eleventy.config.js` per registrare il template della sitemap come file statico

---

## 6. Retrocompatibilità

La sitemap.xml esistente viene estesa, non sostituita. I post continuano a essere elencati nella sitemap.xml principale.
