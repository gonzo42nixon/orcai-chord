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

## Serverseitiger Zugriffsschutz

Der Dokument-Endpunkt erkennt den Key `ORCAI-260913-16H03-SPA-CS745` als geschütztes Artefakt. Direkte Browsernavigation liefert ohne Bearer-Token ausschließlich einen minimalen Login-Loader, nicht den Quad-Chord-Quelltext oder seine Architekturdaten.

Nach erfolgreicher Google-Anmeldung ruft der Loader ein Firebase-ID-Token ab und fordert dasselbe Dokument erneut mit `Authorization: Bearer <token>` an. Die Cloud Function validiert dieses Token mit dem Firebase Admin SDK. Erst danach liest und liefert sie das gespeicherte SPA-Artefakt aus.

```text
Browser  -- GET ohne Token -->  ORCAI API  -- 200 --> Login-Loader
Browser  -- Google Login ---->  Firebase Auth
Browser  -- GET + ID-Token -->  ORCAI API  -- verifyIdToken()
Browser  <-- geschützte SPA --  ORCAI API
```

Ungültige oder abgelaufene Token werden mit HTTP `401` abgewiesen. Der Loader enthält keine fachlichen Quad-Chord-Daten. Andere bestehende ORCAI-Dokumente bleiben vorerst unverändert erreichbar, damit deren Viewer und Integrationen nicht unbeabsichtigt unterbrochen werden.

### Sicherheitsgrenze

Die Schutzentscheidung erfolgt derzeit anhand einer expliziten serverseitigen Liste geschützter Dokument-Keys. Jeder weitere vertrauliche SPA-Key muss dieser Liste hinzugefügt oder zukünftig über Envelope-Metadaten als geschützt markiert werden. Ein gültiges Konto des Firebase-Projekts genügt; Domain- oder UID-Whitelists sind noch nicht aktiviert.

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
- Abruf ohne Token: Antwort enthält den Login-Loader, aber keine Konstanten wie `DOMAINS_DATA` oder `CONNECTIONS_DATA`.
- Abruf mit manipuliertem Token: Server antwortet mit HTTP `401` und liefert keine SPA-Daten.
- Anmeldung: Google-Popup startet und eine erfolgreiche Anmeldung entfernt den Gate.
- Neu laden: Die Sitzung bleibt durch `Auth.Persistence.LOCAL` erhalten.
- Avatar: Firebase-Profilbild wird angezeigt; bei Bildfehler oder fehlender URL erscheint ein Initial.
- Abmeldung: Gate wird ohne Neuladen wieder eingeblendet.
- Tastatur: Login-Button, Avatar-Menü und Abmeldung sind per Tab erreichbar; Escape schließt das Kontomenü und setzt den Fokus auf den Avatar zurück.
- Themes: Gate, Avatar und Menü sind in Day- und Night-Mode lesbar.
- Konsole: Keine neuen JavaScript-Fehler beim Laden, Anmelden oder Abmelden.
