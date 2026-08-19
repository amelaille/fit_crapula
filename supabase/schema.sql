-- Schéma Supabase pour fit_crapula
-- À exécuter dans Supabase Dashboard > SQL Editor.
--
-- ATTENTION : ce script réinitialise complètement les tables (drop puis
-- recreate). Si tu as déjà entré de vraies données via une version
-- précédente du schéma, elles seront perdues.
--
-- Avant de lancer ce script, crée les 2 comptes dans
-- Authentication > Users > Add user :
--   - ameliehp03@gmail.com   (mot de passe de ton choix)
--   - fandresena2027@gmail.com (mot de passe de ton choix)
-- Coche "Auto Confirm User" pour chacun (sinon il faut confirmer par email
-- avant de pouvoir se connecter).
--
-- Les policies ci-dessous exigent une session Supabase Auth valide (rôle
-- `authenticated`) : sans être connecté·e avec l'un des 2 comptes ci-dessus,
-- impossible de lire ou écrire dans ces tables, même avec la clé publique
-- NEXT_PUBLIC_SUPABASE_ANON_KEY.

drop table if exists measurements cascade;
drop table if exists weight_entries cascade;
drop table if exists week_comments cascade;
drop table if exists exercise_loads cascade;
drop table if exists app_state cascade;
drop table if exists daily_log cascade;

-- ---------- Charges par exercice / semaine (programme d'Amélie, partagé) ----------
create table exercise_loads (
  exercise_id text not null,
  week_id integer not null,
  weight numeric,
  reps text,
  done boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (exercise_id, week_id)
);

-- ---------- Pesées hebdomadaires, une courbe par personne ----------
create table weight_entries (
  app_user text not null check (app_user in ('amelie', 'sena')),
  week_id integer not null,
  weight numeric not null,
  entry_date timestamptz not null default now(),
  primary key (app_user, week_id)
);

-- ---------- Commentaires hebdomadaires, un journal par personne ----------
create table week_comments (
  app_user text not null check (app_user in ('amelie', 'sena')),
  week_id integer not null,
  text text not null default '',
  updated_at timestamptz not null default now(),
  primary key (app_user, week_id)
);

-- ---------- Journal quotidien : séance faite / cheat meal, un journal par personne ----------
create table daily_log (
  app_user text not null check (app_user in ('amelie', 'sena')),
  log_date date not null,
  trained boolean not null default false,
  cheat_meal boolean not null default false,
  primary key (app_user, log_date)
);

-- ---------- RLS : réservé aux comptes connectés (voir note en haut du fichier) ----------
alter table exercise_loads enable row level security;
alter table weight_entries enable row level security;
alter table week_comments enable row level security;
alter table daily_log enable row level security;

create policy "authenticated full access" on exercise_loads for all to authenticated using (true) with check (true);
create policy "authenticated full access" on weight_entries for all to authenticated using (true) with check (true);
create policy "authenticated full access" on week_comments for all to authenticated using (true) with check (true);
create policy "authenticated full access" on daily_log for all to authenticated using (true) with check (true);
