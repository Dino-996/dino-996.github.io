# Spec: Refactoring del design system e del responsive design

> **NOTA (2026-09-23):** i punti 1 (tema toggle) e 3 (sitemap per categorie) di questa spec erano
> basati su un'analisi incompleta: entrambe le funzionalità erano **già implementate** e non sono
> state toccate. Idem per il punto 4 (`worker.js` non contiene `ctx`). Vedi `tasks.md` per lo
> stato reale di ogni task e per le motivazioni degli annullamenti.

## Obiettivo
Migliorare il design system del sito web di dino-996.github.io, il supporto responsive, il tema toggle, la navigazione per categorie e il contrasto visivo.

## Requisiti

1. **Tema Toggle** – Aggiungi un tema toggle button nella navbar con stato attivo/inattivo; assicurati che i design token abbiano una definizione coerente per sia il tema chiaro che quello scuro.

2. **Responsive Design** – Ottimizza i margini, gli spaziature, le card e i tipi di font per schermi di dimensioni comprese tra mobile, tablet e desktop, nascondendo la sidebar quando la larghezza della viewport è inferiore a 1200px, regolando gli stili delle card e garantendo una buona leggibilità.

3. **Sitemap per Categorie** – Aggiungi un elemento sitemap per ogni tag/categoria al file di sitemap principale (`src/sitemap.njk`), consentendo ai motori di ricerca di scoprire pagine di listing per tag.

4. **Correzione Linter Worker** – Rimuovi qualsiasi uso non necessario del contesto (`ctx`) nel worker CloudFlare (`src/assets/js/worker.js`) per migliorare la qualità del codice.

5. **Design Token per Contrasto Ad Alto Contrasto** – Espandi il sistema di design token con variabili per una modalità ad alto contrasto (simile a slate) che possano essere attivate se necessario, garantendo un rapporto di contrasto WCAG AAA.

## Vincoli

- Segui l'architettura SDD del progetto: leggi la costituzione (`.specify/constitution.md`) e i file della feature prima di qualsiasi implementazione.
- Nessun pacchetto non presente in `package.json` può essere installato.
- Usa solo file locali; non eseguire push remoti.
- Assicurati che il build (`npm run build`), il lint (`npm run lint`) e i test (`npm run test`) passino.

## Criteri di Accettazione

- L'interfaccia utente del tema toggle funziona correttamente e riflette lo stato corrente.
- Tutte le regolazioni responsive superano i controlli visivi su desktop (>1200px), tablet (768-1199px) e mobile (<768px).
- Il file di sitemap (`src/sitemap.njk`) elenca ogni tag presente in `collections.tagList`.
- `npm run lint` non segnala alcun nuovo problema introdotto.
- Il build Eleventy termina con codice di uscita 0.
- La copertura dei test unitari è ≥ 70% per `src/lib` e `src/_data`.