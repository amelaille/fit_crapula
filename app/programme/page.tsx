import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {
  pillars,
  classicMistake,
  geneticsNote,
  weeklyStructureTable,
  weeklyRecap,
  rirDefinition,
  rirScale,
  rirHowToJudge,
  dailyIntensityTable,
  tuesdayWhy,
  tempoNotation,
  tempoTable,
  tempoExplanation,
  chooseLoadsSteps,
  chooseLoadsNote,
  doubleProgression,
  tooHardSignals,
  tooHardResponse,
  tooEasySignals,
  walking,
  cardio,
  progressionRule,
  phases,
  afterProgram,
  disclaimer,
} from "@/data/program";
import Accordion from "@/components/Accordion";
import InfoCallout from "@/components/InfoCallout";

export default async function ProgrammePage() {
  const currentUser = await getCurrentUser();
  if (currentUser !== "amelie") redirect("/suivi");

  return (
    <div className="flex flex-col gap-8">

      <Accordion title="Séance du jour" defaultOpen>
        <div className="flex flex-col gap-4">
          Mettre ici la seance du jour
        </div>
      </Accordion>

      {/* 2. Structure hebdomadaire */}
      <Accordion title="Structure hebdomadaire" defaultOpen>
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto rounded-2xl border border-border">
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
        </div>
      </Accordion>

      {/* 3. Le système RIR */}
      <Accordion title="Le système RIR pour doser l'intensité" defaultOpen>
        <div className="flex flex-col gap-5">
          <p className="text-sm text-foreground/85">{rirDefinition}</p>

          <div className="overflow-x-auto rounded-2xl border border-border">
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
        </div>
      </Accordion>

      {/* 4. La marche */}
      <Accordion title="La marche" defaultOpen>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">{walking.target}</p>
          <div className="overflow-x-auto">
            Mettre ici un compteur de marche intentionelle et objectif vrai 8000 pas par jour.
          </div>
        </div>
      </Accordion>

      {/* Cardio */}
      <Accordion title="Le cardio" defaultOpen>
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto rounded-2xl border border-border">
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
        </div>
      </Accordion>

    </div>
  );
}
