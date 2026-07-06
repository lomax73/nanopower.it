import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
