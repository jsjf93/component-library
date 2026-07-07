# component-library

A pnpm monorepo housing a React component library, its icon set, and a demo app.

## Workspaces

`pnpm-workspace.yaml` globs `package/*` and `app/*`:

- **`package/icons`** — [`@borderline/icons`](package/icons/README.md): hand-authored SVG icon components (Vite library mode), consumed by `@borderline/ui`.
- **`package/ui`** — [`@borderline/ui`](package/ui/README.md): the component library (Vite library mode, Tailwind CSS v4, Storybook). Depends on `@borderline/icons` via `workspace:*`.
- **`app/demo`** — a minimal React + Vite app ([README](app/demo/README.md)) that consumes `@borderline/ui` for manual integration testing.

## Commands

Run from the repo root unless noted.

```bash
pnpm install            # install all workspace dependencies

pnpm build              # build all workspaces in dependency order (icons → ui → demo)
pnpm build:icons        # build @borderline/icons only
pnpm build:ui           # build @borderline/ui only
pnpm build:demo         # build the demo app only

pnpm dev:demo           # start the demo app dev server (Vite)
pnpm storybook          # start Storybook for @borderline/ui on :6006
pnpm build-storybook    # build Storybook statically

pnpm lint               # lint all workspaces
pnpm release            # publish the @borderline/* packages
```

To run a script in a single workspace:

```bash
pnpm --filter @borderline/icons <script>
pnpm --filter @borderline/ui <script>
pnpm --filter demo <script>
```

## License

MIT
