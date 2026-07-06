"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const SPESSORI = [2, 4, 6, 8] as const;

const ZONE_CLIMATICHE = [
  { key: "A", label: "Zona A (≤ 600 GG)", esempio: "es. Lampedusa", fabbisogno: 40 },
  { key: "B", label: "Zona B (601–900 GG)", esempio: "es. Palermo, Agrigento, Catania", fabbisogno: 60 },
  { key: "C", label: "Zona C (901–1.400 GG)", esempio: "es. Napoli, Bari, Reggio Calabria", fabbisogno: 80 },
  { key: "D", label: "Zona D (1.401–2.100 GG)", esempio: "es. Roma, Genova, Firenze", fabbisogno: 100 },
  { key: "E", label: "Zona E (2.101–3.000 GG)", esempio: "es. Milano, Torino, Venezia", fabbisogno: 130 },
  { key: "F", label: "Zona F (> 3.000 GG)", esempio: "es. Cortina, zone montane oltre 1.000 m", fabbisogno: 160 },
] as const;

const SISTEMI_RISCALDAMENTO = [
  { key: "gas", label: "Gas naturale", costoKwh: 0.11 },
  { key: "pompa", label: "Pompa di calore elettrica", costoKwh: 0.25 },
  { key: "gasolio", label: "Gasolio", costoKwh: 0.13 },
  { key: "tele", label: "Teleriscaldamento", costoKwh: 0.09 },
  { key: "pellet", label: "Pellet", costoKwh: 0.07 },
] as const;

const TIPI_EDIFICIO = [
  { key: "appartamento", label: "Appartamento in condominio", fattore: 0.7 },
  { key: "casa", label: "Casa indipendente", fattore: 1.0 },
  { key: "commerciale", label: "Edificio commerciale / uffici", fattore: 0.85 },
  { key: "pubblica", label: "Struttura pubblica", fattore: 0.9 },
] as const;

const RIDUZIONE: Record<number, number> = { 2: 0.18, 4: 0.28, 6: 0.35, 8: 0.4 };

const CLASSI_ENERGETICHE = ["G", "F", "E", "D", "C", "B", "A", "A+"] as const;

function useAnimatedNumber(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (target - from) * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}

