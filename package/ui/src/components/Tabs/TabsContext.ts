import { createContext, useContext } from "react";

export type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab and TabList must be rendered within a Tabs component");
  }
  return context;
}
