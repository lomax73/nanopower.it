import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Richiesta in revisione | Area Tecnici nanopower.it",
  robots: { index: false, follow: false },
};

export default function NonApprovatoPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center px-6 py-24 text-center">
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#00A896" strokeWidth="1.4" />
        <path d="M12 7v5l3.5 2" stroke="#00A896" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h1 className="mt-6 text-2xl font-black text-white">Richiesta in fase di revisione</h1>
      <p className="mt-4 text-sm text-nano-slate">
        La tua richiesta di accesso all&apos;area tecnici è in fase di revisione. Ti avviseremo via email
        non appena approvata. Di solito entro 24 ore lavorative.
      </p>
      <p className="mt-6 text-sm text-nano-slate">
        Per urgenze:{" "}
        <a href="mailto:f.lomazzi@fbosolution.it" className="text-nano-teal hover:text-white">
          f.lomazzi@fbosolution.it
        </a>
      </p>
    </div>
  );
}
