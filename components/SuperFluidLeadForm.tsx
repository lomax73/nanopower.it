"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  superfluidLeadSchema,
  ruoloOptions,
  regioniItaliane,
  type SuperFluidLeadValues,
} from "@/lib/superfluid-lead-schema";
import { submitSuperFluidLead } from "@/app/actions/superfluid-lead";

type Status = "idle" | "success" | "error";

export default function SuperFluidLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SuperFluidLeadValues>({
    resolver: zodResolver(superfluidLeadSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      azienda: "",
      email: "",
      telefono: "",
      ruolo: undefined,
      regione: undefined,
      messaggio: "",
      privacy: undefined,
    },
  });

  const onSubmit = async (values: SuperFluidLeadValues) => {
    setStatus("idle");
    const result = await submitSuperFluidLead(values);
    if ("success" in result) {
      setStatus("success");
      reset();
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
        <p className="text-white">Richiesta ricevuta! Ti contatteremo entro 24 ore lavorative.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Parla con un esperto SuperFluid
      </h2>
      <p className="mt-2 text-center text-sm text-nano-slate">Risposta entro 24 ore lavorative.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sf-nome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Nome
            </label>
            <input
              id="sf-nome"
              type="text"
              autoComplete="given-name"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
              {...register("nome")}
            />
            {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="sf-cognome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Cognome
            </label>
            <input
              id="sf-cognome"
              type="text"
              autoComplete="family-name"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
              {...register("cognome")}
            />
            {errors.cognome && <p className="mt-1 text-xs text-red-400">{errors.cognome.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="sf-azienda" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Azienda / Studio
          </label>
          <input
            id="sf-azienda"
            type="text"
            autoComplete="organization"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("azienda")}
          />
          {errors.azienda && <p className="mt-1 text-xs text-red-400">{errors.azienda.message}</p>}
        </div>

        <div>
          <label htmlFor="sf-email" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Email
          </label>
          <input
            id="sf-email"
            type="email"
            autoComplete="email"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="sf-telefono" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Telefono
          </label>
          <input
            id="sf-telefono"
            type="tel"
            autoComplete="tel"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("telefono")}
          />
          {errors.telefono && <p className="mt-1 text-xs text-red-400">{errors.telefono.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sf-ruolo" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Ruolo
            </label>
            <select
              id="sf-ruolo"
              defaultValue=""
              className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("ruolo")}
            >
              <option value="" disabled>
                Seleziona...
              </option>
              {ruoloOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.ruolo && <p className="mt-1 text-xs text-red-400">{errors.ruolo.message}</p>}
          </div>

          <div>
            <label htmlFor="sf-regione" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Regione
            </label>
            <select
              id="sf-regione"
              defaultValue=""
              className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("regione")}
            >
              <option value="" disabled>
                Seleziona...
              </option>
              {regioniItaliane.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.regione && <p className="mt-1 text-xs text-red-400">{errors.regione.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="sf-messaggio" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Messaggio <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="sf-messaggio"
            rows={3}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
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
