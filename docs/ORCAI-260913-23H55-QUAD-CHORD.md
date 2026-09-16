# Johanniter Quad-Chord Enterprise Architecture
## Systemarchitektur, Integrationslandschaft & Interaktives Benutzerhandbuch

> **Dokumentenart:** Enterprise Architecture Reference & Interactive Manual  
> **Organisation:** Johanniter-Unfall-Hilfe e.V. (10.000+ Mitarbeiter, bundesweite Verbände, Kliniken & Pflegeeinrichtungen)  
> **Klassifikation:** Offizielle Architektur-Referenz & Schulungsdokumentation  
> **System-Umfang:** 82 Systeme, 103 Integrationsverbindungen, 17 E2E-Integrationsketten, 13 Geschäftsprozesse, 8 Domänen (D1–D8)  
> **Persistenz-Key:** `ORCAI-260913-23H55-QUAD-CHORD`  
> **Stand:** September 2026 · Version 3.1 (SAP Hybrid Cloud Connectivity & Clean Proxy Release)

---

## 1. Executive Summary & Zielsetzung

Die vorliegende Anwendung ist die offizielle **Enterprise Architecture (EA) Quad-Chord Visualisierungsplattform** der Johanniter-Unfall-Hilfe e.V. Sie dient Enterprise Architekten, Integrationsentwicklern, CISO/KRITIS-Beauftragten und Fachbereichsverantwortlichen dazu, die heterogene Systemlandschaft der Johanniter transparent zu machen, Abhängigkeiten und Schnittstellenflüsse interaktiv zu erkunden und regulatorische Anforderungen nachvollziehbar zu auditieren.

### Warum das Quad-Chord Modell?
Traditionelle statische Architekturpläne oder endlose Tabellenblätter bieten keine ausreichende Orientierung bei der Steuerung von über 80 Systemen und über 100 Schnittstellen. Das interaktive **Quad-Chord Modell** löst dies durch eine mathematisch exakte und visuell intuitive Trennung in **4 Kreis-Segmente (Quadranten)**:
1. **Betreiber-Trennung (Vertikal):** Links befinden sich alle internen Johanniter-Systeme; rechts alle externen Systeme (Partner, Kostenträger, Bundesbehörden, Leitstellen, Krankenkassen, Drittanbieter-SaaS).
2. **Bereitstellungs-Trennung (Horizontal):** Oben befinden sich alle Cloud- und Hyperscaler-Workloads; unten alle On-Premises- und RZ-Workloads.

Dadurch werden die beiden kritischsten architektonischen Schutz- und Übergangsbereiche – die **Hybrid Cloud Bridge** und der **Perimeter / DMZ Gateway-Korridor** – unmittelbar visuell begreifbar und messbar.

---

## 2. Die 4-Quadranten-Architektur (4 Kreis-Segmente)

Das Chord-Diagramm gruppiert alle 82 Systeme auf einem 360°-Kreisbogen in vier klar abgegrenzte Segmente:

```
                     ▲ CLOUD-BEREICH (OBEN)
                     │
    Top-Left (TL)    │    Top-Right (TR)
  JOHANNITER CLOUD   │  EXTERNE CLOUD & SAAS
  (S/4HANA PCE, BTP, │  (Seeburger BIS, Ariba,
   CPI, Connectivity │   Salesforce, gematik TI,
   Entra ID, Portal) │   GHX, Smart Key Vault)
─────────────────────┼─────────────────────────► EXTERNE SYSTEME (RECHTS)
  JOHANNITER ON-PREM │   EXTERNE ON-PREM
  (ORBIS KIS, Vivendi│  (GKV §301, Pflege §105,
   PEGASOS, Qualitrans│   Leitstellen Cobra, deNIS)
   Kafka, Palo Alto) │
    Bottom-Left (BL) │    Bottom-Right (BR)
                     │
                     ▼ ON-PREMISES (UNTEN)
```

### Tabellarische Übersicht der 4 Quadranten

| Quadrant | Bezeichnung | Position | Systeme | Kanten | Kernanwendungen |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **TL** | **Johanniter Cloud & Hyperscaler** | Links Oben | **16** | 37 | S/4HANA Private Cloud (`SYS-01`), SAP BTP Core (`SYS-03`), SAP CPI (`SYS-04`), **SAP BTP Connectivity & Destination Service (`SYS-82`)**, Kursbuchungsportal (`SYS-81`), Microsoft Entra ID (`SYS-69`), Kong API Gateway (`SYS-61`), Kita-Verwaltung (`SYS-29`), Helfer-Portal (`SYS-54`), Microsoft 365 (`SYS-63`), Snowflake (`SYS-66`), Power BI (`SYS-67`) |
| **BL** | **Johanniter On-Premises** | Links Unten | **30** | 67 | Dedalus ORBIS KIS (`SYS-11`), **SAP Cloud Connector (`SYS-05`)**, DMI PEGASOS Archiv (`SYS-78`), Qualitrans KTP (`SYS-79`), Philips PDMS (`SYS-13`), Agfa PACS (`SYS-14`), Connext Vivendi NG (`SYS-23`), Tunstall UMO Hausnotruf (`SYS-35`), medDV NIDAserver (`SYS-34`), Apache Kafka (`SYS-62`), Palo Alto Firewall (`SYS-72`), CyberArk PAM (`SYS-77`) |
| **TR** | **Externe Cloud & Fach-SaaS** | Rechts Oben | **31** | 48 | Seeburger BIS Cloud (`SYS-08`), SAP Ariba (`SYS-07`), Salesforce Nonprofit Cloud (`SYS-64`), GHX Pharma Gateway (`SYS-10`), Masunt/Dormakaba Smart Key Vault (`SYS-80`), Quentic EcoWebDesk (`SYS-56`), Connext Vivendi Mobil (`SYS-24`), MediFox Dan (`SYS-26`), PalliDoc (`SYS-30`), Imito SmartWund (`SYS-32`), Vodafone IoT (`SYS-36`), Convexis RescueTrack (`SYS-39`), gematik TI (KIM, ePA, VSDM, eRezept), Peppol (`SYS-09`), RKI DEMIS (`SYS-48`), Zscaler (`SYS-73`) |
| **BR** | **Externe On-Premises** | Rechts Unten | **5** | 12 | GKV §301 Clearing-Konnektor (`SYS-19`), KV-SafeNet (`SYS-21`), Pflegekassen §105 DTA-Gateway (`SYS-28`), ILS Leitstellen Cobra (`SYS-33`), BBK deNIS Katastrophenschutz (`SYS-40`) |

