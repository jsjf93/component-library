import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label?: ReactNode
  groupLabel?: string
  error?: string
}

const BOX =
  'size-4 shrink-0 rounded-md border-2 flex items-center justify-center mt-0.5 ' +
  'border-border bg-background ' +
  'group-has-[:checked]:border-primary group-has-[:checked]:bg-primary ' +
  'group-has-[:focus-visible]:border-primary ' +
  'transition-[background-color,border-color] duration-150 ease'

const CHECKMARK =
  'size-2.5 text-primary-foreground ' +
  'opacity-0 scale-0 ' +
  'group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100 ' +
  'transition-[transform,opacity] duration-100 ease'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      groupLabel,
      error,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const checkboxId = id ?? generatedId
    const errorId = `${checkboxId}-error`

    return (
      <div className={className}>
        {groupLabel && (
          <p className="mb-2 text-sm font-medium text-foreground">{groupLabel}</p>
        )}
        <label
          htmlFor={checkboxId}
          className="inline-flex items-start gap-2.5 cursor-pointer group has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
        >
          <input
            {...props}
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="sr-only peer"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
          <div className={BOX} aria-hidden>
            <svg
              className={CHECKMARK}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </div>
          {label && (
            <span className="text-sm text-foreground leading-snug">{label}</span>
          )}
        </label>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-danger-foreground animate-fade-in-up" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
