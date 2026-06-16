import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type SidebarProps = HTMLAttributes<HTMLElement> & {
  open?: boolean
  onClose?: () => void
}

const BASE =
  'flex h-full w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 ease md:static md:translate-x-0'

const MOBILE = 'fixed inset-y-0 left-0 z-40 md:z-auto'

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, open = false, onClose, children, ...props }, ref) => (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 md:hidden"
          aria-hidden
          onClick={onClose}
        />
      )}
      <aside
        {...props}
        ref={ref}
        className={[BASE, MOBILE, open ? 'translate-x-0' : '-translate-x-full', className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </aside>
    </>
  ),
)

Sidebar.displayName = 'Sidebar'
