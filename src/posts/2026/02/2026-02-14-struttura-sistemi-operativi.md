---
layout: layouts/post.njk
title: Strutture dei Sistemi Operativi
description: Si descrivono le diverse modalità di accesso, dalle interfacce testuali (shell) a quelle grafiche touch-screen, evidenziando come le chiamate di sistema permettono ai programmi di comunicare con il kernel.
tags:
  - posts
  - sistemi operativi
date: 2026-02-14
excerpt: In questo articolo vediamo l'architettura dei sistemi operativi, analizzando il modo in cui gestiscono le risorse hardware e interagiscono con l'utente.
permalink: "/blog/{{ title | slug }}/"
image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97
imageAlt: "Scrivania con computer e codice"
---

# {{ title }}

## Introduzione

{{ excerpt }}

## Servizi e Interfacce del Sistema Operativo

Il sistema operativo (SO) fornisce un ambiente per l'esecuzione dei programmi, offrendo servizi essenziali quali l'**esecuzione di programmi**, operazioni di **I/O**, gestione del **file system**, comunicazioni, rilevamento di errori e allocazione delle risorse. 

L'interazione con l'utente avviene attraverso tre modalità principali:

- **Interfaccia a riga di comando (CLI):** utilizza interpreti speciali chiamati **shell** (come Bash nei sistemi Unix/Linux). È preferita dagli amministratori per l'efficienza e la programmabilità.
- **Interfaccia grafica (GUI):** basata sulla metafora del desktop, icone e puntatori.
- **Interfaccia touch screen:** basata su gesti (gesture) direttamente sullo schermo.

## Interfaccia di Programmazione: System Call e API

Le **chiamate di sistema (system call)** rappresentano l'interfaccia verso i servizi resi disponibili dal SO.  
Spesso i programmatori non invocano direttamente le system call, ma utilizzano le **Application Programming Interface (API)**, come le API di Windows, POSIX (per Unix, Linux, macOS) o le API Java. Questo garantisce la **portabilità delle applicazioni**.

Per passare i parametri al sistema operativo durante una chiamata, si utilizzano tre metodi principali:

- Attraverso i **registri** della CPU (metodo più veloce).  
- In un **blocco o tabella di memoria**, passando l'indirizzo del blocco in un registro.  
- Nello **stack**, dove i parametri vengono inseriti (push) e poi prelevati dal SO (pop).

## Sviluppo ed Esecuzione delle Applicazioni

Il processo che porta un codice sorgente alla sua esecuzione prevede due figure chiave:

- **Linker:** combina file oggetto rilocabili in un unico **file binario** eseguibile, includendo eventuali librerie (es. la libreria standard C).  
- **Loader:** carica il file eseguibile in memoria, assegnando gli indirizzi definitivi (**relocation**) per permettere l'esecuzione sul core della CPU.

Le applicazioni sono generalmente dipendenti dal SO, poiché ogni sistema fornisce un insieme univoco di chiamate di sistema.

## Strutture Architetturali del Kernel

Esistono diversi approcci alla progettazione di un sistema operativo:

- **Struttura monolitica:** il kernel risiede in un unico spazio di indirizzamento (es. Unix, Linux). Ha il vantaggio di un overhead ridotto e comunicazioni veloci, ma è difficile da estendere. Linux, pur essendo monolitico, utilizza **moduli caricabili dinamicamente** per maggiore flessibilità.

- **Approccio stratificato:** il sistema è suddiviso in strati; lo strato 0 è l'hardware, mentre l'ultimo è l'interfaccia utente. Ogni strato usa solo i servizi di quelli inferiori.

- **Microkernel** (es. Mach): fornisce solo le funzioni di comunicazione essenziali, spostando molti servizi nello spazio utente per aumentarne la modularità.

- **Sistemi ibridi/specifici:**
  - **macOS e iOS:** basati sull'ambiente kernel **Darwin** (che combina Mach e BSD) e strati applicativi come Cocoa.
  - **Android:** utilizza un kernel Linux ma astrae l'hardware tramite uno strato denominato **HAL (Hardware Abstraction Layer)**.

## Generazione, Avvio e Debugging

La creazione di un sistema personalizzato (come nel progetto *Linux From Scratch*) richiede la configurazione del kernel (es. tramite `make menuconfig`), la compilazione del codice sorgente e l'installazione dei moduli.

Il processo di avvio (**boot**) segue solitamente questi passaggi:

1. Un **programma di bootstrap** (nel firmware BIOS o UEFI) individua e carica il kernel.  
2. Un bootloader più evoluto, come **GRUB**, può gestire il caricamento di diversi kernel o parametri di avvio.  
3. Il kernel inizializza l'hardware e monta il root file system.

Il **debugging** è l'attività volta a risolvere i **bug** e ottimizzare le prestazioni.  
I sistemi operativi facilitano questo compito tramite:

- **file di log**  
- **core dump** (immagini della memoria dei processi falliti)  
- strumenti di **tracing** e **contatori** per monitorare gli eventi e le chiamate di sistema
