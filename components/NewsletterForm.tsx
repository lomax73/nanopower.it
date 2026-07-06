"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/newsletter-schema";
import { subscribeNewsletter } from "@/app/actions/newsletter";

type Status = "idle" | "success" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterValues) => {
    setStatus("idle");
    const result = await subscribeNewsletter(values);
    if ("success" in result) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  if (status === "success") {
    return <p className="text-sm text-nano-teal">Iscrizione confermata, grazie!</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="text-xs nano-tracking-label uppercase text-nano-slate">
        Rimani aggiornato
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="La tua email"
        autoComplete="email"
        className="w-full border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-nano-slate/60 focus:border-nano-teal focus:outline-none"
        {...register("email")}
      />
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      {status === "error" && <p className="text-xs text-red-400">{errorMessage}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 bg-nano-teal px-4 py-2.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Invio..." : "Iscriviti"}
      </button>
    </form>
  );
}
