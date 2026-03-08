---
layout: layouts/post.njk
title: Tecniche Algoritmiche per Dev Java
description: Questa guida raccoglie le tecniche algoritmiche più comuni utilizzate nello sviluppo software quotidiano. Le seguenti tecniche sono descritte il linguaggio Java.
tags:
  - posts
  - algoritmi
  - java
date: 2020-03-05
excerpt: L'obiettivo di questa guida non è una trattazione accademica, ma offrire strumenti pratici per risolvere problemi ricorrenti quando si lavora con collezioni di dati.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/java.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

> **Versione di riferimento:** Java 17 LTS (o superiore). Gli esempi sfruttano feature
> moderne come `record`, `var`, `Stream API` e `Optional`. Alcuni snippet sono compatibili
> anche con Java 11+, dove indicato.

Gli esempi si concentrano sull'uso delle strutture dati della libreria standard:
`List`, `Set` e `Map`.

Per ogni tecnica sono presentati:

- il problema da risolvere
- la complessità computazionale (notazione Big-O)
- un'implementazione imperativa
- un'alternativa funzionale con Stream API
- note sui casi limite e le best practice

---

### La classe `Product` usata negli esempi

Per mantenere gli esempi concisi e moderni, utilizziamo un **Java Record** — introdotto
in Java 16 e stabile da Java 17. I record sono ideali per modellare dati immutabili
(Value Object, DTO).
```java
public record Product(
    String codice,
    String nome,
    double prezzo,
    boolean disponibile
) {}
```

> **Perché un `record`?** Rispetto a una classe tradizionale, il compilatore genera
> automaticamente costruttore, getter, `equals()`, `hashCode()` e `toString()`.
> Perfetto per oggetti di sola lettura come i prodotti di un catalogo.

---

## Iterazione e Aggregazione

Molte operazioni software richiedono di attraversare una collezione per produrre
un risultato aggregato: una somma, una media, un conteggio o una verifica logica.

Queste operazioni condividono lo stesso schema:

1. **Attraversamento sequenziale** della collezione
2. **Accumulazione** di uno stato
3. **Restituzione** di un risultato

La complessità è generalmente **O(n)**, dove *n* è il numero di elementi.

## Somma di una collezione

### Problema
Calcolare la somma di una lista di valori numerici.

### Implementazione imperativa
```java
public static double calcolaTotale(List<Double> importi) {
    Objects.requireNonNull(importi, "La lista degli importi non può essere null");

    double totale = 0.0;
    for (double importo : importi) {
        totale += importo;
    }
    return totale;
}
```

**Complessità: O(n)**

### Versione con Stream API
```java
public static double calcolaTotale(List<Double> importi) {
    Objects.requireNonNull(importi, "La lista degli importi non può essere null");

    return importi.stream()
            .mapToDouble(Double::doubleValue)
            .sum();
}
```

> **Nota:** `mapToDouble()` restituisce un `DoubleStream` primitivo, evitando il boxing/
> unboxing di `Double` → `double`. Preferirlo sempre per operazioni numeriche intensive.

## Calcolo della media

### Problema
Calcolare la media dei valori presenti in una lista.

### Implementazione imperativa
```java
public static double calcolaMedia(List<Double> valori) {
    Objects.requireNonNull(valori, "La lista non può essere null");
    if (valori.isEmpty()) {
        throw new IllegalArgumentException("La lista non può essere vuota");
    }

    double somma = 0.0;
    for (double valore : valori) {
        somma += valore;
    }
    return somma / valori.size();
}
```

### Versione con Stream API
```java
public static double calcolaMedia(List<Double> valori) {
    Objects.requireNonNull(valori, "La lista non può essere null");

    return valori.stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElseThrow(() -> new IllegalArgumentException("Lista vuota"));
}
```

## Conteggio condizionale

### Problema
Contare quanti elementi soddisfano una certa condizione.
*Esempio: quanti importi superano una soglia.*

### Implementazione imperativa
```java
public static long contaImportiMaggioriDi(List<Double> importi, double soglia) {
    Objects.requireNonNull(importi, "La lista non può essere null");

    long conteggio = 0;
    for (double importo : importi) {
        if (importo > soglia) {
            conteggio++;
        }
    }
    return conteggio;
}
```

### Versione con Stream API
```java
public static long contaImportiMaggioriDi(List<Double> importi, double soglia) {
    return importi.stream()
            .filter(i -> i > soglia)
            .count();
}
```

## Verifiche logiche su collezioni

