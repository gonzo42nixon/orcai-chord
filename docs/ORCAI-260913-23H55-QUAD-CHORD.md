# Johanniter Quad-Chord Enterprise Architecture
## Systemarchitektur, Integrationslandschaft & Interaktives Benutzerhandbuch

> **Dokumentenart:** Enterprise Architecture Reference & Interactive Manual  
> **Organisation:** Johanniter-Unfall-Hilfe e.V. (10.000+ Mitarbeiter, bundesweite Verbände)  
> **Klassifikation:** Offizielle Architektur-Referenz & Schulungsdokumentation  
> **System-Umfang:** 77 Systeme, 87 Integrationsverbindungen, 8 Geschäftsprozesse, 8 Domänen (D1–D8)  
> **Persistenz-Key:** `ORCAI-260913-23H55-QUAD-CHORD`  
> **Stand:** September 2026 · Version 2.6 (Quad-Chord Release)

---

## 1. Executive Summary & Zielsetzung

Die vorliegende Anwendung ist die offizielle **Enterprise Architecture (EA) Quad-Chord Visualisierungsplattform** der Johanniter-Unfall-Hilfe e.V. Sie dient Architekten, Integrationsentwicklern, IT-Leitern und Fachbereichsverantwortlichen dazu, die heterogene Systemlandschaft der Johanniter transparent zu machen, Abhängigkeiten zu steuern und Schnittstellenflüsse interaktiv zu erkunden.

### Warum das Quad-Chord Modell?
Traditionelle statische Architekturpläne oder endlose Tabellenblätter bieten keine ausreichende Orientierung bei der Steuerung von über 70 Systemen. Das interaktive **Quad-Chord Modell** löst dies durch eine mathematisch exakte und visuell intuitive Trennung in **4 Kreis-Segmente (Quadranten)**:
1. **Betreiber-Trennung (Vertikal):** Links befinden sich alle internen Johanniter-Systeme; rechts alle externen Systeme (Partner, Behörden, Kostenträger, Banken, Drittanbieter-SaaS).
2. **Bereitstellungs-Trennung (Horizontal):** Oben befinden sich alle Cloud- und SaaS-Workloads; unten alle On-Premises- und RZ-Workloads.

Dadurch werden die beiden kritischsten architektonischen Schutz- und Übergangsbereiche – die **Hybrid Cloud Bridge** und der **Perimeter / DMZ** – unmittelbar visuell begreifbar und messbar.

---

## 2. Die 4-Quadranten-Architektur (4 Kreis-Segmente)

Das Chord-Diagramm gruppiert alle 77 Systeme auf einem 360°-Kreisbogen in vier klar abgegrenzte Segmente:

```
                     ▲ CLOUD-BEREICH (OBEN)
                     │
    Top-Left (TL)    │    Top-Right (TR)
  JOHANNITER CLOUD   │  EXTERNE CLOUD & SAAS
  (S/4HANA PCE, BTP, │  (Seeburger BIS, Ariba,
   CPI, Entra ID...) │   Salesforce, Quentic, TI)
─────────────────────┼─────────────────────────► EXTERNE SYSTEME (RECHTS)
  JOHANNITER ON-PREM │   EXTERNE ON-PREM
  (ORBIS KIS, Vivendi│  (GKV §301, Pflege §105,
   Kafka, Palo Alto) │   Leitstellen Cobra, deNIS)
    Bottom-Left (BL) │    Bottom-Right (BR)
                     │
                     ▼ ON-PREMISES (UNTEN)
```

### Tabellarische Übersicht der 4 Quadranten

