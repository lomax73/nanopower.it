import { z } from "zod";

export const ruoloOptions = [
  "Posatore / Impresa edile",
  "Ingegnere / Geometra / Architetto",
  "Direttore lavori",
  "Altro",
] as const;

export const regioniItaliane = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
] as const;

export const superfluidLeadSchema = z.object({
  nome: z.string().min(2, "Inserisci il nome"),
  cognome: z.string().min(2, "Inserisci il cognome"),
  azienda: z.string().min(2, "Inserisci azienda o studio"),
  email: z.string().email("Inserisci un'email valida"),
  telefono: z.string().min(6, "Inserisci un numero di telefono"),
  ruolo: z.enum(ruoloOptions, { message: "Seleziona un ruolo" }),
  regione: z.enum(regioniItaliane, { message: "Seleziona una regione" }),
  messaggio: z.string().optional().or(z.literal("")),
  privacy: z.literal(true, { message: "Devi accettare la privacy policy" }),
});

export type SuperFluidLeadValues = z.infer<typeof superfluidLeadSchema>;
