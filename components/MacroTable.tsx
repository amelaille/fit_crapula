import type { MonthMacros } from "@/lib/types";

export default function MacroTable({ macros }: { macros: MonthMacros }) {
  const hasDetail = macros.fatTraining !== undefined;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="bg-nude text-nude-foreground">
            <th className="px-4 py-2.5 text-left font-medium">—</th>
            <th className="px-4 py-2.5 text-left font-medium">Jours d&apos;entraînement</th>
            <th className="px-4 py-2.5 text-left font-medium">Jours de repos</th>
          </tr>
        </thead>
        <tbody>
          <Row label="Calories" a={`${macros.caloriesTraining} kcal`} b={`${macros.caloriesRest} kcal`} strong />
          <Row
            label="Protéines"
            a={`${macros.proteinTraining} g`}
            b={`${macros.proteinRest} g`}
          />
          {hasDetail && (
            <>
              <Row label="Lipides" a={`${macros.fatTraining} g`} b={`${macros.fatRest} g`} />
              <Row label="Glucides" a={`${macros.carbsTraining} g`} b={`${macros.carbsRest} g`} />
            </>
          )}
        </tbody>
      </table>
      {macros.note && (
        <p className="border-t border-border bg-background/60 px-4 py-3 text-xs leading-relaxed text-muted">
          {macros.note}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  a,
  b,
  strong,
}: {
  label: string;
  a: string;
  b: string;
  strong?: boolean;
}) {
  return (
    <tr className="border-t border-border">
      <td className={`px-4 py-2.5 ${strong ? "font-semibold text-foreground" : "text-muted"}`}>
        {label}
      </td>
      <td className={`px-4 py-2.5 ${strong ? "font-semibold text-accent" : "text-foreground/85"}`}>
        {a}
      </td>
      <td className={`px-4 py-2.5 ${strong ? "font-semibold text-accent" : "text-foreground/85"}`}>
        {b}
      </td>
    </tr>
  );
}
