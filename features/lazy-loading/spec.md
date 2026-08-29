# Specifica — Lazy Loading Immagini

---

## 1. Contesto e Obiettivo

**Problema di business:**
Le immagini del blog vengono caricate tutte immediatamente al caricamento della pagina, incluse quelle fuori dal viewport. Questo aumenta il tempo di caricamento iniziale, consuma banda dell'utente e peggiora il Largest Contentful Paint (LCP), un parametro critico per Core Web Vitals e SEO.

**Risultato atteso:**
Tutte le immagini del blog utilizzano il lazy loading nativo del browser (`loading="lazy"`), con un placeholder leggero visibile durante il caricamento e un fade-in fluido all'apparizione.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Utente apre un articolo con molte immagini | Le immagini fuori dal viewport iniziale non vengono scaricate |
| 2 | Utente scrolla verso il basso | Le immagini vengono caricate on-demand quando entrano nel viewport |
| 3 | Utente ha una connessione lenta | Vede un placeholder grigio/spazio riservato prima del caricamento |
| 4 | Immagini above-the-fold (hero, avatar) | NON sono lazy-loaded — mantengono `loading="eager"` per LCP |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Browser non supporta `loading="lazy"` | L'immagine viene caricata normalmente (comportamento default del browser) |
| Immagine con `loading="eager"` esplicito nei template | L'attributo viene rispettato, non viene sovrascritto |
| Immagini in `og:image` o Open Graph | Sempre caricate subito, mai lazy-loaded (priorità di condivisione social) |
| JavaScript disabilitato | Le immagini caricano normalmente (lazy è HTML nativo) |

---

## 4. Criteri di Accettazione

- [ ] Tutte le immagini nei post hanno `loading="lazy"` esplicito
- [ ] Le immagini above-the-fold (hero, avatar, og:image) NON hanno `loading="lazy"`
- [ ] Un placeholder visivo (background-color o skeleton) è visibile durante il caricamento
- [ ] Il fade-in all'apparizione è Smooth (CSS transition)
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] Template Nunjucks che generano immagini (`post.njk`, `article-card.njk`, `head.njk` per OG)
- [ ] CSS per il placeholder e la transizione (in `custom.css`)

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. Il lazy loading è un miglioramento progressivo: i browser che non lo supportano caricano comunque le immagini normalmente.
