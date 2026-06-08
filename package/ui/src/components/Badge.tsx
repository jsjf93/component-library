import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

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

function CheckCircle() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function AlertCircle() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function InfoCircle() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function XCircle() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  )
}

const STATUS_ICONS: Partial<Record<BadgeVariant, () => React.ReactElement>> = {
  verified: CheckCircle,
  pending:  AlertCircle,
  review:   InfoCircle,
  failed:   XCircle,
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const Icon = STATUS_ICONS[variant]

    return (
      <span
        {...props}
        ref={ref}
        className={[BASE, VARIANTS[variant], className].filter(Boolean).join(' ')}
      >
        {Icon && <Icon />}
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
