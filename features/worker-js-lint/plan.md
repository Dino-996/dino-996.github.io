# Plan — Worker JS Lint

---

## 1. Approccio Architetturale

**Obiettivo:** Includere `worker.js` nel linting ESLint con globals appropriati per l'ambiente Cloudflare Workers.

**Approccio:** Modificare `eslint.config.js` per:
1. Rimuovere `worker.js` dalla lista `ignores`
2. Aggiungere un blocco dedicato con `globals.serviceworker` + Cloudflare Workers globals

---

## 2. File da Modificare

| File | Modifica |
|------|----------|
| `eslint.config.js` | Rimuovere ignore + aggiungere blocco dedicato |
| `src/assets/js/worker.js` | Rimuovere parametro `ctx` non usato |

---

## 3. Globals Necessari

| Global | Tipo | Motivo |
|--------|------|--------|
| `globals.serviceworker` | readonly | Response, Request, Headers, fetch, JSON, etc. |
| `env` | readonly | Cloudflare Workers `env` parameter |
| `waitUntil` | readonly | Cloudflare Workers `ctx.waitUntil` |

---

## 4. Verifica

- [x] `npm run lint` → exit 0
- [x] `worker.js` incluso nel lint output (non ignorato)
