import { useId, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { TabsContext } from "./TabsContext";

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

export function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value ?? internalValue;
  const baseId = useId();

  const setValue = (next: string) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <div {...props} className={className}>
      <TabsContext.Provider value={{ value: currentValue, setValue, baseId }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

Tabs.displayName = "Tabs";
