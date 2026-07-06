const PRODUCTS = [
  {
    key: "igk2",
    title: "Isolamento Termico Nanotecnologico",
    text: "2-8 mm equivalenti a 12 cm di cappotto tradizionale. Senza demolizioni.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M12 2v10.5M12 12.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-2.2-8L12 6l2.2-1.5M9.5 6.8 12 8.3l2.5-1.5"
          stroke="#00A896"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "superfluid",
    title: "Massetto Calpestabile in 20 Ore",
    text: "L'unico additivo con garanzia decennale assicurativa fino a €10.000.000.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="13" r="7.5" stroke="#00A896" strokeWidth="1.4" />
        <path d="M12 9v4l2.6 1.6M9.5 2.5h5M12 2.5V4" stroke="#00A896" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "superelastik",
    title: "Membrana Elastica Impermeabilizzante",
    text: "Ponte su fessure fino a 2,8 mm. Protezione CO₂ per oltre 50 anni.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M12 2.5 4 5.8v5.4c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V5.8L12 2.5Z"
          stroke="#00A896"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ProductTeaser() {
  return (
    <section aria-label="Prodotti in arrivo" className="mx-auto grid w-full max-w-5xl gap-3 px-6 sm:grid-cols-3 sm:gap-4">
      {PRODUCTS.map((p, i) => (
        <div
          key={p.key}
          className={`nano-reveal nano-reveal-${i + 3} group border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-nano-teal`}
        >
          <div className="mb-4">{p.icon}</div>
          <h3 className="text-base font-semibold text-white sm:text-lg">{p.title}</h3>
          <p className="mt-2 text-sm text-nano-slate">{p.text}</p>
        </div>
      ))}
    </section>
  );
}
