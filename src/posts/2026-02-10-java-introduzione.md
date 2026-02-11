---
layout: layouts/post.njk
title: Introduzione a Java
description: In questo articolo esploreremo le **variabili** e i **tipi di dato primitivi** in Java. Capire questi concetti fondamentali è essenziale per scrivere codice Java efficace.
date: 2026-02-10

tags:
  - posts
  - java
  - ciao

excerpt: In questo articolo esploreremo le **variabili** e i **tipi di dato primitivi** in Java. Capire questi concetti fondamentali è essenziale per scrivere codice Java efficace.
permalink: "/blog/{{ title | slug }}/"

image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97
imageAlt: "Scrivania con computer e codice"
---

## Introduzione

{{ description }}

## Cosa sono le Variabili?

Una variabile è un contenitore che memorizza un valore in memoria. In Java, ogni variabile deve avere:

- Un **tipo** (che determina il tipo di dato che può contenere)
- Un **nome** (identificatore univoco)
- Un **valore** (opzionale alla dichiarazione)

### Sintassi di Dichiarazione

```java
tipo nomeVariabile = valore;
```

Esempio:
```java
int età = 25;
String nome = "Mario";
boolean isStudente = true;
```

## Tipi di Dato Primitivi

Java ha 8 tipi di dato primitivi:

### 1. Tipi Interi

#### byte
- Dimensione: 8 bit
- Range: -128 a 127
- Uso: ottimizzazione memoria

```java
byte numeroPiccolo = 100;
```

#### short
- Dimensione: 16 bit
- Range: -32,768 a 32,767

```java
short popolazione = 5000;
```

#### int
- Dimensione: 32 bit
- Range: -2³¹ a 2³¹-1
- Tipo più comune per numeri interi

```java
int contatore = 1000000;
```

#### long
- Dimensione: 64 bit
- Range: -2⁶³ a 2⁶³-1
- Usa suffisso `L`

```java
long distanzaStelle = 9460730472580800L;
```

### 2. Tipi Decimali

#### float
- Dimensione: 32 bit
- Precisione: ~6-7 cifre decimali
- Usa suffisso `f`

```java
float prezzo = 19.99f;
```

#### double
- Dimensione: 64 bit
- Precisione: ~15 cifre decimali
- Default per numeri decimali

```java
double pi = 3.14159265359;
```

### 3. Tipo Carattere

#### char
- Dimensione: 16 bit
- Memorizza un singolo carattere Unicode
- Usa apici singoli

```java
char iniziale = 'D';
char simbolo = '€';
```

### 4. Tipo Booleano

#### boolean
- Valori: `true` o `false`
- Non ha dimensione specifica (dipende dalla JVM)

```java
boolean isAttivo = true;
boolean hasErrors = false;
```

## Convenzioni di Naming

```java
// ✅ Buone pratiche
int contoTotale;
String nomeCompleto;
boolean isPagato;

// ❌ Evitare
int x;
String s;
boolean b1;
```

### Regole di Naming

1. Usa **camelCase** per variabili
2. Inizia con lettera minuscola
3. Nomi descrittivi e significativi
4. Evita abbreviazioni criptiche
5. Per costanti usa `UPPER_SNAKE_CASE`

```java
final int MAX_STUDENTI = 30;
final double PI_GRECO = 3.14159;
```

## Casting e Conversioni

### Casting Implicito (Widening)

```java
int numeroIntero = 100;
long numeroLong = numeroIntero;  // OK
double numeroDouble = numeroIntero;  // OK
```

### Casting Esplicito (Narrowing)

```java
double decimale = 9.78;
int intero = (int) decimale;  // intero = 9 (perde la parte decimale)
```

## Scope delle Variabili

```java
public class ScopeExample {
    // Variabile di istanza (class scope)
    private int instanceVar = 10;
    
    // Variabile di classe (static)
    private static int classVar = 20;
    
    public void metodo() {
        // Variabile locale (method scope)
        int localVar = 30;
        
        if (true) {
            // Variabile di blocco (block scope)
            int blockVar = 40;
            System.out.println(blockVar);  // OK
        }
        // System.out.println(blockVar);  // ERRORE: fuori scope
    }
}
```

## Best Practices

1. **Inizializza sempre le variabili**
```java
// ✅ Buona pratica
int contatore = 0;

// ❌ Evitare
int contatore;
// uso di contatore senza inizializzazione
```

2. **Usa il tipo appropriato**
```java
// ✅ Efficiente
byte età = 25;  // range 0-127 è sufficiente

// ❌ Spreco di memoria
long età = 25L;  // long è eccessivo
```

3. **Costanti per valori fissi**
```java
final int GIORNI_SETTIMANA = 7;
final String NOME_AZIENDA = "TechCorp";
```

## Esercizi Pratici

### Esercizio 1: Dichiarazioni Base
```java
public class VariabiliBase {
    public static void main(String[] args) {
        // Dichiara variabili per:
        // - Nome (String)
        // - Età (int)
        // - Altezza in metri (double)
        // - È maggiorenne (boolean)
        
        // Soluzione:
        String nome = "Mario Rossi";
        int età = 25;
        double altezza = 1.75;
        boolean isMaggiorenne = età >= 18;
        
        System.out.println("Nome: " + nome);
        System.out.println("Età: " + età);
        System.out.println("Altezza: " + altezza + "m");
        System.out.println("Maggiorenne: " + isMaggiorenne);
    }
}
```

### Esercizio 2: Casting
```java
public class CastingExample {
    public static void main(String[] args) {
        // Converti un double in int
        double prezzo = 19.99;
        int prezzoIntero = (int) prezzo;
        
        System.out.println("Prezzo originale: " + prezzo);
        System.out.println("Prezzo intero: " + prezzoIntero);
        
        // Attenzione alla perdita di precisione!
        double valore = 123.456;
        int valoreIntero = (int) valore;
        System.out.println("Perdita decimali: " + valore + " -> " + valoreIntero);
    }
}
```

## Conclusioni

In questo articolo abbiamo imparato:

- ✅ Cosa sono le variabili e come dichiararle
- ✅ Gli 8 tipi primitivi in Java e quando usarli
- ✅ Convenzioni di naming e best practices
- ✅ Casting e conversioni tra tipi
- ✅ Scope e visibilità delle variabili

Nel prossimo articolo esploreremo gli **operatori** e le **espressioni** in Java.

## Risorse Aggiuntive

- [Oracle Java Tutorials - Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [Java Language Specification](https://docs.oracle.com/javase/specs/)
- [Articolo precedente: Introduzione a Java](/blog/introduzione-java/)