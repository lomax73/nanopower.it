import { z } from "zod";

export const tipoEdificioOptions = [
  "Appartamento",
  "Condominio",
  "Casa indipendente",
  "Ufficio",
  "Altro",
] as const;

export const igk2LeadSchema = z.object({
  nome: z.string().min(2, "Inserisci nome e cognome"),
  email: z.string().email("Inserisci un'email valida"),
  telefono: z.string().optional().or(z.literal("")),
  citta: z.string().min(2, "Inserisci la città"),
  metriQuadri: z.string().optional().or(z.literal("")),
  tipoEdificio: z.enum(tipoEdificioOptions, { message: "Seleziona una tipologia" }),
  note: z.string().optional().or(z.literal("")),
  privacy: z.literal(true, { message: "Devi accettare la privacy policy" }),
});

export type IGK2LeadValues = z.infer<typeof igk2LeadSchema>;
