import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={['mt-auto border-t border-border p-3', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  ),
)

SidebarFooter.displayName = 'SidebarFooter'
