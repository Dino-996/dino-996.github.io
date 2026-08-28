# Piano Tecnico — Analytics Privacy-First (Umami Cloud)

---

## 1. Componenti e Modelli

Nessuna nuova struttura dati. Lato blog si tratta di uno snippet script che viene caricato nel `<head>` in modo asincrono, come da best practice Umami.

### Integrazione lato blog

```
head.njk (inject)
    ↓
Umami script caricato in modo asincrono
    ↓
Umami Cloud (gestito esternamente)
    ↓
Dashboard admin consultabile su umami.is
```

---

## 2. Contratti API / Interfacce

### Variabili d'ambiente

| Variabile | Obbligatoria | Default | Descrizione |
|---|---|---|---|
| `ANALYTICS_WEBSITE_ID` | Sì | — | ID sito in Umami Cloud |
| `ANALYTICS_SCRIPT_URL` | No | `https://cloud.umami.is/script.js` | URL dello script Umami (per future personalizzazioni) |

### Interfaccia HTML iniettata

Lo snippet viene inserito in `head.njk` con:
- `async defer` per non bloccare il rendering
- Check su `window.doNotTrack` per rispettare DNT
- Presenza di `ANALYTICS_WEBSITE_ID` come guardrail (nessuno script se non impostata)

---

## 3. Flusso dei Dati

```
Visitatore carica pagina
    ↓
head.njk → se ANALYTICS_WEBSITE_ID impostata → <script async defer src="..." data-website-id="...">
    ↓
Umami script → registrazione pageview → Umami Cloud
    ↓
Dashboard admin (umami.is) ← visualizzazione metriche
```

---

## 4. File Impact List

| File | Azione | Descrizione |
|---|---|---|
| `src/_includes/head.njk` | MODIFY | Aggiunge snippet Umami con guardrail `ANALYTICS_WEBSITE_ID` e logica DNT |
| `.env.example` | CREATE | Documenta `ANALYTICS_WEBSITE_ID` per i futuri setup |
| `.gitignore` | MODIFY | Esclude `.env` (se non già presente) |

---

## 5. Dipendenze Esterne

| Risorsa | Versione | Uso |
|---|---|---|
| Umami Cloud | Piano gratuito | Servizio di analytics hosting |
| `https://cloud.umami.is/script.js` | — | Script di tracciamento (CDN Umami) |

---

## 6. Risk Analysis

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Website ID esposto in frontend | Bassa | Basso | Umami stesso consiglia di esporlo; non è un segreto |
| Script CDN non raggiungibile | Molto bassa | Basso | L'utente non nota nulla; nessun impatto UX |
| DNT non rispettato (baco Umami) | Bassa | Basso | Monitorare la dashboard; se compaiono pageview da browser DNT, segnalare |
| Costi Umami Cloud超出 il piano gratuito | Molto bassa | Medio | Monitorare il contatore; migrare a self-hosted se necessario |

---

## 7. Approvazione

- [ ] Piano rivisto e approvato
- [ ] File Impact List validato
- [ ] Umami Cloud account creato e website ID disponibile
