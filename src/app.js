const EVENT_CSV_PATH = "data/events.csv";
const DAY_ROLLOVER_HOUR = 4;

const statusLabels = {
  geplant: "Geplant",
  aktiv: "Aktiv",
  abgesagt: "Abgesagt",
  verschoben: "Verschoben"
};

const visibleStatuses = new Set(["aktiv", "abgesagt"]);

const locationLabels = {
  Gallerie: "Gallerie",
  Bar: "Bar",
  Biergarten: "Biergarten"
};

const eventList = document.querySelector("#event-list");

init();

async function init() {
  try {
    const response = await fetch(EVENT_CSV_PATH, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`CSV konnte nicht geladen werden: ${response.status}`);
    }

    const csv = await response.text();
    const events = parseCsv(csv)
      .map(normalizeEvent)
      .filter(Boolean)
      .filter(isCurrentOrFutureEvent)
      .filter(hasVisibleStatus)
      .sort((a, b) => a.start - b.start);

    renderEvents(events);
  } catch (error) {
    renderError(error);
  }
}

function parseCsv(csv) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...body] = rows.filter((currentRow) => currentRow.some((cell) => cell.trim()));

  if (!headers) {
    return [];
  }

  return body.map((currentRow) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), (currentRow[index] ?? "").trim()]))
  );
}

function normalizeEvent(event) {
  const start = new Date(`${event.date}T${event.time || "00:00"}:00`);

  if (Number.isNaN(start.getTime()) || !event.title) {
    return null;
  }

  return {
    ...event,
    status: (event.status || "geplant").toLowerCase(),
    location: event.location || "Bar",
    admission: normalizeAdmission(event.admission),
    start
  };
}

function normalizeAdmission(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (["frei", "free", "kostenlos", "nein", "no", "0"].includes(normalized)) {
    return "frei";
  }

  if (["eintritt", "ja", "yes", "kostenpflichtig", "paid", "ticket"].includes(normalized)) {
    return "eintritt";
  }

  return "unbekannt";
}

function isCurrentOrFutureEvent(event) {
  const threshold = new Date();

  if (threshold.getHours() < DAY_ROLLOVER_HOUR) {
    threshold.setDate(threshold.getDate() - 1);
  }

  threshold.setHours(0, 0, 0, 0);

  return event.start >= threshold;
}

function hasVisibleStatus(event) {
  return visibleStatuses.has(event.status);
}

function renderEvents(events) {
  eventList.replaceChildren();

  if (!events.length) {
    const emptyState = document.createElement("article");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <p class="eyebrow">Gerade ruhig</p>
      <h3>Keine angekuendigten Events</h3>
      <p>Schau bald wieder rein. Manchmal bleibt die Marie einfach ein Ort fuer spontane Abende.</p>
    `;
    eventList.append(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();

  events.forEach((event) => {
    const item = document.createElement("article");
    const isCancelled = event.status.toLowerCase() === "abgesagt";
    const admissionIcon =
      event.admission === "eintritt"
        ? `<span class="admission-icon" tabindex="0" role="img" aria-label="Eintritt wird verlangt" title="Eintritt wird verlangt" data-tooltip="Eintritt wird verlangt"><span aria-hidden="true">€</span></span>`
        : "";
    item.className = `event-card${isCancelled ? " is-cancelled" : ""}`;

    item.innerHTML = `
      <time class="event-date" datetime="${event.date}T${event.time}">
        <span>${formatDay(event.start)}</span>
        <strong>${formatDate(event.start)}</strong>
        <small>${formatTime(event.start)}</small>
      </time>
      <div class="event-body">
        <div class="event-meta">
          <span>${escapeHtml(locationLabels[event.location] || event.location)}</span>
          ${isCancelled ? `<span class="status">${escapeHtml(statusLabels[event.status] || event.status)}</span>` : ""}
        </div>
        <h3 class="event-title">
          ${admissionIcon}
          <span>${escapeHtml(event.title)}</span>
        </h3>
        <p>${escapeHtml(event.description || "Weitere Informationen folgen.")}</p>
      </div>
    `;

    fragment.append(item);
  });

  eventList.append(fragment);
}

function renderError(error) {
  eventList.innerHTML = `
    <article class="empty-state error-state">
      <p class="eyebrow">Fehler</p>
      <h3>Events konnten nicht geladen werden</h3>
      <p>${escapeHtml(error.message)}</p>
    </article>
  `;
}

function formatDay(date) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(date);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
