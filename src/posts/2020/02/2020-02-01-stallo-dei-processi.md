---
layout: layouts/post.njk
title: Stallo dei processi
description: Viene esaminato il fenomeno dello stallo dei processi (deadlock) nei sistemi operativi, analizzando come più thread competano per risorse limitate.
tags:
  - posts
  - sistemi operativi
  - processi
date: 2020-02-01
excerpt: In questo articolo approfondiamo le quattro condizioni necessarie affinché si verifichi un blocco totale, distinguendo tra il classico deadlock e il livelock, o stallo attivo. Vengono illustrati diversi strumenti diagnostici, come il grafo di assegnazione delle risorse, e algoritmi complessi come quello del banchiere per garantire uno stato di esecuzione sicuro. Infine, vengono descritte le tecniche di ripristino, che includono la terminazione forzata dei processi o la prelazione delle risorse per interrompere i cicli di attesa circolare.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/sistemi-operativi.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Deadlock

Lo **stallo (deadlock)** è una condizione in cui un insieme di thread o processi rimane bloccato perché ciascuno attende una risorsa detenuta da un altro elemento del gruppo.

In un sistema con multiprogrammazione, le entità concorrenti competono per un numero finito di **risorse** (CPU, memoria, file, socket, lock, connessioni database). Una risorsa viene:

1. Richiesta
2. Assegnata
3. Utilizzata
4. Rilasciata

Se una risorsa è già assegnata, il richiedente entra in stato di attesa. In determinate condizioni, questa attesa può diventare permanente.

## Le quattro condizioni necessarie allo stallo

Affinché si verifichi un deadlock, devono coesistere simultaneamente quattro condizioni (Coffman conditions):

1. **Mutua esclusione**
   Almeno una risorsa deve essere non condivisibile (es. un lock esclusivo).
2. **Possesso e attesa (Hold and Wait)**
   Un thread detiene almeno una risorsa e ne attende altre.
3. **Assenza di prelazione (No Preemption)**
   Le risorse non possono essere sottratte forzatamente; devono essere rilasciate volontariamente.
4. **Attesa circolare (Circular Wait)**
   Esiste una catena chiusa di attese tra thread/processi.

Rimuovere anche solo una di queste condizioni impedisce il verificarsi dello stallo.

## Deadlock, Livelock e Starvation

È essenziale distinguere tre fenomeni diversi:

* **Deadlock**: blocco permanente.
* **Livelock**: i thread sono attivi ma non progrediscono (ad esempio, rilasciano e riacquisiscono risorse continuamente).
* **Starvation**: un thread non ottiene mai una risorsa a causa di politiche di scheduling sbilanciate.

In sistemi ad alta concorrenza, la starvation è spesso più subdola del deadlock.

## Grafo di Assegnazione delle Risorse (RAG)

Le situazioni di stallo possono essere modellate tramite un **Resource Allocation Graph**:

* Nodi circolari → thread/processi
* Nodi rettangolari → risorse
* Arco da thread a risorsa → richiesta
* Arco da risorsa a thread → assegnazione

### Proprietà fondamentali

* **Nessun ciclo → nessun deadlock**
* **Ciclo con una sola istanza per risorsa → deadlock certo**
* **Ciclo con più istanze → condizione necessaria ma non sufficiente**

Nel caso di risorse con singola istanza, si utilizza spesso il **grafo di attesa**, più semplice da analizzare.

## Strategie di Gestione dello Stallo

### Ignorare il problema (Approccio “Ostrich”)

Sistemi come Microsoft Windows e Linux non implementano meccanismi generali di prevenzione del deadlock a livello kernel per tutte le risorse applicative.

La responsabilità è delegata allo sviluppatore. È una scelta pragmatica: prevenzione ed evitamento hanno costi computazionali elevati.

### Prevenzione

