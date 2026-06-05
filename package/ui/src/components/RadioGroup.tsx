import { forwardRef, useId, useState } from 'react'
import type { HTMLAttributes } from 'react'

export type RadioOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  name: string
  label?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const CARD_BASE =
  'relative flex items-start gap-3 rounded-xl border p-4 cursor-pointer ' +
  'transition-colors duration-150 ' +
  'has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed'

const CARD_DEFAULT  = 'border-border bg-card hover:border-primary/40 hover:bg-accent/30'
const CARD_SELECTED = 'border-primary bg-primary/5'

const CIRCLE_BASE =
  'mt-0.5 size-4 shrink-0 rounded-full border-2 flex items-center justify-center ' +
  'transition-colors duration-150'

const CIRCLE_DEFAULT  = 'border-border bg-background'
const CIRCLE_SELECTED = 'border-primary bg-primary'

const DOT = 'size-1.5 rounded-full bg-primary-foreground'

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      label,
      name,
      options,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const groupId = useId()
    const labelId = `${groupId}-label`
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = value ?? internalValue

    const handleChange = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue)
      }
      onChange?.(optionValue)
    }

    return (
      <div
        {...props}
        ref={ref}
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        className={className}
      >
        {label && (
          <p id={labelId} className="mb-3 text-sm font-medium text-foreground">
            {label}
          </p>
        )}
        <div className="flex flex-col gap-2">
          {options.map(option => {
            const isSelected = currentValue === option.value
            const isDisabled = disabled || option.disabled
            const inputId = `${groupId}-${option.value}`

            return (
              <label
                key={option.value}
                htmlFor={inputId}
                className={[
                  CARD_BASE,
                  isSelected ? CARD_SELECTED : CARD_DEFAULT,
                ].join(' ')}
              >
                <input
                  type="radio"
                  id={inputId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.value)}
                  className="sr-only"
                />
                <div
                  className={[
                    CIRCLE_BASE,
                    isSelected ? CIRCLE_SELECTED : CIRCLE_DEFAULT,
                  ].join(' ')}
                  aria-hidden
                >
                  {isSelected && <div className={DOT} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  {option.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                  )}
                </div>
              </label>
            )
          })}
        </div>
      </div>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