---

## 3. Systemische Grenzen & Demarkationslinien

Auf der Zeichenfläche heben zwei markante Demarkationslinien die architektonischen Übergänge hervor:

### A. Perimeter & DMZ Gateway-Korridor (Vertikale Demarkationslinie)
* **Zweck:** Trennt die geschützte interne Johanniter-Infrastruktur (links) von allen externen Partnern, Kostenträgern, Leitstellen, Bundesbehörden und Drittanbieter-SaaS-Diensten (rechts).
* **Kennzahlen:**
  * **44 grenzüberschreitende Kanten** (External Ingress, External Egress, External B2B)
  * **36 externe Systeme** (43.9% der Gesamtsystemlandschaft)
  * **8 gesicherte Perimeter-Gateways** (Palo Alto NGFW `SYS-72`, F5 WAF `SYS-75`, Zscaler ZTNA `SYS-73`, TI-Konnektor-Cluster `SYS-43`, Kong Gateway `SYS-61`, SAP Cloud Connector `SYS-05`)

### B. Hybrid Cloud Bridge & SAP Cloud Connector Reverse-Invoke Architektur (Horizontale Demarkationslinie)
* **Zweck:** Verbindet die moderne Cloud- und Hyperscaler-Infrastruktur (oben) mit den internen RZ- und Klinik-Servern (unten).
* **Sicherheits- & Netzwerk-Architektur:**
  * **SAP Cloud Connector Reverse-Invoke Tunnel (`CON-04`):** Der On-Premises SAP Cloud Connector (`SYS-05`, DMZ) initiiert proaktiv einen verschlüsselten TLS-Tunnel über Port 443 ausgehend zum **SAP BTP Connectivity & Destination Service (`SYS-82`)**. Die On-Premises-Firewall benötigt **keinerlei eingehende Portfreigaben**.
  * **Clean Proxy Architecture (Bypass-Freiheit):** Sämtlicher Cloud-zu-On-Premises-Verkehr (z. B. CPI `SYS-04` zu Vivendi NG `SYS-23` via `CON-12`, oder Qualitrans KTP `SYS-79` zu S/4HANA via `CON-102` und `CON-103`) wird strikt über den Cloud Connector vermittelt. Direkte Umgehungen (Bypasses) des DMZ-Proxies sind architektonisch unterbunden.
  * **Virtual Host Masking:** Interne Netzwerknamen und IP-Adressen (wie `10.12.4.x` oder `s4hana-pce.rz.johanniter.de`) bleiben vor der Cloud verborgen. Die Cloud referenziert ausschließlich virtuelle Endpunkte (`s4-onprem.internal`, `vivendi-api.internal`).
  * **Resource Whitelisting:** Der Cloud Connector blockiert standardmäßig jeglichen Zugriff und gibt nur explizit hinterlegte OData-/REST-Pfade sowie freigegebene RFC-Funktionsbausteine (`BAPI_*`) frei.
  * **Principal Propagation (X.509):** Cloud-Benutzeridentitäten (aus Microsoft Entra ID `SYS-69` und SAP BTP Core `SYS-03`) werden über kurzlebige X.509-Clientzertifikate kryptografisch signiert und verlustfrei an die On-Premises-Backend-Systeme übertragen.
  * **Transport Overlay Klassifikation (`transportOverlay`):** Jede der 103 Verbindungen ist präzise ihrer Transportschicht zugeordnet (`SAP_CLOUD_CONNECTOR_TUNNEL`, `HYBRID_EXPRESSROUTE_OR_TLS`, `IPSEC_VPN`, `TI_VPN_KIM`, `PUBLIC_INTERNET_TLS`, `INTRA_RZ_LAN`, `INTRA_CLOUD_MESH`, `INTRA_BTP_MESH`).
  * **Azure ExpressRoute & mTLS-Tunnel:** Dedizierte Verbindung für InterSystems HealthShare und sichere API-Gateways.
  * **Apache Kafka Event Streaming:** Echtzeit-Streaming für telemedizinische und infrastrukturelle Events.
* **Kennzahlen:**
  * **42 Hybrid-Kanten**
  * **39.5% des Gesamttraffic** der Johanniter
  * **34 beteiligte Systeme**

---

## 4. Das Externe Fach-SaaS & Seeburger BIS Modell

