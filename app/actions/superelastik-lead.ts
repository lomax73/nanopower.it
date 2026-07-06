"use server";

import { superelastikLeadSchema } from "@/lib/superelastik-lead-schema";
import { sendBrevoLead, type BrevoLeadResult } from "@/lib/brevo";

export async function submitSuperElastikLead(values: unknown): Promise<BrevoLeadResult> {
  const parsed = superelastikLeadSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  const { nome, azienda, email, telefono, tipoProgetto, metriQuadri, descrizione } = parsed.data;
  const [nomeFirst, ...cognomeParts] = nome.trim().split(/\s+/);
  const cognome = cognomeParts.join(" ");

  return sendBrevoLead({
    email,
    attributes: {
      NOME: nomeFirst,
      COGNOME: cognome,
      TELEFONO: telefono || "",
      AZIENDA: azienda || "",
      TIPO_PROGETTO: tipoProgetto,
      PRODOTTO: "SuperElastiK",
    },
    listIdEnvVar: "BREVO_LIST_ID_SUPERELASTIK",
    notifySubject: `Nuova richiesta consulenza SuperElastiK — ${nome}`,
    notifyHtml: `
      <h2>Nuova richiesta consulenza tecnica SuperElastiK</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Azienda:</strong> ${azienda || "—"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${telefono || "non fornito"}</p>
      <p><strong>Tipo progetto:</strong> ${tipoProgetto}</p>
      <p><strong>m² stimati:</strong> ${metriQuadri || "non specificato"}</p>
      <p><strong>Descrizione:</strong> ${descrizione || "—"}</p>
    `,
  });
}
