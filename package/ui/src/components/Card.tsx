import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type CardVariant = 'default' | 'highlighted'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
}

const VARIANTS: Record<CardVariant, string> = {
  default:     'border-border bg-card',
  highlighted: 'border-primary bg-secondary/30',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={['rounded-2xl border', VARIANTS[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  ),
)

Card.displayName = 'Card'
