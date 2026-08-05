# EventList

Statische Eventliste für die Marie 23 in der Cottbuser Marienstraße 23.

Das Projekt ist bewusst einfach gehalten und soll später ohne Build-Schritt auf GitHub Pages, Netlify Free oder einem vergleichbaren statischen Hoster laufen.

## Ziel

- Eine ansehnliche, responsive Hauptseite mit kommenden Events.
- Eine kombinierte Seite für Impressum und Datenschutz.
- Pflege der Events über eine CSV-Datei im Projekt.
- Anzeige nur für Events, die heute oder in der Zukunft liegen.
- Der Tageswechsel für die Eventanzeige liegt bei 04:00 Uhr morgens. Bis 03:59 Uhr zählt also noch der Vortag als "heute".

## Projektstruktur

```text
.
├── index.html
├── preview.html
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
2026-08-14,20:00,Plattenabend,Musik und Getränke im Hof,veröffentlicht,Biergarten,frei
```

### Felder

- `date`: Datum im Format `YYYY-MM-DD`
- `time`: Uhrzeit im Format `HH:MM`
- `title`: Titel des Events
- `description`: kurze Beschreibung
- `status`: z. B. `geplant`, `veröffentlicht`, `abgesagt`, `verschoben`; angezeigt werden nur `veröffentlicht` und `abgesagt`
- `location`: `Galerie`, `Bar` oder `Biergarten`
- `admission`: `frei`, `kostenpflichtig` oder leer/unbekannt

Der Status wird auf der Webseite nur sichtbar ausgegeben, wenn ein Event `abgesagt` ist. Bei kostenpflichtigen Events wird ein kleines Symbol vor dem Eventtitel angezeigt.

## Lokal ansehen

Da der Browser die CSV per `fetch()` lädt, sollte die Seite über einen kleinen lokalen Webserver geöffnet werden:

```bash
python3 -m http.server 8000
```

Danach im Browser:

```text
http://localhost:8000/preview.html
```

Die Datei `index.html` ist für die erste Präsentation absichtlich leer. Dadurch zeigt die normale GitHub-Pages-Root-URL keine unfertige oder vermeintlich offizielle Eventseite.

## Deployment

Für GitHub Pages ist kein Build-Schritt notwendig. Die benötigten Einstellungen sind in `GITHUB_PAGES.md` beschrieben.

## Nächste Schritte

- Echtes Impressum und echte Datenschutzerklärung eintragen.
- Finale Eventdaten in `data/events.csv` pflegen.
- Bei Bedarf eigenes Bildmaterial der Location einbauen.
- Deployment über GitHub Pages oder Netlify einrichten.
