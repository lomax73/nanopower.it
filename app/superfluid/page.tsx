import type { Metadata } from "next";
import Link from "next/link";
import SuperFluidLeadForm from "@/components/SuperFluidLeadForm";

export const metadata: Metadata = {
  title: "SuperFluid — Massetti con Garanzia Assicurativa Decennale | nanopower.it",
  description:
    "SuperFluid: gamma di additivi per massetti calpestabili in 12-24 ore, con garanzia assicurativa postuma decennale fino a €5.000.000 per cantiere. Unica in Italia.",
};

const HERO_STATS = [
  { value: "12-24", unit: "ore", label: "Calpestabilità, a seconda della variante" },
  { value: "10", unit: "anni", label: "Garanzia assicurativa postuma" },
  { value: "€5.000.000", unit: "", label: "Copertura per cantiere" },
];

const GARANZIA_CHECKLIST = [
  "Copertura fino a €5.000.000 per cantiere, valida 10 anni dal completamento",
  "Esonero di responsabilità totale per posatori certificati",
  "Copertura dei rischi esecutivi per progettisti",
  "Conformità garantita per direttori lavori",
  "Polizza, certificazioni e report tecnici disponibili su richiesta",
];

const COMPARAZIONE = [
  ["Calpestabilità", "12-24 ore (a seconda della variante)", "48-72 ore"],
  ["Garanzia", "10 anni, assicurata fino a €5.000.000", "Garanzia standard, nessuna copertura assicurativa"],
  ["Esonero responsabilità posatori/tecnici", "Sì", "No"],
  ["Liberatoria finale di conformità", "Sì", "No"],
  ["Supervisione tecnica dedicata in cantiere", "Sì", "Raramente"],
  ["Formazione certificata per gli installatori", "Sì", "Raramente"],
];

const TIMELINE = [
  { step: "1", title: "Analisi progetto", text: "Assistenza nella stesura del capitolato e scelta della variante più adatta." },
  { step: "2", title: "Certificazione miscele", text: "Prelievo materiali e certificazione conformità di miscela e resistenze." },
  { step: "3", title: "Supervisione cantiere", text: "Tecnico dedicato durante la posa, con test e verifiche in corso d'opera." },
  { step: "4", title: "Test e verifiche", text: "Prove di resistenza, adesione e verifica dell'asciugatura secondo norma EN 13892." },
  { step: "5", title: "Liberatoria e garanzia", text: "Liberatoria finale e attivazione della polizza decennale da €5.000.000." },
];

const VARIANTI = [
  ["STANDARD", "L'alleato discreto, sempre presente. Versatile e affidabile in ogni situazione.", "40", "9", "7", "24", "4-8", "18"],
  ["EXPERT", "Per i cantieri più esigenti: precisione e rendimento anche in condizioni complesse.", "50", "10", "2", "16", "3-8", "27"],
  ["RAPID", "Asciugatura rapida senza compromessi su qualità e resistenza.", "45", "10", "3", "24", "3-8", "24"],
  ["FiberGel", "Fibre polimeriche nel gel per un massetto più robusto e stabile.", "45", "9", "7", "24", "3-8", "28"],
  ["NanoGel", "Gel con nano-fibra per livelli superiori di resistenza alla flessione.", "45", "9", "7", "24", "3-8", "35"],
  ["NanoFiber", "Nano-fibre per maggiore durabilità e prestazioni meccaniche.", "45", "9", "7", "24", "3-8", "35"],
  ["NEWTON", "Resistenze meccaniche incrementate fino al 30% rispetto a un additivo tradizionale.", "60", "12", "7", "24", "3-8", "35"],
  ["EXTENDED", "Finestra di lavorabilità prolungata fino a 4 ore per getti complessi.", "45", "10", "7", "24", "3-8", "35"],
  ["WmK", "Ottimizza la trasmissione del calore nei massetti con impianti radianti.", "47", "12", "7", "24", "3-8", "35"],
  ["LIGHT", "Massima efficacia anche nei massetti alleggeriti.", "40", "8", "7", "24", "3-8", "35"],
  ["RECYCLE", "Prestazioni ottimali anche con aggregati o componenti riciclati.", "40", "9", "7", "24", "3-8", "45"],
  ["THIN", "Alta resistenza meccanica per massetti a bassissimo spessore.", "47", "10", "7", "24", "2-8", "35"],
  ["IDRO 7", "Superfluidificante idrofobo per lavorabilità e resistenza all'umidità.", "40", "10", "7", "24", "4-8", "35"],
  ["6-CORE", "Tecnologia esclusiva: +35% prestazioni, 90% di maturazione in 24 ore.", "60", "12", "1", "12", "2-8", "45"],
];

