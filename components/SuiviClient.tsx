"use client";

import { useEffect, useRef, useState } from "react";
import {
  getWeights,
  addWeight,
  getComments,
  setComment,
  exportAllData,
  importAllData,
  getActiveWeek,
} from "@/lib/storage";
import type { AppUser, WeightEntry, WeekComment } from "@/lib/types";
import { APP_USER_LABELS } from "@/lib/types";
import WeightChart from "./WeightChart";
import WeekSelector from "./WeekSelector";

export default function SuiviClient({ currentUser }: { currentUser: AppUser }) {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [comments, setComments] = useState<WeekComment[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const [weightInput, setWeightInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const [flash, setFlash] = useState<string | null>(null);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function refreshAll() {
    const [w, c] = await Promise.all([getWeights(), getComments()]);
    setWeights(w);
    setComments(c);
  }

  useEffect(() => {
    refreshAll();
    getActiveWeek().then(setSelectedWeek);
  }, []);

  useEffect(() => {
    const existingComment = comments.find(
      (c) => c.weekId === selectedWeek && c.user === currentUser
    );
    setCommentInput(existingComment?.text ?? "");
    const existingWeight = weights.find(
      (w) => w.weekId === selectedWeek && w.user === currentUser
    );
    setWeightInput(existingWeight != null ? String(existingWeight.weight) : "");
  }, [selectedWeek, weights, comments, currentUser]);

  function showFlash(text: string) {
    setFlash(text);
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => setFlash(null), 2200);
  }

  async function handleAddWeight(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(weightInput.replace(",", "."));
    if (Number.isNaN(value) || value <= 0) return;
    await addWeight({
      user: currentUser,
      weekId: selectedWeek,
      weight: value,
      date: new Date().toISOString(),
    });
    await refreshAll();
    showFlash(`Poids enregistré pour la semaine ${selectedWeek}.`);
  }

  async function handleSaveComment() {
    await setComment(currentUser, selectedWeek, commentInput);
    await refreshAll();
    showFlash(`Commentaire enregistré pour la semaine ${selectedWeek}.`);
  }

  async function handleExport() {
    const data = await exportAllData();
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
    reader.onload = async () => {
      try {
        const data = JSON.parse(reader.result as string);
        await importAllData(data);
        await refreshAll();
        showFlash("Données importées avec succès.");
      } catch {
        showFlash("Le fichier importé est invalide.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  const sortedComments = [...comments].sort((a, b) => b.weekId - a.weekId);
  const myWeights = weights.filter((w) => w.user === currentUser);
  const myLastWeight = [...myWeights].sort((a, b) => b.weekId - a.weekId)[0];
  const myFirstWeight = [...myWeights].sort((a, b) => a.weekId - b.weekId)[0];
  const variation =
    myLastWeight && myFirstWeight && myLastWeight.weekId !== myFirstWeight.weekId
      ? Math.round((myLastWeight.weight - myFirstWeight.weight) * 10) / 10
      : null;

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
              {variation} kg depuis ta première pesée
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
              Poids (kg) — moyenne de la semaine, {APP_USER_LABELS[currentUser]}
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
              Commentaire — semaine {selectedWeek}, {APP_USER_LABELS[currentUser]}
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
              <div
                key={`${c.user}-${c.weekId}`}
                className="rounded-2xl border border-border bg-background/60 p-3.5"
              >
                <p className="text-xs font-semibold" style={{ color: `var(--user-${c.user})` }}>
                  {APP_USER_LABELS[c.user]} — Semaine {c.weekId}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/85">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Export / Import */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Sauvegarde de tes données</h2>
        <p className="text-sm text-muted">
          Tes données sont synchronisées avec la base Supabase partagée. Exporte quand même
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
