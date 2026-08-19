import {
  trackingMeasurements,
  scaleReadingNote,
  periodsNote,
  stagnationChecklist,
  stagnationNote,
} from "@/data/program";
import InfoCallout from "@/components/InfoCallout";
import SuiviClient from "@/components/SuiviClient";
import { getCurrentUser } from "@/lib/session";

export default async function SuiviPage() {
  const currentUser = (await getCurrentUser())!;

  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="text-sm font-medium text-accent">Suivi</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
          Ta progression, semaine après semaine
        </h1>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Ce que tu mesures</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full sm:min-w-[520px] border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-nude text-nude-foreground">
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Quoi</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Quand</th>
                <th className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-left font-medium">Comment</th>
              </tr>
            </thead>
            <tbody>
              {trackingMeasurements.map((m) => (
                <tr key={m.what} className="border-t border-border">
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 font-medium text-foreground">{m.what}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-foreground/85">{m.when}</td>
                  <td className="px-2.5 py-2 sm:px-4 sm:py-2.5 text-foreground/85">{m.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoCallout title="Comment lire la balance">{scaleReadingNote}</InfoCallout>
          <InfoCallout title="Autour des règles" tone="accent">
            {periodsNote}
          </InfoCallout>
        </div>
      </section>

      <SuiviClient currentUser={currentUser} />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">{stagnationNote}</h2>
        <ol className="flex flex-col gap-2.5">
          {stagnationChecklist.map((step, i) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-3.5 text-sm text-foreground/85"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
