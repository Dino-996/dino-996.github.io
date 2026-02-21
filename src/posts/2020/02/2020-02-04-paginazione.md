---
layout: layouts/post.njk
title: Paginazione
description: La paginazione è una tecnica di gestione della memoria che permette di allocare i processi in modo non contiguo per eliminare la frammentazione esterna.
tags:
  - posts
  - sistemi operativi
  - paginazione
date: 2020-02-04
excerpt: In questo articolo si descrive come la **Memory Management Unit (MMU)** converta gli indirizzi logici in fisici suddividendo la memoria in pagine e frame, supportata da strutture hardware come il **TLB** per accelerare le traduzioni. Vengono esaminate diverse configurazioni delle tabelle delle pagine, incluse quelle gerarchiche, invertite e basate su hash, insieme ai meccanismi di protezione e condivisione del codice. Approfondiamo inoltre il concetto di **swapping**, analizzando le differenze tra l'approccio standard e quello utilizzato nei sistemi mobili come **iOS** e **Android**, con esempi concreti di implementazione nelle architetture **Intel IA-32**, **x86-64** e **ARMv8**, evidenziandone le specifiche granularità e i livelli di traduzione.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

---

## Concetti Fondamentali e Meccanismo di Traduzione

L'architettura della paginazione suddivide la memoria in blocchi di dimensione fissa:

- **Pagine**: blocchi di dimensione fissa nello spazio di indirizzamento *logico* del processo.
- **Frame**: blocchi di pari dimensione nello spazio di indirizzamento *fisico* della RAM.

Ogni indirizzo generato dalla CPU è composto da due parti:

<table class="table table-bordered table-hover ">
  <thead class="table-dark">
    <tr>
      <th>Campo</th>
      <th>Simbolo</th>
      <th>Ruolo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Numero di pagina</td>
      <td><code>p</code></td>
      <td>Indice nella tabella delle pagine</td>
    </tr>
    <tr>
      <td>Offset di pagina</td>
      <td><code>d</code></td>
      <td>Posizione all'interno del frame</td>
    </tr>
  </tbody>
</table>

La MMU traduce un indirizzo logico `(p, d)` in un indirizzo fisico `(f, d)` estraendo
il numero di frame `f` dalla tabella delle pagine e concatenandolo con l'offset.

---

<div class="d-flex align-items-center justify-content-center gap-2 flex-wrap my-4">

  <!-- Indirizzo Logico -->
  <div class="border rounded px-3 py-2 text-center">
    <small class="text-muted d-block">Indirizzo Logico</small>
    <span class="fw-bold font-monospace">p &nbsp;|&nbsp; d</span>
  </div>

  <div class="text-muted">→</div>

  <!-- Tabella delle Pagine -->
  <div class="border rounded px-3 py-2 bg-primary text-white text-center">
    <small class="d-block" style="opacity:.75">lookup</small>
    <span class="fw-bold">Page Table</span>
  </div>

  <div class="text-muted">→</div>

  <!-- MMU -->
  <div class="border rounded px-3 py-2 bg-secondary text-white text-center fw-bold">
    MMU
  </div>

  <div class="text-muted">→</div>

  <!-- Indirizzo Fisico -->
  <div class="border rounded px-3 py-2 text-center">
    <small class="text-muted d-block">Indirizzo Fisico</small>
    <span class="fw-bold font-monospace">f &nbsp;|&nbsp; d</span>
  </div>

</div>

---

La dimensione delle pagine è definita dall'hardware e corrisponde sempre a una potenza
di 2 (tipicamente tra **4 KB e 1 GB**), il che semplifica il calcolo degli indirizzi a
operazioni di shift e mask sui bit.

## Frammentazione e Condivisione del Codice

La paginazione **elimina la frammentazione esterna**: qualsiasi frame libero può essere
assegnato a un processo indipendentemente dalla sua posizione fisica. Introduce però la
**frammentazione interna**: se la memoria richiesta non è multiplo esatto della dimensione
della pagina, l'ultimo frame assegnato risulta parzialmente inutilizzato.

Un vantaggio significativo è la **condivisione del codice**: in ambienti multiprocesso è
possibile mantenere in memoria una sola copia di librerie condivise (es. `libc`).
Le tabelle delle pagine di processi distinti puntano agli stessi frame marcati come
*read-only*, garantendo protezione e risparmio di memoria.

## Supporto Hardware: il TLB

Poiché la tabella delle pagine risiede in memoria principale, senza ottimizzazioni ogni
accesso ai dati richiederebbe **due accessi in memoria** (uno per la tabella, uno per il
dato). Il **TLB (Translation Lookaside Buffer)** è una piccola cache hardware ad
altissima velocità che risolve questo problema.

---

<div class="d-inline-flex flex-column gap-3">

  <!-- CPU → TLB → Frame (hit) -->
  <div class="d-flex align-items-center gap-2">
    <div class="border rounded px-3 py-2 text-center fw-bold">CPU</div>
    <div class="text-muted">→</div>
    <div class="border rounded px-3 py-2 bg-primary text-white text-center fw-bold">TLB</div>
    <div class="text-muted">→</div>
    <div class="border rounded px-3 py-2 text-success text-center">
      <small class="d-block text-muted">hit</small>
      <span class="fw-bold">Frame</span>
    </div>
  </div>

  <!-- freccia giù + label -->
  <div class="d-flex align-items-center gap-2">
    <div style="width: 106px;"></div> <!-- spacer allineato al TLB -->
    <div class="text-muted d-flex flex-column align-items-center">
      <small>miss</small>
      <span>↓</span>
    </div>
  </div>

  <!-- Page Table → Frame (miss) -->
  <div class="d-flex align-items-center gap-2">
    <div style="width: 106px;"></div> <!-- spacer allineato al TLB -->
    <div class="border rounded px-3 py-2 bg-warning-subtle text-center">
      <small class="text-muted d-block">miss</small>
      <span class="fw-bold">Page Table</span>
      <small class="text-muted d-block">in RAM</small>
    </div>
    <div class="text-muted">→</div>
    <div class="border rounded px-3 py-2 text-center">
      <small class="text-muted d-block">+ aggiornamento TLB</small>
      <span class="fw-bold">Frame</span>
    </div>
  </div>

