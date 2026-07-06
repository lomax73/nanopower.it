import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Server-only client using the service role key: bypasses RLS by design,
 * since every query in this app runs from Server Actions/route handlers,
 * never from the browser.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato: imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
  }
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export type Tecnico = {
  id: string;
  email: string;
  nome: string;
  cognome: string;
  azienda: string | null;
  tipo_cliente: string | null;
  password_hash: string | null;
  approvato: boolean;
  ruolo: "tecnico" | "admin";
  created_at: string;
  last_login: string | null;
};

export type AccessLogEntry = {
  id: string;
  tecnico_id: string;
  azione: string;
  documento: string | null;
  created_at: string;
};
