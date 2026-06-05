# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm monorepo with two workspaces:

- `package/ui` — the `@borderline/ui` component library (Vite library mode, Tailwind CSS v4, Storybook)
- `app/demo` — a minimal React + Vite demo app that consumes `@borderline/ui` via `workspace:*`

## Commands

All commands run from the repo root unless noted.

```bash
pnpm install            # install all workspace dependencies

pnpm build              # build all workspaces (ui then demo)
pnpm build:ui           # build @borderline/ui only (tsc + vite)
pnpm build:demo         # build the demo app only

pnpm dev:demo           # start the demo app dev server (Vite)
pnpm storybook          # start Storybook for @borderline/ui on :6006
pnpm build-storybook    # build Storybook statically

pnpm lint               # lint all workspaces
```

To run a command in a specific workspace directly:

```bash
pnpm --filter @borderline/ui <script>
pnpm --filter demo <script>
```

## Architecture

### `package/ui` — component library

- **Entry point**: `src/index.ts` — re-exports all public components and their types.
- **Styles**: `src/index.css` — single CSS file, imported by `index.ts`. Uses Tailwind v4 (`@import "tailwindcss"`) for utilities plus hand-authored semantic class names (e.g. `.ui-button`). The build emits this as `dist/styles.css`, exposed via the `"./styles.css"` package export.
- **Build**: `tsc -p tsconfig.build.json` emits `.d.ts` declarations to `dist/`, then `vite build` bundles to `dist/index.js` (ESM only). `react`, `react-dom`, and `react/jsx-runtime` are externalized.
- **Components**: one file per component in `src/components/`. Each file exports the component and its props type. Co-locate a `.stories.tsx` file for Storybook alongside each component.
- **Styling pattern**: components apply a stable semantic class (e.g. `ui-button`) defined in `index.css`, then spread `className` from props so consumers can extend via Tailwind utilities.

### `app/demo`

Minimal app for manual integration testing. Add components from `@borderline/ui` here to verify they render correctly in a real consumer context. Tailwind and the workspace dependency are already wired up.

### Adding a new component

1. Create `package/ui/src/components/MyComponent.tsx` — export the component and its props type.
2. Add a `.stories.tsx` file alongside it.
3. Re-export from `package/ui/src/index.ts`.
4. Add any component-scoped CSS classes to `package/ui/src/index.css`.
