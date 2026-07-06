# nanopower.it — Guida allo Sviluppo con Claude Code

## Come usare questa cartella

Ogni fase di sviluppo ha un file dedicato. I prompt sono pronti ma vanno **discussi con Claude
prima di essere eseguiti** — potrebbero servire aggiustamenti in base a ciò che è già stato fatto,
a credenziali disponibili, o a scelte di design emerse durante lo sviluppo.

---

## Regola d'oro: inizia sempre dalla Fase -1

La **Fase -1** crea la landing coming soon e va deployata su Vercel il prima possibile,
ancora prima che il sito completo sia pronto. Serve a raccogliere lead subito.

**Ordine di priorità:**

| Priorità | Fase | File | Descrizione |
|----------|------|------|-------------|
| 🔴 Urgente | -1 | `fase_-1_coming_soon.md` | Landing coming soon + raccolta lead → **deploy immediato** |
| 🟠 Alta | 1 | `fase_1_struttura_base.md` | Struttura Next.js, navbar, homepage completa |
| 🟠 Alta | 2 | `fase_2_pagine_prodotto.md` | Pagine IGK2 e SuperElastiK |
| 🟠 Alta | 3 | `fase_3_superfluid_landing.md` | Landing SuperFluid ad alta conversione |
| 🟡 Media | 4 | `fase_4_calcolatore.md` | Calcolatore risparmio energetico interattivo |
| 🟡 Media | 5 | `fase_5_blog_cms.md` | Blog con Contentlayer + 3 articoli SEO |
| 🟡 Media | 6 | `fase_6_form_crm.md` | Form multi-step + integrazione CRM Brevo |
| 🟢 Bassa | 7 | `fase_7_area_tecnici.md` | Area riservata tecnici con autenticazione |

---

## Come gestire i file durante lo sviluppo

Ogni file di fase ha tre stati, segnalati rinominando il file:

| Stato | Come rinominare il file |
|-------|------------------------|
| Da fare | `fase_X_nome.md` ← nome originale |
| In lavorazione | `fase_X_nome_incorso.md` |
| Completata | `fase_X_nome_eseguito.md` |

**Esempio pratico:**
1. Apri `fase_-1_coming_soon.md` → discuti il prompt con Claude
2. Rinomina in `fase_-1_coming_soon_incorso.md` → inizia lo sviluppo
3. Quando la fase è completata e deployata → rinomina in `fase_-1_coming_soon_eseguito.md`

---

## Prima di eseguire qualsiasi prompt

1. **Leggi il file della fase** per capire cosa verrà creato
2. **Apri una sessione con Claude Code** e incolla il contenuto del prompt
3. **Discuti eventuali dubbi** prima di avviare l'esecuzione:
   - Credenziali disponibili (Brevo API key, Supabase, GA4)
   - Numero WhatsApp aziendale
   - P.IVA e dati aziendali
   - URL LinkedIn aziendale
   - Eventuali preferenze di design non coperte dal prompt
4. **Esegui solo dopo aver concordato** ogni aspetto con Claude

---

## Variabili d'ambiente da preparare prima della Fase -1

Crea un file `.env.local` nella root del progetto Next.js con:

```env
BREVO_API_KEY=               # da app.brevo.com → API Keys
BREVO_LIST_ID_GENERAL=       # ID lista Brevo per lead generici
BREVO_LIST_ID_IGK2=          # ID lista per lead IGK2
BREVO_LIST_ID_SUPERFLUID=    # ID lista per lead SuperFluid
BREVO_LIST_ID_SUPERELASTIK=  # ID lista per lead SuperElastiK
CONTACT_EMAIL=f.lomazzi@fbosolution.it
NEXT_PUBLIC_GA_ID=           # G-XXXXXXXXXX da Google Analytics 4
NEXT_PUBLIC_WHATSAPP=39      # es. 393331234567 (senza +)
NEXTAUTH_SECRET=             # stringa random 32+ caratteri
NEXTAUTH_URL=https://nanopower.it
SUPABASE_URL=                # da supabase.com (solo dalla Fase 7)
SUPABASE_ANON_KEY=           # da supabase.com (solo dalla Fase 7)
```

> **Nota:** per la Fase -1 bastano solo `BREVO_API_KEY`, `CONTACT_EMAIL`
> e `NEXT_PUBLIC_WHATSAPP`. Le altre si aggiungono nelle fasi successive.

---

## Stack tecnico

| Componente | Tecnologia |
|------------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Form | React Hook Form + Zod |
| CRM / Email | Brevo (ex Sendinblue) |
| CMS Blog | Contentlayer + MDX |
| Auth | NextAuth.js + Supabase |
| Analytics | Google Analytics 4 |
| Deploy | Vercel |

---

*Documento generato con Claude AI — Fbosolution.it © 2026*
