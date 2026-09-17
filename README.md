# ORCAI Chord

Quad-Chord-Visualisierung der Johanniter Enterprise-Architecture-Landschaft im ORCAI-Ökosystem.

## Anwendung & Links

- **Live SPA (Direktaufruf mit Header & Share-Button):** [ORCAI Quad-Chord EA Live](https://orcai-54321.web.app/api/orcai/v1/docs/ORCAI-260914-10H25-SPA-CHORD)
- **Kanonischer Endpunkt:** [ORCAI Quad-Chord EA](https://orcai-54321.web.app/api/orcai/v1/docs/ORCAI-260913-16H03-SPA-CS745)
- **Live Handbuch & Dokumentation:** [ORCAI Markdown Studio (Key: ORCAI-260913-23H55-QUAD-CHORD)](https://orcai-54321.web.app/markdown/?key=ORCAI-260913-23H55-QUAD-CHORD)
- **Versionierte SPA-Quelle:** [`src/index.html`](src/index.html)
- **Architekturhandbuch:** [`docs/ORCAI-260913-23H55-QUAD-CHORD.md`](docs/ORCAI-260913-23H55-QUAD-CHORD.md)
- **Firebase-Login:** [`src/auth.js`](src/auth.js) und [`src/auth.css`](src/auth.css)
- **Sicherheits- & Auth-Dokumentation:** [`docs/firebase-authentication.md`](docs/firebase-authentication.md)

## Architektur-Dimensionen

- **82 Systeme** (D1–D8, Johanniter intern & extern, inkl. `SYS-82` SAP BTP Connectivity & Destination Service)
- **229 Schnittstellen / Kanten** (HL7 FHIR, B2B EDI, REST APIs, IoT Streams, Security, RFC & Reverse-Invoke Tunnel)
- **243 End-to-End- und Einzelschritt-Integrationen (`INT-001` bis `INT-243`)** in 5 Fachclustern:
  - Klinik & Medizinische Diagnostik (61 Integrationen)
  - Pflege & Soziale Dienste (42 Integrationen)
  - Notfallrettung & Katastrophenschutz (44 Integrationen)
  - Enterprise ERP, Finanzen & HR (73 Integrationen)
  - Telematikinfrastruktur & eHealth (23 Integrationen)
- **3-Säulen Middleware-Architektur & Middleware-Radar:**
  - **InterSystems HealthShare (`SYS-60`):** Klinische EAI, HL7/FHIR, DICOM, LIS, PACS, AMTS (44 Integrationen)
  - **SAP Integration Suite / CPI (`SYS-04`):** Enterprise Cloud EAI, S/4HANA, SuccessFactors, HCM, SCIM (30 Integrationen)
  - **SEEBURGER BIS Cloud (`SYS-08`):** B2B EDI, EDIFACT, Peppol AS4, DTA §301/§105/§60, EBICS (25 Integrationen)
  - **Flankierende Gateways:** Kong API Gateway (`SYS-61`, 8 Integrationen), Apache Kafka (`SYS-62`, 7 Integrationen), TI-Konnektor Cluster (`SYS-43`, 22 Integrationen)
- **13 End-to-End Geschäftsprozesse** (Notfallversorgung, Pflege § 105, Entlassmanagement, KTP § 60, AMTS, etc.)
- **4 Quadranten:**
  - **TL (Top-Left):** Johanniter Cloud & Hyperscaler (**16 Systeme**)
  - **BL (Bottom-Left):** Johanniter On-Premises (**30 Systeme**)
  - **TR (Top-Right):** Externe Cloud & Fach-SaaS (**31 Systeme**)
  - **BR (Bottom-Right):** Externe On-Premises (**5 Systeme**)

## Google-Class Enterprise UI/UX Features

Die Johanniter Quad-Chord EA wurde nach Google-Enterprise-Standards (Material Design 3, WCAG 2.1 AA, Command-Palette-Ergonomie) optimiert:

### 1. Omni-Search & Command Palette (`Cmd+K` / `Ctrl+K`)
- Volltext-Indizierung über alle **82 Systeme**, **103 Kanten/Schnittstellen**, **13 Kernprozesse**, **8 Architekturdomänen** und **Aktionen**.
- Tastatur-Navigation mit `↑` / `↓`, `↵ Enter` zur sofortigen Auswahl, `ESC` zum Schließen.
- Schnelle Filter-Chips (`Alle`, `Systeme`, `Schnittstellen`, `Prozesse`, `Domänen`, `Aktionen`).
- Automatischer Fokus auf den Zielknoten im SVG-Canvas inklusive Radar-Beacon und Öffnen des System-Spickzettels.

### 2. URL State Synchronization & Deep-Linking (Web Share API)
- Reaktive Synchronisation des gesamten Zustands in die Browser-URL (`history.replaceState`):
  - `?domain=D2&proc=PROC-09&int=INT-13&node=SYS-11&edge=CON-88&msgType=HL7_FHIR&theme=day`
- Beim Klick auf den **Share-Button** teilt der Browser exakt die aktive gefilterte Ansicht.
- Beim Laden einer geteilten URL wird der Filter-, Drilldown- und Farbmodus-Zustand nahtlos wiederhergestellt.

### 3. Barrierefreiheit (WCAG 2.1 AA) & `prefers-reduced-motion`
- Vollständige Tastaturbedienung des D3/SVG-Canvas: Alle 81 Systemknoten verfügen über `tabindex="0"`, `role="button"` und `aria-label`.
- `Enter` oder `Space` auf einem SVG-Knoten öffnet den Spickzettel und zentriert die Ansicht.
- High-Contrast-Fokusringe (`:focus-visible`) mit M3-Accent-Glow.
- Respektiert System-Einstellungen für `prefers-reduced-motion: reduce`: Radar-Pulse und Partikel-Animationen werden sanft deaktiviert.

### 4. Material Design 3 (M3) Tonal Surface Elevation
- M3-Semantik-Tokens (`--md-surface-0` bis `--md-surface-4`) für konsistente visuelle Schichtung (Header, Drawers, Floating Cards, Dialogs).
- Kontrastverhältnisse $\ge 4.5:1$ in Tag- und Nachtmodus für maximale Lesbarkeit.

### 5. Drawer-Ergonomie & Tastatur-Shortcuts

| Shortcut | Aktion |
|---|---|
| `Ctrl+K` / `Cmd+K` | Omni-Search & Befehlspalette öffnen/schließen |
| `[` | Linke Seitenleiste (Drilldown & Filter) umschalten |
| `]` | Rechte Seitenleiste (Inspektor) umschalten |
| `\` | Präsentationsmodus umschalten (Maximale Canvas-Ansicht) |
| `↑` / `↓` | Suchergebnisse in Omni-Search navigieren |
| `↵ Enter` | Ausgewähltes Element in Omni-Search fokussieren |
| `ESC` | Modale Dialoge & Paletten schließen |

---

## Kernfunktionen & Architektur

1. **4-Quadranten Quad-Chord Modell:**
   - Visualisierung von 81 Systemen in vier Quadranten mit Live-Traffic und prozentualen Anteilen.
2. **Kompakte Icon-Only Header-Aktionsleiste:**
   - `🔍` Omni-Search & Command Palette (`Strg+K`)
   - `(i)` Architektur-Dokumentation & Handbuch
   - `🔗 / 📤` Web Share API mit automatischem Fallback auf Zwischenablage & Toast-Bestätigung
   - `🌙 / ☀️` Day- & Night-Mode Umschalter mit Tooltip
   - `👤 / G` Google/Firebase-Konto, Avatar & Session-Status
3. **Scrollbar-freie Drawer & Filter-Reset:**
   - Großzügige flexible Container für „Aktive Nachrichtentypen“ und „Aktive Tags“ ohne störende Scrollbalken.
   - Dedizierte Reset-Buttons (`↺ Reset`) für Nachrichtentypen und Tags.
4. **E2E-Inspektor & Multi-Pop-Outs:**
   - Dauerhafter Erhalt der Integrationskette im Inspektor bei Klicks auf System-Icons.
   - System-Spickzettel als schwebende, frei verschiebbare Pop-Out-Karten mit Location-Finder (`🎯 Lokalisieren`).
5. **Kanten-Integrations-Selektor (Edge-to-Integration Context Selector):**
   - **Header Subtitle (Mitte Oben):** Interaktive Quick-Switch Pill-Buttons (`[ ⚡ INT-13 (Schritt 1/4) ➔ ]`) zeigen sofort an, in welchen E2E-Integrationen eine selektierte Kante eingesetzt wird, und schalten mit 1 Klick um.
   - **Linker Drawer (Stufe 3: Integrationen):** Dynamische Filter- und Match-Hervorhebung (`★ Enthält CON-XX (Schritt 1/4)`) mit Section-Badge und sanfter Dimmung nicht-betroffener Ketten.
   - **Canvas Pop-out Karte:** Eigene Sektion `🔗 E2E-Integrationen dieser Kante` mit direkten Start-Buttons für jede übergeordnete Prozesskette.
   - **Rechter Inspektor:** Interaktive Stepper-Sequenz (`[Quelle] ➔ [★ CON-XX] ➔ [Ziel]`) mit Schritt-Markierung und 1-Klick Aktivierungs-Button (`[ ▶ E2E-Kette aktivieren ]`).
6. **Interaktives Tag-Filtering mit Canvas-Feedback & Floating HUD:**
   - **Zeichenflächen-Hervorhebung:** Auswahl eines oder mehrerer Tags in der Tag-Cloud hebt alle passenden Systeme und Schnittstellen mit leuchtendem Akzent-Halo (`.tag-matched`), pulsierender Kontur und fettem Schriftzug hervor.
   - **Fokussierende Dimmung:** Nicht-betroffene Systeme und Schnittstellen werden auf der Zeichenfläche dezent abgedunkelt (`opacity: 0.12` bzw. `0.04`), sodass isolierte Technologie- und Aufgaben-Cluster (z. B. `Apple`, `Cloud Connector`, `SAP`, `API`) sofort ins Auge fallen.
   - **Hover-Preview:** Beim Überfahren eines Tag-Chips mit der Maus erhalten Anwender eine verzögerungsfreie Voransicht der betroffenen Knoten und Kanten auf der Zeichenfläche.
   - **Floating Tag HUD:** Eine schwebende Status-Pille am unteren Rand der Zeichenfläche zeigt die aktiven Tags sowie die Trefferzahlen an und ermöglicht das sofortige Aufheben des Filters mit 1 Klick (`[✕]`).
   - **Synchronisierte Zähler:** Der Zähler in der Tag-Cloud aktualisiert sich in Echtzeit (`X aktiv (Y Sys · Z Kanten)`).
7. **SAP Hybride Cloud-Konnektivität, Reverse-Invoke & Clean Proxy:**
   - **Reverse-Invoke Tunnel (`CON-04`):** Modellierung des Verbindungsaufbaus ausgehend vom On-Premises SAP Cloud Connector (`SYS-05`, DMZ) zum SAP BTP Connectivity & Destination Service (`SYS-82`, Cloud) über Port 443 TLS. Keine offenen Inbound-Ports in der Johanniter-Firewall.
   - **Clean Proxy Architecture:** Eliminierung direkter Cloud-to-On-Prem-Bypasses (Vivendi Sync `CON-12` und Qualitrans Faktura `CON-102` werden sauber über den Cloud Connector vermittelt).
   - **Transport Overlay Badge:** Jede Kante im Inspector weist ein standardisiertes Transport-Badge aus (z. B. `SAP Cloud Connector Tunnel`, `IPsec Site-to-Site VPN`, `TI-VPN (KIM)`, etc.).
   - **🛡️ Hybride Cloud-Sicherheit Spickzettel-Sektion:** Detaillierte Darstellung von Principal Propagation (X.509-Zertifikate), Virtual Host Masking und Resource Whitelisting bei Auswahl von `SYS-05` oder `SYS-82`.
8. **4-Säulen Enterprise-Health Tagging-Taxonomie & CI/CD Qualitätssicherung:**
   - **4 Säulen (34 kuratierte Tags):**
     - *Regulatorik & Compliance:* `KRITIS`, `Telematik / TI`, `§ 301 SGB V`, `§ 105 SGB XI`, `§ 60 SGB V`, `KHZG`, `Peppol`
     - *Fachdomänen:* `Klinik`, `Pflege`, `Notfallrettung`, `Hausnotruf`, `Finanzen / ERP`, `Personal / HR`
     - *Standards & Interoperabilität:* `FHIR`, `HL7`, `DICOM`, `KIM`, `EDIFACT`, `Kafka`, `MQTT`
     - *Plattformen & Infrastruktur:* `SAP`, `BTP`, `Microsoft`, `AWS`, `Apple`, `Google`, `Cloud Connector`, `Connectivity Services`, `Proxy`, `Firewall`, `Portal`, `Java`, `ABAP`, `C++`
   - **Beseitigung von Tag-Verwässerung (Anti-Dilution):** Vollständige Entfernung von 13 Rausch- und CRUD-Tags (`GET`, `POST`, `PUT`, `CREATE`, `READ`, `UPDATE`, `SEND`, `RECEIVE`, `Non-SAP`, `Intern`, `Extern`, `Process`, `Integration`, `Service`). Maximale Systemabdeckung pro Tag liegt nun bei $\le 22\%$ (zuvor $88\%$).
   - **Automatisierte CI/CD-Qualitätssicherung:** 6-stufiger Node.js-Linter (`test_tag_qa_lint.js`) und Playwright-E2E-Testsuite (`test_tag_qa_playwright.js`) sichern die Tag-Governance ab.
9. **ISO/OSI & TCP/IP Referenzmodell-Integration (Schichten-Transparenz):**
   - **Interaktive OSI-Stack-Kaskade im Edge Inspector:** Detaillierte 5-stufige Aufschlüsselung jeder Kante nach dem OSI- und TCP/IP-Referenzmodell:
     - *Layer 7 (Applikation):* FHIR, HL7 v2.5 MLLP, DICOM PS 3.0, OData, EDIFACT, Kafka, MQTT.
     - *Layer 6 (Darstellung & Krypto):* TLS 1.3, mTLS (x.509 Principal Propagation), KIM 1.5 XML-DSig/S-MIME.
     - *Layer 5/4 (Session & Transport):* Reverse-Invoke TCP 443 Handshake, TCP 2575 MLLP, TCP 9092 Kafka.
     - *Layer 3 (Netzwerk & Overlay):* gematik TI-VPN, IPsec Site-to-Site, ExpressRoute, RZ-VLAN.
     - *Layer 1/2 (Sicherung & Physik):* 4G/5G Cellular Radio (LTE Cat-M1, 5G SA) vs. 10-40 Gbps Glasfaser-Backbone.
   - **OSI-Schichten-Schnellfilter im linken Drawer:** 5 Quick-Pills (`Alle`, `L7 App`, `L5/L6 Session`, `L3 VPN`, `L1/L2 Funk`) zur gezielten Durchleuchtung („Röntgenblick“) der gesamten Schnittstellenlandschaft.
   - **4 selektive OSI-Tags:** `OSI-L7`, `OSI-L5 Tunnel`, `OSI-L3 VPN`, `OSI-L1/L2 Cellular`.
10. **Interaktive PlantUML-Sequenzdiagramme & Gleichzeitige Multi-Pop-Outs:**
    - **Parallele Multi-Pop-Outs (Non-Overwriting Registry):** Mehrere PlantUML-Prozess-Diagramme können gleichzeitig geöffnet und frei nebeneinander verglichen werden. Ein neu geöffneter Prozess überschreibt niemals bereits geöffnete Pop-Outs, sondern reiht sich kaskadiert versetzt ein. Wird ein bereits geöffneter Prozess erneut aufgerufen, bringt das System das bestehende Fenster mit leuchtendem Fokus-Flash (`.popout-focus-flash`) in den Vordergrund, statt Duplikate zu erzeugen.
    - **Schwebende Fenster (Draggable, Resizable & Zero Blur):** Jedes Pop-Out ist individuell frei verschiebbar und skalierbar. Kein abdeckender Blur/Backdrop – das D3-Chord-Diagramm, der linke Navigationsbaum und der rechte Inspektor bleiben im Hintergrund vollständig sichtbar und interaktiv.
    - **Klickbare SVG-Hyperlinks:** Alle Akteure (`[[#sys-SYS_ID]]`), Verbindungen/Nachrichten (`[[#conn-CONN_ID]]`) und E2E-Phasen (`== [[#integ-INTEG_ID]] ==`) sind interaktive Links, die das System im Modell fokussieren, Kanten aktivieren oder Token-Simulationen starten.
    - **🔗 Autarker Selbstreferenz-Link je Pop-Out:** Ein Klick auf das Link-Icon im Titel eines Pop-Outs stellt unmittelbar die vollständige Aufrufumgebung genau dieses Prozesses wieder her (Stufe 1 Domäne, Stufe 2 Prozess, Prozess-Inspektor, Breadcrumbs), selbst wenn im Hintergrund andere Knoten oder Kanten erkundet wurden.
    - **Native 64-Bit Deflate-Kompression & Externe Editoren:** Unabhängige Bedienelemente je Fenster für Zoom (`+`/`-`/`1:1`), Vollbild, SVG-Vektorexport, Zwischenablage-Kopie sowie 1-Klick-Übergabe an **PlantText** und den offiziellen **PlantUML.com Server** über `CompressionStream('deflate-raw')` und PlantUML-6-Bit-Encoding (`~1...`).
    - **Reine On-the-Fly-Synthese & Optionale Export-Checkbox (`[x] include plantuml`):** PlantUML-Code ist bewusst **nicht** im Runtime-JSON-Objekt der Landschaft gespeichert, sondern wird zur Laufzeit aus Systemen, Integrationen und Verbindungen on-the-fly abgeleitet (Single Source of Truth, Zero Drift). Beim JSON-Export im Modellkatalog ermöglicht die neue Checkbox **`[x] include plantuml`** die spontane Entscheidung, ob der generierte PlantUML-Code für alle Prozesse als schlüsselfertiges Attribut in den Download eingebettet werden soll.
11. **APQC Process Classification Framework (PCF) & Integrierter Explorer:**
    - **Branchenstandard-Integration:** Verknüpfung aller Geschäftsprozesse mit dem weltweit führenden **APQC Process Classification Framework** (Level 1 Kategorien 1.0 bis 12.0 und Healthcare Provider PCF Unterkategorien 4.1 Notfall/Akut, 4.2 Diagnostik/Labor, 4.3 Ambulante Pflege, 4.4 Rettungsdienst/Leitstelle, 4.5 Sterilgut/AEMP).
    - **Integrierter APQC PCF Explorer (`window.openApqcExplorer()`):** Autarkes, verschiebbares Pop-Out-Fenster mit Live-Suche, Kategorien-Filter (`1-5 Kernprozesse`, `6-12 Management & Support`, `Nur mit Modell-Prozessen`), Echtzeit-Zuordnung aller Prozesse der aktiven IT-Landschaft und 1-Klick-Fokussierung im Modell.
    - **Offizielle Spezifikation & Weblinks:** Direkte Verlinkung auf die offizielle APQC PCF Spezifikation (`https://www.apqc.org/pcf`) sowie Volltext-Recherche auf `apqc.org`.
    - **UI-Verzahnung:** APQC-Badges und `⚡ Explorieren`-Schaltflächen im Inspector (Prozessansicht), `📋 APQC`-Pills im Kopf jedes PlantUML-Sequenzdiagramms und Schnellaufruf im Omni-Search Suchmenü (`Strg+K`).
    - **100 % Klassifikationsabdeckung:** Vollständige APQC-Kennzeichnung in allen vier integrierten Landschaftsmodellen (Johanniter, Johannesstift Diakonie, Klinikverbund Nord, Bruker Corporation).
12. **Human in the Loop (HITL) & Generische 4-Quadranten-Rollenarchitektur:**
    - **Branchenunabhängige Archetypen:** Universelle 4-Quadranten-Taxonomie für alle Industrien (Healthcare, Hightech-Produktion, Logistik, Telco, Defense, Finanzen):
      - **LT (Left-Top):** Kernleistung & Operative Fachexperten (z. B. Stationsarzt, R&D Engineer, Reinraum-Werker).
      - **LB (Left-Bottom):** Frontline, Mobile & Field Services (z. B. Notfallsanitäter, Field Service Engineer, Servicetechniker).
      - **RT (Right-Top):** Steuerung, Governance & Administration (z. B. Controller, Einkaufsleiter, CISO, Trade Compliance).
      - **RB (Right-Bottom):** Externe Stakeholder, Kunden & Partner (z. B. Patient, B2B-Kunde, Distributor, FDA-Auditor).
    - **4 interaktive Corner Pods (`#podLT`, `#podLB`, `#podRT`, `#podRB`):** Direkt auf der Zeichenfläche platzierte Eck-Pods mit Archetyp-Kennzeichnung, Icon und Rollenselektor.
    - **Visuelle Spurensuche & Touchpoint-Beacons:** Bei Auswahl einer Rolle pulsiert ein Leuchtfeuer (`.client-touchpoint-beacon`) auf den Zielsystemen ihrer Clients, nicht-involvierte Knoten/Kanten werden elegant abgedunkelt (`dimmed`) und der **HITL Rollen-Inspektor** öffnet sich mit Details zu Geräten, OS, Auth-Methoden (SSO, MFA, eHBA) und emittierten Nachrichten.
    - **PlantUML-Akteurssynthese:** Automatische Voranstellung von `@startuml actor` und Initial-Nachrichten in generierten Sequenzdiagrammen.
    - **Omni-Search (`Strg+K`) Rollenfilter:** Schnelles Suchen und Filtern von Rollen über das neue `[👤 Rollen]`-Chip.

## Regulatorische Grundlagen & Legalitätsnachweis

Die Architekturmodelle spiegeln die realen gesetzlichen Anforderungen des deutschen Gesundheits- und Sozialwesens wider:
- **SGB V § 60:** Krankentransport-Verordnung & Abrechnung
- **SGB V § 301:** Elektronischer Datenaustausch Krankenhausabrechnung (EDIFACT / DTA)
- **SGB V § 306 ff.:** gematik Telematikinfrastruktur (VSDM, KIM, ePA, eRezept)
- **SGB XI § 105:** DTA-Verfahren für Pflegeeinrichtungen mit Kostenträgern
- **KHZG § 14a KHG:** Fördertatbestände 1 bis 6 (Patientenportale, AMTS, Interoperabilität)
- **BSI IT-SiG 2.0 / B3S KRITIS Gesundheit:** Cyber-Resilienz und KRITIS-Schutz
- **DGUV Vorschrift 1:** Breitenausbildung & Erste-Hilfe-Schulungen

> **Legalitätsgarantie:** Alle Systemnamen, Schnittstellen-Spezifikationen und Abläufe basieren auf öffentlich zugänglichen Hersteller- und GKV/gematik-Dokumentationen sowie synthetischen Daten. Es werden zu keinem Zeitpunkt echte Patienten- oder Mitarbeiterdaten verarbeitet oder vertrauliche Zugangsdaten gespeichert.

## Authentifizierung & Zugriffsschutz

Die Anwendung verwendet den zentralen Google/Firebase-Login des Projekts `orcai-54321`. Nicht angemeldete Benutzer sehen ein blockierendes Login-Gate; der Konto-Avatar befindet sich im Header unmittelbar rechts neben dem Day-/Night-Mode-Schalter.
