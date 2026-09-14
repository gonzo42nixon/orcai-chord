# ORCAI Chord

Quad-Chord-Visualisierung der Johanniter Enterprise-Architecture-Landschaft im ORCAI-Ökosystem.

## Anwendung

- Live: [ORCAI Quad-Chord EA](https://orcai-54321.web.app/api/orcai/v1/docs/ORCAI-260913-16H03-SPA-CS745)
- Versionierte SPA-Quelle: [`src/index.html`](src/index.html)
- Firebase-Login: [`src/auth.js`](src/auth.js) und [`src/auth.css`](src/auth.css)
- Technische Dokumentation: [`docs/firebase-authentication.md`](docs/firebase-authentication.md)

## Authentifizierung

Die Anwendung verwendet den zentralen Google/Firebase-Login des Projekts `orcai-54321`. Nicht angemeldete Benutzer sehen einen blockierenden Login-Gate; der Konto-Avatar befindet sich im Header unmittelbar rechts neben dem Day-/Night-Mode-Schalter.

Die clientseitige Zugangssperre und ihre Sicherheitsgrenzen sind in der technischen Dokumentation beschrieben.
