import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { CheckCircle, AlertCircle, InfoCircle, XCircle } from '@borderline/icons'

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'verified'
  | 'pending'
  | 'review'
  | 'failed'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const BASE =
  'inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-3 py-1 whitespace-nowrap'

const VARIANTS: Record<BadgeVariant, string> = {
  default:     'bg-primary text-primary-foreground',
  secondary:   'bg-secondary text-secondary-foreground border border-secondary-foreground/20',
  outline:     'bg-transparent text-foreground border border-border',
  destructive: 'bg-destructive text-destructive-foreground',
  verified:    'bg-success text-success-foreground border border-success-foreground/25',
  pending:     'bg-warning text-warning-foreground border border-warning-foreground/25',
  review:      'bg-info text-info-foreground border border-info-foreground/25',
  failed:      'bg-danger text-danger-foreground border border-danger-foreground/25',
}

const STATUS_ICONS: Partial<Record<BadgeVariant, React.ReactElement>> = {
  verified: <CheckCircle className="size-3.5 shrink-0" />,
  pending:  <AlertCircle className="size-3.5 shrink-0" />,
  review:   <InfoCircle  className="size-3.5 shrink-0" />,
  failed:   <XCircle     className="size-3.5 shrink-0" />,
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={[BASE, VARIANTS[variant], className].filter(Boolean).join(' ')}
      >
        {STATUS_ICONS[variant]}
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
