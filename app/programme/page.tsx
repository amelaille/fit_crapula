import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {
  weeklyStructureTable,
  rirDefinition,
  rirScale,
  tempoNotation,
  doubleProgression,
  tooHardSignals,
  tooHardResponse,
  tooEasySignals,
  walking,
  cardio,
} from "@/data/program";
import InfoCallout from "@/components/InfoCallout";
import TodaySession from "@/components/TodaySession";

export default async function ProgrammePage() {
  const currentUser = await getCurrentUser();
  if (currentUser !== "amelie") redirect("/suivi");

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Séance du jour</h2>
        <TodaySession />
      </section>

      {/* Structure hebdomadaire */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Structure hebdomadaire</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full sm:min-w-[480px] border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-nude text-nude-foreground">
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Jour</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Séance</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Intensité</th>
              </tr>
            </thead>
            <tbody>
              {weeklyStructureTable.map((row) => (
                <tr key={row.day} className="border-t border-border">
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 font-medium text-foreground">{row.day}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-foreground/85">{row.session}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-muted">{row.intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Le système RIR */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground">Le système RIR pour doser l&apos;intensité</h2>
        <p className="text-sm text-foreground/85">{rirDefinition}</p>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full sm:min-w-[520px] border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-nude text-nude-foreground">
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">RIR</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Sensation</th>
              </tr>
            </thead>
            <tbody>
              {rirScale.map((r) => (
                <tr
                  key={r.level}
                  className={`border-t border-border ${r.highlight ? "bg-accent-soft/50" : ""}`}
                >
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 font-semibold text-foreground">{r.level}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-foreground/85">{r.feeling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-semibold text-foreground">Le tempo</p>
          <p className="mb-2 text-sm text-muted">{tempoNotation}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Progression : la double progression
          </p>
          <ol className="flex flex-col gap-1.5 text-sm text-foreground/85">
            {doubleProgression.steps.map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="font-semibold text-accent">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/60 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Signaux que tu vas trop fort</p>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground/85">
              {tooHardSignals.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-medium text-accent">{tooHardResponse}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">
              Signaux que tu ne vas pas assez fort
            </p>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground/85">
              {tooEasySignals.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* La marche */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">La marche</h2>
        <p className="text-sm font-semibold text-foreground">{walking.target}</p>
        <div className="overflow-x-auto">
          Mettre ici un compteur de marche intentionelle et objectif vrai 8000 pas par jour.
        </div>
      </section>

      {/* Cardio */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Le cardio</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full sm:min-w-[400px] border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-nude text-nude-foreground">
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Mois</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Cardio</th>
              </tr>
            </thead>
            <tbody>
              {cardio.months.map((m) => (
                <tr key={m.month} className="border-t border-border">
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 font-medium text-foreground">Mois {m.month}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-foreground/85">{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfoCallout tone="warning">{cardio.warning}</InfoCallout>
      </section>
    </div>
  );
}
