"use client";

import { useEffect, useRef, useState } from "react";
import {
  getWeights,
  addWeight,
  getComments,
  setComment,
  getMeasurements,
  setMeasurement,
  exportAllData,
  importAllData,
  getActiveWeek,
} from "@/lib/storage";
import type { WeightEntry, WeekComment, Measurement } from "@/lib/types";
import WeightChart from "./WeightChart";
import MeasurementsChart from "./MeasurementsChart";
import WeekSelector from "./WeekSelector";

export default function SuiviClient() {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [comments, setComments] = useState<WeekComment[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const [weightInput, setWeightInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [waistInput, setWaistInput] = useState("");
  const [hipsInput, setHipsInput] = useState("");
  const [thighInput, setThighInput] = useState("");

  const [flash, setFlash] = useState<string | null>(null);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function refreshAll() {
    setWeights(getWeights());
    setComments(getComments());
    setMeasurements(getMeasurements());
  }

  useEffect(() => {
    refreshAll();
    setSelectedWeek(getActiveWeek());
  }, []);

  useEffect(() => {
    const existingComment = comments.find((c) => c.weekId === selectedWeek);
    setCommentInput(existingComment?.text ?? "");
    const existingMeasurement = measurements.find((m) => m.weekId === selectedWeek);
    setWaistInput(existingMeasurement?.waist != null ? String(existingMeasurement.waist) : "");
    setHipsInput(existingMeasurement?.hips != null ? String(existingMeasurement.hips) : "");
    setThighInput(existingMeasurement?.thigh != null ? String(existingMeasurement.thigh) : "");
    const existingWeight = weights.find((w) => w.weekId === selectedWeek);
    setWeightInput(existingWeight != null ? String(existingWeight.weight) : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek]);

  function showFlash(text: string) {
    setFlash(text);
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => setFlash(null), 2200);
  }

  function handleAddWeight(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(weightInput.replace(",", "."));
    if (Number.isNaN(value) || value <= 0) return;
    addWeight({ weekId: selectedWeek, weight: value, date: new Date().toISOString() });
    refreshAll();
    showFlash(`Poids enregistré pour la semaine ${selectedWeek}.`);
  }

  function handleSaveComment() {
    setComment(selectedWeek, commentInput);
    refreshAll();
    showFlash(`Commentaire enregistré pour la semaine ${selectedWeek}.`);
  }

  function handleSaveMeasurement(e: React.FormEvent) {
    e.preventDefault();
    setMeasurement({
      weekId: selectedWeek,
      waist: waistInput.trim() === "" ? undefined : Number(waistInput.replace(",", ".")),
      hips: hipsInput.trim() === "" ? undefined : Number(hipsInput.replace(",", ".")),
      thigh: thighInput.trim() === "" ? undefined : Number(thighInput.replace(",", ".")),
    });
    refreshAll();
    showFlash(`Mensurations enregistrées pour la semaine ${selectedWeek}.`);
  }

  function handleExport() {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fitapp-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        importAllData(data);
        refreshAll();
        showFlash("Données importées avec succès.");
      } catch {
        showFlash("Le fichier importé est invalide.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  const sortedComments = [...comments].sort((a, b) => b.weekId - a.weekId);
  const lastWeight = [...weights].sort((a, b) => b.weekId - a.weekId)[0];
  const variation = lastWeight ? Math.round((lastWeight.weight - 72) * 10) / 10 : null;

  return (
    <div className="flex flex-col gap-10">
      {/* Poids */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground">Courbe de poids</h2>
          {variation !== null && (
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                variation <= 0 ? "bg-accent-soft text-accent" : "bg-nude text-nude-foreground"
              }`}
            >
              {variation > 0 ? "+" : ""}
              {variation} kg depuis le départ
            </span>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <WeightChart entries={weights} />
        </div>

        <form
          onSubmit={handleAddWeight}
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5"
        >
          <WeekSelector value={selectedWeek} onChange={setSelectedWeek} />
          <label className="flex flex-col gap-1">
            <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
              Poids (kg) — moyenne de la semaine
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="ex: 70.4"
              className="w-36 rounded-xl border border-border bg-background px-3 py-2 text-base font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Enregistrer
          </button>
        </form>
      </section>

      {/* Commentaires */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Journal de bord</h2>
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground/80">
              Commentaire — semaine {selectedWeek}
            </p>
          </div>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onBlur={handleSaveComment}
            rows={3}
            placeholder="Comment tu te sens cette semaine, énergie, faim, sommeil..."
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </div>

        {sortedComments.length > 0 && (
          <div className="flex flex-col gap-2">
            {sortedComments.map((c) => (
              <div key={c.weekId} className="rounded-2xl border border-border bg-background/60 p-3.5">
                <p className="text-xs font-semibold text-accent">Semaine {c.weekId}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/85">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mensurations */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Mensurations (optionnel)</h2>
        <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <MeasurementsChart measurements={measurements} />
        </div>
        <form
          onSubmit={handleSaveMeasurement}
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5"
        >
          <label className="flex flex-col gap-1">
            <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
              Taille (cm)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={waistInput}
              onChange={(e) => setWaistInput(e.target.value)}
              className="w-24 rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
              Hanches (cm)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={hipsInput}
              onChange={(e) => setHipsInput(e.target.value)}
              className="w-24 rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[0.68rem] font-medium uppercase tracking-wide text-muted">
              Cuisse (cm)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={thighInput}
              onChange={(e) => setThighInput(e.target.value)}
              className="w-24 rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-semibold text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Enregistrer (semaine {selectedWeek})
          </button>
        </form>
      </section>

      {/* Export / Import */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Sauvegarde de tes données</h2>
        <p className="text-sm text-muted">
          Aucune donnée n&apos;est stockée sur un serveur : tout vit dans ton navigateur. Exporte
          régulièrement un fichier de sauvegarde pour ne rien perdre.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-full border border-accent bg-accent-soft px-4 py-2 text-sm font-medium text-accent"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={handleImportClick}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-nude/60"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>
      </section>

      {flash && (
        <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg sm:bottom-6">
          {flash}
        </div>
      )}
    </div>
  );
}