Ein zentraler architektonischer Grundsatz der Johanniter-IT lautet:
> [!IMPORTANT]
> **Betreibersicht der Johanniter:**  
> Wird eine Software von einem Drittanbieter in dessen eigener Cloud-Infrastruktur betrieben (Hosted Managed Cloud / Public SaaS), wird sie aus Johanniter-Sicht konsequent als **EXTERN (Quadrant TR)** geführt. Dies betrifft neben Seeburger BIS (`SYS-08`) und GHX Healthcare (`SYS-10`) auch Masunt/Dormakaba Smart Key Vault (`SYS-80`), SAP Ariba, Salesforce, Quentic EcoWebDesk, Connext Vivendi Mobil, MediFox Dan, PalliDoc, Vodafone IoT, Convexis RescueTrack, Beekeeper und Zscaler.

---

## 5. Bedienungsanleitung: Dynamischer Header-Titel & 4-Stufen-Drilldown

Die Anwendungsnavigation ist als prominenter **dynamischer Titel im Kopfbereich** realisiert:

```
[1] D2 · Klinische KIS ✕  *  [2] PROC-09 · Entlassmanagement ✕  *  [3] INT-13 · Entlassmanagement ✕  *  [4] Kante CON-88 ✕
[Stufe 4 (Kante in Kette)] Schnittstelle CON-88 ist Schritt 1 von 4 in INT-13
```

* **Zentrierte Titelstruktur:** Verbindet die Stufen mit dem Trennsymbol `*` und dezentem Leuchteffekt.
* **Individuelle Reset-Buttons (`✕`):** Jede Stufe kann punktuell abgewählt werden, um zur übergeordneten Ebene zurückzukehren.
* **Kontextueller Leitfaden-Untertitel:** Beginnt stets mit `Stufe # ..` und gibt dem Anwender zu jedem Zeitpunkt konkrete Handlungsempfehlungen.
* **Integrierter Kanten-zu-Integrations-Selektor:** Ist eine Kante selektiert, zeigt der Header sofort an, in welchen E2E-Ketten sie genutzt wird, und erlaubt das direkte Aktivieren der gesamten Kette per Klick auf die Chip-Schaltfläche.

---

## 6. Der Dynamic Inspector (Rechter Drawer)

Der rechte Inspektor dient der tiefen technischen E2E-Prozessanalyse:
* **Erhaltung der Integrationsstrecke:** Die chronologische Schritt-Pipeline (z. B. 4 Schritte bei `INT-13`) bleibt **dauerhaft sichtbar** und wird bei Klicks auf Systeme auf der Zeichenfläche nicht unbeabsichtigt überschrieben.
* **Token-Simulation & Steuerung:** 
  * Play / Pause (`⏯`), Vorheriger Schritt (`⏮`), Nächster Schritt (`⏭`).
  * Live-Wanderung des farbigen Daten-Tokens über die Splines auf der Zeichenfläche.
* **Vollständige Schritt-Metadaten:**
  * Schnittstellen-ID (`CON-xx`), Nachrichtentyp-Badge und Perimeter-Status.
  * Quell- und Zielsystem mit Domänen-Farbbalken und Hosting-Standort.
  * Übertragungsprotokolle und Architektur-Flow-Richtung.
* **Multi-Ketten-Selektor:** Zeigt bei Auswahl einzelner Schnittstellen alle übergeordneten E2E-Ketten mit Sequenznummer an.

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
  1. Das entsprechende System bzw. die Kante wird im Quad-Chord Diagramm sofort optisch fokussiert.
  2. Ein animierter, dreifach pulsierender roter **Signal-Radarring (`.locator-beacon-ring`)** pulsiert direkt auf dem Zielknoten.
  3. Der Nutzer verliert selbst bei 81 Systemen und 102 Kanten nie die Orientierung.

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
* **Serverseitiger Dokumentenschutz (Cloud Function):** Validierung des Firebase-ID-Tokens per `verifyIdToken()`.

---

## 11. Regulatorische Grundlagen, Standards & Quellenverzeichnis

Die in diesem Architekturmodell abgebildeten Systeme, Protokolle und Schnittstellen entsprechen den verbindlichen regulatorischen und gesetzlichen Vorgaben für deutsche Hilfsorganisationen, Kliniken, Rettungsdienste und Pflegeeinrichtungen:

### A. Gesetzliche & Regulatorische Rahmenbedingungen
1. **SGB V (Gesetzliche Krankenversicherung):**
   * **§ 60 SGB V (Fahrkosten & Krankentransport):** Gesetzliche Grundlage für die ärztliche Verordnung von Krankenfahrten (Muster 4) und die Abrechnung von qualifizierten Krankentransporten (`SYS-79`, `INT-14`).
   * **§ 301 SGB V (Abrechnung der Krankenhäuser):** Elektronischer Datenaustausch für Aufnahme-, Verlegungs-, Entlassungsanzeigen und DRG-Klinikabrechnungen via DTA/EDIFACT (`SYS-19`, `CON-25`, `CON-26`).
   * **§ 306 ff. SGB V (Telematikinfrastruktur):** Gesetzliche Pflichtanbindung von Kliniken und Pflegediensten an die TI (VSDM, KIM, ePA, eRezept via `SYS-43` bis `SYS-50`).
   * **§ 39 Abs. 1a SGB V (Entlassmanagement):** Verpflichtung der Krankenhäuser zur lückenlosen Anschlussversorgung bei Entlassung (`INT-13`, `PROC-09`).
