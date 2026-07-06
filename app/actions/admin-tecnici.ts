"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/brevo";

export async function toggleApprovazione(tecnicoId: string, nuovoStato: boolean) {
  const session = await getServerSession(authOptions);
  if (session?.user?.ruolo !== "admin") {
    throw new Error("Non autorizzato.");
  }
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  const supabase = getSupabaseClient();
  const { data: tecnico, error } = await supabase
    .from("tecnici")
    .update({ approvato: nuovoStato })
    .eq("id", tecnicoId)
    .select()
    .single();

  if (error || !tecnico) {
    throw new Error("Errore aggiornamento stato approvazione.");
  }

  if (nuovoStato) {
    await sendNotificationEmailToUser(tecnico.email, tecnico.nome);
  }

  revalidatePath("/area-tecnici/admin");
}

async function sendNotificationEmailToUser(email: string, nome: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.CONTACT_EMAIL;
  if (!apiKey || !senderEmail) return;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "nanopower.it", email: senderEmail },
      to: [{ email }],
      subject: "Il tuo accesso all'area tecnici è stato attivato",
      htmlContent: `<p>Ciao ${nome},</p><p>Il tuo accesso all'area tecnici di nanopower.it è stato approvato. Puoi accedere da <a href="https://nanopower.it/login">qui</a>.</p>`,
    }),
  }).catch((err) => console.error("Errore invio email approvazione:", err));
}
