import Link from "next/link";

const PRODOTTI_SERVIZI = [
  { href: "/igk2", label: "IGK2" },
  { href: "/superfluid", label: "SuperFluid" },
  { href: "/superelastik", label: "SuperElastiK" },
  { href: "/formazione", label: "Formazione" },
  { href: "/calcolatore-risparmio", label: "Calcolatore Risparmio" },
  { href: "/area-tecnici", label: "Area Tecnici" },
];

const AZIENDA = [
  { href: "/casi-studio", label: "Casi Studio" },
  { href: "/blog", label: "Blog" },
  { href: "/richiedi-info", label: "Richiedi Info" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xl font-black tracking-tight text-white">
            nanopower<span className="text-nano-teal">.</span>
          </p>
          <p className="text-sm text-nano-slate">
            Materiali edili nanotecnologici e chimica avanzata per costruire e ristrutturare
            meglio, con performance misurabili e garanzie reali.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@nanopower.it"
              aria-label="Email nanopower"
              className="text-nano-slate transition-colors hover:text-nano-teal"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path d="m3 6 9 7 9-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/fbosolution"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Fbosolution"
              className="text-nano-slate transition-colors hover:text-nano-teal"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.98h4v10.02H3V9.98Zm7 0h3.83v1.37h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.55 4.78 5.87v6.75h-4v-5.98c0-1.43-.03-3.26-2-3.26-2 0-2.3 1.53-2.3 3.15v6.09h-4V9.98Z" />
              </svg>
            </a>
          </div>
          <p className="inline-flex w-fit items-center border border-nano-teal/40 bg-nano-teal/5 px-3 py-1.5 text-xs text-nano-teal">
            Rivenditore Autorizzato i-GlooKlima &amp; i-GlooAdvance
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs nano-tracking-label uppercase text-nano-slate/70">Prodotti &amp; Servizi</p>
          {PRODOTTI_SERVIZI.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-nano-slate transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs nano-tracking-label uppercase text-nano-slate/70">Azienda</p>
          {AZIENDA.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-nano-slate transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          <p className="mt-2 text-sm text-nano-slate">
            Un brand di{" "}
            <a
              href="https://fbosolution.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nano-teal transition-colors hover:text-white"
            >
              Fbosolution.it
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-nano-slate/70">
            © 2026 nanopower.it — Fbosolution.it P.IVA IT03536370129
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-nano-slate/70 transition-colors hover:text-nano-teal">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-xs text-nano-slate/70 transition-colors hover:text-nano-teal">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
