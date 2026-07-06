"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { INPUT_CLASS, LABEL_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Email o password non corretti.");
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/area-tecnici");
  };

  return (
    <div className="mx-auto w-full max-w-md px-6">
      <div className="border border-white/10 bg-nano-navy-light/40 p-8">
        <h1 className="text-center text-2xl font-black text-white">Area Tecnici</h1>
        <p className="mt-2 text-center text-sm text-nano-slate">Accedi con le tue credenziali</p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className={LABEL_CLASS}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={LABEL_CLASS}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={SUBMIT_CLASS}
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-nano-navy/30 border-t-nano-navy" />
            ) : (
              "Accedi"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-nano-slate">
          Non hai ancora l&apos;accesso?{" "}
          <Link href="/richiedi-accesso" className="text-nano-teal hover:text-white">
            Richiedi qui
          </Link>
        </p>
      </div>
    </div>
  );
}
