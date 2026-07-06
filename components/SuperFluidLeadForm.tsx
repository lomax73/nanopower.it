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
import { INPUT_CLASS, LABEL_CLASS, SELECT_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";
import FormSuccess from "@/components/FormSuccess";

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
      <FormSuccess message="Richiesta ricevuta! Ti contatteremo entro 24 ore lavorative." />
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
            <label htmlFor="sf-nome" className={LABEL_CLASS}>
              Nome
            </label>
            <input
              id="sf-nome"
              type="text"
              autoComplete="given-name"
              className={INPUT_CLASS}
              {...register("nome")}
            />
            {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="sf-cognome" className={LABEL_CLASS}>
              Cognome
            </label>
            <input
              id="sf-cognome"
              type="text"
              autoComplete="family-name"
              className={INPUT_CLASS}
              {...register("cognome")}
            />
            {errors.cognome && <p className="mt-1 text-xs text-red-400">{errors.cognome.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="sf-azienda" className={LABEL_CLASS}>
            Azienda / Studio
          </label>
          <input
            id="sf-azienda"
            type="text"
            autoComplete="organization"
            className={INPUT_CLASS}
            {...register("azienda")}
          />
          {errors.azienda && <p className="mt-1 text-xs text-red-400">{errors.azienda.message}</p>}
        </div>

        <div>
          <label htmlFor="sf-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="sf-email"
            type="email"
            autoComplete="email"
            className={INPUT_CLASS}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="sf-telefono" className={LABEL_CLASS}>
            Telefono
          </label>
          <input
            id="sf-telefono"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            {...register("telefono")}
          />
          {errors.telefono && <p className="mt-1 text-xs text-red-400">{errors.telefono.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sf-ruolo" className={LABEL_CLASS}>
              Ruolo
            </label>
            <select
              id="sf-ruolo"
              defaultValue=""
              className={SELECT_CLASS}
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
            <label htmlFor="sf-regione" className={LABEL_CLASS}>
              Regione
            </label>
            <select
              id="sf-regione"
              defaultValue=""
              className={SELECT_CLASS}
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
          <label htmlFor="sf-messaggio" className={LABEL_CLASS}>
            Messaggio <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="sf-messaggio"
            rows={3}
            className={INPUT_CLASS}
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
