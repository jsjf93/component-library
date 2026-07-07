# demo

A minimal React + Vite app that consumes [`@borderline/ui`](../../package/ui/README.md) (and [`@borderline/icons`](../../package/icons/README.md)) via `workspace:*`. Its purpose is manual integration testing — drop components in here to verify they render correctly in a real consumer context.

The demo is dressed up as a small **crypto portfolio tracker** (backed by live Kraken market data) to exercise the library against a realistic app: an `AppShell` layout with a sidebar, code-split routes, context-based state, and a mix of cards, stats, forms, and tables.

## Running

From the repo root:

```bash
pnpm dev:demo           # start the dev server (Vite)
pnpm build:demo         # type-check and build for production
```

Or from this directory:

```bash
pnpm dev                # start the dev server
pnpm build              # tsc -b && vite build
pnpm preview            # preview the production build
pnpm lint               # lint this workspace
```

## How it consumes the library

- **Styles** — `src/index.css` pulls in Tailwind, then `@borderline/ui/theme.css` (design tokens, so demo-authored utilities like `bg-primary` resolve) and `@borderline/ui/styles.css` (the compiled component classes).
- **Layout** — `src/App.tsx` wraps every route in the library's `AppShell`; `main.tsx` provides `SettingsContext` and `PortfolioContext` above the router.
- **Routing** — `src/router.tsx` defines the routes, each page lazy-loaded and streamed into the App layout's Suspense boundary:
  - `/` — Portfolio (holdings overview)
  - `/markets` — Markets
  - `/markets/:pair` — Asset detail
  - `/settings` — Settings
  - `*` — Not found

## Structure

```
src/
  App.tsx            App layout (AppShell + sidebar + Suspense outlet)
  main.tsx           Entry: context providers + RouterProvider
  router.tsx         Route table (code-split pages)
  pages/             Portfolio, Markets, AssetDetail, Settings, NotFound
  components/        Demo-only building blocks (sidebar, sparkline, forms, …)
  state/             SettingsContext, PortfolioContext
  hooks/             Portfolio price + ticker hooks
  lib/               Kraken data fetching/socket, caching, formatting
```

> This app is not published — it exists only to develop and smoke-test the library.
