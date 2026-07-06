export type BrevoLeadResult = { success: true } | { error: string };

export async function sendNotificationEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}): Promise<BrevoLeadResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error("BREVO_API_KEY o CONTACT_EMAIL non configurati: notifica non inviata.");
    return { error: "Servizio momentaneamente non disponibile. Riprova più tardi." };
  }

  try {
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
        subject,
        htmlContent: html,
      }),
    });

    if (!notifyRes.ok) {
      const body = await notifyRes.text();
      console.error("Errore invio email notifica Brevo:", notifyRes.status, body);
      return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
    }

    return { success: true };
  } catch (err) {
    console.error("Errore imprevisto invio notifica:", err);
    return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
  }
}

export async function sendBrevoLead({
  email,
  attributes,
  listIdEnvVar,
  notifySubject,
  notifyHtml,
}: {
  email: string;
  attributes: Record<string, string>;
  listIdEnvVar: string;
  notifySubject: string;
  notifyHtml: string;
}): Promise<BrevoLeadResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY non configurata: lead non inviato a Brevo.", { email });
    return { error: "Servizio momentaneamente non disponibile. Riprova più tardi." };
  }

  const listId = process.env[listIdEnvVar];

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
        attributes,
        listIds: listId ? [parseInt(listId, 10)] : undefined,
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok) {
      const body = await contactRes.text();
      console.error("Errore creazione contatto Brevo:", contactRes.status, body);
      return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
    }

    await sendNotificationEmail({ subject: notifySubject, html: notifyHtml });

    return { success: true };
  } catch (err) {
    console.error("Errore imprevisto invio lead:", err);
    return { error: "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it" };
  }
}
