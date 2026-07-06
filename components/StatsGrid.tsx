const STATS = [
  {
    value: "0,0014",
    unit: "W/mk",
    label: "La conducibilità termica più bassa sul mercato",
  },
  {
    value: "20",
    unit: "ore",
    label: "Tempo di calpestabilità del massetto SuperFluid",
  },
  {
    value: "10",
    unit: "anni",
    label: "Garanzia assicurativa SuperFluid (€10.000.000)",
  },
  {
    value: "2,8",
    unit: "mm",
    label: "Ampiezza fessure che SuperElastiK è in grado di coprire",
  },
];

export default function StatsGrid() {
  return (
    <section aria-label="Dati tecnici chiave" className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 px-6 sm:gap-4">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`nano-reveal nano-reveal-${i + 2} border border-nano-teal/40 bg-nano-teal/5 p-4 sm:p-6`}
        >
          <p className="font-mono text-3xl font-black text-nano-gold sm:text-4xl">
            {stat.value}
            <span className="ml-1 text-base font-medium text-nano-gold/80 sm:text-lg">{stat.unit}</span>
          </p>
          <p className="mt-2 text-xs text-nano-slate sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
