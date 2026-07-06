import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Cookie Policy | nanopower.it",
  description: "Informativa sui cookie di nanopower.it.",
};

export default function CookiePolicyPage() {
  return (
    <PlaceholderPage
      title="Cookie Policy"
      description="L'informativa sui cookie è in preparazione."
    />
  );
}
