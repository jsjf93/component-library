import { useEffect, useRef, type ReactNode } from 'react'

type PageHeadingProps = {
  title: string
  subtitle?: ReactNode
  /** Optional actions rendered on the right (buttons, etc.). */
  actions?: ReactNode
}

/**
 * Page title that receives focus on mount, so keyboard/screen-reader users land
 * on the new page's heading after navigating between lazily-loaded routes.
 */
export function PageHeading({ title, subtitle, actions }: PageHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1
          ref={ref}
          tabIndex={-1}
          className="text-2xl font-bold tracking-tight text-foreground outline-none"
        >
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}
