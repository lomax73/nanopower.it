import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Casi Studio | nanopower.it",
  description: "Progetti reali realizzati con IGK2, SuperFluid e SuperElastiK. Pagina in arrivo.",
};

export default function CasiStudioPage() {
  return (
    <PlaceholderPage
      title="Casi Studio"
      description="I casi studio dei progetti realizzati con i nostri materiali sono in preparazione."
    />
  );
}
