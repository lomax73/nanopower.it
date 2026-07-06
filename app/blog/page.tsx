import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Blog | nanopower.it",
  description: "Approfondimenti tecnici su isolamento termico, massetti e impermeabilizzazione. Pagina in arrivo.",
};

export default function BlogPage() {
  return (
    <PlaceholderPage
      title="Blog"
      description="Il blog con approfondimenti tecnici è in preparazione."
    />
  );
}
