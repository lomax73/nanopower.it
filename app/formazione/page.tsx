import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Formazione | nanopower.it",
  description: "Corsi di formazione su posa e applicazione dei materiali nanopower per tecnici e imprese edili. Pagina in arrivo.",
};

export default function FormazionePage() {
  return (
    <PlaceholderPage
      title="Formazione"
      description="La sezione formazione per tecnici e imprese edili è in preparazione."
    />
  );
}
