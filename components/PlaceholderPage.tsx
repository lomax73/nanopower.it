import Link from "next/link";

export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center px-6 py-28 text-center">
      <p className="nano-tracking-label text-xs font-light uppercase text-nano-teal">In lavorazione</p>
      <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base text-nano-slate">{description}</p>
      <Link
        href="/"
        className="mt-8 border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-nano-teal hover:text-nano-teal"
      >
        ← Torna alla homepage
      </Link>
    </section>
  );
}
