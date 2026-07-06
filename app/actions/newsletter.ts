"use server";

import { newsletterSchema } from "@/lib/newsletter-schema";
import { sendBrevoLead, type BrevoLeadResult } from "@/lib/brevo";

export async function subscribeNewsletter(values: unknown): Promise<BrevoLeadResult> {
  const parsed = newsletterSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Inserisci un'email valida." };
  }

  const { email } = parsed.data;

  return sendBrevoLead({
    email,
    attributes: { FONTE: "Blog" },
    listIdEnvVar: "BREVO_LIST_ID_NEWSLETTER",
    notifySubject: `Nuova iscrizione newsletter — ${email}`,
    notifyHtml: `<h2>Nuova iscrizione newsletter dal blog</h2><p><strong>Email:</strong> ${email}</p>`,
  });
}
