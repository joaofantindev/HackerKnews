# AGENTS.md

Operating rules for AI coding agents working on this repository. This file is the
single source of operational truth and must stay consistent with `ROADMAP.md`.

## 1. Project Overview

This project is **Hacker Knews**, a static, browser-only news page that fetches
the top 10 Hacker News stories at load time and renders them as a newspaper: a
lead headline, an articles section, and a numbered list of all 10 stories.

The final goal is a buildless, dependency-free static site, published on GitHub
Pages, that demonstrates the AI-Native workflow: context → plan → phased
execution → deploy.

## 2. Stack and Constraints

Use exactly what `ROADMAP.md` defines:

- Vanilla JavaScript using **native ES modules** (no bundler, no build step).
- Plain HTML and CSS.
- The public Hacker News API at `https://hacker-news.firebaseio.com/v0/`.

Do **not** introduce:

- SPA frameworks or UI libraries (React, Vue, Angular, Svelte, etc.).
- A backend, a database, or authentication.
- A bundler, transpiler, or package manager dependency for the app itself.
- Any runtime dependency that would break serving the site as static files.

## 3. File Structure

Keep the structure defined in `ROADMAP.md`:

```
index.html
README.md
ROADMAP.md
AGENTS.md
DEV_PLAN.md
.gitignore
src/js/main.js
src/js/api/hackerNewsApi.js
src/js/models/Story.js
src/js/services/newsService.js
src/js/ui/stateRenderer.js
src/js/ui/renderers/{masthead,headline,article,storyList}Renderer.js
src/js/ui/components/storyMeta.js
src/js/utils/{constants,dom,formatters}.js
src/styles/{main,base,layout,newspaper}.css
```

Respect the layering: `api` must not import from `ui` or `services`; `ui` must
not perform `fetch`; `utils` is framework-agnostic and has no side effects.

## 4. Main Commands

There is **no build command** — the app runs as-is from static files. To run
locally, serve the folder over HTTP (ES modules do not work over `file://`):

```powershell
# Option 1 — Python
python -m http.server 8080

# Option 2 — Node
npx serve .
```

Then open `http://localhost:8080`.

There is no test runner configured in this repository. If tests are added later,
document the exact command here.

## 5. Code Conventions

- **Naming**: files use `camelCase` for JS modules and `kebab-case`/lowercase for
  CSS. Functions and variables use descriptive, intention-revealing names (e.g.
  `fetchTopStoryIds`, `formatRelativeTime`, `renderStoryList`). Constants use
  `UPPER_SNAKE_CASE`.
- **Modules**: one responsibility per module. Keep the api/service/ui/utils
  layers separate. Export only what other layers need.
- **Functions**: small and pure where possible. Document every exported function
  with a JSDoc block (purpose, `@param`, `@returns`).
- **DOM**: never set `innerHTML` with data from the API. Build elements with
  `document.createElement` and set dynamic content via `textContent`. Reuse the
  helpers in `src/js/utils/dom.js`.
- **Fetch error handling**: use `fetch` with an `AbortController` timeout. A
  failure while loading a single item must not break the whole list — return
  `null` and let the service filter it out. Surface fatal errors as the error
  state with a retry action.
- **Styling**: use the CSS custom properties (design tokens) defined in
  `src/styles/base.css`. Do not hardcode colors outside that variables block.
  The project uses a dark theme.

## 6. Deployment Process

The site is buildless, so the deploy branch contains the static files at its
root. GitHub Pages publishes from the `gh-pages` branch; the `main` branch keeps
the source and the harness docs.

- Deploy branch: `gh-pages`
- Output folder: `/` (branch root)
- Content: `index.html`, `src/`, and `.nojekyll`
- Because there is no build step, the deploy branch is a copy of the site files
  (no `dist/`). All asset paths are relative, so they resolve under the project
  subpath `https://<user>.github.io/<repo>/`.
- Configure in **Settings → Pages → Deploy from a branch → `gh-pages` → `/root`**.
- Published URL: `https://<user>.github.io/<repo>/`.

## 7. What NOT To Do

- Do not add a framework, bundler, or build pipeline without explicit alignment.
- Do not add a backend, database, or authentication of any kind.
- Do not invent features beyond the scope in `ROADMAP.md` (e.g. infinite scroll,
  comments threads, search, theming toggles).
- Do not change the file/folder structure or the layer boundaries without
  explicit alignment.
- Do not use `innerHTML` with external/API data.
- Do not hardcode secrets or API keys. The Hacker News API requires none.
- Do not commit unless explicitly asked to.
