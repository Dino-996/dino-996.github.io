---
layout: layouts/post.njk
title: Memoria centrale
description: Presentiamo la memoria centrale nei sistemi operativi, con particolare focus sulla necessità di ospitare dati e programmi durante l'esecuzione.
tags:
  - posts
  - sistemi operativi
  - memoria centrale
date: 2020-02-02
excerpt: In questo articolo esploriamo le distinzioni tra memorie volatili e non volatili, oltre ai meccanismi hardware, come i registri base e limite, necessari per proteggere le aree riservate del sistema e dei singoli processi. Si illustra come gli indirizzi vengano trasformati da logici a fisici tramite l'unità di gestione della memoria (MMU) e si descrive le diverse fasi di associazione degli indirizzi. Particolare attenzione è rivolta all'allocazione contigua, confrontando strategie come first-fit, best-fit e worst-fit per l'assegnazione dello spazio disponibile. Infine, si parla di criticità legate alla frammentazione interna ed esterna, proponendo soluzioni come la compattazione o la paginazione per ottimizzare l'uso della RAM.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Fondamenti della Memoria Centrale

Per essere eseguiti, i programmi e i dati devono risiedere, almeno in parte, nella memoria centrale. Le principali tipologie di memoria includono:

* **ROM (Read-Only Memory):** Memoria non volatile che mantiene i dati anche senza alimentazione.
* **RAM (Random-Access Memory):** Memoria volatile utilizzata per l’esecuzione dei programmi; i dati vengono persi allo spegnimento.
* **Cache:** Memoria volatile molto più veloce della RAM, posta tra CPU e RAM per ottimizzare le prestazioni.

**Best practice:** In applicazioni Python o Java, un uso attento delle strutture dati e della gestione della memoria heap può ridurre il carico sulla RAM e migliorare la scalabilità.

## Protezione della Memoria

Il sistema operativo deve garantire che i processi utente siano isolati tra loro e protetti dagli accessi non autorizzati. La protezione avviene a **livello hardware**, riducendo l’impatto sulle prestazioni. I meccanismi principali sono:

* **Registro Base:** Contiene l’indirizzo fisico più basso accessibile a un processo.
* **Registro Limite:** Definisce l’intervallo massimo di indirizzi utilizzabili.
* **Eccezioni/Trap:** Tentativi di accesso non autorizzato generano errori hardware che riportano il controllo al sistema operativo.

## Associazione degli Indirizzi (Binding)

Gli indirizzi di memoria di un programma evolvono lungo le fasi di esecuzione:

* **Indirizzi simbolici:** Nomi di variabili nel codice sorgente.
* **Indirizzi rilocabili:** Offset rispetto all’inizio di un modulo.
* **Codice assoluto:** Se la posizione è nota in fase di compilazione.
* **Associazione a runtime:** Necessaria quando un processo può essere spostato durante l’esecuzione.

## Spazi di Indirizzamento e MMU

Esiste una distinzione fondamentale tra **indirizzo virtuale/logico** (generato dalla CPU) e **indirizzo fisico** (usato dalla RAM). La **MMU (Memory Management Unit)** effettua la traduzione dinamica degli indirizzi logici in fisici, spesso sommando un registro di rilocazione.  

<div class="d-flex align-items-center gap-2 flex-wrap my-4">
  <div class="border rounded px-3 py-2 bg-body text-center fw-bold">
    CPU
  </div>
  <div class="text-muted">→</div>
  <div class="border rounded px-3 py-2 bg-body text-center">
    <small class="text-muted d-block">Indirizzo Logico</small>
    <span class="fw-bold">(Virtuale)</span>
  </div>
  <div class="text-muted">→</div>
  <div class="border rounded px-3 py-2 bg-primary text-white text-center fw-bold">
    MMU
  </div>
  <div class="text-muted">→</div>
  <div class="border rounded px-3 py-2 bg-body text-center">
    <small class="text-muted d-block">Indirizzo Fisico</small>
    <span class="fw-bold">RAM</span>
  </div>
