import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Area Tecnici | nanopower.it",
  robots: { index: false, follow: false },
};

type Document = { title: string; filename: string };

const SCHEDE_TECNICHE: Document[] = [
  { title: "IGK2 — Scheda tecnica completa", filename: "igk2-scheda-tecnica.pdf" },
  { title: "SuperFluid — Guida prodotti e varianti", filename: "superfluid-guida-prodotti.pdf" },
  { title: "SuperElastiK — Manuale e scheda tecnica", filename: "superelastik-manuale-posa.pdf" },
];

const MANUALI_APPLICAZIONE: Document[] = [
  { title: "IGK2 — Manuale di posa passo-passo", filename: "igk2-manuale-posa.pdf" },
  { title: "SuperFluid — Garanzia decennale e condizioni", filename: "superfluid-garanzia-decennale.pdf" },
];

const MATERIALE_MARKETING: Document[] = [
  { title: "Brochure IGK2", filename: "brochure-igk2-2020.pdf" },
  { title: "Loghi brand (ZIP)", filename: "loghi-brand.zip" },
];

function DocumentSection({ title, documents }: { title: string; documents: Document[] }) {
  return (
    <section>
      <h2 className="text-lg font-black text-white">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div key={doc.filename} className="flex flex-col gap-3 border border-white/10 p-5">
            <p className="text-sm text-white">{doc.title}</p>
            <a
              href={`/api/documents/${doc.filename}`}
              className="mt-auto inline-block bg-nano-teal px-4 py-2 text-center text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
            >
              Scarica
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function AreaTecniciPage() {
  const session = await getServerSession(authOptions);
  const nome = session?.user?.name?.split(" ")[0] || "Tecnico";

  return (
    <div className="flex flex-col gap-16 py-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
        <h1 className="text-2xl font-black text-white sm:text-3xl">
          Benvenuto, {nome} — Area Tecnici Certificati
        </h1>
        <LogoutButton />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6">
        <DocumentSection title="Schede Tecniche" documents={SCHEDE_TECNICHE} />
        <DocumentSection title="Manuali Applicazione" documents={MANUALI_APPLICAZIONE} />
        <DocumentSection title="Materiale Marketing" documents={MATERIALE_MARKETING} />

        <section>
          <h2 className="text-lg font-black text-white">La mia certificazione</h2>
          <div className="mt-4 border border-white/10 p-6">
            <p className="text-sm text-white">Non risulti ancora certificato SuperFluid.</p>
            <p className="mt-2 text-sm text-nano-slate">
              Il corso di certificazione (4 giorni, teorico + pratico) ti permette di offrire ai tuoi
              clienti la garanzia decennale assicurativa.
            </p>
            <Link
              href="/formazione"
              className="mt-4 inline-block bg-nano-teal px-4 py-2 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
            >
              Scopri il corso →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
