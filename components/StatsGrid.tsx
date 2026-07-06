"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    target: 0.0014,
    decimals: 4,
    unit: "W/mk",
    label: "La conducibilità termica più bassa sul mercato",
  },
  {
    target: 12,
    decimals: 0,
    unit: "ore",
    label: "Calpestabilità minima SuperFluid (variante 6-CORE)",
  },
  {
    target: 10,
    decimals: 0,
    unit: "anni",
    label: "Garanzia assicurativa SuperFluid (€5.000.000)",
  },
  {
    target: 2.8,
    decimals: 1,
    unit: "mm",
    label: "Ampiezza fessure che SuperElastiK è in grado di coprire",
  },
];

function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value.toLocaleString("it-IT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Stat({ stat, active }: { stat: (typeof STATS)[number]; active: boolean }) {
  const formatted = useCountUp(stat.target, stat.decimals, active);
  return (
    <div className="border border-nano-teal/40 bg-nano-teal/5 p-4 sm:p-6">
      <p className="font-mono text-3xl font-black text-nano-gold sm:text-4xl">
        {formatted}
        <span className="ml-1 text-base font-medium text-nano-gold/80 sm:text-lg">{stat.unit}</span>
      </p>
      <p className="mt-2 text-xs text-nano-slate sm:text-sm">{stat.label}</p>
    </div>
  );
}

export default function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Dati tecnici chiave"
      className="w-full bg-[#0F2840] py-16"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 px-6 sm:gap-4">
        {STATS.map((stat) => (
          <Stat key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}
