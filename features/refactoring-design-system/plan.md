# Plan: Refactoring del design system e del responsive design

## Panoramica
Questa sezione descrive l'architettura e i passaggi di implementazione per migliorare il design system, il supporto responsive, il tema toggle, le sitemap per categorie, la qualità del codice del linter worker e il contrasto visivo.

## Problemi Tecnici

### 1. Tema Toggle e Design Token
- I design token correnti mancano di alcune variabili (`--border`, `--text`, `--border-subtle`) nel tema chiaro, causando uno stile incoerente per il tema toggle.
- Il tema toggle nella navbar è assente; è necessario aggiungere un pulsante e la relativa logica.

### 2. Ottimizzazione Responsive
- Le regole CSS per punti di interruzione per dispositivi mobili e tablet potrebbero avere margini/ispaziature non ottimizzati.
- Le card e i tipi di font potrebbero non essere ben regolati su schermi di piccole dimensioni.
- La sidebar è nascosta per viewport <1200px, ma alcuni margini potrebbero dover essere regolati.

### 3. Sitemap per Categorie
- Il file di sitemap principale (`src/sitemap.njk`) non include elementi per le collezioni di tag; manca il supporto per le sitemap per categorie.

### 4. Correzione Linter Worker
- `src/assets/js/worker.js` potrebbe contenere un riferimento non necessario a `ctx` (o uso di contesto) che viola le regole del linter.

### 5. Design Token per Contrasto Ad Alto Contrasto
- L'attuale schema di colori potrebbe non soddisfare i requisiti di contrasto ad alto contrasto; è necessario aggiungere un tema ad alto contrasto opzionale (stile slate) con variabili dedicate.

## Soluzioni Architetturali

### A) Tema Toggle
- Crea `src/assets/js/theme-toggle.js` con logica per il tema toggle.
- Aggiorna i design token: aggiungi variabili mancanti (`--border`, `--text`, `--border-subtle`) al root del tema chiaro; unifica le variabili per il tema scuro.
- Modifica `src/_includes/navbar.njk` per aggiungere un pulsante per il tema toggle.

### B) Ottimizzazione Responsive
- Regola i margini delle card, gli spaziature, i margini del header e le regolazioni dei tipi di font nei punti di interruzione CSS.
- Rivedi i media query in `src/assets/css/custom.css` per regolare gli stili per mobile, tablet e desktop.

### C) Sitemap per Categorie
- Aggiungi un loop `{% for tag in collections.tagList %}` al file `src/sitemap.njk` per includere un elemento per ogni tag.

### D) Correzione Linter Worker
- Rimuovi qualsiasi uso non necessario di `ctx` nel worker (`src/assets/js/worker.js`). Se `ctx` non è definito, rimuovilo.

### E) Design Token per Contrasto Ad Alto Contrasto
- Aggiungi un nuovo blocco di variabili `:root.high-contrast` con valori di contrasto elevato (sfondo scuro, testo chiaro, colori primari intensi) che possono essere attivati con una classe (`[data-high-contrast='true']`).

## Passaggi di Implementazione

1. **Variabili di Design Token** – Modifica `src/assets/css/custom.css`:
   - Aggiungi le variabili mancanti al root (`--border`, `--text`, `--border-subtle`, `--surface-raised`, `--surface-container-high`).
   - Aggiungi i valori del tema ad alto contrasto come root separato (potresti usare una media query o una classe).

2. **Logica Tema Toggle** – Crea `src/assets/js/theme-toggle.js`:
   - Ascolta i cambiamenti della preferenza del tema, salva lo stato nel localStorage.
   - Aggiorna l'attributo `data-bs-theme` sull'elemento html.

3. **Tema Toggle in Navbar** – Modifica `src/_includes/navbar.njk`:
   - Aggiungi un pulsante per il tema toggle (icona) che chiami la logica del tema toggle.

4. **Ottimizzazione CSS** – Regola le regole CSS in `src/assets/css/custom.css`:
   - Migliora i margini delle card, gli spaziature, regola gli stili delle card e i tipi di font.
   - Assicurati che la sidebar sia nascosta correttamente e che i margini siano coerenti.

5. **Sitemap per Categorie** – Modifica `src/sitemap.njk`:
   - Aggiungi un loop `{% for tag in collections.tagList %}` per includere ogni tag come URL della sitemap.

6. **Correzione Linter Worker** – Modifica `src/assets/js/worker.js`:
   - Rimuovi qualsiasi riferimento non necessario a `ctx` (se presente).

7. **Design Token per Contrasto Ad Alto Contrasto** – Aggiungi un blocco di design token per alto contrasto in `src/assets/css/custom.css`:
   - Aggiungi un blocco `:root.high-contrast` con i propri colori.
   - Fornisci un pulsante per l'attivazione (forse attraverso il tema toggle).

## Collegamenti tra Task

- I design token migliorati alimentano il tema toggle e la logica del tema ad alto contrasto.
- La logica del tema toggle aggiunge il pulsante in navbar e si basa sui design token.
- L'ottimizzazione responsive si basa sulle variabili di design token per la coerenza.
- Le modifiche della sitemap per categorie non influenzano il codice.
- La correzione del linter worker si concentra sull'isolamento.
- Il design token per alto contrasto è opzionale e può essere attivato tramite il tema toggle (se implementato).

## Timeline e Dipendenze

- Tutti i task sono indipendenti tranne l'ottimizzazione responsive che dipende dalle variabili di design token.
- La correzione del linter worker può essere eseguita contemporaneamente alle ottimizzazioni responsive.
- La funzionalità del tema toggle dipende dai design token e dall'inclusione in navbar.
- L'aggiunta della sitemap per categorie è autonoma.

## Criteri di Successo

- `npm run lint` segnala zero errori per i file modificati.
- `npm run build` termina con codice di uscita 0.
- `npm run test` supera i test esistenti (copertura ≥ 70%).
- Il sito mostra un funzionamento corretto del tema toggle e delle ottimizzazioni responsive.
- Il file di sitemap include gli URL per tutti i tag presenti nella raccolta tagList.
- Nessun uso non necessario di `ctx` rimane nel worker.