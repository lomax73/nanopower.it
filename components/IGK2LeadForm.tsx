"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { igk2LeadSchema, tipoEdificioOptions, type IGK2LeadValues } from "@/lib/igk2-lead-schema";
import { submitIGK2Lead } from "@/app/actions/igk2-lead";
import { INPUT_CLASS, LABEL_CLASS, SELECT_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";
import FormSuccess from "@/components/FormSuccess";

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
      <FormSuccess message="Richiesta ricevuta! Ti ricontatteremo a breve per il tuo preventivo IGK2." />
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
          <label htmlFor="igk2-nome" className={LABEL_CLASS}>
            Nome e Cognome
          </label>
          <input
            id="igk2-nome"
            type="text"
            autoComplete="name"
            className={INPUT_CLASS}
            {...register("nome")}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="igk2-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="igk2-email"
            type="email"
            autoComplete="email"
            className={INPUT_CLASS}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="igk2-telefono" className={LABEL_CLASS}>
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="igk2-telefono"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="igk2-citta" className={LABEL_CLASS}>
              Città
            </label>
            <input
              id="igk2-citta"
              type="text"
              autoComplete="address-level2"
              className={INPUT_CLASS}
              {...register("citta")}
            />
            {errors.citta && <p className="mt-1 text-xs text-red-400">{errors.citta.message}</p>}
          </div>

          <div>
            <label htmlFor="igk2-mq" className={LABEL_CLASS}>
              m² da trattare
            </label>
            <input
              id="igk2-mq"
              type="number"
              min="1"
              className={INPUT_CLASS}
              {...register("metriQuadri")}
            />
            {errors.metriQuadri && <p className="mt-1 text-xs text-red-400">{errors.metriQuadri.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="igk2-tipo" className={LABEL_CLASS}>
            Tipo edificio
          </label>
          <select
            id="igk2-tipo"
            defaultValue=""
            className={SELECT_CLASS}
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
          <label htmlFor="igk2-note" className={LABEL_CLASS}>
            Note <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="igk2-note"
            rows={3}
            className={INPUT_CLASS}
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
          className={SUBMIT_CLASS}
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
