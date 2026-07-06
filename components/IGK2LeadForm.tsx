"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { igk2LeadSchema, tipoEdificioOptions, type IGK2LeadValues } from "@/lib/igk2-lead-schema";
import { submitIGK2Lead } from "@/app/actions/igk2-lead";

type Status = "idle" | "success" | "error";

export default function IGK2LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IGK2LeadValues>({
    resolver: zodResolver(igk2LeadSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefono: "",
      citta: "",
      tipoEdificio: undefined,
      note: "",
      privacy: undefined,
    },
  });

  const onSubmit = async (values: IGK2LeadValues) => {
    setStatus("idle");
    const result = await submitIGK2Lead(values);
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
        <p className="text-white">Richiesta ricevuta! Ti ricontatteremo a breve per il tuo preventivo IGK2.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Richiedi un preventivo per IGK2
      </h2>
      <p className="mt-2 text-center text-sm text-nano-slate">
        Descrivici il tuo intervento: ti risponderemo con una stima e la disponibilità per un sopralluogo.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="igk2-nome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Nome e Cognome
          </label>
          <input
            id="igk2-nome"
            type="text"
            autoComplete="name"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="igk2-email" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Email
          </label>
          <input
            id="igk2-email"
            type="email"
            autoComplete="email"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="igk2-telefono" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="igk2-telefono"
            type="tel"
            autoComplete="tel"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="igk2-citta" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              Città
            </label>
            <input
              id="igk2-citta"
              type="text"
              autoComplete="address-level2"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
              {...register("citta")}
            />
            {errors.citta && <p className="mt-1 text-xs text-red-400">{errors.citta.message}</p>}
          </div>

          <div>
            <label htmlFor="igk2-mq" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
              m² da trattare
            </label>
            <input
              id="igk2-mq"
              type="number"
              min="1"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
              {...register("metriQuadri")}
            />
            {errors.metriQuadri && <p className="mt-1 text-xs text-red-400">{errors.metriQuadri.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="igk2-tipo" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Tipo edificio
          </label>
          <select
            id="igk2-tipo"
            defaultValue=""
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("tipoEdificio")}
          >
            <option value="" disabled>
              Seleziona...
            </option>
            {tipoEdificioOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.tipoEdificio && <p className="mt-1 text-xs text-red-400">{errors.tipoEdificio.message}</p>}
        </div>

        <div>
          <label htmlFor="igk2-note" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Note <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="igk2-note"
            rows={3}
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("note")}
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
            "Richiedi preventivo →"
          )}
        </button>
      </form>
    </div>
  );
}
