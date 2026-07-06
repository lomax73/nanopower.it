-- Schema per l'Area Tecnici di nanopower.it
-- Da eseguire una sola volta nell'SQL Editor del progetto Supabase.

create extension if not exists "pgcrypto";

create table if not exists tecnici (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  nome text not null,
  cognome text not null,
  azienda text,
  tipo_cliente text,
  password_hash text,
  approvato boolean default false,
  ruolo text default 'tecnico', -- 'tecnico' | 'admin'
  created_at timestamptz default now(),
  last_login timestamptz
);

create table if not exists access_log (
  id uuid primary key default gen_random_uuid(),
  tecnico_id uuid references tecnici(id),
  azione text,
  documento text,
  created_at timestamptz default now()
);

-- Tutte le query dell'app passano dal server con la service role key,
-- quindi la Row Level Security resta attiva ma non serve definire policy
-- per il client: nessuna chiamata a queste tabelle avviene dal browser.
alter table tecnici enable row level security;
alter table access_log enable row level security;
