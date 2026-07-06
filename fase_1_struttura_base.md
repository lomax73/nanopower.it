# FASE 1 — Struttura Base Next.js
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Conferma che la Fase -1 è completata e deployata. Discuti con Claude
> se mantenere la coming soon come redirect temporaneo durante lo sviluppo.
>
> **Prerequisiti:** Fase -1 completata (`fase_-1_coming_soon_eseguito.md`)
> **Risultato atteso:** Homepage completa, navbar, footer, struttura routing.
> **Stato file:** rinomina in `fase_1_struttura_base_incorso.md` quando inizi,
> in `fase_1_struttura_base_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Partendo dal progetto nanopower creato nella Fase -1, evolvi l'applicazione
per supportare il sito completo multi-pagina. La coming soon viene sostituita
dalla homepage definitiva.

━━━ 1. NAVBAR ━━━

Componente: components/Navbar.tsx
- Logo "nanopower" (font 900, colore white con punto teal) → link a /
- Link desktop (hidden su mobile):
  * "Prodotti" con dropdown: IGK2 (/igk2), SuperFluid (/superfluid), SuperElastiK (/superelastik)
  * "Formazione" → /formazione
  * "Casi Studio" → /casi-studio
  * "Blog" → /blog
- CTA bottone: "Richiedi consulenza" → /richiedi-info (sfondo #00A896)
- Menu hamburger su mobile: drawer laterale con tutti i link e CTA
- Sticky in cima con backdrop-blur e sfondo semi-trasparente allo scroll
- Dropdown prodotti: appare al hover su desktop, al click su mobile

━━━ 2. FOOTER ━━━

Componente: components/Footer.tsx
3 colonne su desktop, stack su mobile:

Col 1 — Brand:
- Logo testuale + descrizione 2 righe
- Social: icone SVG LinkedIn, email
- Badge: "Rivenditore Autorizzato i-GlooKlima & i-GlooAdvance"

Col 2 — Prodotti & Servizi:
- Link: IGK2, SuperFluid, SuperElastiK, Formazione, Calcolatore Risparmio, Area Tecnici

Col 3 — Azienda:
- Link: Casi Studio, Blog, Richiedi Info, Privacy Policy
- Testo: "Un brand di Fbosolution.it" → link a fbosolution.it

Barra copyright:
- "© 2026 nanopower.it — Fbosolution.it P.IVA [da inserire]"
- Link: Privacy Policy | Cookie Policy

Mantieni il WhatsApp floating button della Fase -1.

━━━ 3. HOMEPAGE (app/page.tsx) ━━━

Sostituisce completamente la coming soon.

SEZIONE HERO (above the fold):
- Sfondo: gradiente radiale scuro come Fase -1
- Badge pill: "Rivenditore Autorizzato · Italia"
- H1: "Materiali edili che ridefiniscono le prestazioni"
- Sub: "Nanotecnologia e chimica avanzata al servizio di chi costruisce e ristruttura.
  Performance misurabili. Garanzie reali. Supporto locale."
- 2 CTA: "Scopri i prodotti" (primario verde) + "Richiedi consulenza gratuita" (outline bianco)
- Scroll indicator animato in basso

SEZIONE NUMERI (sfondo leggermente diverso, es. #0F2840):
- 4 stat animate con IntersectionObserver (count up da 0 al valore reale):
  λ 0,0014 W/mk | 20 ore | 10 anni | 2,8 mm
- Sotto ogni numero: label esplicativa

SEZIONE PRODOTTI (3 card):
Per ogni prodotto (IGK2, SuperFluid, SuperElastiK):
- Icona SVG
- Nome prodotto
- Tagline (1 riga)
- 3 bullet punti chiave
- Link "Scopri di più →"
Card con hover lift e bordo teal.

SEZIONE "PERCHÉ NANOPOWER" (3 colonne):
- Eccellenza Tecnica: "Prodotti con i dati più performanti del mercato, verificabili e certificati"
- Protezione Professionale: "Solo SuperFluid offre garanzia assicurativa 10 anni. Unica in Italia."
- Supporto Locale: "Sopralluogo, formazione, consulenza. Presente sul territorio, non solo online."

SEZIONE "IL VANTAGGIO SUPERFLUID" (highlight speciale):
- Sfondo teal scuro o bordo teal
- Titolo: "L'unico massetto con garanzia decennale assicurativa in Italia"
- Testo breve sul differenziatore
- Numero prominente: €10.000.000 di copertura assicurativa
- CTA: "Scopri SuperFluid →"

SEZIONE CTA FINALE:
- Sfondo scuro
- Titolo: "Hai un progetto? Parliamoci."
- Form rapido inline (nome + email + telefono + prodotto di interesse)
- Usa la stessa Server Action della Fase -1

━━━ 4. SETUP TECNICO ━━━

SEO e sitemap:
- Installa next-sitemap: npm install next-sitemap
- Crea next-sitemap.config.js che genera sitemap.xml automatica
- Crea public/robots.txt: allow tutto tranne /api/ e /area-tecnici

Analytics:
- Crea components/GoogleAnalytics.tsx con next/script (strategy="afterInteractive")
- Usa process.env.NEXT_PUBLIC_GA_ID
- Importa in app/layout.tsx

Ottimizzazioni:
- Configura next/image per tutte le immagini future
- Aggiungi next.config.js con images.domains per i-glooklima.it e i-glooadvance.com
- Abilita compress: true in next.config.js
```
