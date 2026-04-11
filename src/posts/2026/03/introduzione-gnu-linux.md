---
layout: layouts/post.njk
title: GNU/Linux
description: GNU/Linux è un sistema operativo libero e open source, nato dall'unione del kernel Linux e gli strumenti di sistema del progetto GNU. È stabile, sicuro e altamente personalizzabile, utilizzato in svariati ambiti, dai server ai computer desktop. In questo articolo introduttivo proviamo a capirne di più partendo dall'architettura dell'ecosistema fino ai comandi più utili.
tags:
  - posts
  - linux
  - sistemi operativi
  - licenze
date: 2026-03-16
excerpt: L'ambiente GNU/Linux è un sistema operativo di tipo Unix-like (termine che identifica i sistemi operativi con comportamento e architettura simili a Unix) basato su una struttura modulare. La sua comprensione richiede la distinzione netta tra il componente che gestisce le risorse hardware e l'insieme di strumenti che permettono l'interazione con l'utente e l'esecuzione degli applicativi.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/gnu_linux.webp
imageAlt: "Immagine generata con IA"
---

# Un po' di storia

Lo so: appena hai visto il titolo ti è venuta voglia di saltare questa parte. Ma fidati, ne vale la pena. La storia di Linux non è solo interessante: è fondamentale per capire perché oggi domina ovunque, dai server agli smartphone.

## Più di un semplice software
Partiamo da un punto chiave: Linux è un **kernel**, non un sistema operativo completo.

Puoi immaginarlo come il **motore di un'auto**: essenziale per farla muovere, ma inutile senza tutto il resto (interfaccia grafica, programmi, strumenti di sistema). Il suo successo nasce da un mix unico di scelte tecniche brillanti, collaborazione globale e una filosofia di sviluppo aperta.

