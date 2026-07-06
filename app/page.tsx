import Link from "next/link";
import MolecularLattice from "@/components/MolecularLattice";
import StatsGrid from "@/components/StatsGrid";
import ProductTeaser from "@/components/ProductTeaser";
import LeadForm from "@/components/LeadForm";

const PERCHE_NANOPOWER = [
  {
    title: "Eccellenza Tecnica",
    text: "Prodotti con i dati più performanti del mercato, verificabili e certificati.",
  },
  {
    title: "Protezione Professionale",
    text: "Solo SuperFluid offre garanzia assicurativa 10 anni. Unica in Italia.",
  },
  {
    title: "Supporto Locale",
    text: "Sopralluogo, formazione, consulenza. Presente sul territorio, non solo online.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <MolecularLattice />

        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <p className="nano-reveal nano-reveal-1 inline-flex items-center gap-2 border border-nano-teal/40 bg-nano-teal/5 px-4 py-1.5 text-xs nano-tracking-label uppercase text-nano-teal">
            Rivenditore Autorizzato · Italia
          </p>
          <h1 className="nano-reveal nano-reveal-2 mt-6 text-3xl font-black leading-tight text-white sm:text-5xl sm:leading-tight">
            Materiali edili che ridefiniscono le prestazioni
          </h1>
          <p className="nano-reveal nano-reveal-3 mt-5 max-w-xl text-base text-nano-slate sm:text-lg">
            Nanotecnologia e chimica avanzata al servizio di chi costruisce e ristruttura.
            Performance misurabili. Garanzie reali. Supporto locale.
          </p>
          <div className="nano-reveal nano-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#prodotti"
              className="bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
            >
              Scopri i prodotti
            </Link>
            <Link
              href="/richiedi-info"
              className="border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
            >
              Richiedi consulenza gratuita
            </Link>
          </div>
        </div>

        <div className="nano-reveal nano-reveal-6 absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <svg viewBox="0 0 24 24" className="h-6 w-6 animate-bounce text-nano-teal" fill="none" aria-hidden="true">
            <path d="M12 4v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <StatsGrid />

      <section id="prodotti" className="py-20">
        <ProductTeaser />
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 sm:grid-cols-3">
          {PERCHE_NANOPOWER.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-nano-slate">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-nano-teal/30 bg-nano-teal/5 py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            L&apos;unico massetto con garanzia decennale assicurativa in Italia
          </h2>
          <p className="mt-4 max-w-xl text-base text-nano-slate">
            SuperFluid è la gamma di additivi che rende il massetto calpestabile in 12-24 ore
            a seconda della variante, con una protezione assicurativa che nessun altro prodotto
            sul mercato italiano offre.
          </p>
          <p className="mt-8 font-mono text-4xl font-black text-nano-gold sm:text-5xl">
            €5.000.000
            <span className="ml-2 block text-sm font-medium text-nano-slate sm:inline sm:text-base">
              di copertura assicurativa
            </span>
          </p>
          <Link
            href="/superfluid"
            className="mt-8 bg-nano-teal px-6 py-3.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Scopri SuperFluid →
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Hai un progetto? Parliamoci.</h2>
          <p className="mt-3 text-sm text-nano-slate">
            Compila il form: un nostro tecnico ti ricontatterà per una consulenza gratuita.
          </p>
          <div className="mt-8 w-full">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
