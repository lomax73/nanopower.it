"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PRODOTTI = [
  { href: "/igk2", label: "IGK2" },
  { href: "/superfluid", label: "SuperFluid" },
  { href: "/superelastik", label: "SuperElastiK" },
];

const NAV_LINKS = [
  { href: "/formazione", label: "Formazione" },
  { href: "/casi-studio", label: "Casi Studio" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [prodottiOpen, setProdottiOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-nano-navy/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-xl font-black tracking-tight text-white">
          nanopower<span className="text-nano-teal">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div
            className="group relative"
            onMouseEnter={() => setProdottiOpen(true)}
            onMouseLeave={() => setProdottiOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-nano-slate transition-colors hover:text-white"
              aria-expanded={prodottiOpen}
              onClick={() => setProdottiOpen((v) => !v)}
            >
              Prodotti
              <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${prodottiOpen ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={`absolute left-0 top-full min-w-[200px] border border-white/10 bg-nano-navy-light py-2 shadow-xl transition-all duration-150 ${
                prodottiOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {PRODOTTI.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block px-4 py-2.5 text-sm text-nano-slate transition-colors hover:bg-white/5 hover:text-white"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-nano-slate transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}

          <Link
            href="/richiedi-info"
            className="bg-nano-teal px-5 py-2.5 text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
          >
            Richiedi consulenza
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`fixed inset-0 top-16 z-40 bg-nano-navy transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col gap-1 overflow-y-auto px-6 py-8">
          <p className="mb-1 text-xs nano-tracking-label uppercase text-nano-slate/70">Prodotti</p>
          {PRODOTTI.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/5 py-3 text-base text-white"
            >
              {p.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/5 py-3 text-base text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/richiedi-info"
            onClick={() => setMobileOpen(false)}
            className="mt-6 bg-nano-teal px-5 py-3.5 text-center text-sm font-semibold text-nano-navy"
          >
            Richiedi consulenza
          </Link>
        </div>
      </div>
    </header>
  );
}