### Esiste almeno un elemento sotto soglia? (`anyMatch`)
```java
// Imperativa
public boolean esisteImportoSottoSoglia(List<Double> importi, double soglia) {
    for (double importo : importi) {
        if (importo < soglia) return true;
    }
    return false;
}

// Stream API
public boolean esisteImportoSottoSoglia(List<Double> importi, double soglia) {
    return importi.stream().anyMatch(importo -> importo < soglia);
}
```

### Tutti gli elementi sono sopra soglia? (`allMatch`)
```java
// Imperativa
public boolean tuttiSopraSoglia(List<Double> importi, double soglia) {
    for (double importo : importi) {
        if (importo <= soglia) return false;
    }
    return true;
}

// Stream API
public boolean tuttiSopraSoglia(List<Double> importi, double soglia) {
    return importi.stream().allMatch(importo -> importo > soglia);
}
```

> **Short-circuit evaluation:** Sia la versione imperativa che `anyMatch`/`allMatch`
> interrompono l'iterazione non appena la condizione è soddisfatta (o falsificata).
> Su liste grandi questo può fare una differenza significativa di performance.

## Ricerca e Filtraggio

La ricerca di elementi in una collezione è tra le operazioni più frequenti. La scelta
dell'algoritmo e della struttura dati ha un impatto diretto sulle prestazioni.

## Ricerca lineare

### Problema
Trovare un elemento in una lista tramite un campo chiave.

### Implementazione imperativa (con `Optional`)
```java
public static Optional<Product> trovaPerCodice(List<Product> prodotti, String codice) {
    Objects.requireNonNull(codice, "Il codice non può essere null");

    for (Product prodotto : prodotti) {
        if (prodotto.codice().equals(codice)) {
            return Optional.of(prodotto);
        }
    }
    return Optional.empty();
}
```

> **Evita `null` come valore di ritorno.** Restituire `null` da un metodo di ricerca è
> una fonte comune di `NullPointerException`. Usa sempre `Optional<T>` per segnalare
> esplicitamente la possibile assenza di un risultato.

**Complessità: O(n)**

### Versione con Stream API
```java
public static Optional<Product> trovaPerCodice(List<Product> prodotti, String codice) {
    return prodotti.stream()
            .filter(p -> p.codice().equals(codice))
            .findFirst();
}
```

## Filtraggio multiplo

### Problema
Estrarre tutti i prodotti che soddisfano più condizioni contemporaneamente.

### Implementazione imperativa
```java
public static List<Product> filtraProdotti(List<Product> prodotti, double prezzoMinimo) {
    List<Product> risultato = new ArrayList<>();

    for (Product prodotto : prodotti) {
        if (prodotto.prezzo() > prezzoMinimo && prodotto.disponibile()) {
            risultato.add(prodotto);
        }
    }
    return risultato;
}
```

### Versione con Stream API
```java
public static List<Product> filtraProdotti(List<Product> prodotti, double prezzoMinimo) {
    return prodotti.stream()
            .filter(p -> p.prezzo() > prezzoMinimo)
            .filter(Product::disponibile)
            .toList(); // Restituisce una lista immutabile (Java 16+)
}
```

> **`toList()` vs `collect(Collectors.toList())`:** Da Java 16, `Stream.toList()` è il
> metodo preferito. Restituisce una lista **immutabile**, il che rende il codice più
> sicuro. Se hai bisogno di una lista mutabile, usa `collect(Collectors.toList())`.

## Ricerca efficiente con `Map`

Quando si effettuano ricerche frequenti per chiave univoca, indicizzare i dati in una
`Map` è molto più efficiente di una ricerca lineare su `List`.
```java
// Costruzione dell'indice (eseguita una sola volta)
Map<String, Product> prodottiPerCodice = new HashMap<>();
for (Product p : prodotti) {
    prodottiPerCodice.put(p.codice(), p);
}

// Con Stream API (più compatto)
Map<String, Product> prodottiPerCodice = prodotti.stream()
        .collect(Collectors.toMap(Product::codice, p -> p));

// Ricerca O(1)
Optional<Product> trovato = Optional.ofNullable(prodottiPerCodice.get(codice));
```

<div class="container my-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Approccio</th>
          <th>Complessità ricerca</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold"><code>List</code> + loop</td>
          <td>O(n)</span></td>
          <td>Semplice, nessun pre-processing</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>HashMap</code></td>
          <td>O(1) media</span></td>
          <td>Richiede indicizzazione iniziale</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>TreeMap</code></td>
          <td>O(log n)</span></td>
          <td>Mantiene l'ordine delle chiavi</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Selezione e Ordinamento

