import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  value: number
  max?: number
  formatValue?: (value: number, max: number) => string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, label, value, max = 100, formatValue, ...props }, ref) => {
    const clamped = Math.min(Math.max(value, 0), max)
    const pct = (clamped / max) * 100
    const display = formatValue
      ? formatValue(clamped, max)
      : `${Math.round(pct)}%`

    return (
      <div
        {...props}
        ref={ref}
        className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground font-medium">{label}</span>
          <span className="text-muted-foreground tabular-nums">{display}</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-in-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  },
)

Progress.displayName = 'Progress'
