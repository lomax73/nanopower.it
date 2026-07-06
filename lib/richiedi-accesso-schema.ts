import { z } from "zod";

export const tipoClienteAreaTecniciOptions = [
  "Posatore / Impresa edile",
  "Tecnico / Ingegnere / Geometra",
  "Architetto / Progettista",
  "Rivenditore",
  "Altro",
] as const;

export const richiediAccessoSchema = z
  .object({
    nome: z.string().min(2, "Inserisci il nome"),
    cognome: z.string().min(2, "Inserisci il cognome"),
    email: z.string().email("Inserisci un'email valida"),
    azienda: z.string().optional().or(z.literal("")),
    tipoCliente: z.enum(tipoClienteAreaTecniciOptions, { message: "Seleziona una categoria" }),
    telefono: z.string().optional().or(z.literal("")),
    password: z.string().min(8, "La password deve avere almeno 8 caratteri"),
    confermaPassword: z.string(),
    messaggio: z.string().optional().or(z.literal("")),
    privacy: z.literal(true, { message: "Devi accettare la privacy policy" }),
  })
  .refine((data) => data.password === data.confermaPassword, {
    message: "Le password non coincidono",
    path: ["confermaPassword"],
  });

export type RichiediAccessoValues = z.infer<typeof richiediAccessoSchema>;
