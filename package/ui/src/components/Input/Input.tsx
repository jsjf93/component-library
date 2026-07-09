import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Search, Eye, EyeOff } from '@borderline/icons'

export type InputVariant = 'default' | 'search' | 'password'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  helperText?: string
  error?: string
  variant?: InputVariant
}

const BASE =
  'w-full rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground ' +
  'transition-[border-color] duration-150 ease ' +
  'focus-visible:outline-none focus-visible:border-primary ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'read-only:bg-muted read-only:text-muted-foreground read-only:cursor-default ' +
  'read-only:focus-visible:border-border'

const BORDER_DEFAULT = 'border-border'
const BORDER_ERROR   = 'border-destructive focus-visible:border-destructive'

const PADDING: Record<InputVariant, string> = {
  default:  'h-10 px-3 py-2',
  search:   'h-10 pl-9 pr-3 py-2',
  password: 'h-10 px-3 pr-10 py-2',
}

const LABEL_BASE    = 'block text-sm font-medium mb-1'
const LABEL_DEFAULT = 'text-foreground'
const LABEL_ERROR   = 'text-danger-foreground'


export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      variant = 'default',
      type,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const descriptionId = `${inputId}-description`
    const [showPassword, setShowPassword] = useState(false)

    const resolvedVariant: InputVariant =
      type === 'password' ? 'password' : variant

    const resolvedType =
      resolvedVariant === 'password'
        ? showPassword ? 'text' : 'password'
        : type

    const inputClasses = [
      BASE,
      error ? BORDER_ERROR : BORDER_DEFAULT,
      PADDING[resolvedVariant],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className={[LABEL_BASE, error ? LABEL_ERROR : LABEL_DEFAULT].join(' ')}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {resolvedVariant === 'search' && <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />}
          <input
            {...props}
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error || helperText ? descriptionId : undefined}
          />
          {resolvedVariant === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {error ? (
          <p id={descriptionId} className="mt-1 text-xs text-danger-foreground animate-fade-in-up" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={descriptionId} className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
