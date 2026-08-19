// Types partagés : contenu de référence (programme) + données persistées (localStorage)

// ---------- Contenu de référence ----------

export type Tempo = string; // ex: "2-0-1-2"

export type Exercise = {
  id: string; // identifiant stable, utilisé pour lier les charges éditables
  name: string;
  sets: number;
  reps: string; // ex: "8-10", "12/jambe", "20 pas"
  rest: string; // ex: "2 min", "45-60 s"
  rir?: string; // ex: "RIR 1-2"
  tempo?: Tempo;
  note?: string;
};

export type WorkoutSessionId = "A" | "B" | "C" | "D";

export type WorkoutSession = {
  id: WorkoutSessionId;
  day: string; // "Lundi", "Mardi"...
  title: string;
  duration: string; // "60 min"
  intensityLabel: string; // ex: "RIR 1-2 sur les composés..."
  intensityFeeling: string; // sensation recherchée
  warmup?: string;
  exercises: Exercise[];
  extra?: { label: string; detail: string }[]; // ex: bloc Core, finisher cardio
  note?: string;
};

export type MacroSet = {
  kcal: number;
  protein: number; // g
  fat: number; // g
  carbs: number; // g
};

export type MealItem = string;

export type Meal = {
  name: string; // "Petit-déjeuner"
  kcal: number;
  macros: string; // ex: "P30 G40 L14" (format d'affichage tel que dans le programme)
  items: MealItem[];
  note?: string;
};

export type DayType = "training" | "repos";

export type DayMenu = {
  type: DayType;
  totalKcal: number;
  meals: Meal[];
};

export type PhaseId = 1 | 2 | 3;

export type Phase = {
  id: PhaseId;
  name: string; // "Installation", "Intensification", "Définition"
  weekRange: [number, number];
  objective: string; // ex: "-3 kg"
  expectedWeight: string; // ex: "~67 kg"
  caloriesTraining: number;
  caloriesRest: number;
  points: string[];
  whatHappens: string;
};

export type MonthMacros = {
  phaseId: PhaseId;
  caloriesTraining: number;
  caloriesRest: number;
  proteinTraining: number;
  proteinRest: number;
  fatTraining?: number;
  fatRest?: number;
  carbsTraining?: number;
  carbsRest?: number;
  note?: string;
};

export type WeekPlan = {
  id: number; // 1 à 12
  phaseId: PhaseId;
  caloriesTraining: number;
  caloriesRest: number;
  focus: string;
  notes: string[]; // notes spécifiques (ex: "semaine la plus dure", "semaine de décharge")
  isDeload: boolean;
  isPhotoWeek: boolean;
  trainingAdjustments?: string[]; // ex: "+1 série hip thrust et squat"
  walkMinutes: number; // marche volontaire/jour cette phase
};

// ---------- Comptes ----------

export type AppUser = "amelie" | "sena";

export const APP_USERS: AppUser[] = ["amelie", "sena"];

export const APP_USER_LABELS: Record<AppUser, string> = {
  amelie: "Reine Amé",
  sena: "Mon Chino",
};

// ---------- Données persistées (Supabase) ----------

export type ExerciseLoad = {
  exerciseId: string;
  weekId: number;
  weight: number | null; // kg, éditable
  reps: string | null; // reps réelles, peut différer du prescrit
  done: boolean; // séance cochée
};

export type WeightEntry = {
  user: AppUser;
  weekId: number; // 1 à 12
  weight: number; // moyenne de la semaine
  date: string; // ISO
};

export type WeekComment = {
  user: AppUser;
  weekId: number;
  text: string;
  updatedAt: string;
};

export type DailyLog = {
  user: AppUser;
  date: string; // "YYYY-MM-DD"
  trained: boolean;
  cheatMeal: boolean;
};