2. **SGB XI (Soziale Pflegeversicherung):**
   * **§ 105 SGB XI (Abrechnung der Pflegeleistungen):** Elektronischer Datenaustausch (DTA) für ambulante und stationäre Pflegeleistungen zwischen Pflegeverwaltung (`SYS-23`, `SYS-26`) und den gesetzlichen Pflegekassen (`SYS-28`).
3. **Krankenhauszukunftsgesetz (KHZG):**
   * **§ 14a KHG (Fördertatbestände 1 bis 6):** Fördermittel für Patientenportale (`SYS-68`, FT 2), elektronische Dokumentation & Klinische Entscheidungsunterstützung (FT 3), Medikationsmanagement / AMTS (`SYS-12`, FT 5) und Telemedizinische Netzwerke.
4. **BSI IT-Sicherheitsgesetz 2.0 & B3S KRITIS Gesundheit:**
   * Verbindlicher branchenspezifischer Sicherheitsstandard (B3S) für Krankenhäuser und Rettungsleitstellen als Kritische Infrastrukturen (KRITIS), realisiert über Palo Alto NGFW (`SYS-72`), Zscaler ZTNA (`SYS-73`), Microsoft Sentinel SIEM (`SYS-74`) und CyberArk PAM (`SYS-77`).
5. **DGUV & berufsgenossenschaftliche Vorschriften:**
   * **DGUV Vorschrift 1 & Grundsatz 304-001:** Ermächtigung und Qualitätssicherung für die Aus- und Fortbildung betrieblicher Ersthelfer über das Johanniter-Kursportal (`SYS-81`) und S/4HANA Faktura (`INT-17`).
6. **Datenschutz-Grundverordnung (DSGVO):**
   * **Art. 9 Abs. 2 lit. h DSGVO:** Rechtmäßige Verarbeitung besonderer Kategorien personenbezogener Daten (Gesundheitsdaten) im Rahmen der medizinischen Versorgung und Verwaltung.

### B. Technische Interoperabilitäts-Standards
* **HL7 FHIR R4 (Fast Healthcare Interoperability Resources):**
  * Profile der gematik (KIM eArztbrief, eRezept, ePA) und der Medizininformatik-Initiative (MII).
* **HL7 v2.5 / v2.7:**
  * MLLP-basierte Krankenhaus-Kommunikation für Stammdaten (ADT), Laboraufträge (ORM) und Befundübermittlung (ORU).
* **DICOM PS 3.0 / WADO-RS:**
  * Bildarchivierung und -abruf in Radiologie PACS und Modalitäten-Worklists (MWL).
* **IHE XDS.b / PDF-A:**
  * Cross-Enterprise Document Sharing für revisionssichere Langzeitarchivierung in PEGASOS (`SYS-78`).
* **Peppol BIS Billing 3.0 & XRechnung:**
  * B2G/B2B elektronische Rechnungsstellung gem. E-Rechnungsverordnung des Bundes.
* **cXML & EDIFACT:**
  * Beschaffungsstandards im Healthcare Supply Chain (GHX Pharma, SAP Ariba).
* **MQTT & REST Webhooks:**
  * IoT-Echtzeitkommunikation für Telecare-Hausnotrufe und Smart Key Depots.

### C. Öffentliche Industriestandards & Herstellerkataloge
Die Systembezeichnungen und Schnittstellenarchitekturen basieren auf öffentlich zugänglichen Herstellerdokumentationen führender Branchenlösungsanbieter:
* **Dedalus Healthcare:** ORBIS KIS Produktportfolio & FHIR CDR Schnittstellenhandbuch
* **Connext Communication GmbH:** Vivendi NG Systemarchitektur & DTA-Spezifikation nach § 105 SGB XI
* **medDV GmbH:** NIDA Produktfamilie, Leitstellen- und KIS-Schnittstellen
* **ISE Informatikgesellschaft:** Cobra Leitstellensystem & Einsatzmittel-Disposition
* **DMI GmbH & Co. KG:** PEGASOS Klinik-Archivierung & IHE-Integrationsprofile
* **SEEBURGER AG:** Business Integration Suite Cloud & Peppol Access Point Guides
* **gematik GmbH:** Facharchitektur der Telematikinfrastruktur (KIM 1.5, ePA 3.0, eRezept)

### D. Rechtlicher Herkunftsnachweis & Legalitäts-Garantie
> [!NOTE]
> **100% Legale & Synthetische Architektur-Referenz:**  
> 1. **Keine Verwendung proprietärer Geschäftsgeheimnisse:** Alle dargestellten Systeme, Protokolle, Portnummern und Integrationsabläufe wurden ausschließlich auf Basis öffentlich zugänglicher Vergabeunterlagen, Hersteller-Websites, gematik-Spezifikationen, FHIR-Implementation-Guides und branchenüblicher Fachliteratur synthetisiert.
> 2. **Keine echten Patientendaten:** Alle IDs, Transaktionsgewichte und Sequenzschritte sind synthetische Demonstrationsdaten. Es werden zu keinem Zeitpunkt echte Patienten-, Kunden- oder Mitarbeiterdaten verarbeitet oder gespeichert.
---

## 12. Enterprise Tagging-Governance & Qualitätssicherung

Die Enterprise-Architecture-Plattform nutzt ein kuratiertes, streng typisiertes **4-Säulen-Tagging-Modell** anstelle unstrukturierter Freitext-Schlagwörter:

