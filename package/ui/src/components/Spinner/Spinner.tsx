import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { Spinner as SpinnerIcon } from '@borderline/icons'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize
  label?: string
}

const SIZES: Record<SpinnerSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'md', label = 'Loading…', ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        role="status"
        aria-label={label}
        className={['inline-flex', className].filter(Boolean).join(' ')}
      >
        <SpinnerIcon className={[SIZES[size], 'animate-spin'].join(' ')} />
      </span>
    )
  },
)

Spinner.displayName = 'Spinner'
