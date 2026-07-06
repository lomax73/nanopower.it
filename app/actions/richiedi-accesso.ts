"use server";

import bcrypt from "bcryptjs";
import { richiediAccessoSchema } from "@/lib/richiedi-accesso-schema";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { sendNotificationEmail, type BrevoLeadResult } from "@/lib/brevo";

export async function submitRichiediAccesso(values: unknown): Promise<BrevoLeadResult> {
  const parsed = richiediAccessoSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  if (!isSupabaseConfigured()) {
    console.error("Supabase non configurato: richiesta accesso area tecnici non salvata.");
    return { error: "Servizio momentaneamente non disponibile. Riprova più tardi." };
  }

  const { nome, cognome, email, azienda, tipoCliente, telefono, password, messaggio } = parsed.data;
  const supabase = getSupabaseClient();

  const { data: esistente } = await supabase
    .from("tecnici")
    .select("id")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();

  if (esistente) {
    return { error: "Esiste già una richiesta con questa email. Contattaci se hai bisogno di assistenza." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase.from("tecnici").insert({
    email: email.toLowerCase().trim(),
    nome,
    cognome,
    azienda: azienda || null,
    tipo_cliente: tipoCliente,
    password_hash: passwordHash,
    approvato: false,
    ruolo: "tecnico",
  });

  if (insertError) {
    console.error("Errore inserimento richiesta accesso:", insertError);
    return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
  }

  await sendNotificationEmail({
    subject: `Nuova richiesta accesso area tecnici — ${nome} ${cognome}${azienda ? ` (${azienda})` : ""}`,
    html: `
      <h2>Nuova richiesta accesso area tecnici</h2>
      <p><strong>Nome:</strong> ${nome} ${cognome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Azienda:</strong> ${azienda || "—"}</p>
      <p><strong>Categoria:</strong> ${tipoCliente}</p>
      <p><strong>Telefono:</strong> ${telefono || "non fornito"}</p>
      <p><strong>Messaggio:</strong> ${messaggio || "—"}</p>
    `,
  });

  return { success: true };
}
