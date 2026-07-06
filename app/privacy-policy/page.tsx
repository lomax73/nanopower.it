import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy Policy | nanopower.it",
  description: "Informativa sulla privacy di nanopower.it.",
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="L'informativa sulla privacy è in preparazione."
    />
  );
}