function ResultCard({
  icon,
  value,
  label,
  flash,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  flash: boolean;
}) {
  return (
    <div
      className={`border bg-nano-teal/5 p-5 transition-colors duration-300 ${
        flash ? "border-nano-teal" : "border-nano-teal/40"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <p className="font-mono text-2xl font-black text-nano-gold sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-nano-slate sm:text-sm">{label}</p>
    </div>
  );
}

export default function EnergyCalculator() {
  const [mq, setMq] = useState(80);
  const [spessore, setSpessore] = useState<(typeof SPESSORI)[number]>(4);
  const [zonaKey, setZonaKey] = useState<(typeof ZONE_CLIMATICHE)[number]["key"]>("D");
  const [sistemaKey, setSistemaKey] = useState<(typeof SISTEMI_RISCALDAMENTO)[number]["key"]>("gas");
  const [edificioKey, setEdificioKey] = useState<(typeof TIPI_EDIFICIO)[number]["key"]>("appartamento");

  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(t);
  }, [mq, spessore, zonaKey, sistemaKey, edificioKey]);

  const risultati = useMemo(() => {
    const zona = ZONE_CLIMATICHE.find((z) => z.key === zonaKey)!;
    const sistema = SISTEMI_RISCALDAMENTO.find((s) => s.key === sistemaKey)!;
    const edificio = TIPI_EDIFICIO.find((e) => e.key === edificioKey)!;

    const kwhTotaleAnno = mq * zona.fabbisogno * edificio.fattore;
    const kwhRisparmiatoAnno = kwhTotaleAnno * RIDUZIONE[spessore];
    const risparmioEuroAnno = kwhRisparmiatoAnno * sistema.costoKwh;
    const co2RidottaKg = kwhRisparmiatoAnno * 0.233;
    const costoIGK2Stimato = mq * spessore * 8;
    const paybackAnni = risparmioEuroAnno > 0 ? costoIGK2Stimato / risparmioEuroAnno : 0;
    const miglioramentoClassi = RIDUZIONE[spessore] >= 0.35 ? 2 : 1;

    const zonaIndex = ZONE_CLIMATICHE.findIndex((z) => z.key === zonaKey);
    const classeAttualeIndex = Math.max(0, Math.min(7, 7 - zonaIndex));
    const classePostIndex = Math.max(0, classeAttualeIndex - miglioramentoClassi);

    return {
      risparmioEuroAnno,
      kwhRisparmiatoAnno,
      co2RidottaKg,
      paybackAnni,
      miglioramentoClassi,
      classeAttualeIndex,
      classePostIndex,
    };
  }, [mq, spessore, zonaKey, sistemaKey, edificioKey]);

  const risparmioAnim = useAnimatedNumber(risultati.risparmioEuroAnno);
  const kwhAnim = useAnimatedNumber(risultati.kwhRisparmiatoAnno);
  const co2Anim = useAnimatedNumber(risultati.co2RidottaKg);
  const paybackAnim = useAnimatedNumber(risultati.paybackAnni);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="mq" className="text-xs nano-tracking-label uppercase text-nano-slate">
              Superficie da trattare
            </label>
            <span className="font-mono text-sm text-white">{mq} m²</span>
          </div>
          <input
            id="mq"
            type="range"
            min={10}
            max={500}
            step={5}
            value={mq}
            onChange={(e) => setMq(Number(e.target.value))}
            className="w-full accent-nano-teal"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs nano-tracking-label uppercase text-nano-slate">
            Spessore applicazione IGK2
          </label>
          <div className="grid grid-cols-4 gap-2">
            {SPESSORI.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpessore(s)}
                className={`border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  spessore === s
                    ? "border-nano-teal bg-nano-teal/10 text-white"
                    : "border-white/15 text-nano-slate hover:border-white/30"
                }`}
              >
                {s} mm
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="zona" className="mb-2 block text-xs nano-tracking-label uppercase text-nano-slate">
            Zona climatica dell&apos;edificio
          </label>
          <select
            id="zona"
            value={zonaKey}
            onChange={(e) => setZonaKey(e.target.value as typeof zonaKey)}
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
          >
            {ZONE_CLIMATICHE.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label} — {z.esempio}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sistema" className="mb-2 block text-xs nano-tracking-label uppercase text-nano-slate">
            Sistema di riscaldamento principale
          </label>
          <select
            id="sistema"
            value={sistemaKey}
            onChange={(e) => setSistemaKey(e.target.value as typeof sistemaKey)}
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
          >
            {SISTEMI_RISCALDAMENTO.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="edificio" className="mb-2 block text-xs nano-tracking-label uppercase text-nano-slate">
            Tipo di edificio
          </label>
          <select
            id="edificio"
            value={edificioKey}
            onChange={(e) => setEdificioKey(e.target.value as typeof edificioKey)}
            className="w-full border border-white/15 bg-nano-navy px-4 py-3 text-white focus:border-nano-teal focus:outline-none"
          >
            {TIPI_EDIFICIO.map((e) => (
              <option key={e.key} value={e.key}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            flash={flash}
            value={`€ ${Math.round(risparmioAnim).toLocaleString("it-IT")}`}
            label="Risparmio sulla bolletta energetica / anno"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#00A896" strokeWidth="1.4" />
                <path d="M12 7v10M9.5 9.5h3.75a1.75 1.75 0 1 1 0 3.5h-2.5a1.75 1.75 0 1 0 0 3.5H14" stroke="#00A896" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            }
          />
          <ResultCard
            flash={flash}
            value={`${Math.round(kwhAnim).toLocaleString("it-IT")} kWh`}
            label="Energia risparmiata / anno"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="#00A896" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            }
          />
          <ResultCard
            flash={flash}
            value={`${Math.round(co2Anim).toLocaleString("it-IT")} kg`}
            label="Emissioni CO₂ evitate / anno"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <path d="M12 2.5 4 5.8v5.4c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V5.8L12 2.5Z" stroke="#00A896" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            }
          />
          <ResultCard
            flash={flash}
            value={`${paybackAnim.toFixed(1)} anni`}
            label="Stima tempo di rientro investimento"
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                <rect x="4" y="5" width="16" height="15" rx="1" stroke="#00A896" strokeWidth="1.4" />
                <path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke="#00A896" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            }
          />
        </div>

        <div className="border border-white/10 p-5">
          <p className="mb-3 text-xs nano-tracking-label uppercase text-nano-slate">
            Miglioramento classe energetica (stima)
          </p>
          <div
            className="relative h-3 w-full"
            style={{
              background:
                "linear-gradient(90deg, #d92b2b 0%, #f2994a 25%, #f2c94c 50%, #6fcf97 75%, #00a896 100%)",
            }}
          >
            <div
              className="absolute top-1/2 h-4 w-1 -translate-y-1/2 bg-white/60"
              style={{ left: `${(risultati.classeAttualeIndex / 7) * 100}%` }}
              title="Classe attuale stimata"
            />
            <div
              className="absolute top-1/2 h-5 w-1.5 -translate-y-1/2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-[left] duration-500"
              style={{ left: `${(risultati.classePostIndex / 7) * 100}%` }}
              title="Classe stimata post-IGK2"
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-nano-slate/70">
            {CLASSI_ENERGETICHE.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-white">
            Stima: miglioramento di {risultati.miglioramentoClassi === 2 ? "2 classi" : "1 classe"} energetiche
          </p>
        </div>

        <div className="border border-nano-teal/40 bg-nano-teal/5 p-6 text-center">
          <p className="text-sm text-white">
            Per un&apos;analisi precisa del tuo edificio, richiedi una consulenza gratuita.
          </p>
          <Link
            href="/richiedi-info"
            className="mt-4 inline-block bg-nano-teal px-6 py-3 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Richiedi consulenza gratuita
          </Link>
        </div>
      </div>

      <p className="col-span-full text-xs text-nano-slate/70">
        I valori sono stime indicative basate su dati statistici medi per zona climatica. I risultati
        effettivi possono variare in funzione delle caratteristiche specifiche dell&apos;edificio, del
        sistema impiantistico e delle condizioni di posa del prodotto. Spessori e riduzioni secondo
        specifiche tecniche i-GlooKlima.
      </p>
    </div>
  );
}
