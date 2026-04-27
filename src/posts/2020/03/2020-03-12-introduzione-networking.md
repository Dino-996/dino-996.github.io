---
layout: layouts/post.njk
title: Fondamenti di Networking
description: Una prima introduzione sulle basi del networking, le fondamenta che ci permetteranno di capire come funzionano realmente le reti a cui ci connettiamo tutti i giorni.
tags:
  - posts
  - networking
date: 2020-03-12
excerpt: Oggi non ci chiediamo più se siamo connessi a Internet. La connettività è diventata un'infrastruttura critica, al pari dell'elettricità o dell'acqua corrente. Comprendere come funzionano le reti non è più prerogativa esclusiva degli ingegneri informatici, è una competenza fondamentale per chiunque lavori nel mondo digitale, dallo sviluppatore all'IT Manager.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/networking.webp
imageAlt: "Immagine generata con IA"
---

# Fondamenti di networking

{{ excerpt }}

## Chi possiede internet?

Internet non appartiene a nessun singolo gruppo, azienda o governo. È il risultato
dell'interconnessione di migliaia di reti autonome che cooperano attraverso **standard
e protocolli comuni** (come TCP/IP) per scambiarsi informazioni.

Le informazioni viaggiano attraverso una varietà di mezzi fisici:
- **Cavi in rame** (doppino telefonico, cavo coassiale)
- **Fibra ottica** (trasmissione tramite impulsi luminosi)
- **Connessioni wireless** (Wi-Fi, 4G/5G, satellite)

I dati scambiati possono assumere forme diverse: testo, video, audio, immagini,
telemetria IoT e molto altro.

## Reti locali (LAN)

Le reti locali (Local Area Network) esistono in tutte le dimensioni e configurazioni.

### Reti SOHO (Small Office / Home Office)

Le reti SOHO collegano un numero ridotto di dispositivi (da 2 a qualche decina) e
consentono la condivisione di risorse come stampanti, file, musica e connessione
Internet. Sono tipicamente basate su un router consumer con funzionalità Wi-Fi
integrate.

### Reti aziendali

Le reti aziendali possono connettere centinaia di migliaia di dispositivi distribuiti
su più sedi geografiche. Supportano applicazioni critiche come:
- E-commerce e CRM
- Comunicazioni interne (email, VoIP, videoconferenza)
- Accesso centralizzato a server e database
- Sistemi ERP e supply chain management

La comunicazione in rete è generalmente più efficiente e meno costosa rispetto ai
canali tradizionali. Le reti aziendali e SOHO forniscono tipicamente una **connessione
condivisa a Internet**, motivo per cui Internet viene spesso definita una
**"rete di reti"** (*network of networks*).

## Dispositivi mobili e IoT

Internet connette oggi miliardi di dispositivi che vanno ben oltre i tradizionali
computer desktop e laptop.

### Dispositivi mobili

Smartphone, tablet e wearable (smartwatch, fitness tracker) sono oggi tra i
principali produttori e consumatori di traffico Internet mondiale.

### Internet of Things (IoT)

L'**IoT (Internet of Things)** rappresenta l'ecosistema di oggetti fisici dotati di
sensori, software e connettività di rete. L'architettura IoT si articola tipicamente
su tre livelli:

<div class="container my-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Cloud / Data Center</th>
          <th>Edge / Gateway</th>
          <th>Dispositivi / End Nodes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Elaborazione, storage, analytics</td>
          <td class="fw-semibold">Pre-elaborazione locale, protocolli (MQTT, CoAP)</td>
          <td class="fw-semibold"><code>Sensori, attuatori, RFID</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

Esempi concreti di dispositivi IoT:

<div class="container my-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Tag RFID</th>
          <th>Sensori industriali</th>
          <th>Dispositivi medici</th>
          <th>Domotica</th>
          <th>Veicoli connessi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Tracciamento merci, badge aziendali, antifurti</td>
          <td class="fw-semibold">Temperatura, pressione, vibrazione (Industry 4.0)</td>
          <td class="fw-semibold">Glucometri connessi, pacemaker smart, telemedicina</td>
          <td class="fw-semibold">Termostati intelligenti, serrature smart, telecamere IP</td>
          <td class="fw-semibold">Telemetria auto, fleet management, guida assistita</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

> **Nota per sviluppatori**: i protocolli più diffusi in ambito IoT sono **MQTT**
> (publish/subscribe, leggero, ideale per connessioni instabili) e **CoAP**
> (ottimizzato per dispositivi con risorse limitate). Entrambi operano sopra TCP/IP.

## Il Bit: L'Unità fondamentale dell'informazione

I computer e le reti operano esclusivamente con **cifre binarie**: zeri e uno.
Il termine **bit** (abbreviazione di *binary digit*) rappresenta la più piccola
unità di informazione digitale.

Un bit può assumere solo due stati fisici distinti:

