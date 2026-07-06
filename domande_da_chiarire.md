# Domande da chiarire con il cliente / produttore

File di raccolta per dubbi emersi durante lo sviluppo che richiedono una risposta
dal cliente (Fbosolution) o dal produttore (Technicae Progressum GmbH / i-GlooAdvance,
Galassia B.V. / i-GlooKlima), non risolvibili autonomamente con i documenti disponibili
in `Prodotti/`.

---

## 1. Cifre marketing SuperFluid già pubblicate vs documenti ufficiali

Durante la Fase 3 (landing SuperFluid) sono emerse discrepanze tra i numeri già
pubblicati sul sito (Fase 1: homepage hero/stats) e i documenti ufficiali disponibili
in `Prodotti/i-Gloo ADDITIVI Superfluid/`:

- **Copertura assicurativa**: il sito mostra "€10.000.000", ma sia
  `POSTUMA/GARANZIA DECENNALE SupeFluid copia.pdf` sia
  `Clienti-T-massetti/Guida Rapida Massetti - 2 pagine - Finale.pdf` indicano
  **€5.000.000 per cantiere** (massimale assicurato).
  → **Deciso (2026-07-06): correggere ovunque a €5.000.000.**
  Chiedere conferma al cliente/produttore se esiste una polizza più recente da
  €10.000.000 non presente nella cartella `Prodotti/`, per evitare di aver
  "corretto" un dato in realtà giusto.

- **Calpestabilità "20 ore"**: nessuno dei 14 prodotti della gamma reale
  (vedi `GUIDA NUOVA 2 - Corretta.pdf`) ha calpestabilità esattamente a 20 ore.
  Il range reale è 12h (6-CORE) - 24h (la maggior parte dei prodotti), con EXPERT
  a 16h.
  → **Deciso (2026-07-06): usare un range "12-24 ore a seconda della variante"
  invece del numero fisso.**
  Chiedere al cliente se "20 ore" era un arrotondamento comunicativo intenzionale
  da un prodotto specifico non documentato, o un errore da correggere anche nelle
  altre fasi/materiali di marketing esistenti (non solo sul sito).

- **Nomi varianti prodotto**: il prompt originale della Fase 3 elencava varianti
  inventate (SuperFluid Fast/Slim/Self-leveling/Thermal/Anti-frost/Fiber) che non
  corrispondono alla gamma reale (STANDARD, EXPERT, RAPID, FiberGel, NanoGel,
  NanoFiber, NEWTON, EXTENDED, WmK, LIGHT, RECYCLE, THIN, IDRO 7, 6-CORE).
  → **Deciso (2026-07-06): usare la gamma reale con dati e prezzi da
  `GUIDA NUOVA 2 - Corretta.pdf`.**

- **Tabella comparativa concorrenti (Mapei/Sika)**: richiesta dal prompt originale,
  ma nessun documento disponibile ne conferma i valori.
  → **Deciso (2026-07-06): omettere nomi di concorrenti specifici; usare una
  tabella "SuperFluid vs massetto standard" con soli dati verificati.**
  Se il cliente ha dati comparativi reali/fonti verificabili su Mapei/Sika, va
  valutato se e come includerli in un secondo momento.

**Impatto**: queste correzioni riguardano anche contenuti già pubblicati in Fase 1
(homepage) — vedi anche `fase_8_revisioni.md` punto 2 per il caso analogo λ IGK2.

---

## 2. Setup Supabase e primo utente admin (Fase 7 — Area Tecnici)

La Fase 7 (area tecnici) è stata implementata ma non è ancora collegata a un
progetto Supabase reale (nessun account creato durante lo sviluppo). Prima che
la funzionalità sia utilizzabile in produzione:

1. Creare un progetto su [supabase.com](https://supabase.com) (piano gratuito va bene).
2. Eseguire lo script `supabase/schema.sql` nell'SQL Editor del progetto.
3. Copiare **Project URL** e **service_role key** (non la `anon` key: tutte le
   query dell'app passano dal server) in `.env.local`/variabili d'ambiente Vercel:
   `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
4. **Nessun flusso crea automaticamente un admin**: ogni richiesta da
   `/richiedi-accesso` crea un utente con `ruolo='tecnico'`. Per attivare il
   primo amministratore, dopo la prima registrazione bisogna aggiornare
   manualmente la riga nella tabella `tecnici` su Supabase:
   `ruolo = 'admin'` e `approvato = true`.
5. Impostare anche `NEXTAUTH_SECRET` (stringa random 32+ caratteri, es.
   `openssl rand -base64 32`) e `NEXTAUTH_URL` (`https://nanopower.it` in
   produzione) nelle variabili d'ambiente di Vercel.
