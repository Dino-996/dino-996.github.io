# Plan — Related Posts

---

## 1. Approccio Architetturale

**Dove:** `src/_layouts/post.njk` — dopo la sezione Prev/Next, prima dei Commenti.
**Come:** Filtro `relatedPosts` in `eleventy.config.js` che prende i post attuali, gli ID dei tag, e restituisce i 2-3 post più correlati.
**Fallback:** Se non ci sono post correlati per tag, mostra i post più recenti (max 3).

---

## 2. File da Modificare

| File | Modifica |
|------|----------|
| `eleventy.config.js` | Aggiungere filter `relatedPosts(posts, currentUrl, tags, limit)` |
| `features/related-posts/tasks.md` | Aggiornare task come completati |

---

## 3. Logica del Filter

```
relatedPosts(posts, currentUrl, tags, limit=3):
  1. Filtra via i post con lo stesso URL del post corrente
  2. Per ogni post rimanente, conta quanti tag ha in comune con tags[]
  3. Ordina per: (a) tag in comune (desc), (b) data (desc)
  4. Restituisce i primi `limit` post
  5. Se < limit trovati, riempi con i post più recenti (escludendo già aggiunti)
```

---

## 4. Output del Filter

Array di oggetti con:
```js
{ url, title, date, strapiTags (primo tag), image, imageAlt }
```

---

## 5. Template Injection Point

In `post.njk`, dopo la sezione Prev/Next (linea 162 `{% endif %}`) e prima della sezione Commenti (linea 164):

```njk
{% set related = posts | relatedPosts(page.url, tags) %}
{% if related | length > 0 %}
<section class="related-posts">
  <h2>Potrebbe interessarti</h2>
  <div class="related-posts-grid">
    {% for rp in related %}
    <a href="{{ rp.url }}" class="related-post-card">
      {% if rp.image %}
      <img src="{{ rp.image }}" alt="{{ rp.imageAlt | default(rp.title) }}" loading="lazy">
      {% endif %}
      <div class="related-post-content">
        <span class="badge badge-category">{{ rp.strapiTags }}</span>
        <h3>{{ rp.title }}</h3>
        <time>{{ rp.date | dateHuman }}</time>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
{% endif %}
```

---

## 6. Stile CSS

Usare classi CSS esistenti (`.badge-category`, `.article-item-meta`) per coerenza.
Se servono stili aggiuntivi, aggiungerli in `custom.css` con prefisso `.related-posts`.

---

## 7. Casi Limite

| Caso | Comportamento |
|------|---------------|
| Post senza tag | Filter restituisce array vuoto → sezione non mostrata |
| Solo 1 post correlato | Mostra solo quello |
| Nessun post correlato E nessun altro post | Sezione non mostrata |
| URL post non trovato nei posts | Filter restituisce [] |

---

## 8. Verifica

- [ ] `npm run build` → exit 0
- [ ] Post con tag mostrano sezione "Potrebbe interessarti" con 2-3 card
- [ ] Post senza tag NON mostrano la sezione
- [ ] Click sulle card porta al post correlato
