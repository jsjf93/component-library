import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type SidebarNavProps = HTMLAttributes<HTMLElement> & {
  label?: string
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, label, children, ...props }, ref) => (
    <nav
      aria-label={label}
      {...props}
      ref={ref}
      className={['flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label && (
        <p className="px-3 pb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
      )}
      {children}
    </nav>
  ),
)

SidebarNav.displayName = 'SidebarNav'
