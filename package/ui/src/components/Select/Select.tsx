import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from '@borderline/icons'

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
    const descriptionId = `${selectId}-description`

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
          <select
            {...props}
            ref={ref}
            id={selectId}
            className={classes}
            aria-invalid={!!error}
            aria-describedby={error || helperText ? descriptionId : undefined}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground">
            <ChevronDown />
          </div>
        </div>
        {error ? (
          <p id={descriptionId} className="mt-1 text-xs text-destructive animate-fade-in-up" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={descriptionId} className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'
