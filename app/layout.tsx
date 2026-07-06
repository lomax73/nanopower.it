import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://nanopower.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "nanopower.it — Materiali Edili Nanotecnologici | Coming Soon",
  description:
    "IGK2, SuperFluid e SuperElastiK: materiali edili ad alte prestazioni. Isolamento termico nanotecnologico, massetti con garanzia 10 anni, membrane elastiche EN 14891.",
  openGraph: {
    title: "nanopower.it — Materiali Edili Nanotecnologici",
    description:
      "IGK2, SuperFluid e SuperElastiK: materiali edili ad alte prestazioni. Isolamento termico nanotecnologico, massetti con garanzia 10 anni, membrane elastiche EN 14891.",
    url: siteUrl,
    siteName: "nanopower.it",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nanopower.it — Materiali Edili Nanotecnologici",
    description:
      "IGK2, SuperFluid e SuperElastiK: materiali edili ad alte prestazioni.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1F33",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full bg-nano-navy font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
