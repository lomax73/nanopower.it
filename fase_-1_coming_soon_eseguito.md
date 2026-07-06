# FASE -1 — Landing "Coming Soon" con raccolta lead
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Verifica di avere: Brevo API key, numero WhatsApp aziendale, email di contatto.
>
> **Prerequisiti:** nessuno — è la prima fase.
> **Risultato atteso:** pagina singola live su Vercel che raccoglie lead.
> **Stato file:** rinomina in `fase_-1_coming_soon_incorso.md` quando inizi,
> in `fase_-1_coming_soon_eseguito.md` quando è online e funzionante.

---

## Prompt da incollare in Claude Code

```
Crea un progetto Next.js 14 (App Router) con Tailwind CSS per il sito nanopower.it.

L'obiettivo di questa fase è una SINGOLA pagina coming soon ad alto impatto visivo,
ottimizzata per raccogliere lead prima ancora che il sito completo sia pronto.
Nessuna navigazione, nessuna multipagina: solo questa landing da deployare subito su Vercel.

━━━ SETUP PROGETTO ━━━

- Crea il progetto con: npx create-next-app@latest nanopower --typescript --tailwind --app
- Installa le dipendenze aggiuntive: react-hook-form @hookform/resolvers zod
- Crea il file .env.local con le variabili: BREVO_API_KEY, CONTACT_EMAIL, NEXT_PUBLIC_WHATSAPP
- Il file app/page.tsx è l'unica pagina necessaria per ora

━━━ DESIGN E IDENTITÀ VISIVA ━━━

Palette:
- Sfondo principale: #0D1F33 (blu notte profondo)
- Accento primario: #00A896 (verde acqua / teal)
- Testo principale: #FFFFFF
- Testo secondario: #94A3B8
- Highlight numeri: #FFD166 (giallo dorato)

Font: usa next/font con Inter (sans-serif, weights 300/400/600/700/900)

Effetti:
- Sfondo con gradiente radiale sottile dal centro (da #1A2F4A a #0D1F33)
- Particelle/punti luminosi animati in CSS puro (nessuna libreria), effetto "spazio molecolare"
- Animazione fade-in staggered al caricamento per ogni sezione

━━━ STRUTTURA PAGINA ━━━

1. HERO SECTION
   - Logo testuale "nanopower" in font peso 900 bianco, punto finale in #00A896
   - Sotto: tagline in maiuscoletto leggero → "MATERIALI EDILI AD ALTE PRESTAZIONI"
   - H1 grande (max 3 righe):
     "I materiali che cambiano le regole dell'edilizia. In arrivo."
   - Paragrafo breve (colore #94A3B8):
     "IGK2 · SuperFluid · SuperElastiK — tecnologie nanotecnologiche e cementite
      per costruire e ristrutturare meglio, più velocemente, con garanzie reali."

2. NUMERI CHIAVE (4 card su desktop 2x2, su mobile 2x2)
   - λ = 0,0014 W/mk → "La conducibilità termica più bassa sul mercato"
   - 20 ore → "Tempo di calpestabilità del massetto SuperFluid"
   - 10 anni → "Garanzia assicurativa SuperFluid (€10.000.000)"
   - 2,8 mm → "Ampiezza fessure che SuperElastiK è in grado di coprire"
   Stile card: bordo 1px #00A896 opacity 0.4, sfondo rgba(0,168,150,0.05),
   numero in #FFD166 peso 900, descrizione in #94A3B8 piccolo.

3. TEASER PRODOTTI (3 card verticali con icona SVG inline)
   - IGK2: icona termometro / fiocco di neve
     Titolo: "Isolamento Termico Nanotecnologico"
     Testo: "2-8 mm equivalenti a 12 cm di cappotto tradizionale. Senza demolizioni."
   - SuperFluid: icona cronometro
     Titolo: "Massetto Calpestabile in 20 Ore"
     Testo: "L'unico additivo con garanzia decennale assicurativa fino a €10.000.000."
   - SuperElastiK: icona scudo
     Titolo: "Membrana Elastica Impermeabilizzante"
     Testo: "Ponte su fessure fino a 2,8 mm. Protezione CO₂ per oltre 50 anni."
   Card con hover: bordo teal che si illumina, leggero lift con transform translateY(-4px).

4. FORM RACCOLTA LEAD
   Titolo: "Vuoi essere tra i primi a sapere quando siamo online?"
   Sottotitolo: "Lascia i tuoi contatti e ti avvisiamo al lancio. Nessuno spam."

   Campi (React Hook Form + Zod):
   - Nome e Cognome (required, minLength 2)
   - Email (required, formato email)
   - Telefono (optional)
   - Sei un: select required →
     "Impresa edile / Posatore", "Tecnico / Ingegnere / Geometra",
     "Architetto / Progettista", "Privato / Condominio", "Altro"
   - Prodotto di interesse: select required →
     "IGK2 — Isolamento termico", "SuperFluid — Massetti",
     "SuperElastiK — Impermeabilizzazione", "Tutti i prodotti"

   Bottone submit: sfondo #00A896, testo "Avvisami al lancio →",
   full-width su mobile, loading spinner durante invio.

   Server Action in app/actions/lead.ts:
   a) Chiama Brevo API REST (POST https://api.brevo.com/v3/contacts) con:
      - email, attributes: { NOME, COGNOME, TELEFONO, TIPO_CLIENTE, PRODOTTO_INTERESSE }
      - listIds: [ parseInt(process.env.BREVO_LIST_ID_GENERAL) ]
   b) Invia email notifica a process.env.CONTACT_EMAIL via Brevo SMTP transazionale
      con tutti i dati del lead
   c) Restituisce { success: true } o { error: string }

   Dopo submit success: animazione check verde + testo
   "Perfetto! Ti avvisiamo non appena nanopower.it è online."
   Dopo submit error: testo rosso
   "Qualcosa è andato storto. Riprova o scrivici a info@fbosolution.it"

5. FOOTER MINIMALISTA
   - Testo: info@nanopower.it (link mailto)
   - Icona LinkedIn SVG inline → linkedin.com/company/fbosolution
   - Testo piccolo: "© 2026 Fbosolution.it · nanopower.it è un brand Fbosolution.it"

6. WHATSAPP FLOATING BUTTON
   - Icona WhatsApp SVG inline, posizione fixed bottom-right (bottom-6 right-6), z-50
   - Sfondo #25D366, ombra verde
   - Link: https://wa.me/{process.env.NEXT_PUBLIC_WHATSAPP}
   - Tooltip al hover: "Scrivici su WhatsApp"
   - Su mobile: sempre visibile, dimensione leggermente più grande

━━━ RESPONSIVE ━━━

- Mobile-first con breakpoint Tailwind sm: e md:
- Nessuna immagine raster: solo SVG e CSS → PageSpeed target > 95

━━━ METADATA SEO (app/layout.tsx) ━━━

title: "nanopower.it — Materiali Edili Nanotecnologici | Coming Soon"
description: "IGK2, SuperFluid e SuperElastiK: materiali edili ad alte prestazioni.
Isolamento termico nanotecnologico, massetti con garanzia 10 anni, membrane elastiche EN 14891."
themeColor: "#0D1F33"
og:image: genera un og-image.tsx con Next.js ImageResponse (sfondo scuro, logo, tagline)

━━━ DEPLOYMENT ━━━

Crea vercel.json con le env vars come riferimento (valori vuoti).
Alla fine mostra:
1. I comandi per installare Vercel CLI e deployare: npm i -g vercel && vercel --prod
2. La lista di tutte le env vars da impostare nel pannello Vercel
```
