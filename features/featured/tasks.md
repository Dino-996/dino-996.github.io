# Task Atomici — Featured Article

> Ogni task riguarda **un solo componente/file**. Durata stimata: < 3 minuti.

---

## Dipendenze tra Task

```
Task 1 → Task 2 → Task 3 → Task 4 → Task 5
```

---

## Task 1: Creare Componente Template Nunjucks

**File interessati:** `src/_components/featured-article.njk`
**Durata stimata:** < 2 minuti

- [ ] **Task 1.1:** Creare il componente template Nunjucks seguendo il pattern esistente in `src/_components/`
- [ ] **Task 1.2:** Implementare il markup usando i dati globali `featuredArticle`
- [ ] **Task 1.3:** Assicurarsi che il componente rispetti i tag di accessibilità HTML5 semantici
- [ ] **Task 1.4:** Verificare che il componente funzioni senza dati (falla graciosamente)

---

## Task 2: Aggiungere File CSS Dedicato

**File interessati:** `src/assets/css/featured-article.css`
**Durata stimata:** < 2 minuti

- [ ] **Task 2.1:** Creare il file CSS con i design specifici del featured article
- [ ] **Task 2.2:** Usare le variabili CSS esistenti (`--primary`, `--secondary`, `--border-radius-lg`, `--shadow-xl`)
- [ ] **Task 2.3:** Seguire le convenzioni di naming CSS esistenti (kebab-case)
- [ ] **Task 2.4:** Assicurarsi che il componente sia responsivo per mobile/desktop

---

## Task 3: Creare Dati Globali

**File interessati:** `src/_data/featured-article.js`
**Durata stimata:** < 1 minuto

- [ ] **Task 3.1:** Creare il file dati globali con struttura dati completa
- [ ] **Task 3.2:** Esporre i dati tramite `eleventyConfig.addGlobalData('featuredArticle', ...)`
- [ ] **Task 3.3:** Validare che i dati siano accessibili nei template Nunjucks
- [ ] **Task 3.4:** Verificare che il componente fallisca graciosamente senza dati

---

## Task 4: Aggiungere Logica di Supporto

**File interessati:** `src/lib/featured-article.js`
**Durata stimata:** < 2 minuti

- [ ] **Task 4.1:** Creare funzione helper per recuperare i dati featured article
- [ ] **Task 4.2:** Implementare supporto per recupero futuro da CMS
- [ ] **Task 4.3:** Esporre la funzione per l'uso nell'index.njk
- [ ] **Task 4.4:** Testare la funzione con vari dati di input

---

## Task 5: Aggiornare Index.njk

**File interessati:** `src/index.njk`
**Durata stimata:** < 2 minuti

- [ ] **Task 5.1:** Sostituire il markup inline dell'articolo principale con l'uso del componente
- [ ] **Task 5.2:** Collegare il componente ai dati globali `featuredArticle`
- [ ] **Task 5.3:** Assicurarsi che il markup resti semanticamente corretto
- [ ] **Task 5.4:** Verificare che il componente segua il grid layout esistente (`.grid-12`, `.md-col-span-9`)

---

## Esecuzione

Per ogni task completato:
1. Spuntare la checkbox
2. Eseguire: `npm run build` → verificare exit code 0
3. `npm run lint` → verificare nessun errore su `src/_components/featured-article.njk`, `src/assets/css/featured-article.css`, e `src/index.njk`
4. Commit: `git add . && git commit -m "feat(feat): completato task 1 — component featured article"

---

## Gestione Errori

Se un task fallisce dopo 2 tentativi:
```bash
git reset --hard HEAD~1
# Ripulire chat e ridefinire il task
```

---

## Stato dei Task

- [ ] **Task 1: Creare Componente Template Nunjucks**
- [ ] **Task 2: Aggiungere File CSS Dedicato**
- [ ] **Task 3: Creare Dati Globali**
- [ ] **Task 4: Aggiungere Logica di Supporto**
- [ ] **Task 5: Aggiornare Index.njk**

---

## Verifica Completamento

Per confermare che la feature featured article è completamente implementata:
- [ ] Tutti i task a livello di componente completati (5/5)
- [ ] Componente template Nunjucks funzionale in `src/_components/featured-article.njk`
- [ ] File CSS dedicato creato in `src/assets/css/featured-article.css`
- [ ] File dati globali configurato in `src/_data/featured-article.js`
- [ ] Funzione di supporto implementata in `src/lib/featured-article.js`
- [ ] Index.njk aggiornato per usare il componente
- [ ] Build `npm run build` completa
- [ ] ESLint `npm run lint` passa su tutti i file modificati
- [ ] UI home page mostra il componente featured article come previsto