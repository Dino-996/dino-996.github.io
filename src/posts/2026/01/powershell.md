---
layout: layouts/post.njk
title: Guida completa a PowerShell
description: Una guida teorica e pratica per iniziare a utilizzare powershell in modo efficace e rapido.
tags:
  - posts
  - powershell
date: 2026-01-01
excerpt: In questo guida per tutti troverete spiegazioni chiare, esempi pratici e suggerimenti per l'autoapprendimento.
permalink: "/blog/{{ title | slug }}/"
image: /assets/img/webp/powershell.webp
imageAlt: "Immagine generata con IA"
---

# Introduzione

{{ excerpt }}

## Che cos'è PowerShell?

​PowerShell è una​ **​shell di scripting**​ ​e un ​​**linguaggio ​​di scripting** ​​sviluppato da Microsoft. A​ ​differenza delle tradizionali shell a riga di comando che si basano sul testo PowerShell è​ **​orientato agli oggetti**​. Ciò significa che i comandi​​ (chiamati **​​cmdlet**​) manipolano **​​oggetti​ ​strutturati**, non solo stringhe di testo. Questa caratteristica lo rende estremamente potente​ per l'automazione, la gestione di sistemi e la configurazione.​

### Windows PowerShell vs PowerShell 7+

> Distinzione fondamentale che molti ignorano.

<div class="container mb-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Caratteristica</th>
          <th>Windows PowerShell 5.1</th>
          <th>
              PowerShell 7+
            </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Stato</td>
          <td>
            <span class="badge text-bg-warning">Legacy</span>
          </td>
          <td>
            <span class="badge text-bg-success">Attivo</span>
          </td>
          </tr>
        <tr>
        <td class="fw-semibold">Open Source</td>
          <td><span class="text-danger fw-bold">✕</span></td>
          <td>GitHub
        </td>
        </tr>
        <tr>
          <td class="fw-semibold">Cross-platform</td>
          <td>Solo Windows</td>
          <td>Windows · Linux · macOS</td>
        </tr>
        <tr>
          <td class="fw-semibold">Eseguibile</td>
          <td><code>powershell.exe</code></td>     <td><code>pwsh</code></td>
        </tr>
        <tr>
          <td class="fw-semibold">Runtime</td>
          <td>.NET Framework</td>
          <td>.NET 6 / 7 / 8</td>
        </tr>
        <tr>
          <td class="fw-semibold">Incluso in Windows</td>
          <td>Win 10 / 11</td>
          <td>Da installare separatamente</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**Raccomandazione:** Usa sempre **PowerShell 7+** (`pwsh`) per i nuovi progetti.

### Perché usare PowerShell

- **Automazione:** Elimina attività manuali ripetitive — gestione file, provisioning utenti, deployment applicazioni.
- **Gestione dei sistemi:** Strumento fondamentale per l'amministrazione Windows, usato sempre più anche su Linux e macOS.
- **Efficienza:** Operazioni complesse in poche righe grazie alla pipeline orientata agli oggetti.
- **Standard enterprise:** È lo strumento ufficiale per la gestione di **Microsoft Azure** e dell'ecosistema Microsoft 365.

### Differenze tra PowerShell, CMD e Bash

<div class="container mb-3">
  <div class="table-responsive shadow-sm rounded">
    <table class="table table-bordered table-striped table-hover align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th>Caratteristica</th>
          <th>PowerShell</th>
          <th>CMD</th>
          <th>Bash</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Orientamento</td>
          <td>Oggetti .NET</td>
          <td>Testo</td>
          <td>Testo</td>
          </tr>
        <tr>
        <td class="fw-semibold">Linguaggio</td>
          <td>Powershell (.NET)</td>
          <td>Batch</td>
          <td>Batch scripting</td>
        </tr>
        <tr>
          <td class="fw-semibold">Output pipeline</td>
          <td>Oggetti strutturati</td>
          <td>Stringhe</td>
          <td>Stringhe</td>
        </tr>
        <tr>
          <td class="fw-semibold">Cross-platform</td>
          <td>Win/Linux/MacOS</td>
          <td>Win</td>
          <td>Linux/MacOS</td>
        </tr>
        <tr>
          <td class="fw-semibold">Potenza</td>
          <td>Alta</td>
          <td>Bassa</td>
          <td>Alta</td>
        </tr>
        <tr>
          <td class="fw-semibold">Curva di apprendimento</td>
          <td>Media</td>
          <td>Bassa</td>
          <td>Media</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Installazione e Configurazione

