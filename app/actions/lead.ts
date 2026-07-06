"use server";

import { leadSchema } from "@/lib/lead-schema";
import { sendBrevoLead, type BrevoLeadResult } from "@/lib/brevo";

export async function submitLead(values: unknown): Promise<BrevoLeadResult> {
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  const { nome, email, telefono, tipoCliente, prodottoInteresse } = parsed.data;
  const [nomeFirst, ...cognomeParts] = nome.trim().split(/\s+/);
  const cognome = cognomeParts.join(" ");

  return sendBrevoLead({
    email,
    attributes: {
      NOME: nomeFirst,
      COGNOME: cognome,
      TELEFONO: telefono || "",
      TIPO_CLIENTE: tipoCliente,
      PRODOTTO_INTERESSE: prodottoInteresse,
    },
    listIdEnvVar: "BREVO_LIST_ID_GENERAL",
    notifySubject: `Nuovo lead nanopower.it — ${nome}`,
    notifyHtml: `
      <h2>Nuovo lead da nanopower.it</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefono:</strong> ${telefono || "non fornito"}</p>
      <p><strong>Tipo cliente:</strong> ${tipoCliente}</p>
      <p><strong>Prodotto di interesse:</strong> ${prodottoInteresse}</p>
    `,
  });
}
