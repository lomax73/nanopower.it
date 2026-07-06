import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Area Tecnici | nanopower.it",
  description: "Area riservata per tecnici e installatori nanopower.",
  robots: { index: false, follow: false },
};

export default function AreaTecniciPage() {
  return (
    <PlaceholderPage
      title="Area Tecnici"
      description="L'area riservata ai tecnici, con accesso a schede tecniche e formazione, è in preparazione."
    />
  );
}
