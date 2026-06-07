import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
}

const BASE =
  'w-full appearance-none rounded-lg border bg-background text-sm text-foreground ' +
  'h-10 pl-3 pr-9 ' +
  'transition-[border-color] duration-150 ease ' +
  'focus-visible:outline-none focus-visible:border-primary ' +
  'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

const BORDER_DEFAULT = 'border-border'
const BORDER_ERROR   = 'border-destructive focus-visible:border-destructive'

function ChevronIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      placeholder,
      children,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id ?? generatedId

    const classes = [
      BASE,
      error ? BORDER_ERROR : BORDER_DEFAULT,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={selectId}
            className={[
              'block text-sm font-medium mb-1',
              error ? 'text-destructive' : 'text-foreground',
            ].join(' ')}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select {...props} ref={ref} id={selectId} className={classes}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground">
            <ChevronIcon />
          </div>
        </div>
        {error ? (
          <p className="mt-1 text-xs text-destructive animate-fade-in-up" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'