Ordinare una collezione consente di confrontare, visualizzare e cercare dati in modo
prevedibile. Java utilizza **TimSort** — un algoritmo ibrido (MergeSort + InsertionSort)
ottimizzato per dati parzialmente ordinati, molto comune in scenari reali.

**Complessità: O(n log n)** nel caso medio e peggiore.

## Ordinamento crescente con `Comparable`

Se la classe implementa `Comparable<T>`, è possibile ordinare direttamente:
```java
public record Product(String codice, String nome, double prezzo, boolean disponibile)
        implements Comparable<Product> {

    @Override
    public int compareTo(Product altro) {
        return Double.compare(this.prezzo, altro.prezzo);
    }
}

// Utilizzo
prodotti.sort(null); // usa l'ordinamento naturale definito da compareTo
```

## Ordinamento con `Comparator` (approccio preferito)

`Comparator` è più flessibile perché non richiede di modificare la classe e permette
criteri multipli di ordinamento.
```java
// Per prezzo crescente
prodotti.sort(Comparator.comparingDouble(Product::prezzo));

// Per prezzo decrescente
prodotti.sort(Comparator.comparingDouble(Product::prezzo).reversed());

// Ordinamento multi-livello: prima per disponibilità, poi per prezzo crescente
prodotti.sort(
    Comparator.comparing(Product::disponibile).reversed()
              .thenComparingDouble(Product::prezzo)
);
```

> **`comparingDouble()` vs `comparing()`:** Per campi di tipo `double`, usa sempre
> `Comparator.comparingDouble()`. `comparing()` usa il boxing a `Double`, introducendo
> overhead non necessario in collezioni grandi.

## Gestione dei Duplicati

Rilevare e gestire duplicati è un problema comune, ad esempio nella validazione di input
o nel processamento di batch di dati.

## Verificare la presenza di duplicati
```java
public boolean contieneDuplicati(List<Integer> valori) {
    Set<Integer> valoriUnici = new HashSet<>();

    for (Integer valore : valori) {
        if (!valoriUnici.add(valore)) {
            return true; // add() restituisce false se l'elemento era già presente
        }
    }
    return false;
}
```

**Complessità: O(n)** — ogni `add()` su `HashSet` è O(1) in media.

## Rimuovere i duplicati da una lista
```java
// Metodo 1: tramite Set (non preserva l'ordine)
List<String> senzaDuplicati = new ArrayList<>(new HashSet<>(listaConDuplicati));

// Metodo 2: tramite LinkedHashSet (preserva l'ordine di inserimento)
List<String> senzaDuplicatiOrdinati = new ArrayList<>(
        new LinkedHashSet<>(listaConDuplicati)
);

// Metodo 3: Stream API
List<String> senzaDuplicatiStream = listaConDuplicati.stream()
        .distinct()
        .toList();
```

## Deduplicazione per campo specifico

Spesso si vogliono rimuovere oggetti "duplicati" in base a un campo, non per uguaglianza
totale. Un pattern comune usa `Collectors.toMap()`:
```java
// Mantiene il primo prodotto trovato per ogni codice
List<Product> prodottiUnici = new ArrayList<>(
    prodotti.stream()
            .collect(Collectors.toMap(
                Product::codice,
                p -> p,
                (esistente, nuovo) -> esistente // in caso di chiave duplicata, mantieni il primo
            ))
            .values()
);
```

## Trasformazione dei Dati (Mapping)

Trasformare una collezione di oggetti in un'altra è un'operazione fondamentale, spesso
chiamata **mapping**. Con la Stream API, questo processo diventa conciso ed espressivo.

## Trasformazione semplice: estrarre un campo
```java
// Imperativa
public static List<String> estraiNomi(List<Product> prodotti) {
    List<String> nomi = new ArrayList<>();
    for (Product prodotto : prodotti) {
        nomi.add(prodotto.nome());
    }
    return nomi;
}

// Stream API
public static List<String> estraiNomi(List<Product> prodotti) {
    return prodotti.stream()
            .map(Product::nome)
            .toList();
}
```

## Collectors avanzati

I `Collector` di Java permettono aggregazioni sofisticate in una sola passata sulla
collezione. Sono uno strumento essenziale per chi lavora con pipeline di dati.

### Raggruppamento (`groupingBy`)

Raggruppa i prodotti per disponibilità:
```java
Map<Boolean, List<Product>> perDisponibilita = prodotti.stream()
        .collect(Collectors.groupingBy(Product::disponibile));

List<Product> disponibili   = perDisponibilita.get(true);
List<Product> nonDisponibili = perDisponibilita.get(false);
```