export default function SuperFluidPage() {
  return (
    <div className="flex flex-col">
      <section
        className="relative flex flex-col items-center px-6 pb-20 pt-20 text-center"
        style={{
          backgroundColor: "#0D1F33",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 24px)",
        }}
      >
        <p className="nano-reveal nano-reveal-1 inline-flex items-center gap-2 border border-nano-teal/40 bg-nano-teal/5 px-4 py-1.5 text-xs nano-tracking-label uppercase text-nano-teal">
          Unico in Italia — Garanzia Assicurativa Decennale
        </p>
        <h1 className="nano-reveal nano-reveal-2 mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
          Il massetto che cambia le regole del cantiere
        </h1>
        <p className="nano-reveal nano-reveal-3 mt-5 max-w-xl text-base text-nano-slate sm:text-lg">
          Calpestabile in 12-24 ore a seconda della variante. Garantito 10 anni. Assicurato fino a
          €5.000.000 per cantiere.
        </p>

        <div className="nano-reveal nano-reveal-4 mt-10 grid w-full max-w-2xl grid-cols-3 gap-3">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="border border-nano-teal/40 bg-nano-teal/5 p-4">
              <p className="font-mono text-xl font-black text-nano-gold sm:text-2xl">
                {stat.value}
                {stat.unit && <span className="ml-1 text-sm font-medium text-nano-gold/80">{stat.unit}</span>}
              </p>
              <p className="mt-2 text-xs text-nano-slate">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="nano-reveal nano-reveal-5 mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#richiedi"
            className="bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Richiedi consulenza gratuita
          </Link>
          <a
            href="/schede-tecniche/superfluid-guida-prodotti.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
          >
            Scarica scheda tecnica
          </a>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl border-l-4 border-nano-teal bg-nano-teal/5 px-6 py-10 sm:px-10">
          <h2 className="text-xl font-black text-white sm:text-2xl">
            Non è una garanzia commerciale. È una polizza assicurativa.
          </h2>
          <p className="mt-4 text-sm text-nano-slate">
            Ogni cantiere trattato con SuperFluid è coperto da una polizza assicurativa postuma
            decennale, sottoscritta con compagnia primaria tedesca, fino a €5.000.000 per cantiere.
            Progettisti, direttori lavori e posatori certificati sono tutelati dalla responsabilità
            professionale sui danni coperti dalla polizza.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {GARANZIA_CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-white">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
                  <path d="M5 13.5 9.5 18 19 6" stroke="#00A896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-nano-slate/70">
            Fonte: dichiarazione di garanzia postuma decennale e guida servizi Technicae Progressum
            GmbH (produttore i-GlooAdvance SuperFluid).
          </p>
        </div>
      </section>

      <section className="bg-nano-navy-light/40 py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">
            SuperFluid vs massetto tradizionale
          </h2>
          <div className="mt-8 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-nano-navy-light">
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white"></th>
                  <th className="border-b border-white/10 bg-nano-teal/10 px-4 py-3 font-semibold text-nano-teal">
                    SuperFluid
                  </th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Massetto tradizionale</th>
                </tr>
              </thead>
              <tbody>
                {COMPARAZIONE.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[0]}</td>
                    <td className="border-b border-white/5 bg-nano-teal/5 px-4 py-3 text-white">{row[1]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Come funziona</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-5">
            {TIMELINE.map((item) => (
              <div key={item.step} className="flex flex-col gap-2 border-t-2 border-nano-teal pt-4">
                <span className="font-mono text-2xl font-black text-nano-gold">{item.step}</span>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-nano-slate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-nano-navy-light/40 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Gamma prodotti SuperFluid</h2>
          <p className="mt-2 text-center text-sm text-nano-slate">
            14 formulazioni per ogni esigenza di cantiere. Prezzi indicativi per tanica.
          </p>
          <div className="mt-8 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-nano-navy-light">
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Prodotto</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Beneficio principale</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Res. comp. N/mm²</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Res. fless. N/mm²</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Pronto posa (gg)</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Pedonabile (ore)</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Spessori (cm)</th>
                  <th className="border-b border-white/10 px-4 py-3 font-semibold text-white">Prezzo tanica</th>
                </tr>
              </thead>
              <tbody>
                {VARIANTI.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="border-b border-white/5 px-4 py-3 font-semibold text-white">{row[0]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-slate">{row[1]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[2]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[3]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[4]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[5]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-white">{row[6]}</td>
                    <td className="border-b border-white/5 px-4 py-3 text-nano-gold">{row[7]} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-nano-slate/70">
            Dati e prezzi indicativi dalla guida prodotti ufficiale. Fonte:{" "}
            <a
              href="/schede-tecniche/superfluid-guida-prodotti.pdf"
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

      <section className="py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Diventa Installatore Certificato SuperFluid</h2>
          <p className="max-w-xl text-sm text-nano-slate">
            Il corso da 4 giorni (pratico + teorico) ti permette di offrire la garanzia decennale
            assicurativa ai tuoi clienti. Solo gli installatori certificati possono attivare la
            liberatoria finale e la copertura assicurativa.
          </p>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-white">
            <li>→ Offri la garanzia da €5.000.000 ai tuoi clienti e vinci le gare</li>
            <li>→ Entri nella rete degli installatori certificati</li>
            <li>→ Accedi a materiale tecnico e formazione continua</li>
          </ul>
          <Link
            href="/formazione"
            className="mt-4 bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Iscriviti al prossimo corso →
          </Link>
        </div>
      </section>

      <section className="bg-nano-navy-light/40 py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h2 className="text-center text-2xl font-black text-white sm:text-3xl">Cosa dicono gli installatori</h2>
          {/* Sostituire con testimonianze reali di installatori certificati */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3 border border-white/10 p-6">
                <div className="flex gap-1 text-nano-gold">
                  {"★★★★★"}
                </div>
                <p className="text-sm text-nano-slate">
                  "Testimonianza di esempio: risparmio di tempo in cantiere e protezione
                  professionale che i clienti apprezzano subito."
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">Nome Cognome</p>
                  <p className="text-xs text-nano-slate/70">Ruolo, Città</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="richiedi" className="py-20">
        <SuperFluidLeadForm />
      </section>
    </div>
  );
}
