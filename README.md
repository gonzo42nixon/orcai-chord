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

- **81 Systeme** (D1–D8, Johanniter intern & extern)
- **102 Schnittstellen / Kanten** (HL7 FHIR, B2B EDI, REST APIs, IoT Streams, Security & Storage)
- **17 End-to-End Integrationsketten** mit geführter Token-Simulation und Schritt-Metadaten
- **13 End-to-End Geschäftsprozesse** (Notfallversorgung, Pflege § 105, Entlassmanagement, KTP § 60, AMTS, etc.)
- **4 Quadranten:**
  - **TL (Top-Left):** Johanniter Cloud & Hyperscaler (**15 Systeme**)
  - **BL (Bottom-Left):** Johanniter On-Premises (**30 Systeme**)
  - **TR (Top-Right):** Externe Cloud & Fach-SaaS (**31 Systeme**)
  - **BR (Bottom-Right):** Externe On-Premises (**5 Systeme**)

## Google-Class Enterprise UI/UX Features

Die Johanniter Quad-Chord EA wurde nach Google-Enterprise-Standards (Material Design 3, WCAG 2.1 AA, Command-Palette-Ergonomie) optimiert:

### 1. Omni-Search & Command Palette (`Cmd+K` / `Ctrl+K`)
- Volltext-Indizierung über alle **81 Systeme**, **102 Kanten/Schnittstellen**, **13 Kernprozesse**, **8 Architekturdomänen** und **Aktionen**.
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
