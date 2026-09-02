import type { ReactNode } from "react";

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "sky" | "pine" | "amber" | "small";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition disabled:opacity-50";
  const styles: Record<string, string> = {
    primary: "bg-ink text-white hover:bg-ink/90",
    ghost: "border border-line bg-white text-ink hover:bg-mist",
    sky: "bg-sky text-white shadow-sky/25 hover:bg-sky/90",
    pine: "bg-pine text-white hover:bg-pine/90",
    amber: "bg-amber text-white hover:bg-amber/90",
    small: "rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="fade-up relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg px-2 py-1 text-sm text-ink-muted transition hover:bg-mist hover:text-ink"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function Bar({ value, tone }: { value: number; tone: "sky" | "amber" | "pine" }) {
  const colors = { sky: "bg-sky", amber: "bg-amber", pine: "bg-pine" };
  return (
    <div className="mt-2 h-2.5 w-full rounded-full bg-mist">
      <div className={`bar-fill h-full rounded-full ${colors[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">{children}</p>
  );
}
