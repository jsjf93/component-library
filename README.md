# component-library

Monorepo scaffold for a React component library and demo application.

## Workspaces

- `package/ui` contains the Vite library-mode package, Tailwind setup, and Storybook config.
- `app/demo` contains a minimal React + Vite demo app with Tailwind configured.

## Commands

- `pnpm install` installs all workspace dependencies.
- `pnpm build` builds the UI package and demo app.
- `pnpm dev:demo` starts the demo app.
- `pnpm storybook` starts Storybook for `@borderline/ui`.
- `pnpm build-storybook` builds Storybook statically.