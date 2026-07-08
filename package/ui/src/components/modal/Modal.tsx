import { useId, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "../Button/Button";
import { X } from "@borderline/icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";

const ModalTitleIdContext = createContext<string | undefined>(undefined);

export type ModalSize = "sm" | "md" | "lg";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  children?: ReactNode;
};

export type ModalHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  onClose?: () => void;
};

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

const SIZES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

export function Modal({ open, onClose, size = "md", children }: ModalProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(open, onClose);
  const titleId = useId();

  if (!open) return null;

  return createPortal(
    <div
      className="ui-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop-in"
      onClick={onClose}
    >
      {/* Wondering about using a dialog element instead, maybe do at a later date */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={[
          "ui-modal-panel relative w-full bg-card border border-border rounded-2xl shadow-xl flex flex-col max-h-[90vh] outline-none animate-modal-panel-in",
          SIZES[size],
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalTitleIdContext.Provider value={titleId}>
          {children}
        </ModalTitleIdContext.Provider>
      </div>
    </div>,
    document.body,
  );
}

Modal.displayName = "Modal";

export function ModalHeader({
  title,
  onClose,
  className,
  ...props
}: ModalHeaderProps) {
  const titleId = useContext(ModalTitleIdContext);
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <h2
        id={titleId}
        className="text-lg font-semibold text-foreground leading-tight"
      >
        {title}
      </h2>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </Button>
      )}
    </div>
  );
}

ModalHeader.displayName = "ModalHeader";

export function ModalBody({ className, children, ...props }: ModalBodyProps) {
  return (
    <div
      className={["flex-1 overflow-y-auto px-6 py-5", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

ModalBody.displayName = "ModalBody";

export function ModalFooter({
  className,
  children,
  ...props
}: ModalFooterProps) {
  return (
    <div
      className={[
        "flex items-center justify-end gap-2 px-6 py-4 border-t border-border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

ModalFooter.displayName = "ModalFooter";
