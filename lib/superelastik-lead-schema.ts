import { z } from "zod";

export const tipoProgettoOptions = [
  "Nuova costruzione",
  "Ristrutturazione",
  "Manutenzione",
  "Progetto architettonico",
] as const;

export const superelastikLeadSchema = z.object({
  nome: z.string().min(2, "Inserisci nome e cognome"),
  azienda: z.string().optional().or(z.literal("")),
  email: z.string().email("Inserisci un'email valida"),
  telefono: z.string().optional().or(z.literal("")),
  tipoProgetto: z.enum(tipoProgettoOptions, { message: "Seleziona una tipologia" }),
  metriQuadri: z.string().optional().or(z.literal("")),
  descrizione: z.string().optional().or(z.literal("")),
  privacy: z.literal(true, { message: "Devi accettare la privacy policy" }),
});

export type SuperElastikLeadValues = z.infer<typeof superelastikLeadSchema>;
