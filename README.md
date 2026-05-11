# Praxis Lars Werner

Website der Physiotherapie-Praxis Lars Werner in Berlin.

## Tech-Stack

- **[Astro 6](https://astro.build/)** — Static Site Generator
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first CSS
- **[Contentful](https://www.contentful.com/)** — Headless CMS (Inhalte, Navigation, Konfiguration)
- **[Mapbox GL](https://www.mapbox.com/)** — Interaktive Karte auf der Kontaktseite
- **[Netlify](https://www.netlify.com/)** — Hosting & Formular-Verarbeitung

## Lokale Entwicklung

### Voraussetzungen

- Node.js ≥ 20
- npm ≥ 10

### Setup

```bash
npm install
```

Lege eine `.env`-Datei im Projektroot an:

```env
CONTENTFUL_SPACE_ID=...
CONTENTFUL_DELIVERY_TOKEN=...
CONTENTFUL_PREVIEW_TOKEN=...
PUBLIC_MAPBOX_TOKEN=...
```

Die Tokens findest du in den Contentful- bzw. Mapbox-Einstellungen sowie in den Netlify-Umgebungsvariablen.

### Entwicklungsserver starten

```bash
npm run dev
```

Die Seite ist unter [http://localhost:4321](http://localhost:4321) erreichbar.

Im Dev-Modus wird der Contentful **Preview**-Token verwendet, sodass auch unveröffentlichte Inhalte sichtbar sind.

## Verfügbare Commands

| Command | Beschreibung |
|---|---|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Produktions-Build erstellen |
| `npm run preview` | Produktions-Build lokal vorschauen |
| `npm run test` | Unit-Tests (Vitest, watch mode) |
| `npm run test:run` | Unit-Tests einmalig durchlaufen |
| `npm run test:e2e` | E2E-Tests (Playwright) |

## Tests

Unit-Tests mit [Vitest](https://vitest.dev/) für Hilfsfunktionen (`src/lib/`).  
E2E-Tests mit [Playwright](https://playwright.dev/) für Kontaktformular und Navigation.

```bash
npm run test:run   # Unit-Tests
npm run test:e2e   # E2E-Tests (Dev-Server muss laufen)
```

## Contentful-Struktur

Die Seite bezieht alle Inhalte aus Contentful. Zentrale Content-Types:

| Content-Type | Beschreibung |
|---|---|
| `landingPage` | Startseiten-Inhalte (Intro, Slideshow, Kontakttext) |
| `teamMember` | Team-Mitglieder mit Bio und Angeboten |
| `offer` | Therapieangebote |
| `page` | Statische Unterseiten (z.B. Stellenangebote) |
| `config` | Site-Konfiguration (Adresse, Navigation, Koordinaten) |
| `associates` | Partner-Links |
| `wisdom` | Zitate für den Footer |

Die Contentful-Entry-IDs sind in [`src/lib/constants.ts`](src/lib/constants.ts) zentralisiert.

## Deployment

Der Build läuft automatisch auf Netlify bei jedem Push auf `main`.  
Netlify verarbeitet außerdem das Kontaktformular (Netlify Forms).

Benötigte Umgebungsvariablen in Netlify:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`
- `PUBLIC_MAPBOX_TOKEN`
