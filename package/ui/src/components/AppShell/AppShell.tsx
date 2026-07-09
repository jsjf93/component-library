import { cloneElement, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Menu } from "@borderline/icons";
import type { SidebarProps } from "../Sidebar/Sidebar";

export type AppShellProps = {
  /** A `<Sidebar>` element. It is cloned with `open`/`onClose` to drive the mobile drawer. */
  sidebar: ReactElement<SidebarProps>;
  children: ReactNode;
  className?: string;
};

export function AppShell({ sidebar, children, className }: AppShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={["flex h-screen overflow-hidden bg-background", className]
        .filter(Boolean)
        .join(" ")}
    >
      {cloneElement(sidebar, { open, onClose: () => setOpen(false) })}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* `!` guards against a consumer's own Tailwind build regenerating an
        unscoped `flex` that lands after this file's `md:hidden` in the
        shared utilities layer: https://github.com/tailwindlabs/tailwindcss/discussions/12714 */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden!">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/25"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

AppShell.displayName = "AppShell";