### A. Die 4-Säulen Enterprise-Health-Taxonomie (34 Tags)
1. **Regulatorik & Compliance (Healthcare & KRITIS):**
   * `KRITIS`: Verbindliche Kennzeichnung aller Systeme der Kritischen Infrastruktur (Kliniken, Leitstellen, Notrufe, Perimeter, SIEM, PAM).
   * `Telematik / TI`: TI-Konnektoren, ePA, KIM, VSDM, eRezept, Kartenterminals.
   * `§ 301 SGB V`: EDIFACT-Krankenhausabrechnung.
   * `§ 105 SGB XI`: Gesetzliche Pflegeleistungs-Abrechnung (DTA).
   * `§ 60 SGB V`: Krankentransport-Disposition und Genehmigung.
   * `KHZG`: Fördertatbestände des Krankenhauszukunftsgesetzes (Patientenportal, AMTS, Entlassmanagement).
   * `Peppol`: B2G/B2B E-Invoicing via Peppol BIS 3.0.
2. **Fachdomänen & Kerngeschäft:**
   * `Klinik`, `Pflege`, `Notfallrettung`, `Hausnotruf`, `Finanzen / ERP`, `Personal / HR`.
3. **Standards & Interoperabilität:**
   * `FHIR`, `HL7`, `DICOM`, `KIM`, `EDIFACT`, `Kafka`, `MQTT`.
4. **Plattformen & Infrastruktur:**
   * `SAP`, `BTP`, `Microsoft`, `AWS`, `Apple`, `Google`, `Cloud Connector`, `Connectivity Services`, `Proxy`, `Firewall`, `Portal`, `Java`, `ABAP`, `C++`.

### B. Beseitigung von Tag-Verwässerung (Anti-Dilution Policy)
* **Verbot von HTTP- und CRUD-Verben:** Begriffe wie `GET`, `POST`, `PUT`, `CREATE`, `READ`, `UPDATE`, `SEND`, `RECEIVE` wurden eliminiert. Ein Enterprise-System ist kein Datenfluss-Verb.
* **Verbot von Invertierungs-Flags:** Der Tag `Non-SAP` (zuvor auf 88% aller Systeme) wurde gelöscht, da Pseudo-Tags ohne Selektivität die UI verwässern.
* **Verbot von Scope-Duplikaten:** `Intern` und `Extern` wurden entfernt, da der Quadranten-Bogen und das native Attribut `scope` diese Trennung bereits exakt bereitstellen.

### C. Automatisierte CI/CD Qualitätssicherung (6-Stufen Linter & Playwright)
Im Build-Prozess prüft das Testskript `test_tag_qa_lint.js` die Einhaltung folgender Qualitätsregeln:
1. **Forbidden Tag Check:** Keine verbotenen CRUD-/HTTP-Tags.
2. **Case Sensitivity & Naming Check:** Alle Herstellernamen (`AWS`, `C++`) standardisiert; keine Leerzeichen.
3. **Orphan Tag Check:** Jeder Tag muss mindestens 2 Entitäten referenzieren.
4. **Selectivity Threshold:** Kein Tag darf mehr als 30% der Systeme matchen.
5. **Zero-Tag Protection:** Jedes System und jede Schnittstelle besitzt mindestens 2 valide Tags.
---

## 13. ISO/OSI & TCP/IP Referenzmodell in der Integrationsarchitektur

Als KRITIS-relevante Hilfsorganisation und Klinikbetreiberin erfordert das Sicherheits- und Architekturmanagement der Johanniter eine lückenlose Transparenz darüber, auf welchen Schichten des **ISO/OSI 7-Schichten-Modells** bzw. des **TCP/IP 4-Schichten-Modells** die 103 Integrationsverbindungen operieren:

### A. Technische Schichten-Matrix der Johanniter-Schnittstellen

| OSI-Schicht | Bezeichnung | Relevanz & Implementierung in der Johanniter-Architektur | Beispiel-Schnittstellen |
| :--- | :--- | :--- | :--- |
| **Layer 7** | **Application** | Funktionale Fachprotokolle & Datenmodelle: HL7 FHIR R4, HL7 v2.5 MLLP, DICOM PS 3.0 WADO-RS, EDIFACT / DTA, Peppol BIS 3.0, SAP OData v4, Kafka Avro Streams, MQTT Telemetrie. | `CON-14` (Labor ORM), `CON-88` (eArztbrief), `CON-10` (Peppol) |
| **Layer 6** | **Presentation** | Serialisierung, Datenkompression & Kryptografie: TLS 1.3, mTLS (Client-Zertifikate), X.509 Principal Propagation, gematik KIM XML-DSig / XML-Enc, JSON/REST, ER7 Framing. | `CON-04` (SCC TLS 1.3), `CON-45` (KIM S/MIME) |
| **Layer 5/4** | **Session & Transport** | Verbindungssteuerung & Port-Multiplexing: SAP Cloud Connector Reverse-Invoke Persistent Handshakes, TCP Port 2575 (MLLP), TCP Port 9092 (Kafka), TCP Port 8883 (MQTT TLS). Keine offenen Inbound-Ports im internen RZ. | `CON-04` (SCC Port 443), `CON-31` (Kafka Broker) |
| **Layer 3** | **Network & Overlay** | Routing & logische Netzwerksegmentierung: IPsec Site-to-Site VPN-Tunnel, gematik TI-VPN (SIS), Azure ExpressRoute Private Peering, segmentierte 802.1Q Intra-RZ-VLANs. | `CON-44` (TI Konnektor), `CON-61` (ExpressRoute) |
| **Layer 1/2** | **Physical & Data Link** | Physische Übertragungsmedien: 4G/5G Mobilfunk (LTE Cat-M1, NB-IoT, 5G SA) für Rettungsdienste (NIDApad) und Telecare-Hausnotrufgeräte vs. redundanter 10-40 Gbps Glasfaser-Backbone im RZ. | `CON-36` (LTE Hausnotruf), `CON-41` (Katretter 5G) |