### Windows

Windows 10/11 include **Windows PowerShell 5.1** (legacy). Per installare **PowerShell 7+**:

```powershell
# Metodo 1: Windows Package Manager (winget)
winget install --id Microsoft.Powershell --source winget

# Metodo 2: Download diretto
# https://github.com/PowerShell/PowerShell/releases
```

Dopo l'installazione, avvia PowerShell 7 con il comando `pwsh` nel terminale.

### macOS

```bash
# Installa Homebrew se non presente
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installa PowerShell
brew install --cask powershell

# Avvia PowerShell
pwsh
```

### Linux (Ubuntu/Debian)

```bash
# Importa la chiave Microsoft
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc

# Aggiungi il repository
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -rs)-prod $(lsb_release -cs) main"

# Installa
sudo apt update && sudo apt install -y powershell

# Avvia
pwsh
```

Per altre distribuzioni (RHEL, Fedora, openSUSE), consulta la [documentazione ufficiale](https://learn.microsoft.com/powershell/scripting/install/installing-powershell).

### Editor consigliato: Visual Studio Code

> **PowerShell ISE è ufficialmente deprecato.** Microsoft raccomanda **Visual Studio Code** con l'estensione PowerShell.

Installa l'estensione direttamente da VS Code:

```
Ctrl+P → ext install ms-vscode.PowerShell
```

L'estensione offre: IntelliSense, debugging integrato, esecuzione di selezioni di codice e integrazione con PSScriptAnalyzer.

### Configurazione di Base

**Profilo PowerShell** — script eseguito automaticamente all'avvio:

```powershell
# Visualizza il percorso del profilo
$PROFILE

# Crea il file di profilo se non esiste
if (-not (Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

# Apri il profilo in VS Code
code $PROFILE
```

**Execution Policy** — controlla quali script possono essere eseguiti:

```powershell
# Visualizza la policy attuale
Get-ExecutionPolicy

# Imposta la policy per l'utente corrente (scelta comune per sviluppo locale)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# Valori possibili:
# Restricted    → Nessuno script (default su Windows)
# RemoteSigned  → Gli script locali sono OK; quelli scaricati richiedono firma
# Unrestricted  → Tutti gli script (non consigliato in produzione)
# AllSigned     → Solo script con firma digitale (massima sicurezza)
```

## Concetti Fondamentali

### Sintassi: Verb-Noun

Tutti i cmdlet seguono la convenzione `Verbo-Sostantivo`:

```powershell
Get-Process        # Recupera informazioni sui processi
Stop-Service       # Arresta un servizio
New-Item           # Crea un nuovo elemento
Remove-Item        # Elimina un elemento
Set-Location       # Cambia directory
```

I verbi approvati da Microsoft garantiscono coerenza. Per vederli tutti:

```powershell
Get-Verb | Sort-Object Verb
```

### Il Sistema di Help

La documentazione integrata è uno dei punti di forza di PowerShell:

```powershell
# Aggiorna l'help (eseguire come amministratore)
Update-Help

# Help base
Get-Help Get-Process

# Con esempi pratici (molto utile!)
Get-Help Get-Process -Examples

# Help completo con tutti i parametri
Get-Help Get-Process -Full

# Apre la documentazione online
Get-Help Get-Process -Online
```

### Cmdlet Essenziali

```powershell
Get-Command               # Elenca tutti i cmdlet disponibili
Get-Command -Verb Get     # Filtra per verbo
Get-Command *process*     # Ricerca per nome

Get-Member                # Mostra proprietà e metodi di un oggetto
Get-Process | Get-Member  # Esempio: scopri cosa puoi fare con un processo
```

## Variabili e Tipi di Dati

### Variabili

Le variabili iniziano con `$`. PowerShell è **tipizzato dinamicamente**, ma è possibile (e consigliato per script professionali) dichiarare il tipo esplicitamente:

```powershell
# Tipizzazione implicita
$nome = "Mario"
$eta = 30
$attivo = $true

# Tipizzazione esplicita (best practice per script professionali)
[string]$nome = "Mario"
[int]$eta = 30
[bool]$attivo = $true
[datetime]$oggi = Get-Date
```

### Stringhe

```powershell
# Virgolette doppie: interpolazione variabili
$nome = "Mario"
$saluto = "Ciao, $nome!"           # → "Ciao, Mario!"

# Virgolette singole: stringa letterale (no interpolazione)
$letterale = 'Ciao, $nome!'        # → "Ciao, $nome!"

# Stringa multilinea (here-string)
$testo = @"
Questa è una stringa
su più righe con variabili: $nome
"@

# Metodi delle stringhe (PowerShell espone i metodi .NET)
"powershell".ToUpper()             # → "POWERSHELL"
"  testo  ".Trim()                 # → "testo"
"ciao mondo".Split(" ")           # → @("ciao", "mondo")
```

### Array e HashTable

```powershell
# Array
$frutti = "mela", "banana", "arancia"
$numeri = 1..10                    # Range: da 1 a 10
$frutti[0]                         # → "mela"
$frutti.Count                      # → 3

# HashTable (dizionario chiave-valore)
$persona = @{
    Nome    = "Mario"
    Cognome = "Rossi"
    Eta     = 30
}
$persona["Nome"]                   # → "Mario"
$persona.Eta                       # → 30
$persona.Keys                      # → Nome, Cognome, Eta
```

### Variabili Automatiche

PowerShell fornisce variabili speciali predefinite:

```powershell
$_         # (alias: $PSItem) L'oggetto corrente nella pipeline
$?         # True se l'ultimo comando ha avuto successo
$LASTEXITCODE  # Codice di uscita dell'ultimo programma esterno
$Error     # Array degli ultimi errori
$HOME      # Directory home dell'utente
$PSVersionTable  # Informazioni sulla versione di PowerShell
$PROFILE   # Percorso del profilo utente
```

### Operatori

```powershell
# Aritmetici
5 + 3      # 8
10 % 3     # 1 (modulo)

# Confronto
"a" -eq "a"   # True  (equal)
5 -ne 3       # True  (not equal)
10 -gt 5      # True  (greater than)
3 -lt 5       # True  (less than)
5 -ge 5       # True  (greater or equal)
"ciao" -like "c*"   # True  (wildcard match)
"hello" -match "^h" # True  (regex match)

# Logici
$true -and $false   # False
$true -or $false    # True
-not $true          # False
```

## La Pipeline

La **pipeline** (`|`) è il cuore di PowerShell. Passa **oggetti interi** (non testo) tra i comandi, preservando tutte le proprietà.

```powershell
# Esempio base: filtra i processi che usano più di 100MB di RAM
Get-Process | Where-Object { $_.WorkingSet -gt 100MB }
# $_ rappresenta l'oggetto corrente nella pipeline (ogni processo)
# .WorkingSet è una proprietà dell'oggetto Process

# Concatena più operazioni
Get-Process |
    Where-Object { $_.CPU -gt 1 } |
    Sort-Object CPU -Descending |
    Select-Object Name, CPU, Id -First 10 |
    Format-Table -AutoSize
```

### Cmdlet Fondamentali per la Pipeline

```powershell
# Filtra oggetti
Get-Service | Where-Object { $_.Status -eq "Running" }

# Ordina
Get-Process | Sort-Object WorkingSet -Descending

# Seleziona proprietà specifiche
Get-Process | Select-Object Name, Id, CPU

# Aggrega
Get-Process | Measure-Object CPU -Sum -Average

# Raggruppa
Get-Service | Group-Object Status

# Converte output
Get-Process | ConvertTo-Json
Get-Process | ConvertTo-Csv | Out-File processi.csv

# Formatta output (solo per visualizzazione, non usare in pipeline)
Get-Process | Format-Table Name, CPU -AutoSize
Get-Process | Format-List *
```

## Gestione File e Directory

### Navigazione

```powershell
Get-Location              # Directory corrente (alias: pwd)
Set-Location C:\Projects  # Cambia directory (alias: cd)
Set-Location ..           # Vai alla directory padre

Get-PSDrive               # Mostra tutti i "drive" disponibili (C:, D:, HKLM:, Env:, ecc.)
Set-Location HKLM:        # PowerShell può navigare anche nel Registry!
```

### Operazioni sui File

```powershell
# Elenca contenuto
Get-ChildItem             # (alias: ls, dir)
Get-ChildItem -Recurse    # Ricorsivo
Get-ChildItem *.log       # Filtra per estensione

# Crea
New-Item -ItemType File -Path .\log.txt
New-Item -ItemType Directory -Path .\backup

# Leggi
Get-Content .\log.txt
Get-Content .\log.txt -Tail 20   # Ultime 20 righe (come tail -n)
Get-Content .\log.txt -Wait      # Modalità follow (come tail -f)

# Scrivi
Set-Content .\output.txt "Nuovo contenuto"     # Sovrascrive
Add-Content .\output.txt "Riga aggiuntiva"    # Appende

# Copia, sposta, elimina
Copy-Item .\source.txt .\dest.txt
Move-Item .\old.txt .\new.txt
Remove-Item .\file.txt
Remove-Item .\cartella -Recurse  # Elimina cartella con contenuto
```

## Strutture di Controllo

### Condizionali

```powershell
# If / ElseIf / Else
$temperatura = 25

if ($temperatura -gt 30) {
    Write-Host "Caldo"
} elseif ($temperatura -gt 20) {
    Write-Host "Piacevole"
} else {
    Write-Host "Fresco"
}

# Switch (più efficiente di if/elseif per casi multipli)
$giorno = "Lunedì"
switch ($giorno) {
    "Lunedì"    { Write-Host "Inizio settimana" }
    "Venerdì"   { Write-Host "Fine settimana" }
    "Sabato"    { Write-Host "Weekend!" }
    "Domenica"  { Write-Host "Weekend!" }
    default     { Write-Host "Giorno lavorativo" }
}
```

### Loop

```powershell
# For classico
for ($i = 0; $i -lt 5; $i++) {
    Write-Host "Iterazione: $i"
}

# ForEach (il più comune in PowerShell)
$servizi = Get-Service | Where-Object { $_.Status -eq "Stopped" }
foreach ($servizio in $servizi) {
    Write-Host "Servizio fermo: $($servizio.Name)"
}

# ForEach-Object (nella pipeline)
1..5 | ForEach-Object { $_ * 2 }   # Output: 2 4 6 8 10

# While
$contatore = 0
while ($contatore -lt 3) {
    Write-Host "Contatore: $contatore"
    $contatore++
}
```

### Gestione Errori

```powershell
# $ErrorActionPreference controlla il comportamento globale degli errori
$ErrorActionPreference = "Stop"  # Trasforma tutti gli errori in eccezioni terminanti

try {
    $contenuto = Get-Content "file-inesistente.txt" -ErrorAction Stop
    Write-Host "File letto con successo"
}
catch [System.IO.FileNotFoundException] {
    Write-Warning "File non trovato: $_"
}
catch {
    # Cattura qualsiasi altro errore
    Write-Error "Errore imprevisto: $($_.Exception.Message)"
}
finally {
    # Eseguito sempre, con o senza errori (utile per cleanup)
    Write-Host "Operazione completata."
}
```

## Funzioni e Moduli

### Funzioni Base

```powershell
function Get-Saluto {
    param(
        [string]$Nome = "Mondo",   # Parametro con valore di default
        [int]$Ripetizioni = 1
    )

    for ($i = 0; $i -lt $Ripetizioni; $i++) {
        Write-Output "Ciao, $Nome!"
    }
}

# Chiamata
Get-Saluto -Nome "Mario" -Ripetizioni 3
```

### Funzioni Avanzate (Advanced Functions)

Per script professionali, usa `CmdletBinding` per ottenere comportamenti da cmdlet nativi (supporto `-Verbose`, `-WhatIf`, `-ErrorAction`, ecc.):

```powershell
function Invoke-Backup {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [string]$SourcePath,

        [Parameter(Mandatory)]
        [string]$DestinationPath,

        [switch]$Compress
    )

    process {
        if ($PSCmdlet.ShouldProcess($SourcePath, "Backup")) {
            Write-Verbose "Backup di '$SourcePath' verso '$DestinationPath'"
            Copy-Item -Path $SourcePath -Destination $DestinationPath -Recurse
            Write-Output "Backup completato."
        }
    }
}

# Uso con -WhatIf per simulare senza eseguire
Invoke-Backup -SourcePath "C:\dati" -DestinationPath "D:\backup" -WhatIf

# Uso con -Verbose per logging dettagliato
Invoke-Backup -SourcePath "C:\dati" -DestinationPath "D:\backup" -Verbose
```

### Gestione Moduli

```powershell
# Trova moduli disponibili nel repository PSGallery
Find-Module -Name *Azure*

# Installa un modulo
Install-Module -Name Az -Scope CurrentUser

# Importa un modulo nella sessione corrente
Import-Module Az

# Elenca i moduli installati
Get-Module -ListAvailable

# Elenca i cmdlet di un modulo specifico
Get-Command -Module Az.Compute
```

## Amministrazione di Sistema

### Utenti Locali

```powershell
Get-LocalUser
New-LocalUser -Name "mario" -Password (ConvertTo-SecureString "P@ss!" -AsPlainText -Force) -FullName "Mario Rossi"
Add-LocalGroupMember -Group "Administrators" -Member "mario"
Remove-LocalUser -Name "mario"
```

### Servizi

```powershell
Get-Service
Get-Service -Name "wuauserv"           # Windows Update
Start-Service -Name "wuauserv"
Stop-Service -Name "wuauserv"
Restart-Service -Name "wuauserv"
Set-Service -Name "wuauserv" -StartupType Disabled
```

### Processi

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
Stop-Process -Name "notepad" -Confirm
Start-Process "notepad.exe"
```

### Registro di Sistema

```powershell
# Naviga nel registro come se fosse un filesystem
Set-Location HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion

Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" -Name "ProductName"
Set-ItemProperty -Path "HKCU:\Software\MyApp" -Name "Debug" -Value 1
New-Item -Path "HKCU:\Software\MyApp"
Remove-Item -Path "HKCU:\Software\MyApp" -Recurse
```

## PowerShell Remoting

PowerShell Remoting consente di eseguire comandi su computer remoti.

### Tramite WinRM (Windows)

```powershell
# Abilita il remoting (da eseguire come amministratore)
Enable-PSRemoting -Force

# Sessione interattiva
Enter-PSSession -ComputerName Server01 -Credential (Get-Credential)

# Esegui un comando su un computer remoto
Invoke-Command -ComputerName Server01 -ScriptBlock {
    Get-Service | Where-Object { $_.Status -eq "Stopped" }
}

# Esegui uno script locale su computer remoti
Invoke-Command -ComputerName Server01, Server02 -FilePath .\script.ps1

# Gestione sessioni persistenti
$sessione = New-PSSession -ComputerName Server01 -Credential (Get-Credential)
Invoke-Command -Session $sessione -ScriptBlock { Get-Process }
Remove-PSSession $sessione
```

### Tramite SSH (Cross-Platform, PowerShell 7+)

```powershell
# Connessione SSH a un server Linux
Enter-PSSession -HostName ubuntu-server -UserName admin -SSHTransport

# Esegui comandi remoti via SSH
Invoke-Command -HostName ubuntu-server -UserName admin -ScriptBlock { uname -a }
```

## Sicurezza in PowerShell

La sicurezza è una priorità per qualsiasi script destinato a produzione o ambienti aziendali.

### Firma Digitale degli Script (Code Signing)

In ambienti con policy `AllSigned`, gli script devono essere firmati:

```powershell
# Ottieni il certificato di firma (da un'autorità di certificazione aziendale o auto-firmato)
$cert = Get-ChildItem Cert:\CurrentUser\My -CodeSigningCert

# Firma lo script
Set-AuthenticodeSignature -FilePath .\script.ps1 -Certificate $cert

# Verifica la firma
Get-AuthenticodeSignature .\script.ps1
```

### Gestione Sicura delle Credenziali

> Non inserire mai password in chiaro negli script!

```powershell
# Chiedi le credenziali in modo sicuro
$cred = Get-Credential

# Salva una password come SecureString (cifrata, leggibile solo dall'utente corrente)
$password = Read-Host -Prompt "Inserisci password" -AsSecureString
$passwordCifrata = ConvertFrom-SecureString $password
$passwordCifrata | Out-File .\password.enc  # Salva cifrata su disco

# Ricarica la password
$passwordCifrata = Get-Content .\password.enc | ConvertTo-SecureString
```

### Script Block Logging e Auditing

Per ambienti aziendali, abilita la registrazione degli script tramite Group Policy:

```
Computer Configuration → Administrative Templates → Windows Components →
Windows PowerShell → Turn on Script Block Logging → Enabled
```

Gli script eseguiti vengono registrati nel **Windows Event Log** (Event ID 4104), fondamentale per audit e incident response.

### Constrained Language Mode

Limita le funzionalità di PowerShell per ridurre la superficie d'attacco:

```powershell
# Verifica la modalità corrente
$ExecutionContext.SessionState.LanguageMode

# In CLM, tipi .NET arbitrari e COM objects sono bloccati
# Viene tipicamente applicato tramite AppLocker o WDAC
```

## PowerShell e il Cloud

PowerShell è lo strumento ufficiale per gestire **Microsoft Azure**:

```powershell
# Installa il modulo Az
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force

# Autenticazione ad Azure
Connect-AzAccount

# Operazioni comuni
Get-AzResourceGroup                          # Elenca i Resource Group
Get-AzVM -ResourceGroupName "MyRG"           # Elenca le VM

# Esempio: avvia tutte le VM ferme in un Resource Group
Get-AzVM -ResourceGroupName "MyRG" -Status |
    Where-Object { $_.PowerState -eq "VM deallocated" } |
    ForEach-Object { Start-AzVM -ResourceGroupName "MyRG" -Name $_.Name }
```

## Best Practice per Script Professionali

### Qualità del Codice con PSScriptAnalyzer

**PSScriptAnalyzer** è il linter ufficiale per PowerShell:

```powershell
# Installa
Install-Module -Name PSScriptAnalyzer -Scope CurrentUser

# Analizza uno script
Invoke-ScriptAnalyzer -Path .\script.ps1

# Analizza una directory intera
Invoke-ScriptAnalyzer -Path .\scripts\ -Recurse
```

### Testing con Pester

**Pester** è il framework di testing standard per PowerShell:

```powershell
# Installa Pester
Install-Module -Name Pester -Scope CurrentUser -Force

# Esempio di test (file: Get-Saluto.Tests.ps1)
Describe "Get-Saluto" {
    It "Restituisce il saluto corretto" {
        $risultato = Get-Saluto -Nome "Mario"
        $risultato | Should -Be "Ciao, Mario!"
    }
    It "Usa 'Mondo' come default se nessun nome è fornito" {
        Get-Saluto | Should -Be "Ciao, Mondo!"
    }
}

# Esegui i test
Invoke-Pester .\Get-Saluto.Tests.ps1
```

### Checklist Best Practice

- **Usa `CmdletBinding`** nelle funzioni per supportare `-Verbose`, `-WhatIf`, `-ErrorAction`
- **Tipizza i parametri** esplicitamente (`[string]`, `[int]`, `[Parameter(Mandatory)]`)
- **Usa `$ErrorActionPreference = "Stop"`** all'inizio degli script critici
- **Commenta il codice** con `#` per riga e `<# ... #>` per blocchi
- **Non usare alias negli script** (`ls`, `cd`, `?`) — usa i nomi completi per leggibilità
- **Gestisci sempre le credenziali** con `SecureString` o `Get-Credential`
- **Usa `Write-Verbose`** per logging, non `Write-Host` (che bypassa la pipeline)
- **Analizza con PSScriptAnalyzer** prima di distribuire uno script
- **Scrivi test con Pester** per gli script riutilizzati in produzione
- **Controlla la Execution Policy** prima del deployment

## Risorse Utili

**Documentazione ufficiale:**
- [Microsoft Learn – PowerShell](https://learn.microsoft.com/powershell)
- [PowerShell Gallery](https://www.powershellgallery.com) — repository di moduli e script
- [GitHub – PowerShell](https://github.com/PowerShell/PowerShell)

**Community:**
- [PowerShell.org](https://powershell.org)
- [r/PowerShell su Reddit](https://reddit.com/r/PowerShell)

## Conclusione

Hai ora una base teorica e pratica solida per iniziare a usare **PowerShell** in contesti reali. Gli argomenti coperti — dalla pipeline alla gestione remota, dalla sicurezza al cloud — ti posizionano bene per l'uso professionale di questo strumento.

La competenza reale arriva con la **pratica costante**: automatizza le tue attività quotidiane, analizza i tuoi script con PSScriptAnalyzer e, quando sei pronto, scrivi i tuoi primi test con Pester.