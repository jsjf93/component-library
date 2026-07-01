# @borderline/icons

Hand-authored SVG icon components for React. Used by [`@borderline/ui`](https://www.npmjs.com/package/@borderline/ui), and usable on their own.

## Installation

```bash
npm install @borderline/icons
# or
pnpm add @borderline/icons
```

`react` and `react-dom` (v19+) are peer dependencies.

## Usage

Each icon accepts an optional `className` (defaults to `size-4 shrink-0`) and is drawn with `stroke="currentColor"`, so it inherits the surrounding text color:

```tsx
import { Wallet, Send } from '@borderline/icons'

export function Example() {
  return (
    <span className="text-blue-600">
      <Wallet className="size-6" />
      <Send />
    </span>
  )
}
```

## License

MIT