### B. Ordnungsstiftende Filter & Inspector-Integration
1. **Interaktiver OSI-Stack im Edge Inspector:**  
   Bei Auswahl einer beliebigen Schnittstelle generiert die Anwendung automatisch eine 5-stufige Farbkaskade (L7 bis L1/L2) mit präziser Ausweisung von Port, Verschlüsselungsverfahren und Netz-Overlay.
2. **OSI-Schichten-Schnellfilter (Linker Drawer):**  
   Schaltflächen zur sofortigen Isolation von Applikations- (L7), Session/Krypto- (L5/L6), VPN- (L3) und Mobilfunkstrecken (L1/L2).
3. **OSI-Tags in der Tag-Cloud:**  
   `OSI-L7`, `OSI-L5 Tunnel`, `OSI-L3 VPN`, `OSI-L1/L2 Cellular` ermöglichen multidimensionale Kreuzfilterungen mit Fachdomänen und KRITIS-Vorgaben.

> **System-Umfang:** 82 Systeme, 160 Integrationsverbindungen, 170 E2E-Integrationsketten, 13 Geschäftsprozesse, 8 Domänen (D1–D8), 3 Kern-Middleware-Hubs  
> **Persistenz-Key:** `ORCAI-260913-23H55-QUAD-CHORD`  
> **Stand:** September 2026 · Version 3.2 (Enterprise Scale: 170 E2E-Integrationsketten & 3-Säulen Middleware-Radar)

---

## 14. Das 170-Integrations-Portfolio & Die 3-Säulen-Middleware-Architektur

### A. Warum ein Konzern mit 10.000+ Mitarbeitern 170 End-to-End-Integrationen benötigt
In Großorganisationen des Gesundheits- und Sozialwesens wie der Johanniter-Unfall-Hilfe e.V. (über 10.000 Hauptamtliche, 40.000 Ehrenamtliche, bundesweite Kliniken, Pflegeheime, Rettungswachen und Kindertagesstätten) bilden Standard-Punkt-zu-Punkt-Verbindungen nur die Spitze des Eisbergs. Ein robuster, auditierbarer Betrieb erfordert ein ausdifferenziertes Portfolio von **170 realen End-to-End-Integrationsketten (`INT-001` bis `INT-170`)**, aufgeteilt auf 5 strategische Fachdomänen:

1. **Kliniken & Medizinische Diagnostik (`INT-001` bis `INT-040` | 40 Ketten):**
   * Laboraufträge (ORM) und validierte Befundrückübermittlung (ORU) zwischen KIS (`SYS-11`) und GLIMS LIS (`SYS-16`).
   * Radiologie DICOM Modality Worklist (MWL) und Befundanzeige via Agfa PACS (`SYS-14`) und Dedalus RIS (`SYS-15`).
   * Intensivstation Philips PDMS Vitaldaten-Streaming (`SYS-13`), AMTS Medikationsprüfung (`SYS-12`), SafeCross Blutbank (`SYS-20`), Instacount ZSVA Sterilgut (`SYS-17`).
   * KHZG Patientenportal m.Doc (`SYS-68`), DMI PEGASOS VNA Langzeitarchiv (`SYS-78`), Dedalus FHIR CDR Replikation (`SYS-22`).

2. **Stationäre & Ambulante Pflege sowie Soziale Dienste (`INT-041` bis `INT-075` | 35 Ketten):**
   * Vivendi Mobil (`SYS-24`) Tourenplanung und Offline-Sync über Kong API Gateway (`SYS-61`) an Vivendi NG Backend (`SYS-23`).
   * SmartWund (`SYS-32`) KI-Wundvermessung und mobile Leistungsdokumentation gem. SGB XI.
   * DTA § 105 SGB XI Abrechnung und Fehleravis-Clearing mit gesetzlichen Pflegekassen über Seeburger BIS (`SYS-08`).
   * Menüservice Essen auf Rädern (`SYS-31`), Kita-Verwaltung (`SYS-29`), PalliDoc SAPV Palliativversorgung (`SYS-30`).

3. **Notfallrettung, Flotte & Katastrophenschutz (`INT-076` bis `INT-110` | 35 Ketten):**
   * Einsatzalarmierung 112 aus Leitstelle Cobra (`SYS-33`) an medDV NIDAserver (`SYS-34`) und Übernahme auf NIDApad-Tablets im RTW.
   * RescueTrack (`SYS-39`) Flottentelematik, GPS-Echtzeitortung und FMS-Statusübermittlung (Status 1–6).
   * 12-Kanal-EKG Telemetrie bei STEMI und prähospitale Schockraum-Voranmeldung (ETA) an KIS/Katheterlabor.
   * UMO Hausnotruf (`SYS-35`), GSM Telecare IoT (`SYS-36`), Katretter Ersthelfer-App (`SYS-41`), Smart Key Vault Notschlüsselfreigabe (`SYS-80`).
   * DIVI Intensivregister (`SYS-38`), BBK deNIS Katastrophenschutz (`SYS-40`), Johanniter Luftrettung Christoph (`SYS-42`).

