import { forwardRef, useId, useState } from 'react'
import type { TextareaHTMLAttributes } from 'react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  helperText?: string
  error?: string
  maxLength?: number
}

const BASE =
  'w-full rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground ' +
  'px-3 py-2 min-h-24 resize-y ' +
  'transition-[border-color] duration-150 ease ' +
  'focus-visible:outline-none focus-visible:border-primary ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

const BORDER_DEFAULT = 'border-border'
const BORDER_ERROR   = 'border-destructive focus-visible:border-destructive'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      maxLength,
      defaultValue,
      onChange,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const [charCount, setCharCount] = useState(
      typeof defaultValue === 'string' ? defaultValue.length : 0,
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

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
            htmlFor={textareaId}
            className={[
              'block text-sm font-medium mb-1',
              error ? 'text-destructive' : 'text-foreground',
            ].join(' ')}
          >
            {label}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={classes}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          {error ? (
            <p className="text-xs text-destructive animate-fade-in-up" role="alert">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          ) : (
            <span />
          )}
          {maxLength !== undefined && (
            <p className="text-xs text-muted-foreground shrink-0">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
