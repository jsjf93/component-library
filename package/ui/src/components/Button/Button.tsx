import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Spinner } from '@borderline/icons'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  pulse?: boolean
}

const PULSE_COLORS: Record<ButtonVariant, string> = {
  primary:     'var(--color-primary)',
  secondary:   'var(--color-secondary-foreground)',
  outline:     'var(--color-foreground)',
  ghost:       'var(--color-foreground)',
  link:        'var(--color-primary)',
  destructive: 'var(--color-destructive)',
}

const BASE =
  'inline-flex items-center justify-center gap-2 border leading-tight whitespace-nowrap cursor-pointer [will-change:transform] transition-[background-color,color,border-color,box-shadow,opacity,transform] duration-[120ms] ease active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground border-transparent hover:bg-primary/90 hover:shadow-sm',
  secondary:
    'bg-secondary text-secondary-foreground border-secondary/50 hover:bg-secondary/80 hover:shadow-sm',
  outline:
    'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground',
  ghost:
    'bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground',
  link: 'bg-transparent text-primary border-transparent underline-offset-4 hover:underline',
  destructive:
    'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90 hover:shadow-sm',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  default: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-11 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-lg',
}


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      loading = false,
      fullWidth = false,
      pulse = false,
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
      pulse ? 'animate-button-pulse' : '',
      stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        style={pulse ? { '--button-pulse-color': PULSE_COLORS[variant] } as React.CSSProperties : undefined}
      >
        {loading && <Spinner />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
