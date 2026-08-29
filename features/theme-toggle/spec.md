# Specifica — Theme Toggle

---

## 1. Contesto e Obiettivo

**Problema di business:**
Il blog supporta attualmente il tema scuro/chiaro solo tramite `prefers-color-scheme` del sistema operativo. Non esiste un controllo manuale: l'utente non può scegliere un tema diverso dalle preferenze OS o sovrascrivere la scelta automatica.

**Risultato atteso:**
Un toggle nel navbar che consente all'utente di alternare manualmente tra tema chiaro e scuro, con persistenza della scelta nel `localStorage` e rispetto delle preferenze OS come default.

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | Utente clicca il toggle tema nel navbar | Il tema cambia immediatamente da chiaro a scuro o viceversa |
| 2 | Utente chiude e riapre il browser | Il tema scelto manualmente viene ripristinato (persistito in localStorage) |
| 3 | Utente首次 visita il blog (nessuna preferenza in localStorage) | Il tema rispetta `prefers-color-scheme` del sistema |
| 4 | Toggle visibile sia su desktop che mobile | Il bottone è accessibile da qualsiasi dispositivo |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| localStorage non disponibile (navigazione privata) | Il tema funziona comunque con fallback `prefers-color-scheme` |
| utente disabilita JavaScript | Il tema segue `prefers-color-scheme` (comportamento attuale, invariato) |
| Il blog viene aperto su un device con tema OS chiaro, poi l'utente lo cambia in scuro, poi disabilita JS | Il tema scuro rimane grazie a `data-theme` già impostato sull'html |

---

## 4. Criteri di Accettazione

- [ ] Un bottone toggle nel navbar cambia il tema immediatamente
- [ ] La scelta è persistita in `localStorage` e ripristinata alla visita successiva
- [ ] Al primo accesso senza preferenza salvata, il default è `prefers-color-scheme`
- [ ] Il toggle è accessibile (aria-label, keyboard-navigable)
- [ ] `npm run lint` termina senza errori
- [ ] `npm run build` termina con exit code 0

---

## 5. Dipendenze

- [ ] CSS custom properties per `--bg`, `--text`, ecc. già esistenti in `custom.css`
- [ ] Il tema è già applicato via `data-theme="dark"|"light"` su `<html>`
- [ ] `navbar.njk` come punto di iniezione del toggle

---

## 6. Retrocompatibilità

Il comportamento senza JavaScript o localStorage rimane invariato: il tema continua a seguire `prefers-color-scheme` tramite CSS.
