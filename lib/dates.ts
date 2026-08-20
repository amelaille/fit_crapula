// Calcul de la semaine/du jour à partir de la date réelle — le programme démarre le 17 août 2026.

export const PROGRAM_START = new Date(2026, 7, 17); // 17 août 2026 (mois 0-indexé)
export const TOTAL_WEEKS = 12;

export const DAY_NAMES = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

function atMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getCurrentWeekId(date: Date = new Date()): number {
  const diffDays = Math.floor(
    (atMidnight(date).getTime() - atMidnight(PROGRAM_START).getTime()) / 86_400_000
  );
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(week, 1), TOTAL_WEEKS);
}

export function getTodayName(date: Date = new Date()): string {
  return DAY_NAMES[date.getDay()];
}

/** "YYYY-MM-DD" en heure locale (pas toISOString, qui décale en UTC). */
export function toDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const PROGRAM_END = new Date(
  PROGRAM_START.getFullYear(),
  PROGRAM_START.getMonth(),
  PROGRAM_START.getDate() + TOTAL_WEEKS * 7 - 1
);

const WEEKDAY_ORDER = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

/** Date calendaire d'un jour donné (ex: "Mardi") au sein d'une semaine du programme (1 à 12). */
export function getDateForWeekDay(weekId: number, dayName: string): Date {
  const offset = WEEKDAY_ORDER.indexOf(dayName);
  const totalDays = (weekId - 1) * 7 + offset;
  return new Date(
    PROGRAM_START.getFullYear(),
    PROGRAM_START.getMonth(),
    PROGRAM_START.getDate() + totalDays
  );
}
