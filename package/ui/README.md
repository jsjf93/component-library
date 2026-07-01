# @borderline/ui

A React component library built with Tailwind CSS v4.

## Installation

```bash
npm install @borderline/ui
# or
pnpm add @borderline/ui
```

`react` and `react-dom` (v19+) are peer dependencies and must be installed in your project.

## Usage

Import the stylesheet once at the root of your app (e.g. in your entry file or root layout), then use the components anywhere:

```tsx
// main.tsx / App entry
import '@borderline/ui/styles.css'

import { Button, Card, StatCard } from '@borderline/ui'

export function Example() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

### Styling

`@borderline/ui/styles.css` ships the compiled component styles and design tokens — importing it is all most consumers need.

If you want to reference or override the design tokens (CSS custom properties such as `--color-primary`) without pulling in the full stylesheet, import the tokens on their own:

```css
@import '@borderline/ui/theme.css';
```

## Icons

Icon components are bundled into this package, so there is no separate runtime install required. They are also published independently as [`@borderline/icons`](https://www.npmjs.com/package/@borderline/icons) if you want to use them directly.

## License

MIT
