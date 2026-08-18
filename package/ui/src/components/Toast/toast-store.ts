export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastOptions = {
  description?: string;
  /** ms; default 5000. Pass `Infinity` to disable auto-dismiss. */
  duration?: number;
  /** Supply to replace/update an existing toast in place. */
  id?: string;
};

export type ToastRecord = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration: number;
};

const DEFAULT_DURATION = 5000;

const EMPTY_TOASTS: ToastRecord[] = [];

let toasts: ToastRecord[] = EMPTY_TOASTS;
let count = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => {
    listener();
  });
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot() {
  return toasts;
}

export function getServerSnapshot() {
  return EMPTY_TOASTS;
}

function upsert(variant: ToastVariant, title: string, opts: ToastOptions = {}) {
  const id = opts.id ?? `toast-${++count}`;
  const record: ToastRecord = {
    id,
    variant,
    title,
    description: opts.description,
    duration: opts.duration ?? DEFAULT_DURATION,
  };

  const index = toasts.findIndex((t) => t.id === id);
  if (index === -1) {
    toasts = [...toasts, record];
  } else {
    const next = toasts.slice();
    next[index] = record;
    toasts = next;
  }
  emit();
  return id;
}

export function dismiss(id?: string) {
  toasts = id === undefined ? EMPTY_TOASTS : toasts.filter((t) => t.id !== id);
  emit();
}

export const toast = {
  success: (title: string, opts?: ToastOptions) =>
    upsert("success", title, opts),
  error: (title: string, opts?: ToastOptions) => upsert("error", title, opts),
  info: (title: string, opts?: ToastOptions) => upsert("info", title, opts),
  warning: (title: string, opts?: ToastOptions) =>
    upsert("warning", title, opts),
  dismiss,
};
