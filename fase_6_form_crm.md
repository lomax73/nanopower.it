# FASE 6 — Form Multi-step e Integrazione CRM Brevo
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Prima di eseguire, assicurati di aver già creato le liste Brevo (una per ogni prodotto)
> e di avere gli ID delle liste. Discuti con Claude se aggiungere uno step di qualificazione
> del budget o del timeline progetto.
>
> **Prerequisiti:** Fase 5 completata (`fase_5_blog_cms_eseguito.md`)
> **Risultato atteso:** Form /richiedi-info multi-step, CRM Brevo completo, email automatiche.
> **Stato file:** rinomina in `fase_6_form_crm_incorso.md` quando inizi,
> in `fase_6_form_crm_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Crea la pagina /richiedi-info con form multi-step e la completa integrazione CRM Brevo.

━━━ FORM MULTI-STEP (app/richiedi-info/page.tsx) ━━━

Progress bar animata in cima (larghezza = step_corrente / totale_step * 100%).
Indicatore testuale: "Passo X di 4". Animazione slide tra gli step.

STEP 1 — "Chi sei?"
Titolo: "Prima di tutto, dimmi chi sei"
Selezione con grandi card cliccabili (icona SVG + label):
- 🏗️ Impresa edile / Posatore
- 📐 Tecnico (Ingegnere / Geometra)
- 🏛️ Architetto / Progettista
- 🏠 Privato / Condominio
- 🏭 Prefabbricatore / Ready-mix
- 🏛️ Pubblica Amministrazione
Click su card → evidenza teal + prosegui automaticamente a Step 2.

STEP 2 — "Cosa ti interessa?"
Titolo: "Quale prodotto o servizio ti interessa?"
Card multiselect (possono essere selezionate più opzioni):
- ❄️ IGK2 — Isolamento termico nanotecnologico
- ⚡ SuperFluid — Massetti ad alta performance + garanzia 10 anni
- 🛡️ SuperElastiK — Impermeabilizzazione elastica strutturale
- 🎓 Formazione — Corso certificazione installatori SuperFluid
Bottone "Avanti" (disabled se nessuna selezione).

STEP 3 — "Il tuo progetto"
Titolo: "Raccontami del tuo progetto"
Campi (contestuali in base a Step 1 e Step 2):
- m² stimati (number input, placeholder "es. 150")
- Regione: select con tutte le 20 regioni italiane
- Tipo intervento: select → Nuova costruzione | Ristrutturazione | Manutenzione | Progetto arch.
- Quando prevedi di iniziare: select → Subito | 1-3 mesi | 3-6 mesi | Oltre 6 mesi
- Descrizione progetto: textarea (max 500 caratteri, con contatore live)
Bottone "Avanti".

STEP 4 — "I tuoi contatti"
Titolo: "Come ti contatto?"
Campi:
- Nome (required)
- Cognome (required)
- Email (required)
- Telefono (required)
- Azienda / Studio (optional)
- Come hai trovato nanopower.it: select → Google | LinkedIn | Passaparola | Fiera/Evento | Altro
- Privacy policy (required, con link a /privacy)
- Newsletter (optional): "Voglio ricevere aggiornamenti tecnici e novità prodotto"
Bottone "Invia richiesta".

NAVIGAZIONE: bottoni "← Indietro" e "Avanti →" su ogni step eccetto il primo e l'ultimo.
Validazione Zod eseguita solo al click "Avanti", non in tempo reale (meno invasiva).
Animazione transizione step: slide orizzontale con CSS transition (transform translateX).

━━━ SERVER ACTION ━━━

File: app/actions/lead-completo.ts

Alla sottomissione (POST):

1. Crea/aggiorna contatto Brevo:
   POST https://api.brevo.com/v3/contacts
   Headers: api-key: BREVO_API_KEY, content-type: application/json
   Body: {
     email: email,
     updateEnabled: true,
     attributes: {
       NOME: nome, COGNOME: cognome, SMS: telefono, AZIENDA: azienda,
       TIPO_CLIENTE: tipoCliente, PRODOTTO_INTERESSE: prodotti.join(', '),
       REGIONE: regione, TIPO_INTERVENTO: tipoIntervento,
       MQ_PREVISTI: mqStimati, TIMELINE: timeline,
       DESCRIZIONE: descrizione, FONTE: fonte
     },
     listIds: [listaId]  // lista in base al prodotto principale selezionato
   }

2. Se prodotti multipli selezionati → aggiungi a ogni lista corrispondente:
   POST https://api.brevo.com/v3/contacts/{email}/lists con { ids: [listaId] }

3. Se newsletter checked → aggiungi anche a lista newsletter generale

4. Email notifica a CONTACT_EMAIL:
   Oggetto: "🔔 Nuovo lead nanopower.it — [TIPO_CLIENTE] — [PRODOTTI]"
   Corpo HTML ben formattato con tutti i dati in tabella leggibile:
   | Campo | Valore |
   | Nome | ... |
   | Azienda | ... |
   | ... | ... |

5. Email di conferma al lead:
   Oggetto: "Abbiamo ricevuto la tua richiesta — nanopower.it"
   Corpo: saluto personalizzato con nome, conferma ricezione, "Ti rispondo entro 24 ore lavorative",
   link rapidi: Calcolatore risparmio | Blog tecnico | Schede prodotto.

6. Restituisce { success: true, id: contactId } o { error: string }

━━━ PAGINA /grazie (app/grazie/page.tsx) ━━━

Redirect qui dopo submit riuscito (router.push('/grazie')).
- Animazione confetti CSS al caricamento (no librerie: CSS keyframes con elementi span)
- Icona check grande in teal con cerchio animato
- Titolo: "Richiesta ricevuta! 🎉"
- Testo: "Ti risponderò entro 24 ore lavorative per parlare del tuo progetto."
- 3 link rapidi su card:
  → "Torna alla home" | "Calcola il risparmio energetico" | "Leggi il blog tecnico"
- Nota: "Controlla la tua email: ti ho inviato una conferma."

━━━ NOTE TECNICHE ━━━

- Tutta la logica multi-step con useState in un componente client (use client)
- I dati di ogni step salvati in un oggetto stato unico (non persi navigando avanti/indietro)
- Server Action tipizzata con Zod (schema completo di tutti i campi)
- Gestione errori Brevo: se l'API fallisce, salva il lead in un file JSON di fallback
  in /data/leads-fallback.json (lato server) e notifica comunque via email
```
