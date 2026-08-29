# Specifica — SEO Advanced

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog ha le basi SEO (meta description, Open Graph, canonical URL) ma manca lo structured data schema.org per gli articoli, che migliora la visibilità nei risultati di ricerca con snippet arricchiti (ricette, star rating, breadcrumb nei SERP). Inoltre alcune pagine hanno title e meta description generici che non maximizzano il CTR.

**Risultato atteso:**
Ogni post include un tag `<script type="application/ld+json">` con schema `Article`, la homepage include schema `WebSite` con ricerca站内, e i title tag sono ottimizzati per ogni pagina.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Googlebot indicizza un post | Lo structured data Article è presente e validato |
| 2 | Utente condivide un post su social | L'Open Graph mostra thumbnail, titolo e descrizione corretti |
| 3 | Utente cerca qualcosa nel blog (motori con barra di ricerca) | Lo schema WebSite abilita la ricerca站内 |
| 4 | Il title tag di ogni pagina è unico e descrittivo | Ogni pagina ha `<title>Pagina · BlogName</title>` |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Post senza autore specificato | L'autore è il default da `site.json` |
| Post senza data modificata (solo data pubblicazione) | `dateModified` = `datePublished` |
| Post senza immagine | Lo schema Article usa l'immagine di default OG |
| La pagina è una pagina statica (non un post) | Nessuno schema Article, ma canonical e title restano corretti |

---

## 4. Criteri di Accettazione

- [ ] Ogni post ha un tag `<script type="application/ld+json">` con schema `Article` valido
- [ ] Lo schema include: `@type: Article`, `headline`, `author`, `datePublished`, `dateModified`, `image`
- [ ] La homepage ha schema `WebSite` con `potentialAction` SearchAction
- [ ] Tutte le pagine hanno title univoco (non generico)
- [ ] Il canonical URL è sempre presente su ogni pagina
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] `head.njk` come punto di iniezione degli structured data
- [ ] `post.njk` per iniettare lo schema Article per ogni post
- [ ] `site.json` per author e url di default

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. Gli structured data sono silenziosi: non alterano il rendering visivo. Se lo schema è malformato, i motori lo ignorano senza danni.
