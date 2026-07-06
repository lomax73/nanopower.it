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
import { INPUT_CLASS, LABEL_CLASS, SELECT_CLASS, SUBMIT_CLASS } from "@/lib/form-styles";
import FormSuccess from "@/components/FormSuccess";

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
      <FormSuccess message="Richiesta inviata! Ti rispondo entro 24 ore.">
        <p className="text-sm text-nano-slate">
          Una volta approvata la richiesta potrai accedere con l&apos;email e la password che hai scelto.
        </p>
      </FormSuccess>
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
            <label htmlFor="ra-nome" className={LABEL_CLASS}>
              Nome
            </label>
            <input
              id="ra-nome"
              type="text"
              className={INPUT_CLASS}
              {...register("nome")}
            />
            {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="ra-cognome" className={LABEL_CLASS}>
              Cognome
            </label>
            <input
              id="ra-cognome"
              type="text"
              className={INPUT_CLASS}
              {...register("cognome")}
            />
            {errors.cognome && <p className="mt-1 text-xs text-red-400">{errors.cognome.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="ra-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="ra-email"
            type="email"
            autoComplete="email"
            className={INPUT_CLASS}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="ra-azienda" className={LABEL_CLASS}>
            Azienda / Studio <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="ra-azienda"
            type="text"
            className={INPUT_CLASS}
            {...register("azienda")}
          />
        </div>

        <div>
          <label htmlFor="ra-tipo" className={LABEL_CLASS}>
            Sei un
          </label>
          <select
            id="ra-tipo"
            defaultValue=""
            className={SELECT_CLASS}
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
          <label htmlFor="ra-telefono" className={LABEL_CLASS}>
            Telefono <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <input
            id="ra-telefono"
            type="tel"
            className={INPUT_CLASS}
            {...register("telefono")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ra-password" className={LABEL_CLASS}>
              Password
            </label>
            <input
              id="ra-password"
              type="password"
              autoComplete="new-password"
              className={INPUT_CLASS}
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="ra-conferma" className={LABEL_CLASS}>
              Conferma password
            </label>
            <input
              id="ra-conferma"
              type="password"
              autoComplete="new-password"
              className={INPUT_CLASS}
              {...register("confermaPassword")}
            />
            {errors.confermaPassword && (
              <p className="mt-1 text-xs text-red-400">{errors.confermaPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="ra-messaggio" className={LABEL_CLASS}>
            Perché vuoi accedere all&apos;area tecnici? <span className="normal-case text-nano-slate/60">(opzionale)</span>
          </label>
          <textarea
            id="ra-messaggio"
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
