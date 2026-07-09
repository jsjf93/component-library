import { useCallback, useId, useState } from "react";
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
  const [panelValues, setPanelValues] = useState<Set<string>>(new Set());

  const setValue = (next: string) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const registerPanel = useCallback((panelValue: string) => {
    setPanelValues((prev) => new Set(prev).add(panelValue));
    return () => {
      setPanelValues((prev) => {
        const next = new Set(prev);
        next.delete(panelValue);
        return next;
      });
    };
  }, []);

  return (
    <div {...props} className={className}>
      <TabsContext.Provider
        value={{
          value: currentValue,
          setValue,
          baseId,
          panelValues,
          registerPanel,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
}

Tabs.displayName = "Tabs";