| Quadrant | Bezeichnung | Position | Systeme | Kanten | Traffic-Anteil | Kernanwendungen |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **TL** | **Johanniter Cloud & Hyperscaler** | Links Oben | **14** | 35 | **41.6%** | S/4HANA Private Cloud (`SYS-01`), SAP BTP Core (`SYS-03`), SAP CPI (`SYS-04`), Microsoft Entra ID (`SYS-69`), Kong API Gateway (`SYS-61`), Kita-Verwaltung (`SYS-29`), Helfer-Portal (`SYS-54`), Microsoft 365 (`SYS-63`), Snowflake (`SYS-66`), Power BI (`SYS-67`) |
| **BL** | **Johanniter On-Premises** | Links Unten | **28** | 58 | **71.6%** | Dedalus ORBIS KIS (`SYS-11`), Philips PDMS (`SYS-13`), Agfa PACS (`SYS-14`), Connext Vivendi NG (`SYS-23`), Tunstall UMO Hausnotruf (`SYS-35`), medDV NIDAserver (`SYS-34`), Apache Kafka (`SYS-62`), Palo Alto Firewall (`SYS-72`), CyberArk (`SYS-77`) |
| **TR** | **Externe Cloud & Fach-SaaS** | Rechts Oben | **30** | 37 | **37.8%** | Seeburger BIS Cloud (`SYS-08`), SAP Ariba (`SYS-07`), Salesforce Nonprofit Cloud (`SYS-64`), Quentic EcoWebDesk (`SYS-56`), Connext Vivendi Mobil (`SYS-24`), MediFox Dan (`SYS-26`), PalliDoc (`SYS-30`), Imito SmartWund (`SYS-32`), Vodafone IoT (`SYS-36`), Convexis RescueTrack (`SYS-39`), gematik TI (KIM, ePA, VSDM, eRezept), Peppol (`SYS-09`), GHX (`SYS-10`), RKI DEMIS (`SYS-48`), Zscaler (`SYS-73`) |
| **BR** | **Externe On-Premises** | Rechts Unten | **5** | 9 | **8.2%** | GKV §301 Clearing-Konnektor (`SYS-19`), KV-SafeNet (`SYS-21`), Pflegekassen §105 DTA-Gateway (`SYS-28`), ILS Leitstellen Cobra (`SYS-33`), BBK deNIS Katastrophenschutz (`SYS-40`) |

---

## 3. Systemische Grenzen & Demarkationslinien

Auf der Zeichenfläche heben zwei markante Demarkationslinien die architektonischen Übergänge hervor:

### A. Perimeter & DMZ (Vertikale Demarkationslinie)
* **Zweck:** Trennt die interne Johanniter-Infrastruktur (links) von allen externen Partnern, Kostenträgern, Behörden und Drittanbieter-SaaS-Diensten (rechts).
* **Kennzahlen:**
  * **38 grenzüberschreitende Kanten** (Ingress / Egress / B2B)
  * **35 externe Systeme** (45% der Gesamtsystemlandschaft)
  * **8 gesicherte Perimeter-Gateways** (Palo Alto NGFW, F5 WAF, Zscaler ZTNA, TI-Konnektor-Cluster)

### B. Hybrid Cloud Bridge (Horizontale Demarkationslinie)
* **Zweck:** Verbindet die moderne Cloud- und Hyperscaler-Infrastruktur (oben) mit den internen RZ- und Klinik-Servern (unten).
* **Netzwerk-Architektur:**
  * SAP Cloud Connector Reverse Tunnel für gesicherte RFC/REST-Kopplung.
  * Azure ExpressRoute & mTLS-Tunnel für InterSystems HealthShare & API-Gateways.
  * Apache Kafka Event Streaming für Echtzeit-Ereignisse (Hausnotruf, Rettungswagen-Telemetrie).
* **Kennzahlen:**
  * **22 Hybrid-Kanten**
  * **26.0% des Gesamttraffic** der Johanniter
  * **31 beteiligte Systeme**

---

## 4. Das Externe Fach-SaaS & Seeburger BIS Modell