### Partizione (`partitioningBy`)

Versione specializzata di `groupingBy` per predicati booleani — più efficiente e
semanticamente più chiara:
```java
Map<Boolean, List<Product>> partizione = prodotti.stream()
        .collect(Collectors.partitioningBy(p -> p.prezzo() > 100.0));
```

### Costruzione di una Map (`toMap`)
```java
// Map<codice, nomeProdotto>
Map<String, String> codiceToNome = prodotti.stream()
        .collect(Collectors.toMap(Product::codice, Product::nome));
```

### Conteggio per gruppo (`groupingBy` + `counting`)
```java
// Quanti prodotti per fascia di prezzo? (esempio semplificato)
Map<String, Long> conteggioPerFascia = prodotti.stream()
        .collect(Collectors.groupingBy(
            p -> p.prezzo() > 100.0 ? "premium" : "standard",
            Collectors.counting()
        ));
```

## Parallel Streams: quando usarli (e quando no)

La Stream API supporta l'elaborazione parallela tramite `parallelStream()`. È una
funzionalità potente, ma va usata con cautela.
```java
// Esempio di parallel stream per somma su lista molto grande
double totale = importiMoltoGrandi.parallelStream()
        .mapToDouble(Double::doubleValue)
        .sum();
```

**Quando conviene:**
- Collezioni con **milioni di elementi**
- Operazioni **CPU-intensive** e **stateless** (senza effetti collaterali)

**Quando non conviene:**
- Collezioni piccole (l'overhead di gestione dei thread supera il guadagno)
- Operazioni con **side-effect** (es. scrittura su variabili condivise)
- Operazioni di I/O (usa `CompletableFuture` in questi casi)

> **Regola pratica:** Misura sempre con un benchmark reale (es. JMH) prima di passare
> a `parallelStream()`. In molti casi la versione sequenziale è più veloce.

## Scelta delle Strutture Dati

La struttura dati corretta può fare la differenza tra un'applicazione performante e una
che degrada sotto carico. La tabella seguente riassume le complessità principali.

<div class="container mb-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Struttura</th>
          <th>Accesso</th>
          <th>Ricerca</th>
          <th>Inserimento (coda)</th>
          <th>Inserimento (posizione)</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold"><code>ArrayList</code></td>
          <td><span class="badge text-bg-success">O(1)</span></td>
          <td><span class="badge text-bg-warning">O(n)</span></td>
          <td><span class="badge text-bg-success">O(1) ammortizzato</span></td>
          <td><span class="badge text-bg-warning">O(n)</span></td>
          <td>Preferita per uso generale</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>LinkedList</code></td>
          <td><span class="badge text-bg-warning">O(n)</span></td>
          <td><span class="badge text-bg-warning">O(n)</span></td>
          <td><span class="badge text-bg-success">O(1)</span></td>
          <td><span class="badge text-bg-success">O(1) *</span></td>
          <td>*Con riferimento diretto al nodo</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>HashSet</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="text-muted">—</span></td>
          <td>No duplicati, no ordine</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>LinkedHashSet</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="text-muted">—</span></td>
          <td>No duplicati, ordine inserimento</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>TreeSet</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-info">O(log n)</span></td>
          <td><span class="badge text-bg-info">O(log n)</span></td>
          <td><span class="text-muted">—</span></td>
          <td>No duplicati, ordinato</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>HashMap</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="text-muted">—</span></td>
          <td>Chiave → valore, no ordine</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>LinkedHashMap</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="badge text-bg-success">O(1) med.</span></td>
          <td><span class="text-muted">—</span></td>
          <td>Ordine di inserimento</td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>TreeMap</code></td>
          <td><span class="text-muted">—</span></td>
          <td><span class="badge text-bg-info">O(log n)</span></td>
          <td><span class="badge text-bg-info">O(log n)</span></td>
          <td><span class="text-muted">—</span></td>
          <td>Ordinato per chiave</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Linee guida pratiche

- **Hai bisogno di accesso casuale per indice?** → `ArrayList`
- **Inserisci/rimuovi spesso in testa o in coda?** → `ArrayDeque` (non `LinkedList`)
- **Devi verificare l'appartenenza di un elemento?** → `HashSet`
- **Devi iterare in ordine di inserimento?** → `LinkedHashSet` / `LinkedHashMap`
- **Devi mantenere un ordinamento naturale?** → `TreeSet` / `TreeMap`
- **Ricerchi frequentemente per chiave univoca?** → `HashMap`