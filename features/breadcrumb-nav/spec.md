# Specifica — Breadcrumb Navigation

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog non offre alcun elemento di navigazione strutturale visibile all'utente durante la lettura di un articolo o una pagina interna. L'utente non ha modo di capire dove si trova nella gerarchia del sito e non può tornare rapidamente a livelli superiori senza usare il tasto "indietro" del browser.

**Risultato atteso:**
Una barra di breadcrumb posizionata sopra il titolo di ogni post e pagina, che mostra il percorso gerarchico e consente di navigare con un click a qualsiasi livello superiore.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Utente apre un post | Vede: Home → Post → Titolo articolo |
| 2 | Utente apre una pagina statica (es. /about) | Vede: Home → Titolo pagina |
| 3 | Utente clicca su un link del breadcrumb | Naviga alla pagina corrispondente |
| 4 | Utente è sulla homepage | Non viene mostrato nessun breadcrumb (non ha senso) |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Post senza tag | Il breadcrumb mostra solo Home → Post → Titolo (nessun tag intermedio) |
| Post con tag multipli | Il breadcrumb mostra Home → Post → Nome del primo tag → Titolo |
| Homepage | Breadcrumb non renderizzato |
| Pagine a livello root (`/about`, `/courses`) | Breadcrumb mostra solo Home → Titolo pagina |
| Caratteri speciali nel titolo del post | Il titolo viene usato così com'è nel breadcrumb (già gestito da Eleventy/Nunjucks) |

---

## 4. Criteri di Accettazione

- [ ] Il breadcrumb appare sopra il titolo in ogni post
- [ ] Il breadcrumb appare sopra il contenuto in ogni pagina statica
- [ ] Il link "Home" punta sempre a `/`
- [ ] Non viene mostrato nessun breadcrumb sulla homepage
- [ ] Ilbreadcrumb è accessibile (tag `<nav aria-label="Breadcrumb">` + `<ol>`)
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] `post.njk` come punto di iniezione del breadcrumb (sopra il titolo del post)
- [ ] `page.njk` come punto di iniezione del breadcrumb (sopra il contenuto)
- [ ] `site.url` in `site.json` per il link Home

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. Il breadcrumb viene aggiunto sopra il contenuto esistente, non lo sostituisce. Se il blog ha post senza tag, il comportamento è quello del caso limite "Post senza tag".