Ein zentraler architektonischer Grundsatz der Johanniter-IT lautet:
> [!IMPORTANT]
> **Betreibersicht der Johanniter:**  
> Wird eine Software von einem Drittanbieter in dessen eigener Cloud-Infrastruktur betrieben (Hosted Managed Cloud / Public SaaS), wird sie aus Johanniter-Sicht konsequent als **EXTERN (Quadrant TR)** geführt. Dies betrifft neben Seeburger BIS (`SYS-08`) auch SAP Ariba, Salesforce, Quentic EcoWebDesk, Connext Vivendi Mobil, MediFox Dan, PalliDoc, Vodafone IoT, Convexis RescueTrack, Beekeeper und Zscaler.

---

## 5. Bedienungsanleitung: Dynamischer Header-Titel & 4-Stufen-Drilldown

Die Anwendungsnavigation ist als prominenter **dynamischer Titel im Kopfbereich** (Mitte Oben) realisiert:

```
[1] D2 · Klinische KIS ✕  *  [2] PROC-01 · Notfallaufnahme ✕  *  [3] INT-02 · Notfallaufnahme ✕
[Stufe 3 (Integration aktiv)] INT-02 (5 Schritte) · Token wandert von Quelle zu Ziel · Klicken Sie auf einen Schritt
```

* **Zentrierte Titelstruktur:** Verbindet die Stufen mit dem Trennsymbol `*` und Glowing-Effekt.
* **Individuelle Reset-Buttons (`✕`):** Jede Stufe kann punktuell abgewählt werden, um zur übergeordneten Ebene zurückzukehren.
* **Kontextueller Leitfaden-Untertitel:** Beginnt stets mit `Stufe # ..` und gibt dem Anwender zu jedem Zeitpunkt konkrete Handlungsempfehlungen.

---

## 6. Der Dynamic Inspector (Rechter Drawer)

Der rechte Inspektor dient der tiefen technischen E2E-Prozessanalyse:
* **Erhaltung der Integrationsstrecke:** Die chronologische Schritt-Pipeline (z. B. 5 Schritte bei `INT-02`) bleibt **dauerhaft sichtbar** und wird bei Klicks auf Systeme auf der Zeichenfläche **nicht mehr überschrieben**.
* **Token-Simulation & Steuerung:** 
  * Play / Pause (`⏯`), Vorheriger Schritt (`⏮`), Nächster Schritt (`⏭`).
  * Live-Wanderung des farbigen Daten-Tokens über die Splines auf der Zeichenfläche.
* **Vollständige Schritt-Metadaten:**
  * Schnittstellen-ID (`CON-xx`), Nachrichtentyp-Badge und Perimeter-Status.
  * Quell- und Zielsystem mit Domänen-Farbbalken und Hosting-Standort.
  * Übertragungsprotokolle und Architektur-Flow-Richtung.

---

## 7. System- & Kanten-Pop-Outs mit Location-Finder (🎯)

Für maximale Übersichtlichkeit auf großen Displays bietet die Anwendung ein ausgereiftes Multi-Pop-Out-System:

### A. System-Spickzettel Pop-Out
* Klick auf ein beliebiges System-Icon auf der Zeichenfläche öffnet eine schwebende Pop-Out-Karte.
* **Inhalt:** System-Stammdaten, Domäne, Betreiber/Hersteller, Scope (`🏢 JOHANNITER` vs. `🌐 EXTERN`), Hosting, Perimeter-Gateway, Beschreibung und scrollbare Liste aller verknüpften Schnittstellen.
* **Unabhängig verschiebbar:** Kann frei über die Zeichenfläche gezogen werden.

### B. Location-Finder Button (`🎯 Lokalisieren`)
* Sowohl System- als auch Kanten-Pop-Outs besitzen einen Button **„🎯 Lokalisieren“**.
* Bei Klick:
  1. Das entsprechende System bzw. die Kante wird im Quad-Chord Diagramm sofort optisch hervorgehoben.
  2. Ein animierter, dreifach pulsierender roter **Signal-Radarring (`.locator-beacon-ring`)** pulsiert direkt auf dem Knoten.
  3. Der Nutzer verliert selbst bei 77 Systemen und 87 Kanten nie die Orientierung.

