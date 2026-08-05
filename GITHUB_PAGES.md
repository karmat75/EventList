# GitHub Pages einrichten

Diese Webseite ist eine statische HTML/CSS/JavaScript-Seite und benötigt keinen Build-Schritt.

## Voraussetzung

- Das Repository ist auf GitHub vorhanden.
- Der Branch `main` enthält die Dateien aus diesem Projekt.
- Die Datei `index.html` liegt im Projekt-Root. Sie ist aktuell absichtlich leer, damit die Root-URL keine unfertige Vorschau zeigt.

## Einstellung auf GitHub

1. Repository auf GitHub öffnen.
2. `Settings` öffnen.
3. In der linken Navigation `Pages` auswählen.
4. Unter `Build and deployment` bei `Source` die Option `Deploy from a branch` wählen.
5. Unter `Branch` den Branch `main` auswählen.
6. Als Ordner `/ (root)` auswählen.
7. Mit `Save` speichern.

GitHub startet danach automatisch die Bereitstellung. Die URL wird auf derselben `Pages`-Seite angezeigt.

## Erwartete URL

Bei einem Repository unter `https://github.com/karmat75/EventList` lautet die GitHub-Pages-URL normalerweise:

```text
https://karmat75.github.io/EventList/
```

Die eigentliche Vorschau liegt während der ersten Präsentation unter:

```text
https://karmat75.github.io/EventList/preview.html
```

## Hinweise

- Nach einem Push auf `main` wird die Seite automatisch neu veröffentlicht.
- Die Events werden aus `data/events.csv` geladen. Änderungen an dieser Datei werden nach dem Push sichtbar.
- Die Root-Seite `index.html` ist absichtlich leer. Das ist kein Zugriffsschutz, verhindert aber, dass zufällige Besucher direkt eine unfertige Eventliste sehen.
- Die Datei `.nojekyll` sorgt dafür, dass GitHub Pages die Dateien direkt ausliefert und keine Jekyll-Verarbeitung anwendet.
- Falls später eine eigene Domain genutzt wird, kann sie ebenfalls unter `Settings` > `Pages` eingetragen werden.

## Fehlerprüfung

Wenn die Seite nicht erscheint:

- Prüfen, ob `Settings` > `Pages` wirklich `main` und `/ (root)` nutzt.
- Prüfen, ob `index.html` im Root des Repositorys liegt.
- Auf der `Actions`- oder `Pages`-Ansicht nachsehen, ob ein Deployment fehlgeschlagen ist.
- Nach dem Speichern oder Push einige Minuten warten; GitHub Pages ist nicht immer sofort aktualisiert.
