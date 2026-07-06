"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  superelastikLeadSchema,
  tipoProgettoOptions,
  type SuperElastikLeadValues,
} from "@/lib/superelastik-lead-schema";
import { submitSuperElastikLead } from "@/app/actions/superelastik-lead";

type Status = "idle" | "success" | "error";

export default function SuperElastikLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SuperElastikLeadValues>({
    resolver: zodResolver(superelastikLeadSchema),
    defaultValues: {
      nome: "",
      azienda: "",
      email: "",
      telefono: "",
      tipoProgetto: undefined,
      descrizione: "",
      privacy: undefined,
    },
  });

  const onSubmit = async (values: SuperElastikLeadValues) => {
    setStatus("idle");
    const result = await submitSuperElastikLead(values);
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
        <p className="text-white">Richiesta ricevuta! Un nostro tecnico ti ricontatterà per SuperElastiK.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Richiedi una consulenza tecnica
      </h2>
      <p className="mt-2 text-center text-sm text-nano-slate">
        Raccontaci il progetto: ti aiutiamo a scegliere tra Bassa e Alta Densità.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="se-nome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Nome e Cognome
          </label>
          <input
            id="se-nome"
            type="text"
            autoComplete="name"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="se-azienda" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Azienda <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="se-azienda"
            type="text"
            autoComplete="organization"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("azienda")}
          />
        </div>

        <div>
          <label htmlFor="se-email" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Email
          </label>
          <input
            id="se-email"
            type="email"
            autoComplete="email"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="se-telefono" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="se-telefono"
            type="tel"
            autoComplete="tel"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="se-tipo" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Tipo progetto
            </label>
            <select
              id="se-tipo"
              defaultValue=""
              className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
              {...register("tipoProgetto")}
            >
              <option value="" disabled>
                Seleziona...
              </option>
              {tipoProgettoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.tipoProgetto && <p className="mt-1 text-xs text-red-400">{errors.tipoProgetto.message}</p>}
          </div>

          <div>
            <label htmlFor="se-mq" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              m² stimati
            </label>
            <input
              id="se-mq"
              type="number"
              min="1"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
              {...register("metriQuadri")}
            />
            {errors.metriQuadri && <p className="mt-1 text-xs text-red-400">{errors.metriQuadri.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="se-descrizione" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Descrizione breve <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="se-descrizione"
            rows={3}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("descrizione")}
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
            "Richiedi consulenza →"
          )}
        </button>
      </form>
    </div>
  );
}