## Le origini
Nel **1991**, lo studente finlandese [**Linus Torvalds**](https://www.linkedin.com/in/linustorvalds/) creò Linux per pura curiosità. Voleva un sistema simile a [Unix](https://www.unix.org/) per il suo PC e, non potendoselo permettere, decise di scriverselo da solo. Non lo fece per soldi né per crociata ideologica: lo fece per divertimento.

Tuttavia, Torvalds ha il vizio di creare rivoluzioni quasi per caso. Nel **2005**, dopo una rottura con [BitKeeper](https://www.bitkeeper.org/) (il software di controllo versione usato per gestire il codice di Linux), Torvalds si chiuse in una stanza e **scrisse Git in soli 10 giorni**. Oggi Git è lo standard mondiale per lo sviluppo software. Torvalds lo ha poi affidato a [**Junio Hamano**](https://www.linkedin.com/in/gitster/), che ne è tuttora il maintainer, dimostrando che le sue creazioni migliori diventano presto beni comuni.

## Il lato umano
Gestire un progetto globale non è facile, specialmente se hai un carattere fumantino. Torvalds è noto per non avere peli sulla lingua: memorabili sono le sue critiche a **NVIDIA** (con tanto di [dito medio in diretta](https://www.youtube.com/watch?v=iYWzMvlj2RQ)) o i suoi scontri su progetti come **systemd**.

Tuttavia, il **2018** ha segnato un punto di svolta:
* **Il ritiro temporaneo:** Torvalds ha ammesso che il suo stile aggressivo aveva reso l'ambiente tossico e si è preso una pausa di un mese per lavorare sulla propria empatia.
* **Il Codice di Condotta:** Nel **settembre 2018**, il progetto ha adottato un *Code of Conduct* formale (basato sul [*Contributor Covenant*](https://www.contributor-covenant.org/)). È stato un passo cruciale per rendere la community più inclusiva, anche se non ha mancato di sollevare polemiche tra i veterani.

## La Community
Oggi Linux è mantenuto da migliaia di sviluppatori e colossi come **Google, IBM, Red Hat e Intel**. Non è più solo il progetto di un singolo uomo, ma una collaborazione globale dove migliaia di persone contribuiscono ogni giorno per migliorare il codice che fa girare internet.

## Filosofia
Il mondo **open source** vive di un dualismo affascinante:

**L'idealismo di Stallman**

>*Il software libero è un diritto etico e morale.*

Il suo idealismo si basa su quattro libertà fondamentali:

* Eseguire il programma per qualunque scopo.
* Studiare come funziona e modificarlo.
* Ridistribuire copie.
* Migliorarlo e condividere le modifiche.

Per [Stallman](https://stallman.org/), il software proprietario è **eticamente sbagliato** perché nega queste libertà, creando dipendenza e isolamento. La sua battaglia non è tecnica, ma morale: vuole una società in cui la condivisione del sapere sia normale e protetta.

Come disse dopo la morte di Steve Jobs nel 2011:
> *Steve Jobs è stato un pioniere dei computer costruiti come belle prigioni.*

Il suo approccio è intransigente: rifiuta compromessi, insiste sull'uso del termine *software libero* (distinto sia dal software proprietario che dal semplice software di dominio pubblico) e promuove il copyleft tramite la licenza GPL per garantire che la libertà del codice sia perpetua anche nei lavori derivati.

È nel **1983** che ha fondato il progetto [**GNU**](https://www.gnu.org/home.it.html), nato per creare un sistema operativo completamente libero e compatibile con Unix, dando così vita al movimento del **software libero**. Il nome GNU è un acronimo ricorsivo che sta per *GNU's Not Unix* (GNU non è Unix), riflettendo l'obiettivo di fornire un'alternativa libera al sistema che ai tempi era di proprietà di [AT&T](https://archiveos.org/att-unix-pc/).

Nel **1985** ha fondato la **Free Software Foundation** per supportare il progetto e fornire un'infrastruttura legale al movimento. Ha inventato il concetto di *copyleft* e ha scritto la **GNU General Public License** (**GPL**) nel 1989, una licenza fondamentale che protegge i diritti di modifica e ridistribuzione del software.

**Il pragmatismo di Torvalds**

>*Ciò che conta è che il codice funzioni bene.*

Inizialmente Linux si appoggiò a [MINIX](https://wiki.minix3.org), un sistema operativo educativo basato su Unix, per configurare, compilare e installare il kernel nascente. MINIX tuttavia presentava limitazioni significative: la sua licenza non permetteva modifiche e ridistribuzione liberamente, e la sua architettura microkernel mal si adattava alle ambizioni di Torvalds. Solo dopo aver reso pubblico il kernel nel **1991**, Torvalds decise di sostituire i componenti di MINIX con il software del progetto GNU, per creare un sistema operativo completo. Questo avvenne nel **1992**, quando il kernel Linux si unì de facto alle utilità GNU, formando il sistema operativo completo noto oggi come **GNU/Linux**.

Linux ha vinto perché è stato **aperto senza essere dogmatico**. Questa flessibilità ha permesso ad aziende e appassionati di adottarlo senza sentirsi intrappolati in una battaglia politica.

## Tux, il pinguino in smoking

Perché un **pinguino**? Tutto nasce da un aneddoto: Torvalds fu morso da un pinguino durante una visita a uno zoo e ne rimase *stregato*.

Il nome **Tux** ha un duplice significato:
1. È l'acronimo di **(T)orvalds (U)ni(X)**.
2. È un gioco di parole con **tuxedo** (lo smoking), per via del piumaggio che lo fa sembrare vestito per una serata di gala.

Resiliente e un po' buffo, Tux rappresenta perfettamente lo spirito informale e libero di Linux.

## E il nome invece?
Il nome fu scelto da [Ari Lemmke](https://it.wikipedia.org/wiki/Ari_Lemmke), l'amministratore che nel 1991 rese disponibile il sistema sul web.

Torvalds aveva inizialmente chiamato il progetto **Freax**, una combinazione tra *free*, *freak* e *x* per indicare le caratteristiche Unix-like. Lemmke ignorò questa scelta e preferì il nome Linux, che Torvalds aveva invece scartato ritenendolo troppo egocentrico.

Lemmke creò una **directory** su un server FTP chiamata `pub/OS/Linux` per ospitare i file del nuovo sistema.
Poiché i file venivano scaricati da questa directory, il nome **Linux** (derivato da **(LIN)us (U)ni(X)**) divenne rapidamente lo standard di fatto.
Torvalds accettò il nome, sebbene in seguito il progetto fosse spesso identificato come **GNU/Linux** per riconoscere il contributo del sistema GNU.

Oltre a battezzare il kernel, Lemmke fondò il [newsgroup](https://groups.google.com/g/comp.os.linux) nel **1992** e contribuì in modo significativo alla diffusione e allo sviluppo iniziale di Linux.

---

## Architettura dell'ecosistema GNU/Linux

Passando al lato tecnico, l'infrastruttura si divide in due ambiti operativi principali che formano il sistema operativo:

* **Kernel (Linux)**: Gestisce l'astrazione dell'hardware (*nascondendo la complessità dei circuiti fisici per farli vedere ai programmi come semplici risorse da usare*), lo scheduling dei processi (*decidendo a quale programma in esecuzione dare la precedenza nell'uso del processore, come un vigile urbano*), la gestione della memoria e i file system. Funziona come interfaccia tra il software e il processore/periferiche.
* **Userland (GNU)**: Suite di strumenti essenziali per rendere operativo il sistema. Include la libreria C (*glibc - insiemi di codice condiviso pronti all'uso*), il compilatore (*GCC - un traduttore dal codice scritto dai programmatori al codice macchina comprensibile dal computer*), le utility core (coreutils) e la shell.

Senza lo stack software GNU, il kernel Linux non fornirebbe un ambiente di runtime (*l'infrastruttura di base necessaria per far funzionare i programmi*) completo; simmetricamente, gli strumenti GNU necessitano di un kernel per eseguire le syscall (*chiamate di sistema che i programmi fanno al kernel per usare l'hardware, come ad esempio chiedere il permesso di salvare un file sul disco*).

## Gerarchia dello stack software e hardware

Il **flusso di esecuzione** può essere rappresentato come una pila di livelli indipendenti:

  <div class="accordion mb-3" id="stackSoftware">
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item1">
          Applicazione utente
        </button>
      </h2>
      <div id="item1" class="accordion-collapse collapse show" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Browser, editor di testo, tool di sviluppo. Comunicano con il sistema tramite le API (<i>ponti di comunicazione che permettono a software diversi di scambiarsi informazioni in modo standardizzato</i>) fornite dal software di base o dai framework grafici.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item2">
          Interfaccia grafica (GUI / Display Server)
        </button>
      </h2>
      <div id="item2" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          <strong>Wayland</strong> o <strong>X11</strong> (<i>protocolli di comunicazione che definiscono le regole per far interagire il compositore (il server grafico) con le applicazioni (client)</i>), insieme ai <strong>Desktop Environment</strong> (GNOME, KDE). Gestiscono l'output visuale e l'input utente.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item3">
          Software di base (Userland GNU)
        </button>
      </h2>
      <div id="item3" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          La shell (<strong>Bash</strong>), le librerie di sistema (<strong>glibc</strong>) e le utility core. Forniscono l'ambiente di runtime necessario alle applicazioni.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item4">
          Linux (Kernel)
        </button>
      </h2>
      <div id="item4" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Il <i>vigile urbano</i> delle risorse. Gestisce i driver, la memoria e i processi attraverso le system call.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item5">
          Firmware (BIOS / UEFI)
        </button>
      </h2>
      <div id="item5" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Software di basso livello integrato nella scheda madre che inizializza l'hardware e passa il controllo al bootloader.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item6">
          Hardware
        </button>
      </h2>
      <div id="item6" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Il piano fisico (CPU, RAM, Storage, etc.).
        </div>
      </div>
    </div>
  </div>

## Protocolli grafici
**Wayland** e **X11** sono protocolli grafici usati in Linux per gestire la comunicazione tra applicazioni e schermo. X11 è il sistema tradizionale, nato negli anni '80, mentre Wayland è la sua evoluzione moderna, progettata per hardware e scenari attuali.

* **X11 funziona come un server centrale**: le applicazioni gli inviano comandi di disegno (per esempio: *disegna un cerchio qui*) e lui si occupa di renderizzarli. Questo modello permetteva l'uso remoto delle app (*come eseguire un programma su un server e vederlo sul PC*), ma introduce latenza e problemi di sicurezza.
* **Wayland semplifica il processo**: le applicazioni disegnano direttamente in un buffer (memoria grafica) e lo passano al compositore che si occupa di mostrare tutto sullo schermo. Il compositore gestisce anche finestre, input e sicurezza.

La differenza chiave è nell'**architettura** e nella **sicurezza**. In X11, ogni applicazione può spiare altre finestre, registrare tasti (**keylogging**), catturare lo schermo senza permesso, al contrario di Wayland, dove ogni applicazione è isolata! Non può interagire con altre finestre senza esplicito consenso (per esempio se si vuole condivisione lo schermo).

## Desktop Environment

Un **Desktop Environment** (**DE**) è un ecosistema di componenti software che lavorano in sinergia per fornire un'interfaccia grafica coerente. A differenza di Windows o macOS, dove l'interfaccia è accoppiata profondamente al kernel, in ambiente Linux il **DE è un *plugin* di alto livello**, quindi intercambiabile.

### Architettura dello stack grafico

Per il **rendering delle finestre**, il sistema attraversa tre strati principali:

<div class="accordion mb-3" id="stackSoftware">
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item1">
          Display Server (X11 o Wayland)
        </button>
      </h2>
      <div id="item1" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Protocollo di base per la comunicazione tra hardware (GPU, input) e client grafici (le applicazioni attualmente aperte e visibili sullo schermo). Gestisce i messaggi di I/O.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item2">
          Window Manager (WM)
        </button>
      </h2>
      <div id="item2" class="accordion-collapse collapse" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Software che controlla il posizionamento e l'aspetto delle finestre (bordi, pulsanti, ridimensionamento). Esempi di WM possono essere Mutter (GNOME), KWin (KDE) o gestori stand-alone come i3.
        </div>
      </div>
    </div>
    <div class="accordion-item border border-primary rounded-3 mb-2 shadow-sm">
      <h2 class="accordion-header">
        <button class="accordion-button bg-primary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#item3">
          Desktop Environment (DE)
        </button>
      </h2>
      <div id="item3" class="accordion-collapse collapse show" data-bs-parent="#stackSoftware">
        <div class="accordion-body">
          Pacchetto completo che include il WM e una suite di applicazioni (file manager, terminale, impostazioni) che condividono librerie grafiche e design logico.
          <br>
          I componenti fondamentali di un DE sono:
          <ul>
            <li>
              <strong>Pannello/Taskbar</strong>: Gestione finestre e menu di avvio.
            </li>
            <li>
              <strong>File manager</strong>: Interfaccia per la navigazione del file system (es. Nautilus o Dolphin).
            </li>
            <li>
              <strong>System settings</strong>: Centro di controllo per hardware e reti (evita la modifica manuale dei file in /etc).
            </li>
            <li>
              <strong>Display manager</strong>: Gestisce il login grafico (es. GDM o SDDM).
            </li>
          </ul>
          <div class="mb-3">
            <strong>Principali desktop environment e librerie</strong>
          </div>
          <!--TABELLA-->
          <div class="container mb-3">
            <div class="table-responsive shadow-sm rounded">
              <table class="table table-bordered table-striped table-hover align-middle mb-0">
                <thead class="table-dark">
                  <tr>
                    <th>DE</th>
                    <th>Libreria</th>
                    <th>Filosofia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-semibold">GNOME</td>
                    <td>GTK</td>
                    <td>
                      Minimalismo, workflow orientato alla produttività e astrazione
                    </td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">KDE Plasma</td>
                    <td>Qt</td>
                    <td>Estrema personalizzazione e modularità</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">XFCE</td>
                    <td>GTK</td>
                    <td>Leggerezza e stabilità per hardware datato o server</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">Pantheon</td>
                    <td>GTK</td>
                    <td>Estetica curata e semplicità (derivato da <a href="https://elementary.io/it/">elementaryOS</a>)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--FINE TABELLA-->
        </div>
      </div>
    </div>
  </div>

## Modularità e Server Headless

L'assenza di interfaccia grafica definisce un sistema **Headless**. Questa configurazione è standard in ambito server per ottimizzare:
* **Superficie di attacco**: Meno software installato riduce le vulnerabilità potenziali.
* **Risorse**: Risparmio di RAM (un DE può occupare da 500MB a 1.5GB in idle, ovvero a riposo e senza eseguire operazioni attive).
* **Dipendenze**: Sistema più snello e facile da manutenere.

## Il ruolo del Bootloader

Il **Bootloader** è il primo software eseguito dal **firmware** (**UEFI / BIOS**). Individua il kernel sul disco, lo carica in RAM e gli cede il controllo del processore. Il più diffuso è GRUB2, che supporta il multi-boot e permette di iniettare parametri al kernel (es. recovery mode) prima dell'avvio.

---

## Proprietà intellettuale (PI): Copyright e Copyleft

La proprietà intellettuale è lo **strumento giuridico** che tutela i frutti dell'inventiva umana. Nel software, essa garantisce che l'autore possa decidere come la sua opera debba essere utilizzata, distribuita e modificata.

&Egrave; fondamentale perché senza la protezione della PI, un programmatore o un'azienda non avrebbero alcun controllo sulle proprie creazioni. Chiunque potrebbe appropriarsi del lavoro altrui, spacciandolo per proprio o traendone profitto senza autorizzazione. Grazie alla PI si **riconosce il merito** all'autore garantendo che sia sempre citato (*diritto di paternità*) e si **incentiva l'innovazione** permettendo a chi investe tempo e risorse di decidere il modello di distribuzione (vendita o condivisione gratuita).

Non rispettare la PI comporta dei seri rischi, ignorare le licenze può portare a **sanzioni legali e pecuniarie** in quanto violare il copyright può portare a cause civili estremamente costose, **rimozione del software**, ovvero piattaforme di distribuzione come GitHub possono rimuovere il codice se non è in regola e **danni alla reputazione** che per un professionista è un segnale di scarsa affidabilità tecnica e legale.

Prima di parlare di licenze facciamo un piccolo chiarimento: quando parliamo di **software libero** non intendiamo **software di dominio pubblico**. &Egrave; un errore comune pensare che, poiché il software è *libero*, lo si possa manipolare a piacimento senza limiti. In realtà, il software libero è un software con una licenza specifica. Se un autore rilascia un codice sotto [licenza GPL](https://www.gnu.org/licenses/gpl-3.0.html) e tu lo modifichi per creare un software privato e chiuso, stai violando la legge. La *libertà* del software libero è spesso vincolata all'obbligo di mantenere quella libertà anche per chi verrà dopo di te (*principio della reciprocità*).

## Le licenze Creative Commons (CC)

Si tratta di licenze *modulari* nate per colmare il divario tra **copyright tradizionale** (tutti i diritti riservati) e il **pubblico dominio** (nessun diritto riservato).

Le CC permettono all'autore di dire al mondo: *Puoi usare la mia opera, ma a queste condizioni*, un po' come usare dei mattoncini LEGO: l'autore sceglie quali vincoli applicare per comporre la propria licenza personalizzata.

Queste licenze non sono un blocco unico, ma una combinazione di **quattro clausole fondamentali** che definiscono i diritti dell'utente:

1. **BY (Attribuzione)**: È il modulo base presente in quasi tutte le licenze. Dice: *Puoi usare l'opera, ma devi dire chi è l'autore*.
2. **SA (Condividi allo stesso modo)**: È la clausola della *continuità*. Se modifichi l'opera, devi distribuire il risultato con la stessa identica licenza dell'originale.
3. **NC (Non Commerciale)**: Specifica che non puoi usare l'opera per guadagnare soldi (per esempio, non puoi stampare un manuale CC-NC e rivenderlo).
4. **ND (No Opere Derivate)**: Ti permette di ridistribuire l'opera così com'è, ma ti vieta di modificarla, tagliarla o rimescolarla.

Combinando questi simboli, si ottengono le diverse **tipologie di licenze** che ora andremo ad analizzare nel dettaglio.

1. **CC0**: Rinuncia volontaria al copyright per quanto possibile per legge; l'opera viene resa quanto più possibile assimilabile al pubblico dominio. Nessuna attribuzione obbligatoria, massima libertà di riuso e integrazione in opere commerciali o derivate. È lo strumento usato quando l'autore vuole eliminare ogni vincolo. *Nota: in alcuni ordinamenti, come quello italiano, il diritto morale d'autore è inalienabile per legge, quindi CC0 non equivale in modo assoluto al pubblico dominio.*
2. **CC BY**: Licenza più permissiva che richiede solo l'attribuzione. Chiunque può copiare, distribuire, modificare e usare commercialmente l'opera purché citi l'autore e mantenga chiari i riferimenti alla licenza. È ideale per massimizzare la diffusione mantenendo il riconoscimento dell'autore.
3. **CC BY-SA**: Come CC BY, ma con obbligo che le opere derivate siano rilasciate con la stessa licenza. Crea una catena di condivisione aperta: chi modifica contribuisce alla stessa comunità di licenze libere. È molto usata in progetti collaborativi e risorse educative aperte.
4. **CC BY-NC**: Permette modifiche e condivisione ma vieta l'uso commerciale. Implicazioni pratiche: utile per autori che vogliono consentire remix e diffusione non commerciale ma riservare la possibilità di sfruttamento economico a trattative separate. **Attenzione**: la definizione di *commerciale* può essere ambigua e talvolta richiede valutazione caso per caso.
5. **CC BY-ND**: Consente la ridistribuzione solo nella forma originale; non sono permesse opere derivate. &Egrave; adatta a chi vuole massima diffusione senza alterazioni. Limita però la possibilità di integrazione in progetti che richiedono adattamenti.
6. **CC BY-NC-SA**: Combina **Non Commerciale** e **ShareAlike** con l'obbligo di attribuzione. Permette *remix* non commerciali ma impone che i derivati mantengano la stessa licenza, preservando la natura non commerciale e aperta del materiale. È una scelta conservativa per comunità che vogliono proteggere l'uso non commerciale mantenendo apertura.
7. **CC BY-NC-ND (la più restrittiva tra le licenze CC standard)**: attribuzione obbligatoria, nessun uso commerciale e nessuna opera derivata. Consente solo la condivisione dell'opera così com'è per scopi non commerciali; è utile quando l'autore vuole massima protezione pur consentendo la diffusione non commerciale.

---

## Tipologie di distribuzioni (distro)
Come abbiamo visto, una **distribuzione** è un assemblaggio curato di kernel, software di base e interfaccia grafica. Tuttavia, ciò che definisce davvero l'identità di una distro è la sua gestione dei pacchetti (il sistema con cui installi e aggiorni i programmi) e la sua politica di rilascio (quanto spesso e con quale filosofia vengono pubblicati gli aggiornamenti).

In base alla politica di aggiornamento
Esistono **due filosofie dominanti** che determinano l'esperienza dell'utente:

* **Fixed/Point Release (es. Debian, Ubuntu, Linux Mint)**: È il modello simile a quello di Windows o macOS. Il sistema operativo viene rilasciato in una versione specifica (es. Ubuntu 24.04). Gli aggiornamenti durante la vita di quella versione riguardano principalmente la sicurezza. Per avere nuove funzionalità massicce, bisogna aspettare la versione successiva.

  * **Vantaggio**: Massima stabilità. Il software non cambia sotto.
  * **Svantaggio**: Dopo un po' di tempo, le versioni dei programmi possono diventare datate.

* **Rolling Release (es. Arch Linux, openSUSE Tumbleweed)**: Il sistema si aggiorna continuamente, pezzo dopo pezzo. Se oggi esce una nuova versione di un programma, domani è già pronta per l'installazione.

  * **Vantaggio**: Software sempre all'ultimo grido senza dover mai reinstallare tutto il sistema.
  * **Svantaggio**: Rischio maggiore. Un aggiornamento troppo recente potrebbe contenere bug non ancora scoperti o creare conflitti con altri componenti.

### Famiglie di distribuzioni

Le distribuzioni si raggruppano spesso in famiglie basate sul formato dei file di installazione che utilizzano:

* **[Debian (formato .deb)](https://www.debian.org/index.it.html)**: Include Ubuntu e tutte le sue derivate. Utilizzano il comando **apt**. È la famiglia più diffusa al mondo, con la più vasta documentazione disponibile.
* **[Red Hat (formato .rpm)](https://www.redhat.com/it)**: Include Fedora e RHEL. È lo standard nell'industria e nelle grandi aziende. Utilizzano il comando **dnf**.
* **[Arch (formato .pkg.tar.zst)](https://archlinux.org)**: Nota per la sua filosofia *KISS* (Keep It Simple, Stupid). L'utente costruisce il sistema da zero, installando solo ciò che serve. Utilizza il comando **pacman**.

### Distribuzioni specialistiche

Esistono distro nate per scopi talmente specifici da alterare lo stack software che abbiamo studiato:

* **Per la Sicurezza (es. [ParrotOS](https://parrotsec.org))**: Contengono centinaia di strumenti già pronti per il Penetration Testing (test di vulnerabilità delle reti).
* **Per la Privacy (es. [Tails](https://tails.net))**: Progettate per non lasciare tracce sul computer. Tutto il traffico internet passa attraverso la rete Tor e, una volta spento il PC, ogni dato viene cancellato dalla RAM.
* **Per l'Educazione (es. [Endless OS](https://endlessglobal.com))**: Pensate per zone con scarsa connettività internet, includono intere enciclopedie e corsi offline.

<div class="p-2 border border-info rounded-3 bg-primary bg-info-subtle shadow-sm"><strong>Piccola nota editoriale</strong>: nei prossimi articoli parlerò di <i>Linux</i> intendendo sempre il sistema completo GNU/Linux. Stallman probabilmente non sarebbe d'accordo, ma prometto che lo citiamo correttamente ogni volta che conta davvero.</div>