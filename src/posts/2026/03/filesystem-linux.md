---
layout: layouts/post.njk
title: Il filesystem linux
description: 
tags:
  - posts
  - linux
  - filesystem
  - sistemi operativi
date: 2026-03-18
excerpt: 
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/gnu_linux.webp  
imageAlt: "Immagine generata con IA"
---

# Il Filesystem di Linux: Struttura e Organizzazione

Se hai mai aperto un terminale Linux e digitato `ls /`, probabilmente ti sei trovato di fronte a una lista di cartelle dai nomi enigmatici: `/bin`, `/etc`, `/proc`, `/dev`… Dietro quella lista si nasconde un sistema di organizzazione preciso e coerente, ereditato dalla tradizione Unix e standardizzato nel corso degli anni.

In questo articolo esploriamo come funziona il filesystem Linux: partiremo dai concetti fondamentali, capiremo perché "tutto è un file", e poi percorreremo le directory principali del sistema una per una.

## Filesystem e Filesystem Hierarchy Standard: due concetti distinti

Prima di tutto, è utile distinguere due concetti che spesso vengono confusi.

**Filesystem** (nel senso tecnico) indica il formato con cui i dati vengono organizzati fisicamente su un supporto di memoria, come un HDD, un SSD o una chiavetta USB. I più comuni su Linux sono **ext4**, **ext3** ed **ext2**; su Windows troviamo **FAT32** e **NTFS**; su macOS **HFS+** e il più recente **APFS**.

**Filesystem Hierarchy Standard (FHS)** è invece una specifica che definisce *quali* directory devono esistere in un sistema Linux e *cosa* devono contenere. In pratica, è una convenzione condivisa tra le distribuzioni per garantire coerenza e portabilità: grazie all'FHS, un amministratore di sistema sa già dove cercare i log, i file di configurazione o i binari, indipendentemente dalla distribuzione che sta usando.

## La struttura ad albero e la directory radice

Le directory di un filesystem Linux sono organizzate secondo uno schema **ad albero**: ogni cartella può contenere file e altre cartelle, creando una gerarchia che si ramifica verso il basso. Al vertice di quest'albero si trova la **directory radice**, indicata dal simbolo `/` e chiamata *root*.

Attenzione: la directory radice `/` non va confusa con l'utente amministratore, che si chiama anch'esso *root* e ha come home directory `/root`.

Tutti i percorsi che partono da `/` sono detti **percorsi assoluti**, perché identificano un file in modo univoco a partire dalla radice, indipendentemente da dove ci si trova nel filesystem. Ad esempio:

```
/home/mario/documenti/relazione.txt
```

Al contrario, un **percorso relativo** non inizia con `/` e fa riferimento alla posizione corrente. Se ci troviamo già in `/home/mario`, possiamo scrivere semplicemente `documenti/relazione.txt` per riferirci allo stesso file.

I nomi dei file in Linux possono contenere quasi tutti i caratteri, con alcune eccezioni: il carattere `/` è riservato come separatore di percorso e non può comparire nei nomi. È inoltre buona norma evitare caratteri speciali come spazi, `*`, `?` o `!`, poiché possono avere significati particolari nella shell e causare comportamenti inattesi. La lunghezza massima di un nome file è generalmente di **255 caratteri** sui filesystem moderni.

Una caratteristica fondamentale: Linux è **case sensitive**. `File.txt`, `file.txt` e `FILE.TXT` sono tre file completamente distinti. Questo è diverso da Windows, dove i nomi file sono trattati in modo insensibile alle maiuscole.

## "In Linux, tutto è un file"

Uno dei principi fondamentali di Linux (e dei sistemi Unix in generale) è che **tutto è un file**. Questo non significa solo che documenti e programmi sono file, ma che quasi ogni risorsa del sistema è rappresentata attraverso questa astrazione uniforme. Esistono diverse categorie:

