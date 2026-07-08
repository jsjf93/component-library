import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Sun, Moon } from "@borderline/icons";
import { useTheme } from "../../theme/theme-context";

export type ThemeToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "children"
>;

const BASE =
  "inline-flex size-9 items-center justify-center rounded-lg border border-transparent " +
  "text-muted-foreground cursor-pointer transition-colors " +
  "hover:bg-accent hover:text-accent-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25";

/**
 * A Sun/Moon button that flips between light and dark. Reads and drives the
 * active theme via `useTheme`, so it must be rendered inside a `<ThemeProvider>`.
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { resolvedTheme, toggleTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className={[BASE, className].filter(Boolean).join(" ")}
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </button>
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";