Consiste nell’eliminare una delle quattro condizioni necessarie. Un esempio pratico può essere quello di prevenire l’attesa circolare imponendo un **ordinamento globale dei lock**. Se ogni thread acquisisce sempre le risorse nello stesso ordine, il ciclo non può formarsi.

### Evitamento

Richiede conoscenza preventiva delle richieste massime di risorse. L’**algoritmo del banchiere** verifica che ogni assegnazione mantenga il sistema in uno **stato sicuro**, ossia uno stato da cui esiste almeno una sequenza di completamento per tutti i processi. È elegante dal punto di vista teorico, ma raramente applicato nei sistemi general-purpose moderni a causa dell’overhead e della necessità di informazioni complete.

#### Algoritmo del banchiere

La complessità di questo algoritmo è $O(n^2 m)$, dove $n$ è il numero di processi e $m$ il numero di tipi di risorse.

Supponiamo:
- 3 processi: $P_0, P_1, P_2$
- 3 tipi di risorse: $A, B, C$

Risorse totali disponibili: $\text{Avaible} = [3,3,2]$

##### Matrice delle richieste massime:
<div class="mb-2">
$
\text{Max}=
\begin{bmatrix}
7 & 5 & 3 \\
3 & 2 & 2 \\
9 & 0 & 2
\end{bmatrix}
$
</div>

- indica il **massimo** che ogni processo potrebbe richiedere per ciascuna risorsa. Ad esempio, $P_0$ potrebbe richiedere al massimo 7 unità di $A$, 5 di $B$ e 3 di $C$.

##### Risorse già assegnate:
<div class="mb-2">
$
\text{Allocation}=
\begin{bmatrix}
0 & 1 & 0 \\
2 & 0 & 0 \\
3 & 0 & 2
\end{bmatrix}
$
</div>

- indica quante risorse sono **già state date** a ciascun processo. Ad esempio, $P_1$ ha già ricevuto 2 unità di $A$, 0 di $B$ e 0 di $C$.

##### Calcolo delle risorse ancora necessarie:
<div class="mb-2">
$
\text{Need}=\text{Max - Allocation}=
\begin{bmatrix}
7 & 4 & 3 \\
1 & 2 & 2 \\
6 & 0 & 0
\end{bmatrix}
$
</div>

- Si ottiene sottraendo riga per riga: ad esempio per $P_0$, $\text{Need}[0] = [7,5,3] - [0,1,0] = [7,4,3]$. Rappresenta quante risorse mancano ancora a ciascun processo per completare la propria esecuzione.

##### Verifica dello stato sicuro

L'algoritmo cerca iterativamente un processo $P_i$ che soddisfi la condizione $\text{Need}[i] \leq \text{Avaible}$, ovvero un processo che possa essere eseguito con le risorse attualmente disponibili. Se lo trova, simula la sua esecuzione: le risorse che gli erano state assegnate vengono "liberate" e aggiunte ad $\text{Avaible}$. Si ripete finché tutti i processi sono stati eseguiti (stato sicuro) oppure non si trova più nessun processo eseguibile (stato non sicuro).

Partendo da $P_0$ con $\text{Avaible} = [3,3,2]$:
- $P_0 \text{: } \text{Need[0]} = [7,4,3] \to \text{Non soddisfa le condizioni: } 7 > 3 \text{ già alla prima risorsa.}$
- $P_1 \text{: } \text{Need[1]} = [1,2,2] \to \text{Soddisfa le condizioni: } 1 \leq 3, 2 \leq 3, 2 \leq 2. $

$P_1$ viene eseguito e le risorse vengono rilasciate. $\text{Avaible}$ si aggiorna sommando $\text{Allocation}[1] = [2,0,0]$:
- $\text{Avaible} = [3,3,2] + [2,0,0] = [5,3,2]$

Ripartiamo da $P_0$ con $\text{Avaible} = [5,3,2]$:
- $P_0 \text{: } \text{Need[0]} = [7,4,3] \to \text{Non soddisfa le condizioni: } 7 > 5 \text{ già alla prima risorsa.}$
- $P_2 \text{: } \text{Need[2]} = [6,0,0] \to \text{Non soddisfa le condizioni: } 6 > 5 \text{ già alla prima risorsa.}$