4. **Enterprise ERP, Finanzen, Beschaffung & HR (`INT-111` bis `INT-150` | 40 Ketten):**
   * S/4HANA Private Cloud (`SYS-01`) Hauptbuch-Konsolidierung der 16 Landesverbände und Kostenstellenrechnung.
   * Peppol BIS 3.0 B2G E-Rechnungsausgang (`SYS-09`) und elektronischer Rechnungseingang mit OCR via Seeburger BIS (`SYS-08`).
   * SAP Ariba (`SYS-07`) Katalogbeschaffung, GHX Healthcare Supply Chain (`SYS-10`), EBICS / CAMT.053 Bankauszüge.
   * SAP SuccessFactors (`SYS-52`) Onboarding, SAP HCM (`SYS-53`) AVR-J Entgeltabrechnung, ATOSS Dienstplanung (`SYS-51`), Entra ID SCIM Provisionierung (`SYS-69`).
   * Snowflake Data Lakehouse (`SYS-66`), Power BI Dashboards (`SYS-67`), Salesforce CRM (`SYS-64`), Kursportal Erste-Hilfe (`SYS-81`).

5. **Telematikinfrastruktur & Gesetzliche gematik-Fachdienste (`INT-151` bis `INT-170` | 20 Ketten):**
   * KIM Provider (`SYS-44`): eArztbrief Versand & Empfang, Laborbefund-Zustellung, Pflegeüberleitungsbogen.
   * ePA 3.0 (`SYS-45`): Patientenakte Upload/Download gem. gematik Spezifikation.
   * eRezept Fachdienst (`SYS-47`): QES-Signatur per eHBA (`SYS-49`) und Dispensierung über Krankenhausapotheke.
   * VSDM (`SYS-46`): Online-Stammdatenprüfung der eGK am Kartenterminal via SICCT Port 9876.
   * Notfalldaten-Management (NFDM), Elektronischer Medikationsplan (eMP), eImpfpass, DEMIS Infektionsschutz.

---

### B. Die 3-Säulen-Middleware-Architektur

Statt eines monolithischen Integrations-Busses setzt die Johanniter Enterprise Architecture auf eine klare Arbeitsteilung über drei spezialisierte Kern-Middleware-Engines sowie flankierende Gateways:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   JOHANNITER 3-SÄULEN-MIDDLEWARE-ARCHITEKTUR                     │
├───────────────────────┬──────────────────────────┬───────────────────────────────┤
│    SÄULE 1: KLINIK    │     SÄULE 2: ENTERPRISE  │       SÄULE 3: B2B / EDI      │
│  InterSystems         │  SAP Integration Suite   │   SEEBURGER BIS               │
│  HealthShare (SYS-60) │  (CPI) (SYS-04)          │   Cloud (SYS-08)              │
├───────────────────────┼──────────────────────────┼───────────────────────────────┤
│ • HL7 v2.5 / v2.6 MLLP│ • OData v4 / REST / cXML │ • EDIFACT (UN/EDIFACT)        │
│ • HL7 FHIR R4         │ • SAP RFC / BAPI / ABAP  │ • Peppol AS4 / Peppol BIS 3.0 │
│ • DICOM PS 3.0/WADO-RS│ • SCIM 2.0 User Mgmt     │ • DTA §301 (Klinik) / §105    │
│ • IHE XDS.b / XDS-I   │ • Cloud Foundry Bridge   │ • EBICS 3.0 / CAMT Banken     │
│ • AMTS & KIS-Adapter  │ • SuccessFactors & HCM   │ • GHX Healthcare Supply Chain │
│ • 42 E2E-Ketten       │ • 42 E2E-Ketten          │ • 22 E2E-Ketten               │
└───────────────────────┴──────────────────────────┴───────────────────────────────┘
  │                       │                          │
  ▼                       ▼                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             FLANKIERENDE GATEWAYS                                │
├───────────────────────┬──────────────────────────┬───────────────────────────────┤
│  Kong API Gateway     │  Apache Kafka Event Bus  │  TI-Konnektor Cluster         │
│  (SYS-61)             │  (SYS-62)                │  (SYS-43)                     │
├───────────────────────┼──────────────────────────┼───────────────────────────────┤
│ • Mobile Apps Edge    │ • Realtime IoT Streams   │ • gematik VPN-Tunnel (SIS)    │
│ • OAuth2 / Rate Limit │ • GPS Flottentelemetrie  │ • KIM / ePA / eRezept Fachd.  │
│ • 5 E2E-Ketten        │ • 5 E2E-Ketten           │ • 20 E2E-Ketten               │
└───────────────────────┴──────────────────────────┴───────────────────────────────┘
```

---

### C. Das Middleware-Radar: Interaktives Cockpit auf der Zeichenfläche
Zur intuitiven Steuerung dieser komplexen Landschaft bietet die Anwendung oberhalb der Zeichenfläche das **Middleware-Radar (`#middlewareRadarBar`)**:
* **Auswählbare Zähldimension:** Das Dropdown schaltet zwischen `Domäne`, `Prozess`, `Integration` und `System`. Die Zahlen aller Pills werden jeweils aus den aktuellen Modelldaten neu berechnet.
* **Schaltflächen (Pills):** `Alle`, `HealthShare`, `SAP CPI`, `Seeburger BIS`, `Kong Gateway`, `Apache Kafka` und `TI-Cluster` zeigen die Anzahl der in der gewählten Dimension berührten Entitäten.
* **Typgerechte Bay-Pop-outs:**
  * Die Systemsicht öffnet das vorhandene System-Spickzettel des Middleware-Hubs.
  * Domänen-, Prozess- und Integrationssicht öffnen jeweils eine typisierte Ergebnis-Karte im Pop-out-Bay.
  * Ein Klick auf einen Eintrag übernimmt die Entität in den Drilldown und zeigt ihre große Detailansicht im Inspektor.
