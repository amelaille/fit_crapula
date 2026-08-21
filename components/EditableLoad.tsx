"use client";

import { useEffect, useRef, useState } from "react";
import { getLoad, getLoadWithFallback, setLoad } from "@/lib/storage";

type EditableLoadProps = {
  exerciseId: string;
  weekId: number;
  /** Si vrai, pré-remplit avec la dernière valeur connue (semaine courante ou antérieure) au lieu de la seule semaine courante. */
  fallback?: boolean;
};

/** Champs éditables (charge, reps réelles, fait) pour un exercice, persistés par semaine dans Supabase. */
export default function EditableLoad({ exerciseId, weekId, fallback }: EditableLoadProps) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchLoad = fallback ? getLoadWithFallback(exerciseId, weekId) : getLoad(exerciseId, weekId);
    fetchLoad.then((existing) => {
      if (cancelled) return;
      setWeight(existing?.weight != null ? String(existing.weight) : "");
      setReps(existing?.reps ?? "");
      // "Fait" ne doit pas être hérité d'une semaine passée récupérée en fallback.
      setDone(existing?.weekId === weekId ? existing.done : false);
    });
    return () => {
      cancelled = true;
    };
  }, [exerciseId, weekId, fallback]);

  function flashSaved() {
    setSaved(true);
    if (savedTimeout.current) clearTimeout(savedTimeout.current);
    savedTimeout.current = setTimeout(() => setSaved(false), 1100);
  }

  async function persist(overrides: { weight?: string; reps?: string; done?: boolean }) {
    const w = overrides.weight ?? weight;
    const r = overrides.reps ?? reps;
    const d = overrides.done ?? done;
    const parsedWeight = w.trim() === "" ? null : Number(w.replace(",", "."));
    await setLoad({
      exerciseId,
      weekId,
      weight: parsedWeight !== null && Number.isNaN(parsedWeight) ? null : parsedWeight,
      reps: r.trim() === "" ? null : r,
      done: d,
    });
    flashSaved();
  }

  function toggleDone() {
    const next = !done;
    setDone(next);
    persist({ done: next }).catch(console.error);
  }

  return (
    <div className="flex flex-wrap justify-center text-center items-center gap-2 sm:gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
          Charge (kg)
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={weight}
          placeholder="—"
          onChange={(e) => setWeight(e.target.value)}
          onBlur={() => persist({}).catch(console.error)}
          className="w-20 rounded-xl border border-border bg-background px-3 py-2 text-center text-base font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 sm:w-24"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
          Reps réelles
        </span>
        <input
          type="text"
          inputMode="text"
          value={reps}
          placeholder="—"
          onChange={(e) => setReps(e.target.value)}
          onBlur={() => persist({}).catch(console.error)}
          className="w-24 rounded-xl border border-border bg-background px-3 py-2 text-center text-base font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 sm:w-28"
        />
      </label>
      <button
        type="button"
        onClick={toggleDone}
        aria-pressed={done}
        className={`mt-4 flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
          done
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-background text-muted hover:text-foreground"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="M4 10.5l3.5 3.5L16 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Fait
      </button>
      <span
        className={`mt-4 text-xs text-success transition-opacity duration-300 ${
          saved ? "opacity-100" : "opacity-0"
        }`}
      >
        Enregistré ✓
      </span>
    </div>
  );
}
