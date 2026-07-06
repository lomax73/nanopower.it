"use server";

import { igk2LeadSchema } from "@/lib/igk2-lead-schema";
import { sendBrevoLead, type BrevoLeadResult } from "@/lib/brevo";

export async function submitIGK2Lead(values: unknown): Promise<BrevoLeadResult> {
  const parsed = igk2LeadSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  const { nome, email, telefono, citta, metriQuadri, tipoEdificio, note } = parsed.data;
  const [nomeFirst, ...cognomeParts] = nome.trim().split(/\s+/);
  const cognome = cognomeParts.join(" ");

  return sendBrevoLead({
    email,
    attributes: {
      NOME: nomeFirst,
      COGNOME: cognome,
      TELEFONO: telefono || "",
      CITTA: citta,
      TIPO_EDIFICIO: tipoEdificio,
      PRODOTTO: "IGK2",
    },
    listIdEnvVar: "BREVO_LIST_ID_IGK2",
    notifySubject: `Nuova richiesta preventivo IGK2 — ${nome}`,
    notifyHtml: `
      <h2>Nuova richiesta preventivo IGK2</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${telefono || "non fornito"}</p>
      <p><strong>Città:</strong> ${citta}</p>
      <p><strong>m² da trattare:</strong> ${metriQuadri || "non specificato"}</p>
      <p><strong>Tipo edificio:</strong> ${tipoEdificio}</p>
      <p><strong>Note:</strong> ${note || "—"}</p>
    `,
  });
}