<div class="table-responsive shadow-sm rounded mb-3">
  <table class="table table-bordered table-striped table-hover align-middle mb-0">
    <thead class="table-dark">
      <tr>
        <th>Tipo</th>
        <th>Descrizione</th>
        <th>Esempio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="fw-semibold">File regolare</td>
        <td>Documenti, binari, script</td>
        <td><code>/etc/hosts</code></td>
      </tr>
      <tr>
        <td class="fw-semibold">Directory</td>
        <td>Contenitore per altri file</td>
        <td><code>/home/mario/</code></td>
      </tr>
      <tr>
        <td class="fw-semibold">File di dispositivo</td>
        <td>Interfaccia verso periferiche hardware</td>
        <td><code>/dev/sda</code></td>
      </tr>
      <tr>
        <td class="fw-semibold">Link simbolico</td>
        <td>Puntatore a un altro file o directory</td>
        <td><code>/usr/bin/python</code> → <code>/usr/bin/python3</code></td>
      </tr>
      <tr>
        <td class="fw-semibold">Socket</td>
        <td>Canale di comunicazione tra processi (di rete o locali)</td>
        <td><code>/run/docker.sock</code></td>
      </tr>
      <tr>
        <td class="fw-semibold">FIFO (named pipe)</td>
        <td>Canale di comunicazione unidirezionale tra processi</td>
        <td>creato con <code>mkfifo</code></td>
      </tr>
    </tbody>
  </table>
</div>

Questa astrazione è uno dei punti di forza di Linux: strumenti e programmi possono interagire con risorse eterogenee usando sempre le stesse operazioni di lettura e scrittura.

## Montaggio e smontaggio dei filesystem

Prima di esplorare le singole directory, è utile capire il concetto di **mount** (montaggio), perché spiega come vengono integrate le varie risorse di memoria nell'albero del filesystem.

Di norma, la directory `/` corrisponde al disco da cui Linux è stato avviato. Per accedere a supporti aggiuntivi, come una chiavetta USB, un secondo disco o una partizione di rete, è necessario "agganciare" il dispositivo all'albero del filesystem in un punto specifico, detto **mount point**:

```bash
# Monta la partizione /dev/sdb1 nella directory /mnt/chiavetta
mount /dev/sdb1 /mnt/chiavetta
```

Da quel momento, i file della chiavetta saranno accessibili navigando in `/mnt/chiavetta`. Per rimuovere il collegamento (l'equivalente dell'espulsione sicura), si usa `umount`:

```bash
umount /mnt/chiavetta
```

L'elenco di tutti i filesystem attualmente montati è consultabile in `/proc/mounts`.

## Le directory principali del sistema

### `/home` — Le directory degli utenti

Contiene le cartelle personali di ciascun utente. Se il nome utente è *mario*, la sua home sarà `/home/mario`. Qui vengono salvati documenti, immagini, download e le configurazioni personali delle applicazioni (spesso in cartelle nascoste che iniziano con un punto, come `~/.config` o `~/.bashrc`). Le distribuzioni moderne proteggono queste directory impedendo l'accesso agli altri utenti non privilegiati.

### `/root` — La home dell'amministratore

La directory personale dell'utente *root* è separata da `/home` per una ragione precisa: deve essere accessibile anche quando il filesystem degli utenti non è ancora disponibile, ad esempio durante le prime fasi di avvio o in modalità di recupero.

### `/bin` e `/usr/bin` — I programmi essenziali

`/bin` contiene gli eseguibili fondamentali del sistema, come `ls`, `cp`, `mv`, `cat` o `bash`. Devono essere disponibili già nelle primissime fasi di avvio, prima che altri filesystem vengano montati. `/usr/bin` ospita invece i comandi per gli utenti normali che non sono strettamente necessari all'avvio.

Nota: su molte distribuzioni moderne (Ubuntu, Fedora, Arch…) `/bin` è diventato un link simbolico che punta a `/usr/bin`, nell'ambito di una semplificazione chiamata *usrmerge*.