<div class="container my-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Stato fisico</th>
          <th>Valore binario</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Interruttore aperto</td>
          <td class="fw-semibold"><code>1</code></td>
        </tr>
        <tr>
        <td class="fw-semibold">Interruttore chiuso</td>
          <td class="fw-semibold"><code>0</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Byte e codifica dei caratteri

Otto bit formano un **byte**, l'unità standard per rappresentare un singolo carattere
o valore.

**ASCII e Unicode**

> ⚠️ **Precisazione tecnica**: l'ASCII *originale* (standard ANSI X3.4-1968)
> utilizza **7 bit**, codificando 128 caratteri. La versione "Extended ASCII"
> estende a 8 bit (256 caratteri). Tuttavia, per applicazioni moderne e
> internazionali, si utilizza **Unicode** (standard UTF-8), che supporta oltre
> 1.1 milioni di caratteri e mantiene compatibilità retroattiva con ASCII.

Esempi di codifica ASCII (Extended, 8 bit):

<div class="container my-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Carattere</th>
          <th>Binario</th>
          <th>Decimale</th>
          <th>Esadecimale (Hex)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold"><code>A</code></td>
          <td class="fw-semibold"><code>01000001</code></td>
          <td class="fw-semibold"><code>65</code></td>
          <td class="fw-semibold"><code>0x41</code></td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>9</code></td>
          <td class="fw-semibold"><code>00111001</code></td>
          <td class="fw-semibold"><code>57</code></td>
          <td class="fw-semibold"><code>0x39</code></td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>#</code></td>
          <td class="fw-semibold"><code>00100011</code></td>
          <td class="fw-semibold"><code>35</code></td>
          <td class="fw-semibold"><code>0x23</code></td>
        </tr>
        <tr>
          <td class="fw-semibold"><code>€</code></td>
          <td>Non codificabile in ASCII. Richiede UTF-8</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Conversione binaria in Python

```python
# Conversione tra carattere, decimale e binario in Python

carattere = 'A'

# Ottieni il valore decimale (code point Unicode)
decimale = ord(carattere)
print(f"Carattere : {carattere}")
print(f"Decimale  : {decimale}")          # Output: 65
print(f"Binario   : {bin(decimale)}")     # Output: 0b1000001
print(f"Hex       : {hex(decimale)}")     # Output: 0x41

# Padding a 8 bit (formato byte completo)
binario_8bit = format(decimale, '08b')
print(f"Byte      : {binario_8bit}")      # Output: 01000001

# Operazione inversa: da binario a carattere
valore = int('01000001', 2)
print(f"Da bin a char: {chr(valore)}")    # Output: A
```

## Metodi di trasmissione dei dati

Dopo che le informazioni sono state convertite in bit, devono essere trasformate in
**segnali fisici** trasmissibili attraverso un mezzo (*medium*). Esistono tre metodi
principali:

### 1. Segnali elettrici

Trasmissione tramite impulsi di tensione su **cavi in rame** (es. cavo Cat5e/Cat6
per reti Ethernet). Economici e diffusi, ma soggetti a interferenze elettromagnetiche
(EMI) e attenuazione sul lungo raggio.

### 2. Segnali ottici

Trasmissione tramite **impulsi luminosi** su cavi in fibra ottica (single-mode o
multi-mode). Offrono larghezza di banda elevatissima, immunità alle interferenze e
distanze di trasmissione fino a centinaia di chilometri.

### 3. Segnali wireless

Trasmissione tramite **onde elettromagnetiche** (radio, microonde, infrarossi).
Elimina la necessità di cablaggio fisico ma è soggetto a interferenze, ostacoli
fisici e limitazioni di sicurezza.

| Mezzo | Velocità tipica | Distanza | Pro | Contro |
|---|---|---|---|---|
| Rame (Cat6) | 1–10 Gbps | ≤100 m | Economico | Interferenze, distanza |
| Fibra ottica | 10 Gbps–400 Tbps | km–migliaia di km | Velocità, sicurezza | Costo installazione |
| Wi-Fi (802.11ax) | Fino a ~9.6 Gbps teorici | ~50–100 m indoor | Mobilità | Interferenze, sicurezza |
| 5G | Fino a ~20 Gbps teorici | Variabile | Mobilità, copertura | Infrastruttura |

> I segnali possono essere **convertiti più volte** lungo il percorso
> (es. elettrico → ottico → wireless) attraverso dispositivi come convertitori
> di media (*media converters*) e access point.

## Larghezza di Banda, Throughput, Latenza e Jitter

Questi quattro parametri sono fondamentali per valutare le **prestazioni di una
rete**. Vengono spesso confusi: ecco le distinzioni precise.

### Bandwidth (larghezza di banda)

La **bandwidth** rappresenta la *capacità teorica massima* di un collegamento,
ovvero quanti bit possono essere trasmessi per unità di tempo in condizioni ideali.
È una proprietà del mezzo fisico e dell'infrastruttura.

