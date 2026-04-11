---
layout: layouts/post.njk
title: Allocazione della memoria
description: Questo approfondimento tecnico esplora le sfide dell'allocazione dei frame in sistemi multiprogrammati. Analizzeremo come il modello del working set e la frequenza dei page fault prevengano il collasso del sistema (thrashing), oltre a esaminare le tecniche specifiche del kernel per la gestione di oggetti di dimensioni variabili e fisse.
tags:
  - posts
  - sistemi operativi
  - allocazione della memoria
date: 2020-02-23
excerpt: Dall'allocazione proporzionale dei frame alla prevenzione del thrashing, scopri come i sistemi operativi moderni ottimizzano la memoria fisica e gestiscono le risorse critiche del kernel tramite Buddy System e Slab Allocator.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Strategie di allocazione dei frame

La gestione efficiente della memoria fisica non si limita alla semplice paginazione; il cuore delle prestazioni risiede nella **strategia di allocazione dei frame**. Decidere quanti e quali frame assegnare a ogni processo è un gioco di equilibrio tra equità, priorità e throughput del sistema.

## Modelli di allocazione

Esistono due approcci filosofici alla distribuzione della memoria:

* **Allocazione Uniforme:** Assegna a ogni processo lo stesso numero di frame ($m/n$), indipendentemente dal carico di lavoro. È una strategia democratica ma inefficiente, poiché penalizza i processi pesanti e spreca risorse con quelli leggeri.
* **Allocazione Proporzionale:** Distribuisce la memoria in base alla dimensione virtuale del processo. Se un processo $p_i$ ha una dimensione virtuale $s_i$, riceverà un numero di frame $a_i$ proporzionale alla sua quota sul totale della memoria virtuale richiesta.

### Politiche di sostituzione
Oltre alla quantità, la "provenienza" dei frame è determinante:
* **Sostituzione Globale:** Un processo può sottrarre frame a un altro (spesso a quelli con priorità inferiore). Questo massimizza il throughput ma rende il tempo di risposta del singolo processo imprevedibile.
* **Sostituzione Locale:** Un processo può rimpiazzare solo i frame che gli sono già stati assegnati. Questo garantisce isolamento e stabilità, ma può lasciare inutilizzata RAM preziosa se un processo non ne ha immediato bisogno.

## Il pericolo del Thrashing

Il **Thrashing** è il "punto di rottura" di un sistema operativo: si verifica quando il sistema spende più tempo a gestire i page fault (I/O) che a eseguire istruzioni utili.

Questo collasso avviene tipicamente quando il grado di multiprogrammazione aumenta oltre il limite critico. La CPU registra un calo di utilizzo perché i processi sono in attesa dell'I/O; il sistema operativo, interpretando erroneamente il calo come mancanza di carico, avvia nuovi processi. Questo sottrae ulteriori frame ai processi esistenti, innescando una reazione a catena che porta il sistema alla paralisi.

### Strategie di prevenzione
Per scongiurare il thrashing, i kernel moderni adottano due modelli principali:
1.  **Modello del Working Set:** Si basa sul **principio di località**. Il sistema monitora le pagine usate attivamente in una finestra temporale $\Delta$. Se la somma dei working set di tutti i processi supera la RAM disponibile, il sistema sospende temporaneamente un processo (swap-out) per liberare risorse.
2.  **Frequenza dei Page Fault (PFF):** Un approccio diretto che stabilisce una soglia superiore e inferiore di fault. Se un processo genera troppi fault, riceve più frame; se ne genera troppi pochi, i suoi frame vengono ridotti.

## Gestione della memoria nel kernel

A differenza dei processi utente, il kernel richiede spesso allocazioni di memoria **fisicamente contigue** (per interagire con l'hardware via DMA). Vengono utilizzate due tecniche specifiche:

### Sistema buddy (Buddy System)
Il kernel gestisce la memoria in blocchi di dimensioni pari a potenze di due ($2^n$). Se viene richiesta una quantità di memoria che non corrisponde a una potenza di due, il sistema divide ricorsivamente i blocchi a metà ("buddies") finché non trova la dimensione minima adatta.
* **Vantaggio:** Facilità estrema nel ricompattare i blocchi liberi.
* **Svantaggio:** Rischio di **frammentazione interna** se la richiesta è appena superiore a una potenza di due.

### Slab allocator
Ideato per gestire oggetti di dimensione fissa (come i descrittori dei processi o i nodi del file system). Organizza la memoria in **Slab** (lastre) che contengono oggetti pre-allocati.
* **Cache dedicate:** Ogni tipo di struttura dati ha la sua cache.
* **Zero frammentazione:** Elimina la frammentazione interna ed evita il costo computazionale di allocazione/deallocazione continua.

## Ottimizzazioni moderne e il caso Linux

Nei sistemi contemporanei, l'efficienza è spinta all'estremo attraverso:
* **TLB Reach:** L'uso di "Huge Pages" (pagine di dimensioni maggiori, es. 2MB o 1GB) per aumentare la porzione di memoria indirizzabile senza causare un flush del TLB.
* **Compressione della Memoria (ZRAM):** Comune nei dispositivi mobili; invece di fare swap su disco, le pagine meno usate vengono compresse in una porzione dedicata della RAM.

### Come gestisce Linux il rimpiazzo?
Linux non usa un algoritmo LRU puro (troppo costoso), ma una sua approssimazione efficace tramite due liste:
1.  **Active List:** Pagine referenziate di recente.
2.  **Inactive List:** Pagine candidate alla rimozione.
Attraverso il bit di accesso, il kernel sposta dinamicamente le pagine tra queste liste (meccanismo a "due mani"), garantendo che le pagine più preziose rimangano in memoria il più a lungo possibile.

---
> **Key Takeaway:** L'allocazione dei frame non è solo una questione di spazio, ma di tempo. Un kernel che sa prevedere il working set dei suoi processi è la differenza tra una workstation fluida e un sistema in costante attesa del disco.