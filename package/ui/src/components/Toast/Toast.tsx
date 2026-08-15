import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import {
  CheckCircle,
  AlertCircle,
  InfoCircle,
  XCircle,
  X,
} from "@borderline-ui/icons";
import { Button } from "../Button/Button";
import { dismiss } from "./toast-store";
import type { ToastRecord, ToastVariant } from "./toast-store";

const EXIT_DURATION = 150;

const ICONS: Record<ToastVariant, ReactElement> = {
  success: <CheckCircle className="size-5 shrink-0 text-success-foreground" />,
  error: <XCircle className="size-5 shrink-0 text-danger-foreground" />,
  info: <InfoCircle className="size-5 shrink-0 text-info-foreground" />,
  warning: <AlertCircle className="size-5 shrink-0 text-warning-foreground" />,
};

export type ToastProps = {
  toast: ToastRecord;
};

export function Toast({ toast }: ToastProps) {
  const { id, variant, title, description, duration } = toast;
  const [leaving, setLeaving] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(0);

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startExit = () => {
    clearTimer();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      dismiss(id);
      return;
    }
    setLeaving(true);
    timeoutRef.current = window.setTimeout(() => dismiss(id), EXIT_DURATION);
  };

  const startTimer = (ms: number) => {
    if (ms === Infinity) return;
    startedAtRef.current = Date.now();
    timeoutRef.current = window.setTimeout(startExit, ms);
  };

  useEffect(() => {
    startTimer(remainingRef.current);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePause = () => {
    if (duration === Infinity || leaving) return;
    clearTimer();
    remainingRef.current = Math.max(
      remainingRef.current - (Date.now() - startedAtRef.current),
      0,
    );
  };

  const handleResume = () => {
    if (duration === Infinity || leaving) return;
    startTimer(remainingRef.current);
  };

  return (
    <div
      className={[
        "ui-toast pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg",
        leaving ? "animate-toast-out" : "animate-toast-in",
      ].join(" ")}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocusCapture={handlePause}
      onBlurCapture={handleResume}
      onAnimationEnd={() => {
        if (leaving) dismiss(id);
      }}
    >
      {ICONS[variant]}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-semibold leading-5 text-foreground">
          {title}
        </p>
        {description && (
          <p className="text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto h-8 w-8 shrink-0"
        onClick={startExit}
        aria-label="Dismiss notification"
      >
        <X />
      </Button>
    </div>
  );
}

Toast.displayName = "Toast";