### `/usr` — Programmi e risorse di sistema

È una delle directory più ricche del sistema. Contiene eseguibili, librerie, documentazione e risorse della maggior parte dei programmi installati. È tipicamente in **sola lettura** per gli utenti normali. Al suo interno troviamo tra l'altro `/usr/sbin` per i comandi aggiuntivi dell'amministratore, `/usr/lib` per le librerie condivise usate dai programmi, `/usr/share` per le risorse condivise come documentazione e icone, e `/usr/share/man` per i testi delle **manpage** accessibili tramite il comando `man`.

### `/etc` — Le configurazioni di sistema

Contiene i file di configurazione dell'intero sistema: impostazioni di rete, elenco degli utenti, configurazione dei servizi e molto altro. La maggior parte dei file è leggibile da tutti, ma modificabile solo dall'amministratore. Alcuni file notevoli sono `/etc/passwd` per le informazioni sugli account utente (nome, shell, home directory…), `/etc/shadow` per le password degli utenti in forma cifrata (accessibile solo da root), `/etc/fstab` per la tabella dei filesystem da montare automaticamente all'avvio e `/etc/hosts` per la mappatura manuale tra nomi host e indirizzi IP.

### `/boot` — Il kernel e i file di avvio

Contiene il kernel Linux, il file `initrd` (initial RAM disk, usato nelle prime fasi di avvio) e la configurazione del bootloader **GRUB**. Si consiglia spesso di dedicare a `/boot` una partizione separata all'inizio del disco, per garantire la compatibilità con alcune configurazioni hardware e semplificare il ripristino del sistema.

### `/var` — Dati variabili

Contiene file che cambiano frequentemente durante il normale funzionamento del sistema: log, code di stampa, database, cache dei package manager. La sottodirectory più consultata è `/var/log`, che raccoglie i log generati dal kernel, dai servizi e dalle applicazioni. Tra i più utili troviamo `/var/log/syslog` per gli eventi generali del sistema, `/var/log/auth.log` per i tentativi di autenticazione e uso di `sudo`, e `/var/log/kern.log` per i messaggi del kernel.

### `/tmp` — File temporanei

Directory scrivibile da tutti gli utenti, usata per i file temporanei creati da applicazioni e processi. Il suo contenuto viene cancellato ad ogni riavvio. Su molte distribuzioni moderne è montata come `tmpfs`, ovvero direttamente in RAM, il che la rende molto veloce ma ne limita la capacità alla memoria disponibile.

## `/dev` — I file di dispositivo

La directory `/dev` contiene file speciali che rappresentano le periferiche hardware e alcune risorse virtuali del kernel. Non occupano spazio fisico sul disco: sono interfacce verso il kernel, gestite dal demone **udev** che li crea e li rimuove dinamicamente al collegamento o alla disconnessione dei dispositivi.

Alcuni esempi particolarmente interessanti:

<div class="table-responsive shadow-sm rounded mb-3">
  <table class="table table-bordered table-striped table-hover align-middle mb-0">
    <thead class="table-dark">
      <tr>
        <th>File</th>
        <th>Descrizione</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="fw-semibold"><code>/dev/null</code></td>
        <td>"Buco nero": qualsiasi dato scritto qui viene scartato silenziosamente</td>
      </tr>
      <tr>
        <td class="fw-semibold"><code>/dev/zero</code></td>
        <td>Genera una sequenza infinita di byte a zero, utile per sovrascrivere dati o creare file di dimensione fissa</td>
      </tr>
      <tr>
        <td class="fw-semibold"><code>/dev/random</code></td>
        <td>Genera numeri casuali usando l'entropia raccolta dal kernel</td>
      </tr>
      <tr>
        <td class="fw-semibold"><code>/dev/urandom</code></td>
        <td>Come <code>/dev/random</code>, ma non si blocca se l'entropia disponibile è poca; consigliato per uso generale</td>
      </tr>
      <tr>
        <td class="fw-semibold"><code>/dev/sda</code>, <code>/dev/nvme0n1</code></td>
        <td>Immagine di un intero disco fisico (SATA o NVMe); le partizioni sono <code>/dev/sda1</code>, <code>/dev/sda2</code>…</td>
      </tr>
      <tr>
        <td class="fw-semibold"><code>/dev/tty</code></td>
        <td>Il terminale corrente</td>
      </tr>
    </tbody>
  </table>