* **Visuelle Fokussierung:** Der ausgewählte Hub pulsiert mit gegenläufig rotierenden Orbit-Ringen (`.superhub-halo`). Alle Connections der über den Hub geführten Integrationen werden als vollständiges Kantenbündel hervorgehoben; nicht beteiligte Systeme und Kanten werden abgedunkelt.

---

## 7. Interaktive PlantUML-Sequenzdiagramme & Schwebendes Prozessmodell-Pop-Out

Für jeden Geschäftsprozess der IT-Landschaft steht ein synchronisiertes **UML 2.5 Sequenzdiagramm** zur Verfügung. Das Feature überbrückt die Lücke zwischen makroskopischer Enterprise Architecture (EAM) und mikroskopischer Integrations- und Sequenzmodellierung:

### A. Schwebendes Pop-Out-Fenster (Floating Window)
- **Verschiebbar & Skalierbar (Draggable & Resizable):** Das Pop-Out kann am oberen Header frei auf der Zeichenfläche verschoben und an allen Seiten beliebig vergrößert werden.
- **Kein Blur / Keine Verdunklung (Zero Background Blur):** Das Pop-Out arbeitet ohne modales Backdrop. Der gesamte Hintergrund – D3-Chord-Diagramm, linker Drilldown und rechter Inspektor – bleibt gestochen scharf sichtbar, lesbar und interaktiv bedienbar.
- **Vollbild-Umschaltung (`⛶ Vollbild` / `🗗 Wiederherstellen`):** Für komplexe Sequenzen mit vielen Akteuren und asynchronen Rückkanälen.
- **Zoom & Navigation:** Stufenlose Zoom-Regelung (`🔍 +`, `🔍 -`, `1:1` Reset) mit dynamischer SVG-Skalierung.

### B. Klickbare, bidirektionale Links im Diagramm (SVG Hyperlinks)
Alle Akteure, Schnittstellen und Abschnitte im gerenderten SVG-Sequenzdiagramm sind aktive Hyperlinks, die direkt mit dem EAM-Modell interagieren:
- **Akteur / Teilnehmer (`[[#sys-SYS_ID]]`):** Klick auf einen Akteur öffnet sofort dessen System-Spickzettel und fokussiert das System im Chord-Diagramm.
- **Nachrichtenpfeil / Kante (`[[#conn-CONN_ID]]`):** Klick auf eine Nachricht fokussiert die physikalische Schnittstelle im EAM-Modell.
- **Sequenz-Abschnitt (`== [[#integ-INTEG_ID]] ==`):** Klick auf einen Trennbalken aktiviert die gesamte E2E-Integrationskette inkl. Token-Animation auf der Zeichenfläche.

### C. Der Selbstreferenz-Link (`🔗` im Pop-Out Header)
Wenn Anwender bei geöffnetem Diagramm im Hintergrund navigieren (z. B. andere Systeme oder Kanten explorieren), ändert sich die aktive Auswahl der Plattform. 
- Ein Klick auf das **🔗-Icon direkt im Titellabel des Pop-Outs** stellt die ursprüngliche Aufrufumgebung des Prozesses sofort wieder her:
  - Aktiviert den aufrufenden Prozess im 5-Stufen-Drilldown (Stufe 2).
  - Öffnet die Prozess-Detailansicht im rechten Inspektor.
  - Selektiert die zugehörige Leit-Domäne (Stufe 1).
  - Aktualisiert die zentrierte Breadcrumb-Headerleiste.
  - Bereinigt isolierte System- oder Kantenfokusse – **ohne** das schwebende Sequenzdiagramm zu schließen.

### D. Native 64-Bit PlantUML Deflate-Kompression & Externe Editoren
- **1-Klick-Direktübergabe an externe Editoren:**
  - **PlantText-Integration (`↗ PlantText`):** Öffnet das Sequenzdiagramm direkt im beliebten Online-Editor via nativer PlantUML-Deflate-Codierung (`CompressionStream('deflate-raw')` mit 6-Bit-Zeichenmapping `~1...`).
  - **Offizieller PlantUML Server (`↗ PlantUML.com`):** Öffnet das Modell direkt auf dem offiziellen Server für Syntaxvalidierung und PDF/PNG-Generierung.
- **SVG-Vektorgrafik-Download (`💾 SVG Download`):** Exportiert das Diagramm als gestochen scharfe Vektorgrafik für Präsentationen oder Fachkonzepte.
- **Code in Zwischenablage (`📋 Kopieren`):** Kopiert den vollständigen PlantUML-Quelltext mit einem Klick.

---

> *Enterprise Architecture Management (EAM) · Dokument generiert und persistiert in ORCAI.*
