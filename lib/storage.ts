import type {
  ExerciseLoad,
  WeightEntry,
  WeekComment,
  Measurement,
  ExportedData,
} from "./types";

// Toutes les fonctions sont SSR-safe : si `window` n'existe pas (rendu serveur),
// elles renvoient un fallback sans jamais planter.

const KEYS = {
  loads: "fitapp:loads",
  weights: "fitapp:weights",
  comments: "fitapp:comments",
  measurements: "fitapp:measurements",
  activeWeek: "fitapp:activeWeek",
} as const;

function isClient() {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!isClient()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Charges (ExerciseLoad) ----------

export function getLoads(): ExerciseLoad[] {
  return readJSON<ExerciseLoad[]>(KEYS.loads, []);
}

export function getLoadsForWeek(weekId: number): ExerciseLoad[] {
  return getLoads().filter((l) => l.weekId === weekId);
}

export function getLoad(
  exerciseId: string,
  weekId: number
): ExerciseLoad | undefined {
  return getLoads().find(
    (l) => l.exerciseId === exerciseId && l.weekId === weekId
  );
}

export function setLoad(load: ExerciseLoad) {
  const loads = getLoads();
  const idx = loads.findIndex(
    (l) => l.exerciseId === load.exerciseId && l.weekId === load.weekId
  );
  if (idx >= 0) loads[idx] = load;
  else loads.push(load);
  writeJSON(KEYS.loads, loads);
}

/** Copie toutes les charges de `fromWeekId` vers `toWeekId` (écrase les existantes). */
export function copyLoadsFromWeek(fromWeekId: number, toWeekId: number) {
  const loads = getLoads();
  const source = loads.filter((l) => l.weekId === fromWeekId);
  const withoutTarget = loads.filter((l) => l.weekId !== toWeekId);
  const copied = source.map((l) => ({
    ...l,
    weekId: toWeekId,
    done: false,
  }));
  writeJSON(KEYS.loads, [...withoutTarget, ...copied]);
}

// ---------- Poids (WeightEntry) ----------

export function getWeights(): WeightEntry[] {
  return readJSON<WeightEntry[]>(KEYS.weights, []).sort(
    (a, b) => a.weekId - b.weekId
  );
}

export function addWeight(entry: WeightEntry) {
  const weights = getWeights().filter((w) => w.weekId !== entry.weekId);
  writeJSON(KEYS.weights, [...weights, entry]);
}

// ---------- Commentaires hebdomadaires ----------

export function getComments(): WeekComment[] {
  return readJSON<WeekComment[]>(KEYS.comments, []);
}

export function getComment(weekId: number): WeekComment | undefined {
  return getComments().find((c) => c.weekId === weekId);
}

export function setComment(weekId: number, text: string) {
  const comments = getComments().filter((c) => c.weekId !== weekId);
  writeJSON(KEYS.comments, [
    ...comments,
    { weekId, text, updatedAt: new Date().toISOString() },
  ]);
}

// ---------- Mensurations ----------

export function getMeasurements(): Measurement[] {
  return readJSON<Measurement[]>(KEYS.measurements, []);
}

export function setMeasurement(measurement: Measurement) {
  const measurements = getMeasurements().filter(
    (m) => m.weekId !== measurement.weekId
  );
  writeJSON(KEYS.measurements, [...measurements, measurement]);
}

// ---------- Semaine active ----------

export function getActiveWeek(): number {
  return readJSON<number>(KEYS.activeWeek, 1);
}

export function setActiveWeek(weekId: number) {
  writeJSON(KEYS.activeWeek, weekId);
}

// ---------- Export / Import ----------

export function exportAllData(): ExportedData {
  return {
    loads: getLoads(),
    weights: getWeights(),
    comments: getComments(),
    measurements: getMeasurements(),
    activeWeekId: getActiveWeek(),
    exportedAt: new Date().toISOString(),
  };
}

export function importAllData(data: ExportedData) {
  writeJSON(KEYS.loads, data.loads ?? []);
  writeJSON(KEYS.weights, data.weights ?? []);
  writeJSON(KEYS.comments, data.comments ?? []);
  writeJSON(KEYS.measurements, data.measurements ?? []);
  writeJSON(KEYS.activeWeek, data.activeWeekId ?? 1);
}
