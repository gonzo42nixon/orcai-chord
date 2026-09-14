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

## Kernfunktionen

1. **4-Quadranten Quad-Chord Modell:**
   - **TL (Top-Left):** Johanniter Cloud & Hyperscaler (14 Systeme)
   - **BL (Bottom-Left):** Johanniter On-Premises (28 Systeme)
   - **TR (Top-Right):** Externe Cloud & Fach-SaaS (30 Systeme)
   - **BR (Bottom-Right):** Externe On-Premises (5 Systeme)
2. **Kompakte Icon-Only Header-Aktionsleiste:**
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

## Authentifizierung & Zugriffsschutz

Die Anwendung verwendet den zentralen Google/Firebase-Login des Projekts `orcai-54321`. Nicht angemeldete Benutzer sehen einen blockierenden Login-Gate; der Konto-Avatar befindet sich im Header unmittelbar rechts neben dem Day-/Night-Mode-Schalter.

Zusätzlich schützt die ORCAI Cloud Function das gespeicherte SPA-Artefakt serverseitig: Ohne ein validiertes Firebase-ID-Token wird nur ein minimaler Login-Loader ausgeliefert. Ablauf und Sicherheitsgrenzen sind in [`docs/firebase-authentication.md`](docs/firebase-authentication.md) beschrieben.
