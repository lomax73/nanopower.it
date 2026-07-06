# FASE 3 — Pagina SuperFluid (Landing ad Alta Conversione)
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Questa è la pagina più importante per i lead B2B. Prima di eseguire, discuti
> con Claude: hai casi studio reali da inserire? Hai video di cantiere disponibili?
> Vuoi aggiungere prezzi o è meglio tenere solo "richiedi preventivo"?
>
> **Prerequisiti:** Fase 2 completata (`fase_2_pagine_prodotto_eseguito.md`)
> **Risultato atteso:** Landing /superfluid ottimizzata per conversione B2B posatori/tecnici.
> **Stato file:** rinomina in `fase_3_superfluid_landing_incorso.md` quando inizi,
> in `fase_3_superfluid_landing_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Crea la pagina /superfluid in nanopower. È la landing page più importante del sito
per la lead generation B2B. Deve funzionare come una vera pagina di vendita,
non come una semplice scheda prodotto.

━━━ HERO (above the fold) ━━━

- Sfondo: gradiente scuro con pattern linee diagonali CSS sottili (opacity 0.03)
- Badge pill: "🏆 UNICO IN ITALIA — Garanzia Assicurativa Decennale"
- H1 (grande, peso 900): "Il massetto che cambia le regole del cantiere"
- H2 (sotto, peso 400, colore #94A3B8):
  "Calpestabile in 20 ore. Garantito 10 anni. Assicurato €10.000.000."
- 3 numeri enormi su sfondo card distinte:
  "20 ORE" / "Calpestabilità"
  "10 ANNI" / "Garanzia assicurativa"
  "€10.000.000" / "Copertura per progetto"
  I numeri in #FFD166 (giallo dorato), label sotto in #94A3B8.
- 2 CTA: "Richiedi consulenza gratuita" (verde, grande) | "Scarica scheda tecnica" (outline)

━━━ SEZIONE "COSA SIGNIFICA DAVVERO 10 ANNI ASSICURATI" ━━━

Box prominente con bordo sinistro teal (4px) e sfondo teal chiaro (rgba 0.05):
Titolo: "Non è una garanzia commerciale. È una polizza assicurativa."
Paragrafo:
"Ogni progetto trattato con SuperFluid riceve un Release Certificate con copertura
assicurativa decennale fino a 10 milioni di euro per progetto. Progettisti, tecnici
e posatori certificati sono esonerati da ogni responsabilità professionale."
Elenco checkmark:
✓ Copertura danni strutturali per 10 anni
✓ Esonero responsabilità per tecnici e progettisti
✓ Esonero responsabilità per posatori certificati
✓ Release Certificate allegabile al capitolato
✓ Valore commerciale aggiunto per chi installa

━━━ TABELLA COMPARAZIONE DIRETTA ━━━

Tabella con 5 colonne: | | SuperFluid | Mapei | Sika | Standard mercato |
Colonna SuperFluid evidenziata (sfondo teal chiaro, intestazione #1A3A5C).

Righe:
- Calpestabilità | 20 ore ✓ | 24 ore | 24-36 ore | 48-72 ore
- Garanzia | 10 anni assicurata ✓ | Garanzia standard | Garanzia standard | Nessuna
- Copertura assicurativa | €10.000.000 ✓ | Nessuna ✗ | Nessuna ✗ | Nessuna ✗
- Esonero resp. tecnici | ✓ | ✗ | ✗ | ✗
- Release certificate | ✓ | ✗ | ✗ | ✗
- Supporto on-site | Sempre ✓ | Solo grandi cantieri | Solo grandi cantieri | ✗
- Formazione certificata | ✓ | ✓ | ✓ | ✗

Nota sotto tabella: "Dati aggiornati a luglio 2026. Fonti: siti ufficiali produttori."

━━━ SEZIONE "COME FUNZIONA" (timeline) ━━━

Timeline orizzontale su desktop, verticale su mobile, 5 step con icona + numero:
1. Analisi progetto → 2. Certificazione installatore → 3. Supervisione cantiere →
4. Quality testing → 5. Release Certificate + 10 anni di copertura

━━━ SEZIONE "VARIANTI PRINCIPALI" (griglia 2x3) ━━━

Per ogni variante: nome bold, caso d'uso, vantaggio chiave.
- SuperFluid Fast: cantieri con tempi stretti, calpestabilità in 16 ore
- SuperFluid Slim: spessori da 20 mm, sottopavimenti sottili
- SuperFluid Self-leveling: grandi superfici, autolivellante fino a 10 mm
- SuperFluid Thermal: massetti riscaldati a pavimento, ottima conducibilità termica
- SuperFluid Anti-frost: condizioni climatiche difficili, posa invernale
- SuperFluid Fiber: armatura con fibre, riduzione fessurazioni da ritiro

━━━ SEZIONE "FORMAZIONE E CERTIFICAZIONE" ━━━

Titolo: "Diventa Installatore Certificato SuperFluid"
Testo: "Il corso da 4 giorni (pratico + teorico) ti permette di offrire la garanzia
decennale assicurativa ai tuoi clienti. Solo gli installatori certificati possono
attivare il Release Certificate."
3 vantaggi certificazione:
- Offri la garanzia 10 anni ai tuoi clienti → vinci le gare
- Entri nella mappa degli installatori certificati sul sito
- Accedi a materiale tecnico e formazione continua
CTA: "Iscriviti al prossimo corso → /formazione"

━━━ SEZIONE TESTIMONIANZE / SOCIAL PROOF ━━━

3 card placeholder (da sostituire con testimonianze reali):
- Nome installatore, città, ruolo
- Citazione breve (2-3 righe) su risparmio di tempo e protezione professionale
- Rating 5 stelle
Nota nel codice: <!-- Sostituire con testimonianze reali di installatori certificati -->

━━━ FORM LEAD (fondo pagina, sfondo scuro) ━━━

Titolo: "Parla con un esperto SuperFluid — risposta entro 24 ore"
Campi:
- Nome, Cognome (required)
- Azienda / Studio (required)
- Email (required)
- Telefono (required)
- Ruolo: select → Posatore/Impresa edile | Ingegnere/Geometra/Arch. | Direttore lavori | Altro
- Regione: select con tutte le regioni italiane
- Messaggio (textarea, opzionale)
- Privacy (required)
Server Action: Brevo con listId = BREVO_LIST_ID_SUPERFLUID,
attributo TIPO_CLIENTE=ruolo, REGIONE=regione.
Email notifica a CONTACT_EMAIL: "🔔 Nuovo lead SuperFluid — [Azienda]"
Dopo submit: "Ti contatteremo entro 24 ore lavorative."
```
