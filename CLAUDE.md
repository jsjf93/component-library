# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm monorepo with three workspaces (`pnpm-workspace.yaml` globs `package/*` and `app/*`):

- `package/icons` — the `@borderline/icons` package: a shared set of hand-authored SVG icon components (Vite library mode), consumed by `@borderline/ui`.
- `package/ui` — the `@borderline/ui` component library (Vite library mode, Tailwind CSS v4, Storybook). Depends on `@borderline/icons` via `workspace:*`.
- `app/demo` — a minimal React + Vite demo app that consumes `@borderline/ui` via `workspace:*`

## Commands

All commands run from the repo root unless noted.

```bash
pnpm install            # install all workspace dependencies

pnpm build              # build all workspaces in dependency order (icons → ui → demo)
pnpm build:icons        # build @borderline/icons only (tsc + vite)
pnpm build:ui           # build @borderline/ui only (tsc + vite)
pnpm build:demo         # build the demo app only

pnpm dev:demo           # start the demo app dev server (Vite)
pnpm storybook          # start Storybook for @borderline/ui on :6006
pnpm build-storybook    # build Storybook statically

pnpm lint               # lint all workspaces
```

To run a command in a specific workspace directly:

```bash
pnpm --filter @borderline/icons <script>
pnpm --filter @borderline/ui <script>
pnpm --filter demo <script>
```

## Architecture

### `package/ui` — component library

- **Entry point**: `src/index.ts` — re-exports all public components and their types.
- **Styles**: `src/index.css` — single CSS file, imported by `index.ts`. Uses Tailwind v4 (`@import "tailwindcss"`) for utilities plus hand-authored semantic class names (e.g. `.ui-button`). The build emits this as `dist/styles.css`, exposed via the `"./styles.css"` package export.
- **Design tokens**: the `@theme` block in `index.css` is the source of truth for theming — semantic color tokens (`--color-primary`, `--color-success-foreground`, etc.) and typography scales. Components and class names reference these tokens rather than hard-coded values.
- **Build**: `tsc -p tsconfig.build.json` emits `.d.ts` declarations to `dist/`, then `vite build` bundles to `dist/index.js` (ESM only). `react`, `react-dom`, and `react/jsx-runtime` are externalized.
- **Components**: each component lives in its own subdirectory under `src/components/` (e.g. `components/Button/Button.tsx`), exporting the component and its props type, with a co-located `.stories.tsx` file. Compound components with multiple parts (e.g. `components/sidebar/` with `Sidebar`, `SidebarHeader`, `SidebarNav`, `SidebarItem`, `SidebarFooter`) follow the same subdirectory pattern, one file per part. Every component/part is re-exported from `index.ts`.
- **Recipes**: `src/recipes/` holds Storybook-only composition examples (e.g. `Dashboard.stories.tsx`) that wire several components together. These are not exported from `index.ts`.
- **Styling pattern**: components apply a stable semantic class (e.g. `ui-button`) defined in `index.css`, then spread `className` from props so consumers can extend via Tailwind utilities.

### `package/icons` — icon package

- **Entry point**: `src/index.ts` — re-exports every icon.
- **Icons**: one icon per file in `src/icons/`. Each is an SVG React component taking `IconProps` (`{ className }`, defaulting to `'size-4 shrink-0'`) and drawn with `stroke="currentColor"` so it inherits text color from its container.
- **Build**: same as `@borderline/ui` — `tsc -p tsconfig.build.json` then `vite build`, ESM-only, with React externalized.

### `app/demo`

Minimal app for manual integration testing. Add components from `@borderline/ui` here to verify they render correctly in a real consumer context. Tailwind and the workspace dependency are already wired up.

### Adding a new component

1. Create `package/ui/src/components/MyComponent/MyComponent.tsx` — export the component and its props type.
2. Add a `.stories.tsx` file alongside it.
3. Re-export from `package/ui/src/index.ts`.
4. Add any component-scoped CSS classes to `package/ui/src/index.css`.

### Adding a new icon

1. Create `package/icons/src/icons/MyIcon.tsx` — an SVG component taking `IconProps` with `stroke="currentColor"`.
2. Re-export from `package/icons/src/index.ts`.
