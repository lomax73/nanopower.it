"use server";

import { superfluidLeadSchema } from "@/lib/superfluid-lead-schema";
import { sendBrevoLead, type BrevoLeadResult } from "@/lib/brevo";

export async function submitSuperFluidLead(values: unknown): Promise<BrevoLeadResult> {
  const parsed = superfluidLeadSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  const { nome, cognome, azienda, email, telefono, ruolo, regione, messaggio } = parsed.data;

  return sendBrevoLead({
    email,
    attributes: {
      NOME: nome,
      COGNOME: cognome,
      AZIENDA: azienda,
      TELEFONO: telefono,
      TIPO_CLIENTE: ruolo,
      REGIONE: regione,
      PRODOTTO: "SuperFluid",
    },
    listIdEnvVar: "BREVO_LIST_ID_SUPERFLUID",
    notifySubject: `Nuovo lead SuperFluid — ${azienda}`,
    notifyHtml: `
      <h2>Nuovo lead da nanopower.it — SuperFluid</h2>
      <p><strong>Nome:</strong> ${nome} ${cognome}</p>
      <p><strong>Azienda/Studio:</strong> ${azienda}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${telefono}</p>
      <p><strong>Ruolo:</strong> ${ruolo}</p>
      <p><strong>Regione:</strong> ${regione}</p>
      <p><strong>Messaggio:</strong> ${messaggio || "—"}</p>
    `,
  });
}
