import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "SuperFluid — Massetti con Garanzia Decennale | nanopower.it",
  description: "SuperFluid: massetto calpestabile in 20 ore, unico in Italia con garanzia assicurativa decennale fino a €10.000.000. Pagina in arrivo.",
};

export default function SuperFluidPage() {
  return (
    <PlaceholderPage
      title="SuperFluid — Massetti con Garanzia Decennale"
      description="La landing dedicata a SuperFluid è in preparazione. L'unico massetto in Italia con garanzia assicurativa decennale fino a €10.000.000."
    />
  );
}
