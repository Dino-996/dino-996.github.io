---
layout: layouts/post.njk
title: Sincronizzazione dei processi
description: Viene esaminata la sincronizzazione dei processi nei sistemi operativi, focalizzandosi sulla gestione dell'accesso concorrente a dati condivisi per prevenire le race condition.
tags:
  - posts
  - sistemi operativi
  - processi
date: 2020-02-03
excerpt: In questo articolo esploriamo la sincronizzazione dei processi per garantire mutua esclusione, progresso e attesa limitata nella sezione critica. Vengono illustrati strumenti che spaziano dal supporto hardware (CAS) a mutex, semafori e monitor, analizzando criticità di liveness come stallo e inversione di priorità. La selezione della tecnica più efficiente viene infine valutata in base al livello di contesa del sistema.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Sincronizzazione dei Processi

La sincronizzazione dei processi è uno dei problemi fondamentali dell’informatica dei sistemi. Quando più thread o processi accedono a dati condivisi, il rischio di inconsistenza diventa concreto. Comprendere e progettare correttamente la **sezione critica** è essenziale per garantire sicurezza, affidabilità e scalabilità.

## Il Problema della Sezione Critica

Una **sezione critica (Critical Section, CS)** è la porzione di codice in cui un [processo](https://dino-996.github.io/blog/processi/) o [thread](https://dino-996.github.io/blog/thread/) accede e modifica risorse condivise.

Qualsiasi soluzione corretta deve soddisfare tre proprietà fondamentali:

* **Mutua esclusione**: se un processo è nella CS, nessun altro può entrarvi.
* **Progresso**: la scelta del prossimo processo da far entrare non può essere rinviata indefinitamente.
* **Attesa limitata**: esiste un limite massimo al numero di accessi consentiti ad altri processi prima che una richiesta venga soddisfatta.

### Kernel preemptive e non preemptive

Nei kernel **non preemptive**, un processo in modalità kernel non viene interrotto fino al termine della sua esecuzione in tale modalità. Questo riduce il rischio di race condition interne al kernel, ma non costituisce una protezione generale: le condizioni di gara possono comunque verificarsi tra thread in user space o in sistemi multiprocessore.

Nei sistemi moderni, prevalentemente **preemptive e multi-core**, la sincronizzazione è un requisito strutturale.

## Modelli di Memoria e Riordino delle Istruzioni

Le architetture moderne (x86, ARM, Power) adottano **modelli di memoria debolmente ordinati**. Compilatori e CPU possono riordinare le istruzioni per ottimizzazione.

Senza adeguate **memory barrier** o **memory fence** (istruzioni che impongono un vincolo sull’ordine con cui operazioni di lettura e scrittura in memoria possono essere eseguite e rese visibili agli altri thread), un algoritmo teoricamente corretto può fallire nella pratica.

Questo è il motivo per cui soluzioni puramente software come l’algoritmo di Peterson non sono affidabili su hardware moderno senza primitive di sincronizzazione esplicite.

## Soluzioni Software e Supporto Hardware

### Algoritmo di Peterson

Soluzione elegante per due processi basata su variabili condivise (`flag` e `turn`).

Limiti principali:

* Non scala oltre due thread.
* Non sicura su architetture moderne senza memory fence.
* Non adatta a sistemi ad alta contesa.

È oggi più rilevante come esercizio teorico che come soluzione pratica.

### Primitive Atomiche Hardware

Le CPU moderne offrono istruzioni atomiche come:

* `test_and_set`
* `compare_and_swap (CAS)`

Il **CAS** è particolarmente importante nei sistemi concorrenti moderni.

Esempio concettuale:

```
CAS(address, expected, new_value)
```

Aggiorna il valore solo se coincide con `expected`.

Problemi possibili:

* **ABA problem**
* **Starvation** in presenza di alta contesa

Queste primitive sono alla base di strutture dati **lock-free**.

## Strumenti di Sincronizzazione di Alto Livello

### Mutex

Strumento basilare per garantire mutua esclusione.

Due categorie principali:

* **Spinlock**: attesa attiva (busy waiting). Efficiente per sezioni critiche molto brevi su sistemi multi-core.
* **Mutex bloccanti**: sospendono il thread, evitando spreco di CPU ma con overhead di context switch.

### Semafori

Variabili intere gestite tramite operazioni atomiche:

* `wait()` (P)
* `signal()` (V)

Possono essere:

* **Binari** (equivalenti a mutex)
* **Contatori** (gestione pool di risorse)

### Monitor

Costrutti di alto livello che incapsulano:

* Dati condivisi
* Procedure
* Variabili condizionali

Garantiscono mutua esclusione automatica.

## Esempi in Python e Java

### Python (threading)

```python
import threading

lock = threading.Lock()
counter = 0

def increment():
    global counter
    with lock:
        counter += 1
```

Nota: a causa del **GIL (Global Interpreter Lock)**, il threading in CPython non è realmente parallelo su CPU-bound tasks.

---

### Java

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger counter = new AtomicInteger(0);

public void increment() {
    counter.incrementAndGet();
}
```

Java fornisce:

* `synchronized`
* `ReentrantLock`
* package `java.util.concurrent`

Il modello di memoria Java definisce formalmente la visibilità delle variabili condivise.

## Liveness e Problemi Classici

La **liveness** misura la capacità del sistema di garantire progresso.

Principali criticità:

* **Deadlock**: attesa circolare indefinita.
* **Starvation**: un processo non ottiene mai accesso alla risorsa.
* **Priority Inversion**: un processo ad alta priorità bloccato da uno a bassa priorità.

Caso emblematico: **Mars Pathfinder (1997)**. Il problema fu risolto abilitando il meccanismo di *priority inheritance*.

## Sincronizzazione e Scalabilità in Ambiente Cloud Native

Nei **sistemi distribuiti** (insieme di computer indipendenti che collaborano tra loro come se fossero un unico sistema coerente agli occhi dell’utente o delle applicazioni), la sincronizzazione non riguarda più solo thread locali.

Si utilizzano:

* **Lock distribuiti** (meccanismo che garantisce mutua esclusione tra processi o servizi che girano su nodi diversi di un sistema distribuito) ([Redis](https://redis.io/), [ZooKeeper](https://zookeeper.apache.org/))
* **Transazioni database** (insieme di operazioni che vengono trattate con un'unica unit&agrave; logica di lavoro)
* **Algoritmi di consenso** (meccanismo che permette a un insieme di nodi di un sistema distribuito di accordarsi su un singolo valore o decisione, anche in presenza di guasti o comunicazioni ritardate) ([Raft](https://raft.github.io/raft.pdf), [Paxos](https://www.cs.cornell.edu/home/rvr/Paxos/paxos.pdf)) - Per approfondire: [Paxos vs Raft: Have we reached consensus on distributed consensus?](https://arxiv.org/abs/2004.05074)

In architetture **microservizi**, l’eccesso di lock distribuiti può compromettere la scalabilità (intesa come capacità di un sistema di gestire un aumento del carico di lavoro senza degradare significativamente le prestazioni.).

Approcci moderni:

* Design **event-driven**
* Code di messaggi
* Architetture idempotenti
* Programmazione lock-free

## Valutazione in Base al Livello di Contesa

* **Bassa o moderata contesa**: strutture basate su CAS spesso più performanti.
* **Alta contesa**: mutex e meccanismi bloccanti possono risultare più efficienti.

La scelta dipende da:

* Durata della sezione critica
* Numero di core
* Pattern di accesso
* Requisiti di latenza