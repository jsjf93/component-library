import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
}

const BASE =
  'inline-flex items-center justify-center gap-2 border leading-tight whitespace-nowrap cursor-pointer transition-[background-color,color,border-color,box-shadow,opacity] duration-[120ms] ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground border-transparent hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground border-secondary/50 hover:bg-secondary/80',
  outline:
    'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground',
  ghost:
    'bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground',
  link: 'bg-transparent text-primary border-transparent underline-offset-4 hover:underline',
  destructive:
    'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  default: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-11 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-lg',
}

function Spinner() {
  return (
    <svg
      className="size-4 shrink-0 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const stateClasses = loading
      ? 'opacity-75 cursor-wait pointer-events-none'
      : isDisabled
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : ''

    const classes = [
      BASE,
      VARIANTS[variant],
      SIZES[size],
      fullWidth ? 'w-full' : '',
      stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button {...props} ref={ref} type={type} className={classes} disabled={isDisabled}>
        {loading && <Spinner />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