### Throughput (velocità effettiva)

Il **throughput** misura la quantità di dati *effettivamente* trasferiti in un dato
intervallo di tempo. È quasi sempre inferiore alla bandwidth dichiarata, a causa di:
- Overhead dei protocolli di rete (header TCP/IP, controllo errori)
- Congestione e collisioni
- Qualità del collegamento fisico
- Limitazioni hardware dei dispositivi intermedi

### Latenza

La **latenza** è il tempo necessario affinché un pacchetto viaggi dalla sorgente
alla destinazione. Si misura tipicamente in millisecondi (ms) tramite il comando
`ping`. È critica per applicazioni **real-time** come VoIP, gaming online e
videoconferenze.

```bash
# Misurazione latenza verso un host remoto
ping -c 4 8.8.8.8

# Output di esempio:
# 64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.4 ms
# 64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.8 ms
# round-trip min/avg/max/stddev = 11.8/12.1/12.4/0.3 ms
```

### Jitter

Il **jitter** è la *variazione* della latenza nel tempo (la deviazione standard
della latenza). Un jitter elevato causa degrado della qualità audio/video nelle
comunicazioni real-time, anche quando la latenza media è accettabile.

```
Latenza ideale:  10ms — 10ms — 10ms — 10ms  (jitter ≈ 0)
Latenza reale:   10ms — 25ms —  8ms — 30ms  (jitter elevato → qualità VoIP scarsa)
```

### Tabella unità di misura della bandwidth

| Unità | Simbolo | Equivalente |
|---|---|---|
| Bit per secondo | bps | unità base |
| Kilobit per secondo | Kbps | 10³ bps |
| Megabit per secondo | Mbps | 10⁶ bps |
| Gigabit per secondo | Gbps | 10⁹ bps |
| Terabit per secondo | Tbps | 10¹² bps |
| Petabit per secondo | Pbps | 10¹⁵ bps |

> ⚠️ **Attenzione**: i provider Internet dichiarano la velocità in **Mbps**
> (megabit), mentre i sistemi operativi mostrano spesso la velocità di download
> in **MB/s** (megabyte). Ricorda: 1 byte = 8 bit → 100 Mbps ≈ 12.5 MB/s.

### Il collo di bottiglia (*Bottleneck*)

In una rete con più segmenti, la **velocità massima effettiva è limitata dal
segmento più lento** del percorso — il cosiddetto *bottleneck*. Questo principio,
noto come **legge dell'anello debole**, è fondamentale nell'ottimizzazione delle
prestazioni di rete in contesti Cloud e DevOps.

```
Client (1 Gbps) ──→ Switch (10 Gbps) ──→ Router WAN (100 Mbps) ──→ Server
                                               ↑
                                     BOTTLENECK: throughput massimo = 100 Mbps
```

## Ottimizzazione delle performance di rete

> **Per IT Manager e DevOps Engineer**

- **Monitoring continuo**: usa strumenti come **Prometheus + Grafana**, **Zabbix**
  o **PRTG** per monitorare latenza, throughput e packet loss in tempo reale.
- **Quality of Service (QoS)**: prioritizza il traffico critico (VoIP, video) su
  quello non critico (backup, aggiornamenti) tramite policy QoS su switch e router.
- **Segmentazione della rete**: usa VLAN per isolare traffico e migliorare sicurezza
  e performance.
- **CDN (Content Delivery Network)**: distribuisci i contenuti statici vicino agli
  utenti finali per ridurre latenza e carico sui server centrali.
- **Test periodici**: strumenti come **iPerf3** (throughput interno) e
  **Speedtest CLI** (connettività esterna) aiutano a rilevare degradi prestazionali
  prima che diventino problemi critici.

```bash
# Test throughput interno con iPerf3
# Sul server:
iperf3 -s

# Sul client:
iperf3 -c <IP_SERVER> -t 10 -P 4
# -t 10 = durata 10 secondi
# -P 4  = 4 stream paralleli
```

## Introduzione al modello OSI

Tutti i concetti trattati in questo modulo — trasmissione dei dati, segnali,
larghezza di banda — trovano una collocazione precisa nel **Modello OSI**
(Open Systems Interconnection), il framework a 7 livelli che descrive come i
dati viaggiano da un'applicazione su un dispositivo a un'altra applicazione su
un dispositivo remoto.

| Livello | Nome | Funzione chiave |
|---|---|---|
| 7 | Applicazione | HTTP, DNS, SMTP |
| 6 | Presentazione | Codifica, crittografia, compressione |
| 5 | Sessione | Gestione connessioni |
| 4 | Trasporto | TCP/UDP, porte, controllo flusso |
| 3 | Rete | IP, routing |
| 2 | Data Link | MAC, switch, Ethernet |
| 1 | Fisico | Bit, segnali, cavi ← **questo modulo** |