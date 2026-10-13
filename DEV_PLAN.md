# DEV_PLAN — Hacker Knews

Phased execution plan derived from `ROADMAP.md` and the rules in `AGENTS.md`.
Each phase is atomic, independently validatable in the browser, and small enough
to complete in a single agent session.

Legend: **Status** — `TODO` · `IN PROGRESS` · `DONE`.

---

## Phase 1 — Project Skeleton

**Status:** TODO

**Goal:** Stand up a minimal, buildless project that serves an empty newspaper
shell over HTTP without console errors.

**Deliverables:**
- `index.html` — mounts the `#app` root and loads `src/js/main.js` as a module.
- `src/styles/main.css` — aggregates `base.css`, `layout.css`, `newspaper.css`.
- `src/styles/base.css` — design tokens (dark theme), reset, typography.
- `src/styles/layout.css` — page container and footer.
- `src/styles/newspaper.css` — empty placeholder for newspaper components.
- `src/js/main.js` — module that boots and logs a ready message.
- `.gitignore`, `README.md`, `ROADMAP.md`, `AGENTS.md`, `DEV_PLAN.md`.

**Acceptance criteria (manual, in browser):**
- Serving the folder over HTTP shows the page with the dark background and footer.
- The browser console shows no errors and confirms the module booted.

---

## Phase 2 — Fetch Top Stories

**Status:** TODO

**Goal:** Fetch the top 10 Hacker News stories and normalize them into `Story`
objects, ready for rendering.

**Deliverables:**
- `src/js/utils/constants.js` — API base URL, `TOP_STORIES_LIMIT`, fetch buffer.
- `src/js/api/hackerNewsApi.js` — `fetchTopStoryIds` and `fetchStoryById` with
  `AbortController` timeout; per-item failures return `null`.
- `src/js/models/Story.js` — `Story` model with `fromApiItem` / `isValidApiItem`.
- `src/js/services/newsService.js` — `getTopStories(limit)` returning 10 valid
  stories (filters non-story items, e.g. job posts).

**Acceptance criteria (manual, in browser):**
- Calling `getTopStories()` from the console resolves with an array of 10 items.
- Each item exposes `id`, `title`, `url`, `score`, `comments`, `publishedAt`,
  `author`, and `rank`.
- Temporarily breaking the API URL results in a rejected promise (fatal path),
  while removing a single item does not shrink the list below 10.

---

## Phase 3 — Newspaper Layout Rendering

**Status:** TODO

**Goal:** Render the fetched stories as a newspaper with a lead headline, an
articles section, and a numbered list.

**Deliverables:**
- `src/js/utils/dom.js` — safe `createElement`, `createExternalLink`,
  `createHorizontalRule`, `clearElement` helpers.
- `src/js/utils/formatters.js` — score, comments, relative time, domain, date.
- `src/js/ui/components/storyMeta.js` — author / points / comments / time row.
- `src/js/ui/renderers/mastheadRenderer.js` — masthead with date and tagline.
- `src/js/ui/renderers/headlineRenderer.js` — lead headline (story #1).
- `src/js/ui/renderers/articleRenderer.js` — 3 featured article cards.
- `src/js/ui/renderers/storyListRenderer.js` — numbered list of all 10.
- `src/js/main.js` — composes the sections and appends them to `#app`.
- `src/styles/newspaper.css` — styles for all newspaper components.

**Acceptance criteria (manual, in browser):**
- Headline shows story #1 with title, source domain, and metadata.
- Articles section shows 3 featured stories.
- Numbered list shows all 10 stories with rank, title, domain, points, comments,
  and relative time.
- External links open in a new tab; no `innerHTML` is used with API data.

---

## Phase 4 — Loading and Error States

**Status:** TODO

**Goal:** Keep the page informative during fetch, on failure, and when no stories
are returned.

**Deliverables:**
- `src/js/ui/stateRenderer.js` — `renderLoadingState`, `renderErrorState`
  (with retry callback), and `renderEmptyState`.
- `src/js/main.js` — set `data-state` on `#app` and swap states around the fetch,
  wiring the retry button back to the loader.
- `src/styles/newspaper.css` — spinner, error, empty, and retry button styles.

**Acceptance criteria (manual, in browser):**
- A loading indicator appears before the stories render.
- Simulating a network failure shows the error state with a working retry button
  that reloads the stories.
- An empty API response shows the empty state.

---

## Phase 5 — Deploy to GitHub Pages

**Status:** TODO

**Goal:** Publish the static site on GitHub Pages from the `main` branch.

**Deliverables:**
- `README.md` — final run and deploy instructions.
- GitHub repository configured: **Settings → Pages → Deploy from a branch →
  `main` → `/root`**.

**Acceptance criteria (manual, in browser):**
- The site loads at `https://<user>.github.io/<repo>/` and shows the 10 stories.
- No build step is required; GitHub Pages serves the repository files directly.
- No 404s for modules or stylesheets in the browser console.