### C. Multi-Pop-Out Unterstützung
* Beliebig viele Pop-Out-Karten können parallel geöffnet bleiben, um beispielsweise Quell- und Zielsystem einer Kante direkt nebeneinander zu vergleichen.

---

## 8. Drawer-Layout, Nachrichtentypen, Tags & Filter-Reset

* **Scrollbar-freie Gestaltung:** Sowohl „Aktive Nachrichtentypen“ (linker Drawer) als auch „Aktive Tags“ (rechter Drawer) besitzen eine großzügig bemessene, flexible Höhe. Dadurch werden alle Badges und Chips vollständig dargestellt, ohne dass interne Scrollbars stören.
* **Dedizierte Reset-Buttons (`↺ Zurücksetzen`):** Über Schaltflächen direkt am jeweiligen Filterbereich können Nachrichtentyp-Filter und Tag-Filter mit einem Klick einzeln auf den Ausgangszustand zurückgesetzt werden.
* **SVG-Vektorgrafik-Export:** Exportieren Sie die aktuelle Diagrammansicht jederzeit als druckreife Vektorgrafik (`.svg`).

---

## 9. Kompakte Header-Aktionsleiste & Web Share API

Im Header (oben rechts) befinden sich aufgeräumte, barrierefreie **Icon-Only-Bedienelemente** mit aussagekräftigen Tooltips (`title` und `aria-label`):

1. **(i) Architektur-Dokumentation:** Öffnet dieses persistierte Handbuch im ORCAI Markdown Studio.
2. **🔗 / 📤 Share-Button (Web Share API):**
   * Verwendet die native Browser-Share-Funktion (`navigator.share`) auf mobilen Endgeräten und modernen Desktop-Browsern, um die Anwendung mit Titel und URL direkt zu teilen.
   * **Automatischer Zwischenablage-Fallback:** Wird `navigator.share` vom Browser nicht unterstützt, wird die Anwendungs-URL direkt in die Zwischenablage kopiert und eine dezente Erfolgsmeldung (*„Link in Zwischenablage kopiert!“*) eingeblendet.
3. **🌙 / ☀️ Day & Night Mode:** Schaltet nahtlos zwischen augenschonendem Dunkelmodus und tageslichttauglichem Hellmodus um.
4. **👤 / G Benutzerkonto & Google-Login:** Zeigt den Authentifizierungsstatus, das Google-Profilbild und das Benutzermenü an.

---

## 10. Authentifizierung & Sicherheitsarchitektur (Firebase Auth Gate)

Die Johanniter Quad-Chord Visualisierung ist in das zentrale Authentifizierungssystem des ORCAI-Ökosystems (`orcai-54321`) integriert:

* **Modal Login Gate:** Nicht authentifizierte Nutzer sehen ein blockierendes Anmeldefenster mit Google-Login-Schaltfläche. Der geschützte Arbeitsbereich bleibt bis zur erfolgreichen Autorisierung unsichtbar.
* **Google Identity Provider:** Verwendet Firebase Google-Popup-Authentifizierung mit `select_account`, sodass Nutzer problemlos zwischen privaten und institutionellen Konten wählen können.
* **Persistente Sitzung:** Die Authentifizierung wird lokal (`firebase.auth.Auth.Persistence.LOCAL`) gehalten; erneutes Einloggen beim Neuladen entfällt.
* **Serverseitiger Dokumentenschutz (Cloud Function):**
  * Da Architekturdaten nicht rein clientseitig geschützt werden können, validiert der ORCAI-Dokumentenendpunkt das Firebase-ID-Token per `verifyIdToken()`.
  * Nicht authentifizierte Requests erhalten lediglich einen leichtgewichtigen Login-Loader ohne Fachinhalte.

---

> *Johanniter-Unfall-Hilfe e.V. · Enterprise Architecture Management (EAM) · Dokument generiert und persistiert in ORCAI.*
