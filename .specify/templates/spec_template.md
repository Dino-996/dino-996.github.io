# Specifica — [Nome Feature]

> **Non contenere dettagli implementativi** (nomi di file, classi, funzioni).

---

## 1. Contesto e Obiettivo

**Problema di business:**
[Descrivere il problema o la necessità che questa feature risolve]

**Risultato atteso:**
[Descrivere cosa otterrà l'utente/il sistema a feature completata]

---

## 2. Requisiti Funzionali (Happy Path)

| # | Azione | Risposta / Comportamento |
|---|---|---|
| 1 | [Utente compie un'azione] | [Sistema risponde con...] |
| 2 | [Passo successivo] | [Risultato atteso] |

---

## 3. Casi Limite ed Errori (Edge Cases)

| Condizione | Comportamento atteso |
|---|---|
| Input malformato / assente | [es. "Risposta HTTP 400, campo email obbligatorio"] |
| Timeout / risorsa non disponibile | [es. "Fallback a contenuto statico"] |
| Permessi insufficienti | [es. "Redirect a /login"] |
| [Altro edge case] | [Comportamento] |

---

## 4. Criteri di Accettazione

- [ ] [Assert binario e verificabile, es. "La pagina /about restituisce HTTP 200"]
- [ ] [es. "Il form di contatto mostra errore se email è assente"]
- [ ] [Ogni criterio è una voce verificabile in isolamento]

---

## 5. Dipendenze

- [ ] Dipendenza 1 (es. variabile d'ambiente `SUPABASE_URL`)
- [ ] Dipendenza 2 (es. `src/_data/posts.js` esistente)

---

## 6. Retrocompatibilità

[Se la feature modifica un comportamento esistente, documentare qui cosa cambia e come garantire che il codice legacy continui a funzionare]
