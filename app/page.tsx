import MolecularLattice from "@/components/MolecularLattice";
import StatsGrid from "@/components/StatsGrid";
import ProductTeaser from "@/components/ProductTeaser";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <MolecularLattice />

      <main className="relative z-10 flex flex-col gap-20 pb-24 pt-20 sm:gap-28 sm:pt-28">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <p className="nano-reveal nano-reveal-1 font-mono text-2xl font-black tracking-tight text-white sm:text-3xl">
            nanopower<span className="text-nano-teal">.</span>
          </p>
          <p className="nano-reveal nano-reveal-2 nano-tracking-label mt-3 text-xs font-light uppercase text-nano-slate sm:text-sm">
            Materiali edili ad alte prestazioni
          </p>
          <h1 className="nano-reveal nano-reveal-3 mt-6 text-3xl font-black leading-tight text-white sm:text-5xl sm:leading-tight">
            I materiali che cambiano le regole dell&apos;edilizia.
            <br />
            In arrivo.
          </h1>
          <p className="nano-reveal nano-reveal-4 mt-5 max-w-xl text-base text-nano-slate sm:text-lg">
            IGK2 · SuperFluid · SuperElastiK — tecnologie nanotecnologiche e cementite per
            costruire e ristrutturare meglio, più velocemente, con garanzie reali.
          </p>
        </section>

        <StatsGrid />
        <ProductTeaser />
        <LeadForm />
        <Footer />
      </main>

      <WhatsAppButton />
    </div>
  );
}
