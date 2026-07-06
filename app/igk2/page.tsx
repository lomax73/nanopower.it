import type { Metadata } from "next";
import Link from "next/link";
import IGK2LeadForm from "@/components/IGK2LeadForm";

export const metadata: Metadata = {
  title: "IGK2 — Isolamento Termico Nanotecnologico | nanopower.it",
  description:
    "IGK2: rasante nanocomposito con conducibilità termica λ = 0,0014 W/mk. Solo 2-8 mm equivalenti a 12 cm di cappotto tradizionale, senza demolizioni.",
};

const SCHEDA_TECNICA = [
  ["Tipologia", "Rasante nanocomposito in pasta, monocomponente premiscelato", "Pronto all'uso"],
  ["Confezione", "22 / 27 / 32 litri", "—"],
  ["Resa", "~1 lt / m² / mm", "Varia in base alla porosità del fondo"],
  ["Spessore consigliato", "2–10 mm", "Adattabile alle esigenze"],
  ["Conducibilità termica dichiarata", "λD = 0,0014 W/mk", "Il più basso tra i rasanti"],
  ["Adesione al supporto", "0,24 N/mm²", "—"],
  ["Massa volumetrica essiccata", "~277 kg/m³ (±9%)", "Variabilità stagionale"],
  ["Reazione al fuoco", "Euroclasse B-s1, d0", "—"],
  ["Permeabilità al vapore acqueo (μ)", "6,3", "—"],
  ["Proprietà", "Antimuffa, traspirante, idrofugo, atossico", "100% riciclabile, zero VOC"],
  ["Agevolazioni", "Ecobonus 65%, Bonus Ristrutturazione 50%", "Verifica con tecnico abilitato"],
];

const COMPARAZIONE = [
  { label: "IGK2", value: 8, unit: "mm" },
  { label: "Lana di rocca", value: 80, unit: "mm" },
  { label: "EPS", value: 100, unit: "mm" },
  { label: "Polistirene", value: 120, unit: "mm" },
];
const COMPARAZIONE_MAX = Math.max(...COMPARAZIONE.map((c) => c.value));

const QUANDO_USARE = [
  {
    title: "Edifici storici con vincoli",
    text: "Dove il cappotto esterno è vietato o impossibile da installare.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M4 21V10l8-6 8 6v11M9 21v-6h6v6" stroke="#00A896" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Ambienti interni",
    text: "Riduzione di spessore minima, nessuna perdita di metratura utile.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1" stroke="#00A896" strokeWidth="1.4" />
        <path d="M4 15h16" stroke="#00A896" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Ristrutturazioni veloci",
    text: "Applicazione rapida a spatola, senza opere murarie invasive.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M14 4 20 10 9 21H4v-5L14 4Z" stroke="#00A896" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function IGK2Page() {
  return (
    <div className="flex flex-col">
      <section
        className="relative flex flex-col items-center px-6 pb-20 pt-20 text-center"
        style={{ background: "linear-gradient(180deg, #0D1F33 0%, #0A2A3A 100%)" }}
      >
        <p className="nano-reveal nano-reveal-1 inline-flex items-center gap-2 border border-nano-teal/40 bg-nano-teal/5 px-4 py-1.5 text-xs nano-tracking-label uppercase text-nano-teal">
          λ = 0,0014 W/mk — Il più basso sul mercato
        </p>
        <h1 className="nano-reveal nano-reveal-2 mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
          IGK2 — Isolamento Termico Nanotecnologico
        </h1>
        <p className="nano-reveal nano-reveal-3 mt-5 max-w-xl text-base text-nano-slate sm:text-lg">
          Solo 2-8 mm equivalenti a 12 cm di cappotto tradizionale. Senza demolizioni.
        </p>
        <div className="nano-reveal nano-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#preventivo"
            className="bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Richiedi un campione gratuito
          </Link>
          <a
            href="/schede-tecniche/igk2-scheda-tecnica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
          >
            Scarica scheda tecnica PDF
          </a>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Scheda tecnica</h2>
          <div className="mt-8 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-nano-navy-light">
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Caratteristica</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Valore</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Note</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDA_TECNICA.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[0]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[1]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-nano-navy-light/40 py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Meno spessore, stessa protezione</h2>
          <p className="mt-2 text-center text-sm text-nano-slate">
            Spessore necessario per resistenza termica equivalente R=5,7 m²K/W
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {COMPARAZIONE.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm text-white">{item.label}</span>
                <div className="h-6 flex-1 bg-white/5">
                  <div
                    className={item.label === "IGK2" ? "h-full bg-nano-teal" : "h-full bg-nano-slate/50"}
                    style={{ width: `${(item.value / COMPARAZIONE_MAX) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-sm text-nano-gold">
                  {item.value} {item.unit}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-nano-slate/70">
            Dati illustrativi. La conducibilità termica effettiva dipende dalle condizioni di posa.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-6 px-6 sm:grid-cols-3">
          {QUANDO_USARE.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 border border-white/10 p-6">
              {item.icon}
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-nano-slate">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Prima e dopo</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="flex h-48 flex-col items-center justify-center gap-2 text-center"
              style={{ background: "linear-gradient(135deg, #7a1a0f 0%, #c2410c 100%)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Prima</p>
              <p className="text-xs text-white/70">Dispersione termica elevata</p>
            </div>
            <div
              className="flex h-48 flex-col items-center justify-center gap-2 text-center"
              style={{ background: "linear-gradient(135deg, #0a2a3a 0%, #00a896 100%)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Dopo</p>
              <p className="text-xs text-white/70">Dispersione termica ridotta</p>
            </div>
          </div>
          {/* Sostituire con immagini termografiche reali */}
          <p className="mt-4 text-center text-xs italic text-nano-slate/70">
            Le immagini termografiche dei tuoi cantieri vanno inserite qui.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="border border-nano-teal/40 bg-nano-teal/5 p-8">
            <h2 className="text-xl font-black text-white sm:text-2xl">Agevolazioni fiscali</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-nano-slate">
              <li>
                <strong className="text-white">Ecobonus 65%</strong> — per interventi di riqualificazione energetica.
              </li>
              <li>
                <strong className="text-white">Bonus Ristrutturazione 50%</strong> — lavori di manutenzione straordinaria.
              </li>
              <li>
                <strong className="text-white">SuperBonus</strong> — verificare applicabilità caso per caso.
              </li>
            </ul>
            <p className="mt-5 text-xs text-nano-slate/70">
              Verifica con il tuo tecnico abilitato le condizioni specifiche di accesso.
            </p>
          </div>
        </div>
      </section>

      <section id="preventivo" className="py-20">
        <IGK2LeadForm />
      </section>
    </div>
  );
}