Nessun processo è eseguibile: non è possibile trovare una sequenza sicura. **Lo stato è non sicuro**, il che significa che il sistema non può garantire che tutti i processi riescano a completarsi. L'algoritmo del banchiere avrebbe quindi rifiutato l'allocazione che ha portato a questo stato.

**Conclusione**: se provassimo a dare subito le risorse disponibili senza priorità andremmo in contro a uno stato non sicuro.

Se inizialmente avremmo avuto $\text{Avaible}=[10,5,7]$:
- $P_0 \text{: } \text{Need[0]} = [7,4,3] \to \text{Soddisfa le condizioni: } 7 \leq 12, 4 \leq 5, 3 \leq 7. \quad \text{Avaible} = [12,5,7] + [0,1,0] = [12,6,7]$
- $P_1 \text{: } \text{Need[1]} = [1,2,2] \to \text{Soddisfa le condizioni: } 1 \leq 10, 2 \leq 5, 2 \leq 7. \quad \text{Avaible} = [10,5,7] + [2,0,0] = [12,5,7]$
- $P_2 \text{: } \text{Need[2]} = [6,0,0] \to \text{Soddisfa le condizioni: } 6 \leq 12, 0 \leq 6, 0 \leq 7. \quad \text{Avaible} = [12,6,7] + [3,0,2] = [15,6,9]$

**Sequenza sicura**: $P_0 \to P_1 \to P_2$

### Rilevamento e Ripristino

Utilizzato soprattutto nei database e nei sistemi transazionali.

* Rilevamento periodico tramite analisi del grafo di attesa.
* Ripristino tramite:
  * Terminazione di processi
  * Prelazione con rollback
  * Selezione di una “vittima” secondo criteri di costo

# Deadlock nella pratica: esempi concreti

## Esempio in Python

```python
import threading
import time

lock1 = threading.Lock()
lock2 = threading.Lock()

def thread1():
    with lock1:
        time.sleep(1)
        with lock2:
            print("Thread 1 acquisito lock2")

def thread2():
    with lock2:
        time.sleep(1)
        with lock1:
            print("Thread 2 acquisito lock1")

t1 = threading.Thread(target=thread1)
t2 = threading.Thread(target=thread2)

t1.start()
t2.start()
```

Qui:

* Thread 1 acquisisce `lock1`
* Thread 2 acquisisce `lock2`
* Entrambi attendono il lock detenuto dall’altro

Deadlock perfetto.

### Soluzione

Imporre un ordine globale di acquisizione dei lock.

## Esempio in Java

```java
public class DeadlockExample {

    private static final Object lock1 = new Object();
    private static final Object lock2 = new Object();

    public static void main(String[] args) {

        Thread t1 = new Thread(() -> {
            synchronized (lock1) {
                try { 
                    Thread.sleep(100); 
                } catch (InterruptedException e) {}
                synchronized (lock2) {}
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (lock2) {
                try { 
                    Thread.sleep(100); 
                } catch (InterruptedException e) {}
                synchronized (lock1) {}
            }
        });

        t1.start();
        t2.start();
    }
}
```

In ambienti enterprise basati su Java, questo errore può compromettere interi application server.

# Deadlock e Cloud Native

Nel paradigma **Cloud Native**, il deadlock non riguarda solo thread locali.

Può emergere tra:

* Microservizi che attendono risposte reciproche
* Pool di connessioni database saturi
* Lock distribuiti
* Transazioni distribuite

Un pool di connessioni esaurito può generare un deadlock applicativo che si traduce in:

* Saturazione CPU
* Timeout a cascata
* Riduzione della disponibilità (effetto simile a un DoS logico)

Qui il problema diventa anche di **sicurezza e resilienza operativa**.