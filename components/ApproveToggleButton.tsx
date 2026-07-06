"use client";

import { useTransition } from "react";
import { toggleApprovazione } from "@/app/actions/admin-tecnici";

export default function ApproveToggleButton({ tecnicoId, approvato }: { tecnicoId: string; approvato: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => toggleApprovazione(tecnicoId, !approvato))}
      className={`border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
        approvato
          ? "border-red-400/40 text-red-400 hover:bg-red-400/10"
          : "border-nano-teal/40 text-nano-teal hover:bg-nano-teal/10"
      }`}
    >
      {isPending ? "..." : approvato ? "Revoca accesso" : "Approva"}
    </button>
  );
}
