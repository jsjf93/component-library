import { createContext, useContext, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab and TabList must be rendered within a Tabs component')
  }
  return context
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
}

export function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const currentValue = value ?? internalValue

  const setValue = (next: string) => {
    if (value === undefined) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }

  return (
    <div {...props} className={className}>
      <TabsContext.Provider value={{ value: currentValue, setValue }}>
        {children}
      </TabsContext.Provider>
    </div>
  )
}

Tabs.displayName = 'Tabs'
