"use server";

import { leadSchema } from "@/lib/lead-schema";

type LeadResult = { success: true } | { error: string };

export async function submitLead(values: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dati non validi. Controlla i campi e riprova." };
  }

  const { nome, email, telefono, tipoCliente, prodottoInteresse } = parsed.data;
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY non configurata: lead non inviato a Brevo.", {
      email,
    });
    return { error: "Servizio momentaneamente non disponibile. Riprova più tardi." };
  }

  const [nomeFirst, ...cognomeParts] = nome.trim().split(/\s+/);
  const cognome = cognomeParts.join(" ");

  try {
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          NOME: nomeFirst,
          COGNOME: cognome,
          TELEFONO: telefono || "",
          TIPO_CLIENTE: tipoCliente,
          PRODOTTO_INTERESSE: prodottoInteresse,
        },
        listIds: process.env.BREVO_LIST_ID_GENERAL
          ? [parseInt(process.env.BREVO_LIST_ID_GENERAL, 10)]
          : undefined,
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok) {
      const body = await contactRes.text();
      console.error("Errore creazione contatto Brevo:", contactRes.status, body);
      return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (contactEmail) {
      const notifyRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: "nanopower.it", email: contactEmail },
          to: [{ email: contactEmail }],
          subject: `Nuovo lead nanopower.it — ${nome}`,
          htmlContent: `
            <h2>Nuovo lead da nanopower.it</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefono:</strong> ${telefono || "non fornito"}</p>
            <p><strong>Tipo cliente:</strong> ${tipoCliente}</p>
            <p><strong>Prodotto di interesse:</strong> ${prodottoInteresse}</p>
          `,
        }),
      });

      if (!notifyRes.ok) {
        const body = await notifyRes.text();
        console.error("Errore invio email notifica Brevo:", notifyRes.status, body);
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Errore imprevisto invio lead:", err);
    return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
  }
}
