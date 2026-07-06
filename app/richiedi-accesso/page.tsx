import type { Metadata } from "next";
import RichiediAccessoForm from "@/components/RichiediAccessoForm";

export const metadata: Metadata = {
  title: "Richiedi Accesso Area Tecnici | nanopower.it",
  description: "Richiedi l'accesso all'area riservata tecnici di nanopower.it.",
  robots: { index: false, follow: false },
};

export default function RichiediAccessoPage() {
  return (
    <div className="flex flex-col py-20">
      <RichiediAccessoForm />
    </div>
  );
}
