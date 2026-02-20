---
layout: layouts/post.njk
title: Scheduling della CPU
description: Facciamo un'analisi approfondita dello scheduling della CPU, una funzione vitale dei sistemi operativi progettata per massimizzare l'efficienza attraverso la multiprogrammazione.
tags:
  - posts
  - sistemi operativi
  - scheduling
date: 2020-02-21
excerpt: In questo articolo esploriamo lo scheduling della CPU, una funzione vitale dei sistemi operativi progettata per ottimizza throughput e tempi d’attesa attraverso algoritmi come FCFS, SJF e Round Robin. La gestione moderna si estende a thread hardware/software e sistemi multicore, privilegiando la processor affinity per l'efficienza della cache. Il supporto real-time (soft/hard) garantisce il rispetto di scadenze rigide.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Cos’è lo scheduling della CPU

Lo **scheduling della CPU** è il meccanismo attraverso il quale il sistema operativo decide quale processo o thread debba essere eseguito in un determinato istante. Poiché un singolo core può eseguire un solo flusso di esecuzione alla volta, lo scheduler ha il compito di distribuire il tempo di CPU tra più entità concorrenti, garantendo efficienza, equità e reattività.

Nei sistemi moderni lo scheduler è una componente critica del kernel: deve operare con latenza minima, comportamento prevedibile e capacità di scalare su architetture multicore o multiprocessore.

## Concetti fondamentali

### CPU burst e I/O burst

L’esecuzione di un processo è caratterizzata dall’alternanza tra:

* **CPU burst**, fasi di elaborazione attiva;
* **I/O burst**, fasi di attesa per operazioni di input/output.

Questa struttura ciclica costituisce il fondamento della multiprogrammazione: mentre un processo è bloccato in attesa di I/O, un altro può utilizzare la CPU, aumentando l’utilizzo complessivo del sistema.

### Modalità di prelazione (preemption)

Si distinguono due modelli principali:

* **Non preemptive**: il processo mantiene la CPU fino al completamento o a un evento di blocco (ad esempio una richiesta di I/O).
* **Preemptive**: lo scheduler può interrompere un processo attivo, tipicamente tramite interrupt generati da un timer hardware, per assegnare la CPU a un altro processo.

La preemption migliora la reattività nei sistemi interattivi, ma richiede meccanismi di sincronizzazione accurati per preservare la coerenza dello stato del kernel.

### Dispatcher e context switch

Il **dispatcher** è il modulo responsabile dell’effettivo trasferimento del controllo della CPU al processo selezionato. Le sue operazioni includono:

* salvataggio e ripristino dei registri (context switch);
* aggiornamento delle strutture di controllo del kernel;
* passaggio dalla modalità kernel alla modalità utente.

Il tempo necessario a eseguire queste operazioni è detto **latenza di dispatch** e rappresenta un overhead che deve essere contenuto per mantenere elevate prestazioni.

## Criteri di valutazione

Gli algoritmi di scheduling sono confrontati mediante metriche quantitative standard:

* **Utilizzo della CPU**: percentuale di tempo in cui la CPU esegue lavoro utile.
* **Throughput**: numero di processi completati per unità di tempo.
* **Turnaround time**: intervallo tra l’arrivo del processo nel sistema e la sua conclusione.
* **Tempo di attesa**: tempo totale trascorso nella ready queue.
* **Tempo di risposta**: intervallo tra la richiesta di esecuzione e la prima risposta prodotta, rilevante nei sistemi interattivi.

Queste metriche possono entrare in conflitto: ad esempio, la riduzione del tempo di risposta può aumentare il numero di context switch e quindi l’overhead complessivo.

## Algoritmi di scheduling

### FCFS (First-Come, First-Served)

Il processo con ordine di arrivo più basso nella ready queue viene eseguito per primo. È un algoritmo semplice e non preemptive, ma può generare il **convoy effect**, in cui un processo lungo ritarda l’esecuzione di numerosi processi brevi.

### SJF (Shortest-Job-First) e SRTF

L’algoritmo **SJF** seleziona il processo con il CPU burst stimato più breve, minimizzando il tempo di attesa medio in condizioni ideali. La variante preemptive è detta **Shortest Remaining Time First (SRTF)**.

La principale criticità consiste nella stima della durata futura dei burst, generalmente ottenuta tramite tecniche di predizione statistica (ad esempio media esponenziale).

### Round Robin (RR)

Ogni processo riceve un intervallo di tempo prefissato, detto **quantum**. Allo scadere del quantum, il processo viene sospeso e reinserito nella ready queue.

La scelta del quantum è determinante:

* un valore troppo elevato rende il comportamento simile a FCFS;
* un valore troppo ridotto aumenta l’overhead dovuto ai frequenti context switch.

### Scheduling con priorità

A ogni processo è assegnato un livello di priorità; la CPU viene concessa al processo con priorità più alta.

Questo approccio può causare **starvation** per i processi a bassa priorità. Il fenomeno è mitigabile mediante **aging**, ossia l’incremento progressivo della priorità dei processi in attesa.

### Code multilivello e multilevel feedback queue (MLFQ)

Le **multilevel queue** suddividono i processi in code distinte (ad esempio interattivi, batch, di sistema), ciascuna con una propria politica di scheduling.

Le **multilevel feedback queue (MLFQ)** consentono ai processi di spostarsi tra code in base al comportamento osservato, realizzando uno scheduling adattativo che favorisce i processi interattivi senza penalizzare eccessivamente quelli computazionali.

## Scheduling in sistemi multiprocessore

Nei sistemi **SMP (Symmetric Multiprocessing)**, ogni core può gestire una coda locale oppure condividere una coda globale.

Concetti rilevanti includono:

* **Processor affinity**: mantenere un processo sullo stesso core per sfruttare la località della cache e ridurre i costi di migrazione.
* **Load balancing**: distribuire il carico in modo uniforme tra i core per evitare squilibri.

## Sistemi real-time

Nei sistemi real-time il rispetto delle deadline costituisce un requisito primario.

* **Soft real-time**: il mancato rispetto di una deadline degrada le prestazioni ma non compromette necessariamente il sistema.
* **Hard real-time**: il mancato rispetto di una deadline è considerato un errore critico.

Algoritmi classici includono:

* **Rate Monotonic Scheduling (RMS)**: assegna priorità fisse proporzionali alla frequenza dei task periodici.
* **Earliest Deadline First (EDF)**: assegna priorità dinamiche in base alla deadline più prossima; è ottimale su singolo processore in condizioni ideali di modello.

## Scheduler nei principali sistemi operativi

### Linux

Linux utilizza più classi di scheduling. Per i task ordinari adotta il **Completely Fair Scheduler (CFS)**, che modella l’esecuzione come una condivisione equa del tempo di CPU e utilizza strutture dati bilanciate (ad esempio alberi red-black) per selezionare il task con il minor tempo virtuale accumulato.

Sono inoltre presenti classi dedicate ai task real-time e meccanismi di bilanciamento del carico su sistemi SMP.

### Windows

Windows implementa uno scheduler preemptive basato su priorità, con 32 livelli distinti:

* livelli **variabili** per applicazioni generiche;
* livelli **real-time** riservati a task critici.

Le priorità possono essere modificate dinamicamente per migliorare la reattività delle applicazioni interattive e prevenire situazioni di starvation.