import type { HTMLAttributes, ReactNode } from "react";
import { useTabsContext } from "./TabsContext";

export type TabPanelProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
  value: string;
  children?: ReactNode;
};

export function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      {...props}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}

TabPanel.displayName = "TabPanel";
