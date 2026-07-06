import type { Metadata } from "next";
import Link from "next/link";
import SuperElastikLeadForm from "@/components/SuperElastikLeadForm";

export const metadata: Metadata = {
  title: "SuperElastiK — Membrana Impermeabilizzante Elastica Bicomponente | nanopower.it",
  description:
    "SuperElastiK: membrana bicomponente elastica conforme EN 14891 + EN 1504-2. Protezione dalla carbonatazione del calcestruzzo per oltre 50 anni.",
};

const SCHEDA_TECNICA = [
  [
    "Tipologia",
    "Malta bicomponente alleggerita a base di leganti cementizi minerali, filler minerali e additivi in dispersione acquosa",
    "Disponibile in Bassa e Alta Densità",
  ],
  ["Componenti", "Componente A (polvere) + Componente B (liquido)", "Miscelazione meccanica, mai a mano"],
  [
    "Spessore per mano",
    "Fino a 2 mm",
    "Min. 2 mani con rete in fibra di vetro 4×4 mm, 160 g/m² tra le due",
  ],
  [
    "Capacità di ponte fessure (-20°C)",
    "Classe A5 (Bassa Densità) / Classe A3 (Alta Densità)",
    "EN 14891, crack-bridging dinamico >0,5 mm",
  ],
  ["Adesione al calcestruzzo (28gg)", "1,4 N/mm² (LD) / 1,1 N/mm² (HD)", "—"],
  ["Impermeabilità all'acqua", "< 0,05 kg/m²·h⁰˙⁵", "—"],
  ["Impermeabilità sotto pressione", "Nessuna penetrazione a 1,5 bar", "—"],
  ["Protezione CO₂ (carbonatazione)", "Oltre 50 anni", "2 mm di SuperElastiK equivalgono a 30 mm di copriferro (a/c 0,45)"],
  ["Reazione al fuoco", "Euroclasse B, s1-d0", "—"],
  ["Elasticità", "Fino a -10°C", "Resistente a cloruri, sali disgelanti e raggi UV"],
  ["Normative", "EN 14891 · EN 1504-2 (C), principi PI/MC/IR · EN 1504-9", "Reg. (CE) 1907/2006 REACH, All. XVII voce 47"],
];

const LD_HD = [
  ["Consumo applicazione manuale", "~1,05 kg/m² per mm", "~1,74 kg/m² per mm"],
  ["Consumo a spruzzo", "~1,1 kg/m² per mm", "~2 kg/m² per mm"],
  ["Adesione al calcestruzzo", "1,4 N/mm²", "1,1 N/mm²"],
  ["Crack-bridging (-20°C)", "Classe A5 (>0,5 mm)", "Classe A3 (>0,5 mm)"],
  ["Applicazione ideale", "Strutture soggette a movimenti e fessurazione", "Vasche, piscine, alta pressione idrostatica"],
];

const APPLICAZIONI = [
  "Fondamenta e interrati",
  "Vasche e piscine",
  "Terrazze e balconi",
  "Ponti e viadotti",
  "Pareti con spinta idrostatica",
  "Strutture in CA deteriorate",
];

export default function SuperElastiKPage() {
  return (
    <div className="flex flex-col">
      <section
        className="relative flex flex-col items-center px-6 pb-20 pt-20 text-center"
        style={{
          backgroundColor: "#0D1F33",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 24px)",
        }}
      >
        <p className="nano-reveal nano-reveal-1 inline-flex items-center gap-2 border border-nano-teal/40 bg-nano-teal/5 px-4 py-1.5 text-xs nano-tracking-label uppercase text-nano-teal">
          EN 14891 + EN 1504-2
        </p>
        <h1 className="nano-reveal nano-reveal-2 mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
          SuperElastiK — Membrana Impermeabilizzante Elastica Bicomponente
        </h1>
        <p className="nano-reveal nano-reveal-3 mt-5 max-w-xl text-base text-nano-slate sm:text-lg">
          Ponte su fessure certificato EN 14891 (Classe A5) · Protezione dalla carbonatazione per oltre 50 anni
        </p>
        <div className="nano-reveal nano-reveal-4 mt-8">
          <Link
            href="#consulenza"
            className="bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Richiedi consulenza tecnica
          </Link>
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
          <p className="mt-4 text-center text-xs text-nano-slate/70">
            Manuale di posa completo:{" "}
            <a
              href="/schede-tecniche/superelastik-manuale-posa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nano-teal hover:text-white"
            >
              scarica il PDF
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-nano-navy-light/40 py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Bassa Densità vs Alta Densità</h2>
          <div className="mt-8 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-nano-navy-light">
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Aspetto</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Bassa Densità</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Alta Densità</th>
                </tr>
              </thead>
              <tbody>
                {LD_HD.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[0]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[1]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Applicazioni</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICAZIONI.map((app) => (
              <div key={app} className="flex items-center gap-3 border border-white/10 p-5">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" aria-hidden="true">
                  <path d="M5 13.5 9.5 18 19 6" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-white">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 border border-nano-teal/40 bg-nano-teal/5 p-8 text-center">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
            <path
              d="M12 2.5 4 5.8v5.4c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V5.8L12 2.5Z"
              stroke="#00A896"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-xl font-black text-white sm:text-2xl">Perché protegge il calcestruzzo</h2>
          <p className="text-sm text-nano-slate">
            Il calcestruzzo armato si deteriora quando la CO₂ atmosferica penetra nella massa e abbassa il pH fino a
            corrodere le armature (carbonatazione). SuperElastiK forma una barriera impermeabile che blocca CO₂ e
            umidità per oltre 50 anni, preservando le strutture senza interventi successivi.
          </p>
        </div>
      </section>

      <section id="consulenza" className="py-20">
        <SuperElastikLeadForm />
      </section>
    </div>
  );
}
