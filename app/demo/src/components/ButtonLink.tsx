import { Link, type LinkProps } from 'react-router-dom'

/**
 * A router `<Link>` styled like the library's outline `Button`. Used where we
 * need real navigation (so it's an anchor, not a `<button>` with onClick) but
 * want button affordance — e.g. "Back to markets".
 */
const STYLES =
  'inline-flex items-center justify-center gap-2 h-8 px-3 text-xs rounded-md border border-border bg-transparent text-foreground transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25'

export function ButtonLink({ className, ...props }: LinkProps) {
  return <Link className={[STYLES, className].filter(Boolean).join(' ')} {...props} />
}