</div>

Nei sistemi moderni, la MMU supporta paginazione a più livelli e segmentazione, fondamentali per la gestione di grandi spazi di memoria in ambienti cloud.

## Allocazione Contigua della Memoria

Nell’**allocazione contigua**, ogni processo riceve un blocco unico e continuo di memoria fisica. Questo approccio è semplice e veloce, poiché il calcolo dell’indirizzo fisico è diretto (basta sommare un offset), ma può generare inefficienze se la memoria si frammenta nel tempo.

Gli algoritmi principali per scegliere quale porzione di memoria assegnare a un processo sono:

* **First-fit:** Cerca il primo spazio libero sufficientemente grande. Vantaggio: velocità di allocazione. Svantaggio: può lasciare molti piccoli blocchi inutilizzabili all’inizio della memoria, aumentando la frammentazione esterna.
* **Best-fit:** Seleziona lo spazio più piccolo che soddisfa il requisito. Vantaggio: riduce lo spreco di memoria. Svantaggio: può creare numerosi piccoli buchi che non saranno mai utilizzabili.
* **Worst-fit:** Assegna lo spazio più grande disponibile. L’idea è che i blocchi residui possano ancora servire ad altri processi. Svantaggio: spesso spreca memoria e non è comune nei sistemi moderni.

**Approfondimento pratico:** Nei linguaggi gestiti come Java, il garbage collector e lo heap gestiscono automaticamente l’allocazione contigua interna degli oggetti, riducendo la complessità per lo sviluppatore, ma la frammentazione può comunque influire sulle performance.

## Frammentazione della Memoria

L’allocazione contigua può portare a due tipi principali di inefficienza:

* **Frammentazione esterna:** La memoria libera totale è sufficiente per un nuovo processo, ma è suddivisa in blocchi non contigui. Esempio: 100 MB liberi totali, ma divisi in 4 blocchi da 25 MB; un processo da 50 MB non può essere allocato. Nei sistemi tradizionali con first-fit si può perdere fino al 30–35% della memoria utile.

* **Frammentazione interna:** Si verifica quando la partizione assegnata a un processo è leggermente più grande del necessario, lasciando spazio inutilizzato all’interno della partizione stessa. Questo fenomeno è tipico delle allocazioni fisse e dei sistemi legacy.

**Nota tecnica:** Nei sistemi moderni, la frammentazione interna può essere mitigata tramite **heap dinamici**, **pool di oggetti** o allocatori di memoria slab (come quelli usati in kernel Linux) che riducono gli sprechi nei blocchi di piccola dimensione.

## Soluzioni alla Frammentazione

Per ridurre le inefficienze causate dalla frammentazione, i sistemi operativi adottano tecniche avanzate:

* **Compattazione:** Riordina la memoria spostando i processi attivi per consolidare i blocchi liberi in un’unica area contigua. Richiede supporto hardware per rilocazione dinamica e può essere costosa in termini di performance se eseguita frequentemente.

* **Paginazione:** Divide la memoria in pagine di dimensioni fisse (tipicamente 4 KB o multipli) e permette agli indirizzi logici di un processo di mappare pagine fisiche non contigue. Vantaggi: elimina la frammentazione esterna, semplifica la gestione della memoria virtuale e supporta funzionalità come **swap** su disco. Svantaggi: frammentazione interna minima sulle ultime pagine.

* **Segmentazione:** Divide la memoria in segmenti logici (codice, dati, stack) di dimensioni variabili. Consente una gestione più semantica della memoria, ma può ancora soffrire di frammentazione esterna tra segmenti.

**Esempio pratico:** Nei container Docker, la memoria può essere limitata tramite flag `--memory` e monitorata da strumenti come cAdvisor, permettendo ai sistemi di orchestrazione di ribilanciare carichi e ridurre sprechi dovuti a frammentazione.