import { forwardRef, useId, useState } from 'react'
import type { HTMLAttributes } from 'react'

export type ToggleProps = Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> & {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

const TRACK_BASE =
  'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent ' +
  'transition-colors duration-200 ease ' +
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

const TRACK_ON  = 'bg-primary'
const TRACK_OFF = 'bg-muted'

const THUMB_BASE =
  'pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ' +
  'transition-transform duration-200 ease'

const THUMB_ON  = 'translate-x-5'
const THUMB_OFF = 'translate-x-0'

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      label,
      checked,
      defaultChecked,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const labelId = useId()
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isOn = checked ?? internalChecked

    const toggle = () => {
      if (disabled) return
      const next = !isOn
      if (checked === undefined) {
        setInternalChecked(next)
      }
      onChange?.(next)
    }

    return (
      <div className="inline-flex items-center gap-3">
        {label && (
          <span
            id={labelId}
            className="text-sm font-medium text-foreground select-none cursor-pointer"
            onClick={toggle}
          >
            {label}
          </span>
        )}
        <button
          {...props}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          onClick={toggle}
          className={[
            TRACK_BASE,
            isOn ? TRACK_ON : TRACK_OFF,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span
            aria-hidden
            className={[THUMB_BASE, isOn ? THUMB_ON : THUMB_OFF].join(' ')}
          />
        </button>
      </div>
    )
  },
)

Toggle.displayName = 'Toggle'
