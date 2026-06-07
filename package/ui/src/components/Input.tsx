import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

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
const LABEL_ERROR   = 'text-destructive'

function SearchIcon() {
  return (
    <svg
      className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
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
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

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
          {resolvedVariant === 'search' && <SearchIcon />}
          <input
            {...props}
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={inputClasses}
          />
          {resolvedVariant === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              <EyeIcon open={showPassword} />
            </button>
          )}
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

Input.displayName = 'Input'
