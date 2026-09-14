# Firebase-Login für Johanniter Quad-Chord EA

## Ziel

Die persistierte ORCAI-SPA `ORCAI-260913-16H03-SPA-CS745` wird erst nach einer erfolgreichen Anmeldung am zentralen Firebase-Projekt `orcai-54321` bedienbar. Der Kontozugang befindet sich im Header unmittelbar rechts neben dem Day-/Night-Mode-Schalter und verwendet das in ORCAI etablierte Google-Avatar-Muster.

## Versionierte Bestandteile

- `src/index.html`: aus dem produktiven ORCAI-Artefakt übernommene SPA-Quelle mit Account-Markup, Auth-Gate und versionierten Asset-Referenzen.
- `src/auth.js`: Firebase-Auth-Status, Google-Popup-Anmeldung, Abmeldung, Avatar und Fehlermeldungen.
- `src/auth.css`: Avatar, Kontomenü und blockierender Login-Gate für Day- und Night-Mode.
- `/firebase-config.js`: bestehende zentrale, öffentliche Firebase-Web-Konfiguration des ORCAI-Ökosystems auf dem Firebase Hosting.

## Verhalten

1. Bis Firebase den Authentifizierungsstatus ermittelt hat, bleibt der Arbeitsbereich verborgen.
2. Ohne Benutzer blockiert ein modaler Gate den Arbeitsbereich. Der Header und sein Login-Button bleiben erreichbar.
3. `Mit Google anmelden` verwendet `GoogleAuthProvider` und lokale Firebase-Persistenz.
4. Nach erfolgreicher Anmeldung verschwindet der Gate. Der Google-Avatar oder ein Initial wird angezeigt.
5. Das Avatar-Menü zeigt Name und E-Mail-Adresse und ermöglicht die Abmeldung.
6. Nach der Abmeldung wird der Arbeitsbereich sofort wieder gesperrt.
7. Popup-Abbruch durch den Benutzer wird nicht als Anwendungsfehler angezeigt; andere Fehler werden im Gate und Kontomenü ausgegeben.

## Sicherheitsgrenze

Der clientseitige Gate verhindert die Nutzung der Anwendung durch nicht angemeldete Besucher, verschlüsselt aber das ausgelieferte HTML-Artefakt nicht. Der aktuelle Dokument-Endpunkt `/api/orcai/v1/docs/:key` liefert die SPA weiterhin vor der Ausführung des Firebase-Codes aus. Falls bereits der Abruf des HTML-Inhalts vertraulich sein muss, muss der ORCAI-Dokument-Endpunkt zusätzlich ein Firebase-ID-Token serverseitig validieren. Direkte Browsernavigation erfordert dafür ein Session-Cookie oder einen vorgeschalteten authentifizierten App-Loader.

## Deployment

Für die Veröffentlichung werden `src/auth.js` und `src/auth.css` in das Hosting-Verzeichnis `outputs/quad-chord/` des ORCAI-Deployment-Repositories übernommen. Danach werden die zentral gehosteten Assets veröffentlicht:

```bash
firebase deploy --only hosting --project orcai-54321
```

Danach wird `src/index.html` mit dem vorhandenen `deploy_spa`-Workflow unter demselben Key aktualisiert. Dadurch bleibt die kanonische URL stabil:

```text
https://orcai-54321.web.app/api/orcai/v1/docs/ORCAI-260913-16H03-SPA-CS745
```

## Abnahmetests

- Abgemeldet: Arbeitsbereich ist nicht sichtbar oder bedienbar; Login-Gate und Header-Avatar sind sichtbar.
- Anmeldung: Google-Popup startet und eine erfolgreiche Anmeldung entfernt den Gate.
- Neu laden: Die Sitzung bleibt durch `Auth.Persistence.LOCAL` erhalten.
- Avatar: Firebase-Profilbild wird angezeigt; bei Bildfehler oder fehlender URL erscheint ein Initial.
- Abmeldung: Gate wird ohne Neuladen wieder eingeblendet.
- Tastatur: Login-Button, Avatar-Menü und Abmeldung sind per Tab erreichbar; Escape schließt das Kontomenü und setzt den Fokus auf den Avatar zurück.
- Themes: Gate, Avatar und Menü sind in Day- und Night-Mode lesbar.
- Konsole: Keine neuen JavaScript-Fehler beim Laden, Anmelden oder Abmelden.
