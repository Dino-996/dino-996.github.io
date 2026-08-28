# Specifica — Analytics Privacy-First

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog non ha alcun sistema di analytics. Non è possibile valutare il traffico, capire quali post funzionano meglio, né monitorare la salute del sito. Le alternative comuni (Google Analytics) sono invasive, richiedono il cookie banner GDPR, e sono in contrasto con il posizionamento "cybersecurity" del blog.

**Risultato atteso:**
Un sistema di analytics che raccoglie metriche di traffico essenziali (pageview, referrer, durata sessione) senza cookie, senza banner GDPR, senza tracciamento cross-site, e con dati consultabili tramite una dashboard separata.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Un visitatore carica una pagina del blog | Il sistema registra pageview, referrer, user agent in modo anonimo |
| 2 | Un visitatore naviga tra più pagine | Ogni pageview viene registrato con un identificatore di sessione temporaneo e anonimo (non riconducibile all'utente) |
| 3 | L'amministratore accede alla dashboard | Vede pageview totali, post più letti, referrer, e durata media delle sessioni |
| 4 | Il blog viene caricato da un visitatore con JavaScript disabilitato | Il sistema non registra nulla — nessuno snippet, nessun errore in console |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| La richiesta al servizio di analytics fallisce | L'utente non nota nulla — la pagina funziona normalmente; il fallimento è silenzioso |
| Il visitatore ha Do Not Track attivo | Nessuna richiesta viene inviata — rispetto della preferenza DNT |
| JavaScript disabilitato | Nessuna richiesta; nessun errore |
| Il servizio di analytics è temporaneamente irraggiungibile | Stesso comportamento del caso "richiesta fallisce": silenzioso, senza impatto sull'utente |
| Crawler / bot rilevato via User-Agent | Nessuna registrazione, per evitare dati distorti |

---

## 4. Criteri di Accettazione

- [ ] Il blog non invia dati a nessun servizio di terze parti senza consenso esplicito
- [ ] Non viene creato nessun cookie di tracciamento
- [ ] Con DNT attivo nel browser, nessuna richiesta analytics parte
- [ ] La dashboard è accessibile solo all'amministratore (autenticazione)
- [ ] I dati raccolti sono anonimi e non riconducibili a individui
- [ ] L'impatto sulle performance della pagina è < 50ms aggiuntivi
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] Un account / deploy su piattaforma di hosting per il servizio di analytics (es. Umami Cloud, o self-hosted su Railway/Render/Cloudflare)
- [ ] Una variabile d'ambiente `ANALYTICS_WEBSITE_ID` per identificare il sito nel servizio
- [ ] `head.njk` come punto di iniezione dello script

---

## 6. Retrocompatibilità

Nessun comportamento esistente viene modificato. L'integrazione avviene solo aggiungendo uno snippet nello `<head>` e una variabile d'ambiente. Se `ANALYTICS_WEBSITE_ID` non è impostata, nessuno script viene caricato.
