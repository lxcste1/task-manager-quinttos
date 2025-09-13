"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useId,
} from "react";
import { createPortal } from "react-dom";

type Side = "left" | "right";

type Ctx = {
  open: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  side: Side;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  firstLinkRef: React.RefObject<HTMLAnchorElement | null>;
  panelId: string;
  closeOnNavigate: boolean;
};

const Ctx = createContext<Ctx | null>(null);

function useHamburgerCtx(): Ctx {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("Hamburger.* debe usarse dentro de <Hamburger.Root>");
  return ctx;
}

// ---------- Root ----------
type RootProps = {
  children: React.ReactNode;
  side?: Side;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnNavigate?: boolean;
};

function Root({
  children,
  side = "left",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnNavigate = true,
}: RootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const open = controlledOpen ?? uncontrolledOpen;

  const reactId = useId();
  const panelId = `hamburger-panel-${reactId}`;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => firstLinkRef.current?.focus(), 0);
  };

  const hide = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
    document.documentElement.style.overflow = "";
    prevFocusRef.current?.focus();
  };

  const toggle = () => (open ? hide() : show());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) hide();
    };
    const handleCancel = (e: Event) => {
      e.preventDefault();
      hide();
    };
    dialog.addEventListener("click", handleClick);
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("click", handleClick);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, []);

  const value: Ctx = {
    open,
    show,
    hide,
    toggle,
    side,
    dialogRef,
    firstLinkRef,
    panelId,
    closeOnNavigate,
  };

  return (
    <Ctx.Provider value={value}>
      <dialog
        ref={dialogRef}
        className="hamburger-dialog m-0 p-0 bg-transparent border-0"
        id={panelId}
      />
      {children}
    </Ctx.Provider>
  );
}

// ---------- Trigger ----------
type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Trigger({ className, ...props }: TriggerProps) {
  const { toggle, open, panelId } = useHamburgerCtx();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={(e) => {
        props.onClick?.(e);
        toggle();
      }}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300/60 bg-white/70 text-neutral-900 shadow-sm backdrop-blur transition active:scale-95",
        className ?? "",
      ].join(" ")}
      {...props}
    >
      <span className="sr-only">{props["aria-label"] ?? "Abrir menú"}</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

// ---------- Panel ----------
type PanelProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

function Panel({
  children,
  className = "max-w-sm",
  title = "Menú",
}: PanelProps) {
  const { open, hide, side, dialogRef } = useHamburgerCtx();

  if (!dialogRef.current) return null;

  const panel = (
    <div
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hamburger-title"
      className={[
        "pointer-events-auto fixed inset-y-0 z-[2] flex w-[85svw] bg-white shadow-2xl transition-transform duration-200 ",
        side === "left" ? "left-0" : "right-0",
        className,
        open
          ? "translate-x-0"
          : side === "left"
          ? "-translate-x-full"
          : "translate-x-full",
        "will-change-transform",
      ].join(" ")}
      onKeyDown={(e) => e.key === "Escape" && hide()}
    >
      <nav className="flex h-full w-full flex-col gap-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span id="hamburger-title" className="text-lg font-semibold">
            {title}
          </span>
          <Close className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300/60 text-neutral-600 hover:bg-neutral-100" />
        </div>
        <ul className="flex flex-1 flex-col">{children}</ul>
      </nav>
    </div>
  );

  return createPortal(panel, dialogRef.current);
}

// ---------- Item ----------
type ItemBase = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  index?: number;
};
type ItemLink = ItemBase & { href: string; onClick?: () => void };
type ItemButton = ItemBase & { href?: undefined; onClick?: () => void };
type ItemProps = ItemLink | ItemButton;

function Item(props: ItemProps) {
  const { hide, firstLinkRef, closeOnNavigate } = useHamburgerCtx();

  const cls =
    "block rounded-xl px-3 py-2 text-base text-neutral-800 ring-offset-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400";
  const { href, onClick, children, className = "", index, title } = props;
  if ("href" in props && typeof props.href === "string") {
    return (
      <li>
        <a
          ref={index === 0 ? firstLinkRef : undefined}
          href={href}
          title={title}
          onClick={() => {
            onClick?.();
            if (closeOnNavigate) hide();
          }}
          className={[cls, className].join(" ")}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        title={title}
        onClick={() => {
          onClick?.();
          hide();
        }}
        className={["w-full text-left", cls, className].join(" ")}
      >
        {children}
      </button>
    </li>
  );
}

// ---------- Close ----------
type CloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
function Close(props: CloseProps) {
  const { hide } = useHamburgerCtx();
  return (
    <button
      type="button"
      aria-label={props["aria-label"] ?? "Cerrar menú"}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        hide();
      }}
    >
      {props.children ?? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

// ---------- Ensamblado estático ----------
const Hamburger = Object.assign(Root, {
  Trigger,
  Panel,
  Item,
  Close,
});

export default Hamburger;
