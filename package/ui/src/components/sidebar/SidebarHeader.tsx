import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={['flex items-center gap-3 border-b border-border px-5 py-4', className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          {icon}
        </span>
      )}
      <span className="text-base font-semibold text-foreground">{children}</span>
    </div>
  ),
)

SidebarHeader.displayName = 'SidebarHeader'
