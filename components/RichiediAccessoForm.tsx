"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  richiediAccessoSchema,
  tipoClienteAreaTecniciOptions,
  type RichiediAccessoValues,
} from "@/lib/richiedi-accesso-schema";
import { submitRichiediAccesso } from "@/app/actions/richiedi-accesso";

type Status = "idle" | "success" | "error";

export default function RichiediAccessoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RichiediAccessoValues>({
    resolver: zodResolver(richiediAccessoSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      azienda: "",
      tipoCliente: undefined,
      telefono: "",
      password: "",
      confermaPassword: "",
      messaggio: "",
      privacy: undefined,
    },
  });

  const onSubmit = async (values: RichiediAccessoValues) => {
    setStatus("idle");
    const result = await submitRichiediAccesso(values);
    if ("success" in result) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-3 border border-nano-teal/40 bg-nano-teal/5 p-8 text-center">
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" stroke="#00A896" strokeWidth="1.5" />
          <path d="M7 12.5 10.2 16 17 8" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-white">Richiesta inviata! Ti rispondo entro 24 ore.</p>
        <p className="text-sm text-nano-slate">
          Una volta approvata la richiesta potrai accedere con l&apos;email e la password che hai scelto.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h1 className="text-center text-2xl font-black text-white sm:text-3xl">Richiedi accesso all&apos;area tecnici</h1>
      <p className="mt-2 text-center text-sm text-nano-slate">
        L&apos;accesso è riservato a tecnici, posatori e progettisti certificati o in fase di certificazione.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ra-nome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Nome
            </label>
            <input
              id="ra-nome"
              type="text"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("nome")}
            />
            {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="ra-cognome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Cognome
            </label>
            <input
              id="ra-cognome"
              type="text"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("cognome")}
            />
            {errors.cognome && <p className="mt-1 text-xs text-red-400">{errors.cognome.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="ra-email" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Email
          </label>
          <input
            id="ra-email"
            type="email"
            autoComplete="email"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="ra-azienda" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Azienda / Studio <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="ra-azienda"
            type="text"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("azienda")}
          />
        </div>

        <div>
          <label htmlFor="ra-tipo" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Sei un
          </label>
          <select
            id="ra-tipo"
            defaultValue=""
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("tipoCliente")}
          >
            <option value="" disabled>
              Seleziona...
            </option>
            {tipoClienteAreaTecniciOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.tipoCliente && <p className="mt-1 text-xs text-red-400">{errors.tipoCliente.message}</p>}
        </div>

        <div>
          <label htmlFor="ra-telefono" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="ra-telefono"
            type="tel"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ra-password" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Password
            </label>
            <input
              id="ra-password"
              type="password"
              autoComplete="new-password"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="ra-conferma" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Conferma password
            </label>
            <input
              id="ra-conferma"
              type="password"
              autoComplete="new-password"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("confermaPassword")}
            />
            {errors.confermaPassword && (
              <p className="mt-1 text-xs text-red-400">{errors.confermaPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="ra-messaggio" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Perché vuoi accedere all&apos;area tecnici? <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="ra-messaggio"
            rows={3}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("messaggio")}
          />
        </div>

        <div>
          <label className="flex items-start gap-2 text-xs text-nano-slate">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-nano-teal" {...register("privacy")} />
            <span>
              Ho letto e accetto la{" "}
              <Link href="/privacy-policy" className="text-nano-teal hover:text-white">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.privacy && <p className="mt-1 text-xs text-red-400">{errors.privacy.message}</p>}
        </div>

        {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-2 bg-nano-teal px-6 py-3.5 font-semibold text-nano-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-nano-navy/30 border-t-nano-navy" />
          ) : (
            "Invia richiesta →"
          )}
        </button>
      </form>
    </div>
  );
}
