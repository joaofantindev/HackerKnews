# ROADMAP — Hacker Knews

## Product Summary

A static, browser-only news page that fetches the top 10 Hacker News stories at
load time and renders them as a newspaper: a lead headline, an articles section,
and a numbered list. It is published on GitHub Pages with no backend, no
database, and no authentication.

## Stack

**Vanilla JavaScript (native ES modules) + HTML + CSS. No build step, no
bundler, no framework.**

Justification: the whole site can be served as static files directly from GitHub
Pages, it has zero runtime dependencies, and it keeps the focus on the AI-Native
workflow (context → plan → phased execution → deploy) instead of tooling.

### Constraints

- No own backend, no database, no authentication.
- 100% static site; everything runs in the browser.
- No SPA frameworks (React, Vue, Angular) or UI component libraries.
- Keep dependencies to a minimum; a local static file server is the only dev tool.

## Data Source

Public Hacker News API (Firebase), no API key required. Base URL:
`https://hacker-news.firebaseio.com/v0/`

- `GET /topstories.json` → array of story IDs, ordered by rank.
- `GET /item/{id}.json` → story object with `id`, `title`, `url`, `score`, `by`,
  `time`, and `descendants` (comment count).

## Core Features

1. **Fetch top story IDs** — request `/topstories.json` and keep the first N IDs.
2. **Fetch story details** — request `/item/{id}.json` for each ID in parallel and
   normalize the results into a `Story` model.
3. **Render the newspaper layout** — display a lead headline, an articles
   section, and a numbered list of all 10 stories.

## Expected File Structure

```
HackerKnews/
├── index.html                     # Entry point (mounts #app, loads main.js)
├── README.md                      # How to run and deploy
├── ROADMAP.md                     # This file: product context
├── AGENTS.md                      # Agent operating rules
├── DEV_PLAN.md                    # Phased execution plan
├── .gitignore
└── src/
    ├── js/
    │   ├── main.js                # Bootstrap / orchestration
    │   ├── api/
    │   │   └── hackerNewsApi.js   # HTTP access to the HN API
    │   ├── models/
    │   │   └── Story.js           # Normalized domain model
    │   ├── services/
    │   │   └── newsService.js     # Composes API + model into top stories
    │   ├── ui/
    │   │   ├── renderers/
    │   │   │   ├── mastheadRenderer.js
    │   │   │   ├── headlineRenderer.js
    │   │   │   ├── articleRenderer.js
    │   │   │   └── storyListRenderer.js
    │   │   ├── components/
    │   │   │   └── storyMeta.js
    │   │   └── stateRenderer.js   # Loading / error / empty states
    │   └── utils/
    │       ├── constants.js
    │       ├── dom.js             # Safe DOM helpers
    │       └── formatters.js      # Score, comments, time, domain
    └── styles/
        ├── main.css               # Aggregates the stylesheets
        ├── base.css               # Reset, design tokens (dark theme), typography
        ├── layout.css             # Page structure and footer
        └── newspaper.css          # Newspaper components
```

## Development Sequence

1. **Project skeleton** — create `index.html`, the base CSS, and an empty
   `main.js` module that boots without errors.
2. **Data layer** — implement the API client, the `Story` model, and the service
   that returns the normalized top 10 stories.
3. **Rendering** — build the safe DOM helpers and the renderers for headline,
   articles, and numbered list, then wire them in `main.js`.
4. **States** — add loading, error (with retry), and empty states around the
   fetch flow.
5. **Deploy** — publish the static site to GitHub Pages.

## Acceptance Criteria

- The page shows exactly 10 valid stories (non-story items such as job posts are
  filtered out, using a fetch buffer to still complete the list).
- The lead headline shows the #1 story with title, source domain, author, points,
  comments, and relative time.
- The articles section shows 3 featured stories below the headline.
- The numbered list shows all 10 stories with rank, title, domain, points,
  comments, and relative time.
- Loading, error (with a working retry button), and empty states all render.
- No use of `innerHTML` with API data; all dynamic text is set via `textContent`.
- Links open external stories in a new tab with `rel="noopener noreferrer"`.
- The site works when served as static files (no build step required).

## Deployment Note

GitHub Pages serves the repository directly from the `main` branch, root folder
(`/`). No build or artifact folder is needed. Settings: **Settings → Pages →
Deploy from a branch → `main` → `/root`**. The published URL will be
`https://<user>.github.io/<repo>/`.
