import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    ruolo: "tecnico" | "admin";
    approvato: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      ruolo: "tecnico" | "admin";
      approvato: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    ruolo: "tecnico" | "admin";
    approvato: boolean;
  }
}
