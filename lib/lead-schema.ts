import { z } from "zod";

export const clienteOptions = [
  "Impresa edile / Posatore",
  "Tecnico / Ingegnere / Geometra",
  "Architetto / Progettista",
  "Privato / Condominio",
  "Altro",
] as const;

export const prodottoOptions = [
  "IGK2 — Isolamento termico",
  "SuperFluid — Massetti",
  "SuperElastiK — Impermeabilizzazione",
  "Tutti i prodotti",
] as const;

export const leadSchema = z.object({
  nome: z.string().min(2, "Inserisci nome e cognome"),
  email: z.string().email("Inserisci un'email valida"),
  telefono: z.string().optional().or(z.literal("")),
  tipoCliente: z.enum(clienteOptions, {
    message: "Seleziona una categoria",
  }),
  prodottoInteresse: z.enum(prodottoOptions, {
    message: "Seleziona un prodotto",
  }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