</div>

## `/proc` — La finestra sul kernel

`/proc` è un **filesystem virtuale**: non esiste fisicamente su disco, ma viene popolato dal kernel in tempo reale con informazioni sui processi attivi e sullo stato del sistema. Ogni processo in esecuzione ha una sottodirectory identificata dal suo PID (es. `/proc/1234`), contenente informazioni su quel processo: file aperti, memoria usata, variabili d'ambiente e altro.

Tra i file più utili a livello di sistema troviamo `/proc/cpuinfo` per le informazioni dettagliate sul processore, `/proc/meminfo` per lo stato della memoria RAM e swap, `/proc/mounts` per l'elenco dei filesystem attualmente montati e `/proc/uptime` per il tempo trascorso dall'avvio del sistema.

## Link: hard e soft

Linux supporta due tipi di collegamento tra file, creati entrambi con il comando `ln`.

Gli **hard link** puntano direttamente all'**inode** del file, ovvero la struttura dati interna al filesystem che descrive un file (permessi, dimensione, posizione dei dati sul disco). Due hard link allo stesso file condividono esattamente i medesimi dati: modificare uno significa modificare l'altro. Il file viene eliminato dal disco solo quando l'ultimo hard link che lo punta viene rimosso. Hanno però dei limiti: non funzionano tra filesystem diversi e non possono puntare a directory.

I **soft link** (o link simbolici) sono invece semplici puntatori al *percorso* di un altro file. Si creano con:

```bash
ln -s /percorso/origine /percorso/destinazione
```

Sono più flessibili degli hard link, possono attraversare filesystem diversi e puntare a directory, ma se il file originale viene spostato o eliminato il link diventa *rotto* (dangling link) e accedervi produrrà un errore.

Nel listato di `ls -l`, i soft link sono identificati dalla lettera `l` all'inizio della stringa dei permessi, e mostrano esplicitamente il percorso a cui puntano:

```
lrwxrwxrwx 1 root root 7 gen 10 12:00 /bin -> usr/bin
```

## FIFO — Le named pipe

Le **FIFO** (First In, First Out), dette anche *named pipe*, sono un meccanismo di comunicazione tra processi. A differenza delle pipe anonime, quelle usate con `|` nel terminale che esistono solo per la durata del comando, le FIFO hanno un nome nel filesystem e possono essere usate da processi non correlati, anche avviati in momenti diversi.

Si creano con il comando `mkfifo`:

```bash
mkfifo /tmp/mia_pipe
```

Un processo può scrivere sulla pipe e un altro può leggerla: i dati fluiscono in ordine FIFO, senza passare dal disco. Come tutti i file virtuali di questo tipo, le FIFO non sopravvivono al riavvio della macchina.

## Conclusione

La struttura del filesystem Linux può sembrare complessa a prima vista, ma risponde a una logica precisa e coerente, consolidata in decenni di evoluzione Unix. Ogni directory ha uno scopo ben definito e il principio "tutto è un file" offre un'astrazione potente e uniforme per interagire con risorse eterogenee, dai documenti alle periferiche hardware, dai processi alle comunicazioni tra programmi.

Capire questa organizzazione è il primo passo per muoversi con sicurezza in qualsiasi ambiente Linux: che si tratti di configurare un server, fare troubleshooting o semplicemente esplorare il sistema con curiosità.