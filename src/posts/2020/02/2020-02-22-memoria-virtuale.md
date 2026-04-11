---
layout: layouts/post.njk
title: La memoria virtuale
description: Scopri come i sistemi operativi riescono a eseguire applicazioni enormi su hardware limitato attraverso la memoria virtuale, la paginazione su richiesta e i sofisticati algoritmi di sostituzione delle pagine.
tags:
  - posts
  - sistemi operativi
  - memoria virtuale
date: 2020-02-22
excerpt: Questo articolo approfondisce i concetti fondamentali della gestione della memoria virtuale, analizzando i vantaggi dell'astrazione hardware, il funzionamento dei page fault e il confronto tra gli algoritmi FIFO, OPT e LRU per l'ottimizzazione delle prestazioni di sistema.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Architettura e strategie della Memoria Virtuale

Nei moderni sistemi multiprogrammati, l'esecuzione simultanea di più processi richiede una gestione oculata delle risorse. Tuttavia, la RAM è per definizione una risorsa finita e spesso insufficiente a ospitare l'intero working set di ogni applicazione attiva. Qui entra in gioco la **Memoria Virtuale**, un'astrazione fondamentale che scollega la memoria logica vista dal programmatore dalla memoria fisica effettivamente disponibile.

Questa architettura offre vantaggi determinanti:
* **Scalabilità:** Consente l'esecuzione di programmi le cui dimensioni superano la capacità della RAM fisica.
* **Astrazione:** Il programmatore interagisce con uno spazio di indirizzamento lineare e contiguo, ignorando la frammentazione fisica.
* **Efficienza:** Facilita la condivisione di librerie (DLL/Shared Objects) tra processi diversi attraverso la mappatura delle medesime pagine fisiche.

## Paginazione su richiesta

Il cuore della memoria virtuale risiede nel **Demand Paging** (paginazione su richiesta). Invece di caricare l'intero binario in fase di startup, il kernel carica le singole pagine solo quando vengono effettivamente referenziate durante l'esecuzione.

### Il ciclo del page fault
Quando un processo tenta di accedere a un indirizzo logico non presente in RAM (identificato da un bit di validità "0" nella Page Table), l'hardware genera un'eccezione nota come **Page Fault**. Il sistema operativo interviene seguendo una procedura rigorosa:
1.  **Verifica:** Il SO controlla se il riferimento alla memoria era legittimo.
2.  **Swap-in:** Individua la pagina nel disco (area di swap).
3.  **Allocazione:** Cerca un frame libero nella RAM.
4.  **Update:** Carica i dati nel frame, aggiorna la Page Table e setta il bit di validità a "1".
5.  **Restart:** Ripristina l'istruzione che aveva causato l'eccezione.

## Performance e ottimizzazioni

L'implementazione della memoria virtuale introduce un overhead inevitabile. Le prestazioni del sistema vengono misurate tramite il **Tempo di Accesso Effettivo (EAT)**, calcolato come:

$$EAT = (1 - p) \times ma + p \times pft$$

Dove:
* $p$ è la probabilità di page fault ($0 \le p \le 1$).
* $ma$ è il tempo di accesso alla memoria (nanosecondi).
* $pft$ è il tempo di gestione del page fault (millisecondi).

Dato che il recupero da disco è ordini di grandezza più lento della RAM, anche un tasso di page fault minimo può degradare sensibilmente le performance.

### Copy-on-Write (CoW)
Per ottimizzare la creazione dei processi (system call `fork()`), si utilizza la tecnica **Copy-on-Write**. Inizialmente, processo padre e figlio condividono le stesse pagine fisiche in sola lettura. Solo quando uno dei due tenta una scrittura, il kernel interviene duplicando la pagina specifica. Questo evita sprechi di memoria per processi che non modificano i dati ereditati.

## Algoritmi di sostituzione delle pagine

Cosa accade quando la memoria fisica è satura? Il sistema deve selezionare una "vittima" da espellere per far spazio a una nuova pagina. Per ottimizzare questo processo, si utilizza il **Dirty Bit** (o bit di modifica): se una pagina non è stata modificata dal suo caricamento, può essere sovrascritta senza essere riscritta su disco, dimezzando l'I/O.

### Analisi delle strategie di replacement

1.  **FIFO (First-In-First-Out):** Sostituisce la pagina residente da più tempo. Sebbene semplice, è inefficiente e soggetto all'**Anomalia di Belady**: un fenomeno controintuitivo dove l'aggiunta di frame fisici può aumentare il numero di page fault.
2.  **OPT (Algoritmo Ottimale):** Sostituisce la pagina che non verrà utilizzata per il periodo di tempo più lungo in assoluto. È il gold standard teorico, ma è **irrealizzabile** poiché richiederebbe la conoscenza futura degli accessi (non determinismo).
3.  **LRU (Least Recently Used):** Approssima l'algoritmo ottimale sostituendo la pagina non utilizzata da più tempo. È molto efficace ma richiede supporto hardware dedicato (contatori o stack) per non appesantire la CPU.
4.  **Seconda Chance (Clock):** Un compromesso ingegnoso tra FIFO e LRU. Organizza le pagine in una lista circolare e utilizza un **Reference Bit**. Se il bit è 1, la pagina riceve una "seconda possibilità" e il bit viene azzerato; se è 0, la pagina viene sostituita.