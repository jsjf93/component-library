import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

/**
 * Renders an `<a>` by default so navigation is a real link (accessible, no
 * onClick handlers). Pass `as` to swap in a router link component — e.g.
 * `<SidebarItem as={Link} to="/dashboard">` (React Router) or
 * `<SidebarItem as={Link} href="/dashboard">` (Next.js) — and that
 * component's own props become available and type-checked.
 */
export type SidebarItemProps<T extends ElementType = 'a'> = {
  as?: T
  icon?: ReactNode
  active?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

const BASE =
  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25'

const ACTIVE = 'bg-primary text-primary-foreground'
const INACTIVE = 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'

export function SidebarItem<T extends ElementType = 'a'>({
  as,
  className,
  icon,
  active = false,
  children,
  ...props
}: SidebarItemProps<T>) {
  const Component = (as ?? 'a') as ElementType
  return (
    <Component
      {...props}
      aria-current={active ? 'page' : undefined}
      className={[BASE, active ? ACTIVE : INACTIVE, className].filter(Boolean).join(' ')}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </Component>
  )
}
