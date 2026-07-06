import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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

const nanoLogo = localFont({
  src: "./fonts/NanoLow.ttf",
  variable: "--font-nano-logo",
  display: "swap",
});

const siteUrl = "https://nanopower.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "nanopower.it — Materiali Edili Nanotecnologici",
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
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
    <html lang="it" className={`${inter.variable} ${plexMono.variable} ${nanoLogo.variable} h-full`}>
      <body className="min-h-full bg-nano-navy font-sans antialiased">
        <GoogleAnalytics />
        <div className="relative flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
