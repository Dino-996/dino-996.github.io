# Features — SDD Workflow

Questa directory contiene le specifiche, i piani e i task per ogni feature sviluppata con il metodo SDD.

## Struttura di una Feature

```
features/
└── <nome-feature>/
    ├── spec.md          # Requisiti funzionali (senza dettagli implementativi)
    ├── plan.md          # Architettura tecnica (approvato PRIMA di scrivere codice)
    └── tasks.md         # Task atomici checklisted
```

## Come avviare una nuova feature

1. **Creare la directory feature:**
   ```bash
   mkdir features/<nome-feature>
   ```

2. **Creare `spec.md`** copiando da `.specify/templates/spec_template.md`

3. **Dopo approvazione del spec, creare `plan.md`** copiando da `.specify/templates/plan_template.md`

4. **Dopo approvazione del plan, creare `tasks.md`** copiando da `.specify/templates/tasks_template.md`

5. **Eseguire i task in sequenza**, compilando la checklist e facendo commit dopo ogni task

## Ciclo SDD

```
constitution.md → spec.md → plan.md → tasks.md → Esecuzione → Validazione → Git Commit
```

Vedi `.specify/constitution.md` per i dettagli completi del protocollo.
