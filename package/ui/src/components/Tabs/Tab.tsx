import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { useTabsContext } from './Tabs'

export type TabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
  value: string
}

const BASE =
  'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium select-none ' +
  'transition-colors duration-150 cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

const ACTIVE = 'text-foreground'
const INACTIVE = 'text-foreground/70 hover:text-foreground'

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { value: activeValue, setValue } = useTabsContext()
    const isActive = activeValue === value

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="tab"
        data-value={value}
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => setValue(value)}
        className={[BASE, isActive ? ACTIVE : INACTIVE, className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </button>
    )
  },
)

Tab.displayName = 'Tab'
