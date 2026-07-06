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
import { INPUT_CLASS, LABEL_CLASS, SELECT_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";
import FormSuccess from "@/components/FormSuccess";

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
      <FormSuccess message="Richiesta ricevuta! Un nostro tecnico ti ricontatterà per SuperElastiK." />
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
          <label htmlFor="se-nome" className={LABEL_CLASS}>
            Nome e Cognome
          </label>
          <input
            id="se-nome"
            type="text"
            autoComplete="name"
            className={INPUT_CLASS}
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="se-azienda" className={LABEL_CLASS}>
            Azienda <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="se-azienda"
            type="text"
            autoComplete="organization"
            className={INPUT_CLASS}
            {...register("azienda")}
          />
        </div>

        <div>
          <label htmlFor="se-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="se-email"
            type="email"
            autoComplete="email"
            className={INPUT_CLASS}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="se-telefono" className={LABEL_CLASS}>
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="se-telefono"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="se-tipo" className={LABEL_CLASS}>
              Tipo progetto
            </label>
            <select
              id="se-tipo"
              defaultValue=""
              className={SELECT_CLASS}
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
            <label htmlFor="se-mq" className={LABEL_CLASS}>
              m² stimati
            </label>
            <input
              id="se-mq"
              type="number"
              min="1"
              className={INPUT_CLASS}
              {...register("metriQuadri")}
            />
            {errors.metriQuadri && <p className="mt-1 text-xs text-red-400">{errors.metriQuadri.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="se-descrizione" className={LABEL_CLASS}>
            Descrizione breve <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="se-descrizione"
            rows={3}
            className={INPUT_CLASS}
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
          className={SUBMIT_CLASS}
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
