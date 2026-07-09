import { useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { useTabsContext } from "./TabsContext";

export type TabPanelProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
  value: string;
  children?: ReactNode;
};

export function TabPanel({
  value,
  className,
  children,
  ...props
}: TabPanelProps) {
  const { value: activeValue, baseId, registerPanel } = useTabsContext();
  const isActive = activeValue === value;

  useEffect(() => registerPanel(value), [registerPanel, value]);

  return (
    <div
      {...props}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}

TabPanel.displayName = "TabPanel";
