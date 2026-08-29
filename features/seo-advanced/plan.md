# Plan — SEO Advanced

---

## 1. Approccio Architetturale

**Obiettivo:** Aggiungere JSON-LD structured data per migliorare SEO e visibilità Google.

**Tre schemi richiesti:**
1. **WebSite** → homepage (`base.njk`)
2. **Article** → ogni post (`post.njk`, blocco `head_extra`)
3. **BreadcrumbList** → ogni post (`post.njk`, blocco `head_extra`)

---

## 2. File da Modificare

| File | Modifica |
|------|----------|
| `src/_layouts/base.njk` | Aggiungere WebSite schema con SearchAction (solo su homepage) |
| `src/_layouts/post.njk` | Aggiungere Article schema + BreadcrumbList schema nel blocco `head_extra` |

---

## 3. Logica

### WebSite Schema (homepage)
- Condizione: `page.url == "/"`
- Posizione: dopo `{% include "head.njk" %}` e `{% block head_extra %}{% endblock %}`

### Article Schema (post)
- Uso del blocco `head_extra` esistente
- Campi: headline, url, datePublished, dateModified, author, image, publisher

### BreadcrumbList Schema (post)
- Uso del filter `breadcrumbs` già esistente
- Mappa ogni crumb in ListItem con position, name, item

---

## 4. Casi Limite

| Caso | Comportamento |
|------|---------------|
| Post senza immagine | Campo `image` omesso dal JSON-LD |
| Post senza updatedAt | Campo `dateModified` omesso |
| Breadcrumb senza URL (label finale) | Campo `item` omesso |

---

## 5. Verifica

- [x] `npm run build` → exit 0
- [x] Homepage contiene WebSite schema valido
- [x] Post contiene Article schema
- [x] Post contiene BreadcrumbList schema
- [x] `npm run lint` → exit 0
- [x] `npm test` → exit 0
