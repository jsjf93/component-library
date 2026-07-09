import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { CheckCircle, AlertCircle, InfoCircle, XCircle } from '@borderline/icons'

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant
  title: string
}

const VARIANTS: Record<AlertVariant, { container: string; icon: string }> = {
  success: {
    container: 'bg-success text-success-foreground border border-success-foreground/20',
    icon: 'text-success-foreground',
  },
  warning: {
    container: 'bg-warning text-warning-foreground border border-warning-foreground/20',
    icon: 'text-warning-foreground',
  },
  danger: {
    container: 'bg-danger text-danger-foreground border border-danger-foreground/20',
    icon: 'text-danger-foreground',
  },
  info: {
    container: 'bg-info text-info-foreground border border-info-foreground/20',
    icon: 'text-info-foreground',
  },
}

const ICONS: Record<AlertVariant, React.ReactElement> = {
  success: <CheckCircle className="size-5 shrink-0" />,
  warning: <AlertCircle className="size-5 shrink-0" />,
  danger:  <XCircle     className="size-5 shrink-0" />,
  info:    <InfoCircle  className="size-5 shrink-0" />,
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, ...props }, ref) => {
    const { container, icon } = VARIANTS[variant]
    return (
      <div
        {...props}
        ref={ref}
        role="alert"
        className={['flex gap-3 rounded-lg px-4 py-3', container, className]
          .filter(Boolean)
          .join(' ')}
      >
        <span className={['mt-0.5', icon].join(' ')}>{ICONS[variant]}</span>
        <div className="flex flex-col gap-0.5 text-sm">
          <span className="font-semibold">{title}</span>
          {children && <span>{children}</span>}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
