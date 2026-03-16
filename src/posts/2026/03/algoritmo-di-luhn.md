---
layout: layouts/post.njk
title: L'algoritmo di Luhn
description: 
tags:
  - posts
  - algoritmi
  - java
date: 2026-03-16
excerpt: 
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/algoritmo-di-luhn.webp
imageAlt: "Immagine generata con IA"
---

## Cos'è e a cosa serve?

L'algoritmo di Luhn è un **semplice sistema di controllo cifre** inventato negli anni '50 da [**Hans Peter Luhn**](https://en.wikipedia.org/wiki/Hans_Peter_Luhn), ingegnere [IBM](https://www.ibm.com/it-it). Lo trovi ovunque: numeri di carte di credito, codici fiscali, IBAN, codici seriali. Il suo scopo è rispondere a una domanda pratica:

> "Questo numero che ho digitato ha senso, oppure ho fatto un errore di battitura?"

**Non protegge da frodi**. È solo un modo veloce per stanare gli errori.

## Come funziona, passo per passo

Sia $N = n_1, n_2, \dots, n_{11}$ una matrice righa a 11 cifre, con $n_1$ la **prima cifra a sinistra**.

1. Identifica le cifre in **posizione dispari** ($n_2,n_4,n_6,...$)
2. Raddoppia ciascuna cifra: $d_i = 2 \cdot n_i$
3. Se $d_i > 9$, somma le due cifre:
   $d_i = \lfloor d_i / 10 \rfloor + (d_i \bmod 10)$
4. Le cifre in **posizione pari** restano invariate.
5. Somma tutte le cifre elaborate: $S = \sum_{i=1}^{11} d_i$
6. Se $S \bmod 10 = 0$, PAN valido secondo l'algoritmo di Luhn

> **Nota sugli indici:**
>
> * In matematica le posizioni partono da 1
> * In Java gli **array partono da 0**, quindi la seconda cifra (posizione 2) corrisponde all’indice 1 dell’array.

## Quando si usa?

Luhn è progettato per rilevare i due errori più comuni:

* **Sbagliare una cifra**, per esempio scrivere 4 invece di 5
* **Invertire due cifre adiacenti**, per esempio scrivere 63 invece di 36

Nella pratica quotidiana, queste due casistiche coprono la stragrande maggioranza degli sbagli umani. Luhn **non è un sistema di sicurezza serio**: chi vuole può creare numeri validi rispettando la regola. Il suo scopo è **essere veloce e affidabile** per evitare errori di battitura, non proteggere soldi o dati.

Negli anni ’50, quando i computer erano grandi quanto una stanza, questa era una priorità enorme. Al giorno d'oggi questo algoritmo è comunque utile, anche se non essenziale come allora.

## In Java

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LuhnValidator {
    private static final Logger logger = LogManager.getLogger(LuhnValidator.class);

    public static void main(String[] args) {

        List<Integer> a = Arrays.asList(4, 5, 3, 9, 1, 4, 8, 8, 0, 3, 4, 3, 6, 4, 6, 7);
        List<Integer> b = new ArrayList<>();

        if (a.size() != 16) {
            logger.error("Il PAN deve essere composto da 11 cifre!");
        }

        for (int n = 0; n < a.size(); n++) {
            
            int valoreCorrente = a.get(n);

            if (valoreCorrente < 0) {
                logger.error("Il PAN non può contenere valori negativi");
            }

            if (n % 2 != 0) { // Indici dispari
                int p = valoreCorrente * 2;

                if (p > 9) {
                    b.add((p / 10) + (p % 10)); // Sommo la prima e l'ultima cifra del valore
                } else {
                    b.add(p);
                }
            } else {
                b.add(valoreCorrente);
            }
        }

        int somma = 0;
        for (int j = 0; j < b.size(); j++) {
            somma += b.get(j);
        }

        if (somma % 10 == 0) {
            logger.info("Il PAN soddisfa l'algoritmo di Luhn");
        } else {
            logger.error("Il PAN NON soddisfa l'algoritmo di Luhn");
        }
    }
}
```