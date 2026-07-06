import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credenziali",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!isSupabaseConfigured()) {
          throw new Error("Servizio di autenticazione non configurato.");
        }

        const supabase = getSupabaseClient();
        const { data: tecnico } = await supabase
          .from("tecnici")
          .select("*")
          .eq("email", credentials.email.toLowerCase().trim())
          .maybeSingle();

        if (!tecnico || !tecnico.password_hash) return null;

        const valid = await bcrypt.compare(credentials.password, tecnico.password_hash);
        if (!valid) return null;

        await supabase.from("tecnici").update({ last_login: new Date().toISOString() }).eq("id", tecnico.id);

        return {
          id: tecnico.id,
          email: tecnico.email,
          name: `${tecnico.nome} ${tecnico.cognome}`,
          ruolo: tecnico.ruolo,
          approvato: tecnico.approvato,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.ruolo = user.ruolo;
        token.approvato = user.approvato;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.ruolo = token.ruolo;
        session.user.approvato = token.approvato;
      }
      return session;
    },
  },
};
