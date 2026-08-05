# EventList

Statische Eventliste fuer die Marie 23 in der Cottbuser Marienstrasse 23.

Das Projekt ist bewusst einfach gehalten und soll spaeter ohne Build-Schritt auf GitHub Pages, Netlify Free oder einem vergleichbaren statischen Hoster laufen.

## Ziel

- Eine ansehnliche, responsive Hauptseite mit kommenden Events.
- Eine kombinierte Seite fuer Impressum und Datenschutz.
- Pflege der Events ueber eine CSV-Datei im Projekt.
- Anzeige nur fuer Events, die heute oder in der Zukunft liegen.
- Der Tageswechsel fuer die Eventanzeige liegt bei 04:00 Uhr morgens. Bis 03:59 Uhr zaehlt also noch der Vortag als "heute".

## Projektstruktur

```text
.
├── index.html
├── impressum-datenschutz.html
├── data/
│   └── events.csv
├── src/
│   ├── app.js
│   └── styles.css
├── .gitattributes
├── .gitignore
└── README.md
```

## CSV-Format

Die Events werden in `data/events.csv` gepflegt.

```csv
date,time,title,description,status,location,admission
2026-08-14,20:00,Plattenabend,Musik und Getraenke im Hof,aktiv,Biergarten,frei
```

### Felder

- `date`: Datum im Format `YYYY-MM-DD`
- `time`: Uhrzeit im Format `HH:MM`
- `title`: Titel des Events
- `description`: kurze Beschreibung
- `status`: z. B. `geplant`, `aktiv`, `abgesagt`, `verschoben`; angezeigt werden nur `aktiv` und `abgesagt`
- `location`: `Gallerie`, `Bar` oder `Biergarten`
- `admission`: `frei`, `eintritt` oder leer/unbekannt

Der Status wird auf der Webseite nur sichtbar ausgegeben, wenn ein Event `abgesagt` ist. Bei kostenpflichtigen Events wird ein kleines Symbol vor dem Eventtitel angezeigt.

Hinweis: Die Schreibweise `Gallerie` ist aktuell so angelegt, wie sie in der Projektidee genannt wurde. Falls die offizielle Schreibweise `Galerie` gewuenscht ist, sollte sie einheitlich in CSV, Code und UI angepasst werden.

## Lokal ansehen

Da der Browser die CSV per `fetch()` laedt, sollte die Seite ueber einen kleinen lokalen Webserver geoeffnet werden:

```bash
python3 -m http.server 8000
```

Danach im Browser:

```text
http://localhost:8000
```

## Naechste Schritte

- Echtes Impressum und echte Datenschutzerklaerung eintragen.
- Finale Eventdaten in `data/events.csv` pflegen.
- Bei Bedarf eigenes Bildmaterial der Location einbauen.
- Deployment ueber GitHub Pages oder Netlify einrichten.
