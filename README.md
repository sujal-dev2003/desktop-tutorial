# The Wizarding Atlas

An interactive, fan-made Harry Potter-inspired atlas built with plain HTML, CSS, and JavaScript. It is designed as a polished static site for GitHub Pages, with no build step or package installation required.

## Explore

- **Home** introduces the atlas and includes a draggable field note.
- **Characters** supports search, house filters, detail modals, and saved favorites.
- **Places** supports location search, category filters, detail modals, and saved favorites.
- **History** presents a responsive timeline of major turning points.

Favorites are stored in the browser with `localStorage`. The site works without a backend, and all core content is rendered from data objects in `script.js`.

## Future integrations

`database/schema.sql` contains a SQLite schema for characters, places, history, and favorites. `backend/csharp/README.md` outlines an ASP.NET Core API path, while `backend/rust/README.md` outlines a Rust/Tauri or Axum path. These are deliberately scaffolds so the existing static deployment stays simple.

## Local preview

Open `index.html` directly in a browser, or serve the repository with any static file server. Hash routes (`#home`, `#characters`, `#places`, and `#history`) are handled client-side.
