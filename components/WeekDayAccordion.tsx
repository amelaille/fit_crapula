"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type WeekDayAccordionProps = {
  id: string;
  day: string;
  title: string;
  done: boolean;
  children: React.ReactNode;
};

/** Accordéon fermé par défaut pour un jour de la semaine, avec pastille "Fait" visible uniquement fermé. */
export default function WeekDayAccordion({ id, day, title, done, children }: WeekDayAccordionProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === `#${id}`) setOpen(true);
  }, [id]);

  return (
    <div id={id} className="scroll-mt-20 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{day}</p>
          <p className="mt-0.5 font-semibold text-foreground">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          {done && !open && (
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
              <Check className="h-3.5 w-3.5" /> Fait
            </span>
          )}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {open && <div className="border-t border-border px-4 pb-5 pt-4 sm:px-6">{children}</div>}
    </div>
  );
}
