import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./theme-context";
import type { Theme, ResolvedTheme, ThemeContextValue } from "./theme-context";

const isBrowser = typeof window !== "undefined";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// One shared MediaQueryList — useSyncExternalStore calls getSnapshot on every
// render, so we avoid re-parsing the query string each time.
const darkMedia = isBrowser ? window.matchMedia(DARK_QUERY) : null;

function readStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (!isBrowser) return fallback;
  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : fallback;
}

function subscribeSystem(onChange: () => void) {
  if (!darkMedia) return () => {};
  darkMedia.addEventListener("change", onChange);
  return () => darkMedia.removeEventListener("change", onChange);
}
function getSystemSnapshot(): boolean {
  return darkMedia?.matches ?? false;
}
function getServerSnapshot(): boolean {
  return false;
}

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "borderline-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(storageKey, defaultTheme),
  );

  const systemPrefersDark = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getServerSnapshot,
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (isBrowser) window.localStorage.setItem(storageKey, next);
    },
    [storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
