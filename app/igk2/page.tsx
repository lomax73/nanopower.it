import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "IGK2 — Isolamento Termico Nanotecnologico | nanopower.it",
  description: "IGK2: isolamento termico nanotecnologico, 2-8 mm equivalenti a 12 cm di cappotto tradizionale. Pagina in arrivo.",
};

export default function IGK2Page() {
  return (
    <PlaceholderPage
      title="IGK2 — Isolamento Termico Nanotecnologico"
      description="La pagina dedicata a IGK2 è in preparazione. Conducibilità termica 0,0014 W/mk, spessori 2-8 mm, senza demolizioni."
    />
  );
}
