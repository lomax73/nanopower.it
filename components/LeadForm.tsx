"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, clienteOptions, prodottoOptions, type LeadFormValues } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/lead";
import { INPUT_CLASS, LABEL_CLASS, SELECT_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";
import FormSuccess from "@/components/FormSuccess";

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
      <FormSuccess message="Grazie! Ti ricontatteremo al più presto per la tua consulenza." />
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6">
      <h2 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Richiedi una consulenza gratuita
      </h2>
      <p className="mt-2 text-center text-sm text-nano-slate">
        Lascia i tuoi contatti: un nostro tecnico ti ricontatterà a breve. Nessuno spam.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="nome" className={LABEL_CLASS}>
            Nome e Cognome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            className={INPUT_CLASS}
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={INPUT_CLASS}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className={LABEL_CLASS}>
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            {...register("telefono")}
          />
        </div>

        <div>
          <label htmlFor="tipoCliente" className={LABEL_CLASS}>
            Sei un
          </label>
          <select
            id="tipoCliente"
            defaultValue=""
            className={SELECT_CLASS}
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
          <label htmlFor="prodottoInteresse" className={LABEL_CLASS}>
            Prodotto di interesse
          </label>
          <select
            id="prodottoInteresse"
            defaultValue=""
            className={SELECT_CLASS}
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
          className={SUBMIT_CLASS}
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
