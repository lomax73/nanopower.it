import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Richiedi Consulenza | nanopower.it",
  description: "Richiedi una consulenza gratuita su IGK2, SuperFluid e SuperElastiK.",
};

export default function RichiediInfoPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center">
      <p className="nano-tracking-label text-xs font-light uppercase text-nano-teal">Consulenza gratuita</p>
      <div className="mt-10 w-full">
        <LeadForm />
      </div>
    </section>
  );
}
