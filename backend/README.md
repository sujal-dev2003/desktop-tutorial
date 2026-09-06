# Backend integration scaffold

The current atlas is intentionally deployable as static HTML, CSS, and JavaScript on GitHub Pages. This folder describes the future service boundary without adding a server or changing the deployment workflow.

## Suggested API

- `GET /api/characters`
- `GET /api/places`
- `GET /api/history`
- `POST /api/favorites`

The browser data in `script.js` can later be moved into the database represented by `../database/schema.sql`. The C# and Rust folders contain technology-specific starting points for a future API or desktop shell.
