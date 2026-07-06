# FASE 5 — Blog con CMS (Contentlayer + MDX)
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Prima di eseguire, discuti: vuoi usare Contentlayer (file MDX locali, più semplice)
> o Sanity.io (CMS con interfaccia grafica, più potente ma richiede account)?
> Il prompt usa Contentlayer ma Claude può adattarlo a Sanity se preferisci.
>
> **Prerequisiti:** Fase 4 completata (`fase_4_calcolatore_eseguito.md`)
> **Risultato atteso:** Blog funzionante con 3 articoli SEO, lista e dettaglio.
> **Stato file:** rinomina in `fase_5_blog_cms_incorso.md` quando inizi,
> in `fase_5_blog_cms_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Integra il blog in nanopower.it usando Contentlayer per gestire articoli in MDX.

━━━ 1. SETUP CONTENTLAYER ━━━

- Installa: npm install contentlayer next-contentlayer date-fns
- Crea contentlayer.config.ts nella root con schema Post:
  fields:
    title: { type: 'string', required: true }
    date: { type: 'date', required: true }
    author: { type: 'string', default: 'Fabrizio L.' }
    category: { type: 'enum', options: ['Isolamento', 'Massetti', 'Impermeabilizzazione', 'Normative', 'Agevolazioni'] }
    excerpt: { type: 'string', required: true }
    coverImage: { type: 'string' }
    tags: { type: 'list', of: { type: 'string' } }
    featured: { type: 'boolean', default: false }
  computedFields: slug (from _raw.flattenedPath), readingTime (da wordCount)
- Aggiorna next.config.js per Contentlayer (withContentlayer wrapper)
- Crea la cartella content/blog/

━━━ 2. PAGINA /blog (app/blog/page.tsx) ━━━

Layout: griglia 3 colonne su desktop, 2 su tablet, 1 su mobile.

Card articolo:
- Immagine cover (next/image con fallback gradient se assente)
- Badge categoria colorato (colore per categoria: Isolamento=teal, Massetti=blue, ecc.)
- Titolo H3 (max 2 righe, ellipsis)
- Excerpt (max 3 righe)
- Data + tempo di lettura stimato
- Link "Leggi l'articolo →"
- Hover: lift + ombra

Filtro per categoria:
- Pill buttons in cima: Tutti | Isolamento | Massetti | Impermeabilizzazione | Normative | Agevolazioni
- Filtro client-side con useState (no reload pagina)

Sidebar (solo su desktop):
- "Articoli in evidenza" (featured: true)
- "Categorie" con conteggio articoli per categoria
- Form mini-newsletter: label "Rimani aggiornato", input email, bottone "Iscriviti"
  Integrazione Brevo: aggiunge l'email alla lista newsletter generale

Metadata SEO dinamici per la pagina lista.

━━━ 3. PAGINA /blog/[slug] (app/blog/[slug]/page.tsx) ━━━

Layout: articolo al centro (max-w-3xl), sidebar a destra su desktop.

Header articolo:
- Badge categoria + data + tempo di lettura
- H1 (titolo)
- Excerpt in italic
- Nome autore

Barra progresso lettura:
- Thin bar in cima alla pagina (position: fixed, z-50)
- Larghezza = scroll % documento

Body MDX:
- Componenti custom per MDX: tabella stilizzata, box info (callout), blockquote
- Stili prosa con Tailwind Typography (npm install @tailwindcss/typography)

Sidebar sticky (desktop):
- "Hai domande su questo argomento?"
- CTA: "Parla con un tecnico" → /richiedi-info
- "Articoli correlati" (stessa categoria, max 3)

Schema.org Article in <head> per ogni articolo.

Articoli correlati in fondo alla pagina (stessa categoria, esclude l'articolo corrente).

━━━ 4. CREA 3 ARTICOLI MDX DEMO ━━━

FILE: content/blog/ponti-termici-come-eliminarli.mdx
---
title: "Ponti termici: cosa sono e come eliminarli senza demolizioni"
date: 2026-07-10
category: Isolamento
excerpt: "I ponti termici causano muffa, freddo localizzato e dispersione energetica. Scopri come risolverli con IGK2 senza opere murarie invasive."
tags: [ponti termici, isolamento, nanotecnologia, muffa, condensa]
featured: true
---
Corpo (~800 parole):
- Cos'è un ponte termico e perché è dannoso (pilastri, balconi, davanzali, angoli)
- Conseguenze: muffa, condensa, freddo localizzato, aumento bollette
- Soluzioni tradizionali (cappotto esterno, rasatura interna con EPS) e loro limiti
- Come IGK2 risolve il problema: 2-8 mm, nessuna demolizione, lambda 0,0014
- Caso pratico: ponte termico su pilastro in appartamento anni '70
- Conclusione con CTA: "Vuoi un sopralluogo gratuito?"

FILE: content/blog/massetti-essiccazione-rapida.mdx
---
title: "Massetti a essiccazione rapida: come scegliere e quanto si risparmia davvero"
date: 2026-07-17
category: Massetti
excerpt: "Ogni giorno di attesa costa. Con SuperFluid il massetto è calpestabile in 20 ore: ecco quanto vale in concreto per il tuo cantiere."
tags: [massetto, SuperFluid, essiccazione rapida, cantiere, garanzia]
featured: true
---
Corpo (~800 parole):
- Costo di un giorno di attesa: operai fermi, posatori in attesa, ritardi a cascata
- Confronto tempi standard (3 giorni) vs SuperFluid (20 ore): calcolo ROI concreto
- Come funziona la garanzia assicurativa decennale (spiegazione semplice)
- Cosa significa "esonero di responsabilità" per posatori e progettisti
- Come diventare installatore certificato SuperFluid
- Conclusione con CTA: "Richiedi info sul corso di certificazione"

FILE: content/blog/detrazioni-fiscali-isolamento-2026.mdx
---
title: "Detrazioni fiscali per l'isolamento termico nel 2026: guida pratica"
date: 2026-07-24
category: Agevolazioni
excerpt: "Ecobonus, Bonus Ristrutturazione, SuperBonus: quali si applicano a IGK2 e come sfruttarli. Guida aggiornata luglio 2026."
tags: [detrazioni, Ecobonus, isolamento, agevolazioni fiscali, 2026]
featured: false
---
Corpo (~800 parole):
- Panoramica agevolazioni disponibili nel 2026 (stato attuale Superbonus, Ecobonus 65%, Bonus Ristr. 50%)
- Come si inquadra IGK2 nelle detrazioni per riqualificazione energetica
- Documentazione necessaria: asseverazione tecnica, APE ante e post, fatture
- Ruolo del tecnico abilitato (requisito fondamentale)
- Consigli pratici: cosa fare prima di iniziare i lavori
- Disclaimer legale + CTA: "Richiedi una consulenza tecnica gratuita"

━━━ 5. SITEMAP AGGIORNATA ━━━

Assicurati che next-sitemap includa tutti i post del blog nella sitemap.xml.
Ogni post deve avere: url, lastmod (dalla data del post), changefreq: 'monthly', priority: 0.7
```