</div>

---

- **TLB hit**: il numero di frame è immediatamente disponibile, nessun accesso extra.
- **TLB miss**: si consulta la tabella in memoria, con penalità di latenza.

### Calcolo del Tempo di Accesso Effettivo (EAT)

Dato un hit ratio $h$ e un tempo di accesso alla memoria $t$:

$\text{EAT}=ht+(1-h)2t=t(2-h)$

Con $h=0.99$ e $t = 100 \text{ns}$:

$\text{EAT}=100(2-0.99)=101 \text{ns}$

Alcuni TLB utilizzano gli **ASID (Address-Space Identifiers)** per taggare le entry per
processo, evitando il flush completo della cache a ogni cambio di contesto e migliorando
sensibilmente le prestazioni in sistemi multiprocesso.

## Struttura delle Tabelle delle Pagine

Con spazi di indirizzamento a 64 bit, una tabella delle pagine piatta occuperebbe
quantità di memoria proibitive. Si adottano quindi strutture alternative:

### Paginazione Gerarchica
La tabella stessa viene paginata su più livelli (tipicamente 2–4). Su x86-64 si usano
4 livelli: PML4 → PDPT → PD → PT. Il registro **CR3** punta alla tabella di livello
superiore (PML4).

### Tabelle Hash
Comuni per spazi di indirizzamento superiori a 32 bit. Ogni entry contiene una lista
concatenata per gestire le collisioni. Variante comune: **clustered page tables**, che
mappano più pagine per entry.

### Tabella Invertita
Un'unica tabella di sistema con un'entry per ogni **frame fisico** (anziché per ogni
pagina logica). Riduce drasticamente l'occupazione di memoria, ma complica la ricerca
(spesso si affianca una hash table per accelerarla).

## Huge Pages: un'Ottimizzazione per Sistemi Moderni

In scenari ad alte prestazioni (database, JVM, ambienti cloud-native), si utilizzano
**Huge Pages** (2 MB o 1 GB su x86-64) per ridurre il numero di entry nella tabella
delle pagine e aumentare l'hit rate del TLB.

Su Linux è possibile abilitarle tramite:
```bash
# Verifica disponibilità
grep -i hugepages /proc/meminfo

# Allocazione di 512 huge pages da 2MB (= 1GB)
echo 512 > /proc/sys/vm/nr_hugepages
```

Framework come **Java HotSpot** (`-XX:+UseHugePages`) e **DPDK** le sfruttano
attivamente per ridurre la latenza.

## Swapping e Memoria Ausiliaria

Lo swapping consente di spostare temporaneamente pagine o interi processi dalla RAM a
una **memoria ausiliaria (backing store)**, estendendo virtualmente la memoria disponibile.

### Desktop e Server (Linux/Windows)
Supportano lo swapping standard e lo **swapping con paginazione** (demand paging).
Su Linux, strumenti moderni come **`zswap`** e **`zram`** comprimono le pagine prima
di scriverle su disco, riducendo la latenza e l'usura degli SSD — particolarmente
rilevante in ambienti containerizzati (Docker, Kubernetes).

### Sistemi Mobili (iOS / Android)
Le memorie flash hanno cicli di scrittura limitati e latenze non trascurabili, quindi:

- **iOS** non implementa swapping tradizionale: notifica alle app di liberare memoria
  volontariamente tramite i *memory pressure notifications*.
- **Android** salva lo stato dell'app nello storage prima di terminarla (*killed process*),
  consentendo un riavvio rapido con ripristino dello stato.

## Architetture Reali a Confronto

### Intel IA-32
Utilizza un sistema misto **segmentazione + paginazione a due livelli**. L'estensione
**PAE (Physical Address Extension)** espande gli indirizzi fisici da 32 a **36 bit**,
permettendo ai processori a 32 bit di indirizzare fino a **64 GB** di RAM fisica (pur
mantenendo uno spazio virtuale per processo di 4 GB).

### Intel x86-64
Adotta una struttura a **4 livelli** (estendibile a 5 con LA57), gestita dal registro
**CR3**. Supporta pagine da 4 KB, 2 MB (Large Pages) e 1 GB (Huge Pages).

### ARMv8 / AArch64
Supporta granularità di traduzione di **4 KB, 16 KB e 64 KB** con fino a **4 livelli**
di paginazione. Il registro **TTBR0** punta alla tabella del processo utente, **TTBR1**
a quella del kernel, separando nettamente i due spazi di indirizzamento.

## Best Practice per gli Sviluppatori

**Perché un dev dovrebbe preoccuparsene?** Le scelte di allocazione impattano direttamente le performance a causa dell'interazione con la paginazione.

- **Evita allocazioni frammentate**: preferisci buffer contigui (array vs linked list)
  per massimizzare la locality e ridurre i TLB miss.
- **Valuta Huge Pages** per applicazioni con working set > 1 GB (JVM, Redis, PostgreSQL).
- **Attenzione ai memory-mapped file** (`mmap`): sfruttano direttamente la paginazione
  e possono ridurre le copie di dati tra kernel e userspace.
- **Profila i TLB miss** con `perf stat -e dTLB-load-misses ./myapp` su Linux prima
  di ottimizzare prematuramente.