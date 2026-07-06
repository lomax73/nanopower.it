# FASE 7 — Area Tecnici Riservata
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Prima di eseguire, crea un account Supabase gratuito su supabase.com e tieni
> pronti URL e anon key. Discuti con Claude se usare login con password o
> magic link via email (più semplice per gli utenti, raccomandato).
>
> **Prerequisiti:** Fase 6 completata (`fase_6_form_crm_eseguito.md`)
> **Risultato atteso:** Area riservata /area-tecnici con login, download PDF, pannello admin.
> **Stato file:** rinomina in `fase_7_area_tecnici_incorso.md` quando inizi,
> in `fase_7_area_tecnici_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Crea l'area tecnici protetta da autenticazione su nanopower.it.

━━━ 1. SETUP AUTH ━━━

Installa: npm install next-auth @auth/supabase-adapter bcryptjs
Tipi: npm install -D @types/bcryptjs

Crea il progetto Supabase e le tabelle SQL:

-- Tabella utenti area tecnici
CREATE TABLE tecnici (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  azienda TEXT,
  tipo_cliente TEXT,
  password_hash TEXT,
  approvato BOOLEAN DEFAULT false,
  ruolo TEXT DEFAULT 'tecnico',  -- 'tecnico' | 'admin'
  created_at TIMESTAMPTZ DEFAULT now(),
  last_login TIMESTAMPTZ
);

-- Tabella log accessi (audit)
CREATE TABLE access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tecnico_id UUID REFERENCES tecnici(id),
  azione TEXT,
  documento TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

Configura NextAuth in app/api/auth/[...nextauth]/route.ts:
- CredentialsProvider con verifica bcrypt su tabella Supabase
- Session strategy: 'jwt'
- Callbacks: jwt (aggiungi ruolo e approvato al token), session (propaga al session object)

Middleware (middleware.ts):
- Proteggi tutte le route che iniziano con /area-tecnici
- Redirect a /login se non autenticato
- Redirect a /area-tecnici/non-approvato se autenticato ma approvato = false

━━━ 2. PAGINA /login ━━━

Design: card centrata su sfondo scuro, max-w-md.
Form: Email + Password + bottone "Accedi"
Link sotto: "Non hai ancora l'accesso? Richiedi qui" → apre modale o rimanda a /richiedi-accesso
Gestione errori: "Email o password non corretti" (generico, no distinguere i due per sicurezza)

━━━ 3. PAGINA /richiedi-accesso ━━━

Form richiesta accesso:
- Nome, Cognome, Email, Azienda/Studio, Tipo cliente (select), Telefono
- Messaggio: "Perché vuoi accedere all'area tecnici?"
- Privacy checkbox
Server Action: crea record in tabella tecnici con approvato=false,
poi invia email a CONTACT_EMAIL: "🔒 Nuova richiesta accesso area tecnici — [Nome] [Azienda]"
Pagina di conferma: "Richiesta inviata! Ti rispondo entro 24 ore."

━━━ 4. AREA TECNICI (/area-tecnici) ━━━

Header: "Benvenuto, [Nome] — Area Tecnici Certificati" + bottone Logout (angolo destra)

SEZIONE: 📄 Schede Tecniche
Card per ogni documento scaricabile:
- IGK2 Rasante — scheda tecnica completa (PDF)
- SuperFluid — scheda tecnica e varianti (PDF)
- SuperElastiK Low Density — manuale installazione (PDF)
- SuperElastiK High Density — manuale installazione (PDF)
Bottone "Scarica" per ogni documento.

Protezione download:
Crea route handler app/api/documents/[filename]/route.ts:
- Verifica sessione NextAuth (getServerSession)
- Verifica approvato = true in Supabase
- Logga l'accesso in tabella access_log
- Serve il file da /private/documents/ (NON da /public/)
- I PDF sono in /private/documents/ (mai accessibili direttamente da browser)

SEZIONE: 📋 Manuali Applicazione
- Guida applicazione IGK2 passo-passo (PDF)
- Protocollo di posa SuperFluid (PDF)
- Guida SuperElastiK — preparazione supporto (PDF)

SEZIONE: 📊 Materiale Marketing
- Brochure prodotti 2026 (PDF)
- Schede comparative (PDF)
- Immagini e loghi brand (ZIP)

SEZIONE: 🎓 La mia certificazione
- Se l'utente è certificato SuperFluid: mostra attestato (PDF personalizzato con nome e data)
- Se non ancora certificato: box con info sul corso e link a /formazione

━━━ 5. PANNELLO /area-tecnici/admin ━━━

Accessibile solo se session.user.ruolo === 'admin'.
Redirect a /area-tecnici se ruolo !== 'admin'.

Tabella utenti:
- Colonne: Nome | Azienda | Email | Tipo | Data registrazione | Approvato | Azioni
- Toggle "Approva/Revoca accesso" per ogni utente (aggiorna Supabase via Server Action)
- Quando approvato: invia email all'utente "Il tuo accesso all'area tecnici è stato attivato"

Bottone "Esporta CSV" — genera download CSV con tutti i dati (nome, azienda, email, tipo, data).

Log accessi (ultimi 50): tabella con utente, documento scaricato, data/ora.

━━━ 6. PAGINA /area-tecnici/non-approvato ━━━

Per utenti autenticati ma in attesa di approvazione.
Messaggio: "La tua richiesta è in fase di revisione. Ti avviseremo via email non appena approvata."
Stima tempi: "Di solito entro 24 ore lavorative."
Contatto diretto: "Per urgenze: f.lomazzi@fbosolution.it"
```
