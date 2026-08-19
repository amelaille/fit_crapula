import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {
  profile,
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

const toc = [
  { id: "corps-de-reve", label: "Comprendre ton corps de rêve" },
  { id: "structure", label: "Structure hebdomadaire" },
  { id: "rir", label: "Le système RIR & l'intensité" },
  { id: "marche", label: "La marche" },
  { id: "cardio", label: "Le cardio du mercredi" },
  { id: "phases", label: "Progression sur 3 mois" },
  { id: "apres", label: "Après les 3 mois — anti-yoyo" },
];

export default async function ProgrammePage() {
  const currentUser = await getCurrentUser();
  if (currentUser !== "amelie") redirect("/suivi");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-sm font-medium text-accent">Programme</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
          {profile.goal}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {profile.title} · Cible : {profile.target}
        </p>
      </header>

      {/* Sommaire */}
      <nav className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Sommaire
        </p>
        <ul className="flex flex-wrap gap-2">
          {toc.map((t) => (
            <li key={t.id}>
              <Link
                href={`#${t.id}`}
                className="inline-block rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 1. Comprendre ton corps de rêve */}
      <Accordion id="corps-de-reve" title="1. Comprendre ton corps de rêve (avant de commencer)" defaultOpen>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-foreground/85">
            Le physique que tu vises repose sur 3 piliers, dans cet ordre d&apos;importance :
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">Pilier</th>
                  <th className="px-4 py-2.5 text-left font-medium">Ce que ça apporte</th>
                  <th className="px-4 py-2.5 text-left font-medium">Priorité</th>
                </tr>
              </thead>
              <tbody>
                {pillars.map((p) => (
                  <tr key={p.label} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium text-foreground">{p.label}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{p.benefit}</td>
                    <td className="px-4 py-2.5 text-accent">{"★".repeat(p.priority)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InfoCallout tone="warning" title="Erreur classique à éviter">
            {classicMistake.replace("Erreur classique à éviter : ", "")}
          </InfoCallout>
          <InfoCallout title="Note honnête sur la génétique">
            {geneticsNote.replace("Note honnête sur la génétique : ", "")}
          </InfoCallout>
        </div>
      </Accordion>

      {/* 2. Structure hebdomadaire */}
      <Accordion id="structure" title="2. Structure hebdomadaire" defaultOpen>
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">Jour</th>
                  <th className="px-4 py-2.5 text-left font-medium">Séance</th>
                  <th className="px-4 py-2.5 text-left font-medium">Durée</th>
                </tr>
              </thead>
              <tbody>
                {weeklyStructureTable.map((row) => (
                  <tr key={row.day} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.day}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{row.session}</td>
                    <td className="px-4 py-2.5 text-muted">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm font-medium text-foreground/80">
            Récapitulatif à imprimer (calories/marche/intensité selon ta semaine active dans le
            Dashboard — valeurs ci-dessous pour le mois 1)
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-3 py-2 text-left font-medium">—</th>
                  {weeklyRecap.map((r) => (
                    <th key={r.day} className="px-3 py-2 text-left font-medium">
                      {r.day.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">Séance</td>
                  {weeklyRecap.map((r) => (
                    <td key={r.day} className="px-3 py-2 text-foreground/85">{r.session}</td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">Intensité</td>
                  {weeklyRecap.map((r) => (
                    <td key={r.day} className="px-3 py-2 text-foreground/85">{r.intensity}</td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">Pesée</td>
                  {weeklyRecap.map((r) => (
                    <td key={r.day} className="px-3 py-2 text-accent">{r.weighIn ? "✓" : ""}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Accordion>

      {/* 3. Le système RIR */}
      <Accordion id="rir" title="3. Comment doser l'intensité — le système RIR" defaultOpen>
        <div className="flex flex-col gap-5">
          <p className="text-sm text-foreground/85">{rirDefinition}</p>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">RIR</th>
                  <th className="px-4 py-2.5 text-left font-medium">Sensation</th>
                  <th className="px-4 py-2.5 text-left font-medium">Traduction</th>
                </tr>
              </thead>
              <tbody>
                {rirScale.map((r) => (
                  <tr
                    key={r.level}
                    className={`border-t border-border ${r.highlight ? "bg-accent-soft/50" : ""}`}
                  >
                    <td className="px-4 py-2.5 font-semibold text-foreground">{r.level}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{r.feeling}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{r.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-foreground/85">{rirHowToJudge}</p>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              Intensité prescrite jour par jour
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-nude/60 text-nude-foreground">
                    <th className="px-4 py-2.5 text-left font-medium">Jour</th>
                    <th className="px-4 py-2.5 text-left font-medium">Séance</th>
                    <th className="px-4 py-2.5 text-left font-medium">RIR cible</th>
                    <th className="px-4 py-2.5 text-left font-medium">Charges</th>
                    <th className="px-4 py-2.5 text-left font-medium">Repos</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyIntensityTable.map((row) => (
                    <tr key={row.day} className="border-t border-border">
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.day}</td>
                      <td className="px-4 py-2.5 text-foreground/85">{row.session}</td>
                      <td className="px-4 py-2.5 text-accent">{row.rirTarget}</td>
                      <td className="px-4 py-2.5 text-foreground/85">{row.loads}</td>
                      <td className="px-4 py-2.5 text-muted">{row.rest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InfoCallout tone="accent" title="Pourquoi le mardi est volontairement sous-maximal">
            <p>{tuesdayWhy.text}</p>
            <p className="mt-2 font-medium">{tuesdayWhy.rule}</p>
          </InfoCallout>

          <div>
            <p className="mb-1.5 text-sm font-semibold text-foreground">Le tempo</p>
            <p className="mb-2 text-sm text-muted">{tempoNotation}</p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="bg-nude/60 text-nude-foreground">
                    <th className="px-4 py-2.5 text-left font-medium">Exercice</th>
                    <th className="px-4 py-2.5 text-left font-medium">Tempo</th>
                    <th className="px-4 py-2.5 text-left font-medium">Pourquoi</th>
                  </tr>
                </thead>
                <tbody>
                  {tempoTable.map((row) => (
                    <tr key={row.exercise} className="border-t border-border">
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.exercise}</td>
                      <td className="px-4 py-2.5 font-mono text-accent">{row.tempo}</td>
                      <td className="px-4 py-2.5 text-foreground/85">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm text-muted">{tempoExplanation}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">
              Comment choisir tes charges la première semaine
            </p>
            <ol className="flex flex-col gap-1.5 text-sm text-foreground/85">
              {chooseLoadsSteps.map((step, i) => (
                <li key={step} className="flex gap-2">
                  <span className="font-semibold text-accent">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-2 text-sm italic text-muted">{chooseLoadsNote}</p>
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
            <InfoCallout tone="accent" title="Résultats attendus">
              {doubleProgression.expectedResults}
            </InfoCallout>
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

          <InfoCallout title="Progression — la règle absolue">{progressionRule}</InfoCallout>
        </div>
      </Accordion>

      {/* 4. La marche */}
      <Accordion id="marche" title="4. La marche — version sans montre connectée" defaultOpen>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">{walking.target}</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">Moment</th>
                  <th className="px-4 py-2.5 text-left font-medium">Durée</th>
                  <th className="px-4 py-2.5 text-left font-medium">Comment</th>
                </tr>
              </thead>
              <tbody>
                {walking.breakdown.map((row) => (
                  <tr key={row.moment} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.moment}</td>
                    <td className="px-4 py-2.5 text-accent">{row.duration}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InfoCallout tone="accent" title="La règle des 50 minutes">
            {walking.rule50}
          </InfoCallout>
          <div className="rounded-2xl border border-border bg-background/60 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Repères pour te situer sans compteur</p>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground/85">
              {walking.landmarks.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted">{walking.phoneNote}</p>
          <InfoCallout>{walking.fridayNote}</InfoCallout>
        </div>
      </Accordion>

      {/* 5. Cardio */}
      <Accordion id="cardio" title="5. Le cardio (mercredi)" defaultOpen>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">{cardio.intensity}</p>
          <InfoCallout tone="accent" title="Test de la parole">
            {cardio.speechTest}
          </InfoCallout>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[400px] border-collapse text-sm">
              <thead>
                <tr className="bg-nude/60 text-nude-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">Mois</th>
                  <th className="px-4 py-2.5 text-left font-medium">Cardio</th>
                </tr>
              </thead>
              <tbody>
                {cardio.months.map((m) => (
                  <tr key={m.month} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium text-foreground">Mois {m.month}</td>
                    <td className="px-4 py-2.5 text-foreground/85">{m.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InfoCallout tone="warning">{cardio.warning}</InfoCallout>
        </div>
      </Accordion>

      {/* 6. Progression 3 mois */}
      <Accordion id="phases" title="6. Progression sur 3 mois" defaultOpen>
        <div className="flex flex-col gap-4">
          {phases.map((phase) => (
            <div key={phase.id} className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-foreground">
                  Mois {phase.id} — {phase.name} (semaines {phase.weekRange[0]} à {phase.weekRange[1]})
                </h3>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  Objectif : {phase.objective}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Poids attendu en fin de mois : {phase.expectedWeight} · {phase.caloriesTraining}/
                {phase.caloriesRest} kcal
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/85">
                {phase.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-accent">•</span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-accent-soft/60 px-3.5 py-2.5 text-sm italic text-foreground/80">
                {phase.whatHappens}
              </p>
            </div>
          ))}
        </div>
      </Accordion>

      {/* 7. Après les 3 mois */}
      <Accordion id="apres" title="7. Après les 3 mois — la partie anti-yoyo" defaultOpen>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-foreground/85">{afterProgram.intro}</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <tbody>
                {afterProgram.reverseDietSteps.map((step) => (
                  <tr key={step.weeks} className="border-t border-border first:border-t-0">
                    <td className="px-4 py-2.5 font-medium text-foreground">{step.weeks}</td>
                    <td className="px-4 py-2.5 text-accent">{step.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-foreground/85">{afterProgram.maintenanceTarget}</p>
          <div className="rounded-2xl border border-border bg-background/60 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Ensuite, deux options</p>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground/85">
              {afterProgram.options.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <InfoCallout tone="accent">{afterProgram.vision}</InfoCallout>
        </div>
      </Accordion>

      <p className="rounded-2xl border border-dashed border-border px-4 py-3.5 text-xs leading-relaxed text-muted">
        {disclaimer}
      </p>
    </div>
  );
}
