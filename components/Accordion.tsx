"use client";

import { useState } from "react";

type AccordionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function Accordion({
  id,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className="scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
        aria-expanded={open}
      >
        <span>
          <span className="block font-semibold text-foreground">{title}</span>
          {subtitle && (
            <span className="mt-0.5 block text-sm text-muted">{subtitle}</span>
          )}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-5 pt-4 sm:px-6">
          {children}
        </div>
      )}
    </div>
  );
}
