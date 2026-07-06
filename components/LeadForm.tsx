"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, clienteOptions, prodottoOptions, type LeadFormValues } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/lead";

type Status = "idle" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { nome: "", email: "", telefono: "", tipoCliente: undefined, prodottoInteresse: undefined },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("idle");
    const result = await submitLead(values);
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
        <p className="text-white">Perfetto! Ti avvisiamo non appena nanopower.it è online.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Vuoi essere tra i primi a sapere quando siamo online?
      </h2>
      <p className="mt-2 text-center text-sm text-nano-slate">
        Lascia i tuoi contatti e ti avvisiamo al lancio. Nessuno spam.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Nome e Cognome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
            {...register("telefono")}
          />
        </div>

        <div>
          <label htmlFor="tipoCliente" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Sei un
          </label>
          <select
            id="tipoCliente"
            defaultValue=""
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("tipoCliente")}
          >
            <option value="" disabled>
              Seleziona...
            </option>
            {clienteOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.tipoCliente && <p className="mt-1 text-xs text-red-400">{errors.tipoCliente.message}</p>}
        </div>

        <div>
          <label htmlFor="prodottoInteresse" className="mb-1 block text-xs nano-tracking-label uppercase text-nano-slate">
            Prodotto di interesse
          </label>
          <select
            id="prodottoInteresse"
            defaultValue=""
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
            {...register("prodottoInteresse")}
          >
            <option value="" disabled>
              Seleziona...
            </option>
            {prodottoOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.prodottoInteresse && (
            <p className="mt-1 text-xs text-red-400">{errors.prodottoInteresse.message}</p>
          )}
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
            "Avvisami al lancio →"
          )}
        </button>
      </form>
    </div>
  );
}
