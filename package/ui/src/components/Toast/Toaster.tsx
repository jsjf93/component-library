import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { subscribe, getSnapshot, getServerSnapshot } from "./toast-store";

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToasterProps = {
  position?: ToasterPosition;
  /** Max toasts visible at once; newest kept, oldest dropped. Default 3. */
  max?: number;
};

const POSITIONS: Record<ToasterPosition, string> = {
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start flex-col-reverse",
  "bottom-center":
    "bottom-0 left-1/2 -translate-x-1/2 items-center flex-col-reverse",
  "bottom-right": "bottom-0 right-0 items-end flex-col-reverse",
};

export function Toaster({ position = "bottom-right", max = 3 }: ToasterProps) {
  const toasts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (typeof document === "undefined") return null;

  const visible = toasts.slice(-max);

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="false"
      className={[
        "pointer-events-none fixed z-50 flex flex-col gap-3 p-4",
        POSITIONS[position],
      ].join(" ")}
    >
      {visible.map((item) => (
        <Toast key={item.id} toast={item} />
      ))}
    </div>,
    document.body,
  );
}

Toaster.displayName = "Toaster";
