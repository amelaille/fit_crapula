import type { Meal } from "@/lib/types";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold text-foreground">{meal.name}</h3>
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <span className="rounded-full bg-nude px-2.5 py-0.5 text-nude-foreground">
            {meal.kcal > 0 ? `${meal.kcal} kcal` : "voir plus haut"}
          </span>
          {meal.macros !== "—" && (
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-accent">
              {meal.macros}
            </span>
          )}
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/85">
        {meal.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-accent">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {meal.note && (
        <p className="mt-3 text-sm italic leading-relaxed text-muted">{meal.note}</p>
      )}
    </div>
  );
}
