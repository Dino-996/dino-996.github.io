---
layout: layouts/post.njk
title: Struttura dei Sistemi Operativi
description: Si descrivono le diverse modalità di accesso, dalle interfacce testuali (shell) a quelle grafiche touch-screen, evidenziando come le chiamate di sistema permettono ai programmi di comunicare con il kernel.
tags:
  - posts
  - sistemi operativi
  - struttura
date: 2020-02-14
excerpt: In questo articolo vediamo l'architettura dei sistemi operativi, analizzando il modo in cui gestiscono le risorse hardware e interagiscono con l'utente.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Servizi e Interfacce del Sistema Operativo

Il sistema operativo (**SO**) fornisce un ambiente per l'esecuzione dei programmi, offrendo servizi essenziali quali l'**esecuzione di programmi**, operazioni di **I/O**, gestione del **file system**, comunicazioni, rilevamento di errori e allocazione delle risorse. 

L'interazione con l'utente avviene attraverso tre modalità principali:

- **Interfaccia a riga di comando (CLI):** utilizza interpreti speciali chiamati **shell** (come Bash nei sistemi Unix/Linux). È preferita dagli amministratori per l'efficienza e la programmabilità.
- **Interfaccia grafica (GUI):** basata sulla metafora del desktop, icone e puntatori.
- **Interfaccia touch screen:** basata su gesti (gesture) direttamente sullo schermo.

## Interfaccia di Programmazione - System Call e API

Le **chiamate di sistema (system call)** rappresentano l'interfaccia verso i servizi resi disponibili dal SO.  
Spesso i programmatori non invocano direttamente le system call, ma utilizzano le **Application Programming Interface (API)**, come le API di Windows, POSIX (per Unix, Linux, macOS) o le API Java. Questo garantisce la **portabilità delle applicazioni**.

Per passare i parametri al sistema operativo durante una chiamata, si utilizzano tre metodi principali:

- Attraverso i **registri** della CPU (metodo più veloce).  
- In un **blocco o tabella di memoria**, passando l'indirizzo del blocco in un registro.  
- Nello **stack**, dove i parametri vengono inseriti (**push**) e poi prelevati dal SO (**pop**).

## Sviluppo ed Esecuzione delle Applicazioni

Il processo che porta un codice sorgente alla sua esecuzione prevede due figure chiave:

- **Linker:** combina file oggetto rilocabili in un unico **file binario** eseguibile, includendo eventuali librerie (es. la libreria standard C).  
- **Loader:** carica il file eseguibile in memoria, assegnando gli indirizzi definitivi (**relocation**) per permettere l'esecuzione sul core della CPU.

Le applicazioni sono generalmente dipendenti dal SO, poiché ogni sistema fornisce un insieme univoco di chiamate di sistema.

## Kernel

Il kernel è responsabile della gestione delle risorse hardware e dei servizi di base del sistema. Le sue attività principali includono:

- **Inizializzazione dell'hardware:** durante il processo di avvio (**boot**), il kernel viene caricato in memoria e prepara i componenti fisici del computer per l'uso.
- **Gestione dei processi e della CPU:** si occupa dello **scheduling**, decidendo quali programmi devono essere eseguiti dal processore e per quanto tempo.
- **Gestione della memoria:** controlla la memoria fisica, la **memoria virtuale** e la paginazione.
- **Gestione dei file e dei dispositivi:** amministra il **file system** (montando il root file system all'avvio) e i driver necessari per interagire con periferiche, dischi e reti.
- **Interfaccia per le chiamate di sistema:** fornisce un'interfaccia protetta tramite la quale le applicazioni possono richiedere servizi al sistema operativo usando le **system call**.

### Modalità di Esecuzione
Il kernel opera in uno spazio di memoria protetto chiamato **kernel space** (o modalità kernel), distinto dallo spazio utente dove girano le normali applicazioni.  
Questa separazione garantisce la stabilità del sistema: un errore critico all'interno del kernel provoca un **crash di sistema**, non un semplice bug applicativo.

### Tipologie di Architettura del Kernel
Ci sono diversi approcci utilizzati per la progettazione di un kernel:

- **Kernel Monolitico:** tutte le funzioni del sistema risiedono in un **unico spazio di indirizzamento**. Questo approccio (usato da **Unix** e **Linux**) offre prestazioni elevate grazie alla comunicazione interna veloce, anche se può risultare più difficile da estendere. Molti kernel monolitici moderni sono comunque **modulari**, permettendo di caricare funzionalità aggiuntive dinamicamente.
- **Microkernel** (es. **Mach**): fornisce solo le funzioni minime necessarie (come la comunicazione tra processi). La maggior parte dei servizi del sistema operativo viene spostata nello spazio utente per aumentare la modularità e la flessibilità.
- **Sistemi Ibridi:** come **Darwin** (il cuore di macOS e iOS), che combina la struttura a microkernel di Mach con parti del kernel BSD Unix.

## Esempi Specifici
- **Linux:** un kernel monolitico ampiamente personalizzabile. Progetti come *Linux From Scratch* mostrano come compilare il proprio kernel partendo dal codice sorgente.
- **Android:** utilizza un kernel Linux, ma aggiunge uno strato chiamato **HAL** (Hardware Abstraction Layer) per poter girare su una vasta gamma di dispositivi hardware diversi.
- **Darwin:** il kernel alla base dei sistemi Apple, rilasciato come software open-source.

## Generazione, Avvio e Debugging

Il processo di avvio (**boot**) segue solitamente questi passaggi:

1. Un **programma di bootstrap** (nel firmware BIOS o UEFI) individua e carica il kernel.  
2. Un bootloader più evoluto, come **GRUB**, può gestire il caricamento di diversi kernel o parametri di avvio.  
3. Il kernel inizializza l'hardware e monta il root file system.

Il **debugging** è l'attività volta a risolvere i **bug** e ottimizzare le prestazioni.  
I sistemi operativi facilitano questo compito tramite:

- **file di log**  
- **core dump** (immagini della memoria dei processi falliti)  
- strumenti di **tracing** e **contatori** per monitorare gli eventi e le chiamate di sistema
