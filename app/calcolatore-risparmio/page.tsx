import type { Metadata } from "next";
import EnergyCalculator from "@/components/EnergyCalculator";

export const metadata: Metadata = {
  title: "Calcolatore Risparmio Energetico IGK2 | nanopower.it",
  description:
    "Calcola il risparmio energetico stimato applicando IGK2 alla tua superficie: bolletta, kWh risparmiati, CO₂ evitata e tempo di rientro dell'investimento.",
};

export default function CalcolatoreRisparmioPage() {
  return (
    <div className="flex flex-col py-20">
      <div className="mx-auto mb-12 flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <p className="nano-tracking-label text-xs font-light uppercase text-nano-teal">
          Strumento interattivo
        </p>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
          Calcolatore Risparmio Energetico
        </h1>
        <p className="mt-4 text-base text-nano-slate">
          Imposta i parametri del tuo edificio e scopri in tempo reale il risparmio stimato con IGK2.
        </p>
      </div>

      <EnergyCalculator />
    </div>
  );
}
