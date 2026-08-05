# GitHub Pages einrichten

Diese Webseite ist eine statische HTML/CSS/JavaScript-Seite und benoetigt keinen Build-Schritt.

## Voraussetzung

- Das Repository ist auf GitHub vorhanden.
- Der Branch `main` enthaelt die Dateien aus diesem Projekt.
- Die Datei `index.html` liegt im Projekt-Root.

## Einstellung auf GitHub

1. Repository auf GitHub oeffnen.
2. `Settings` oeffnen.
3. In der linken Navigation `Pages` auswaehlen.
4. Unter `Build and deployment` bei `Source` die Option `Deploy from a branch` waehlen.
5. Unter `Branch` den Branch `main` auswaehlen.
6. Als Ordner `/ (root)` auswaehlen.
7. Mit `Save` speichern.

GitHub startet danach automatisch die Bereitstellung. Die URL wird auf derselben `Pages`-Seite angezeigt.

## Erwartete URL

Bei einem Repository unter `https://github.com/karmat75/EventList` lautet die GitHub-Pages-URL normalerweise:

```text
https://karmat75.github.io/EventList/
```

## Hinweise

- Nach einem Push auf `main` wird die Seite automatisch neu veroeffentlicht.
- Die Events werden aus `data/events.csv` geladen. Aenderungen an dieser Datei werden nach dem Push sichtbar.
- Die Datei `.nojekyll` sorgt dafuer, dass GitHub Pages die Dateien direkt ausliefert und keine Jekyll-Verarbeitung anwendet.
- Falls spaeter eine eigene Domain genutzt wird, kann sie ebenfalls unter `Settings` > `Pages` eingetragen werden.

## Fehlerpruefung

Wenn die Seite nicht erscheint:

- Pruefen, ob `Settings` > `Pages` wirklich `main` und `/ (root)` nutzt.
- Pruefen, ob `index.html` im Root des Repositorys liegt.
- Auf der `Actions`- oder `Pages`-Ansicht nachsehen, ob ein Deployment fehlgeschlagen ist.
- Nach dem Speichern oder Push einige Minuten warten; GitHub Pages ist nicht immer sofort aktualisiert.
