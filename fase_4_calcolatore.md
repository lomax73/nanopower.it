# FASE 4 — Calcolatore Risparmio Energetico
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Prima di eseguire, discuti con Claude: vuoi aggiungere la possibilità di
> scaricare il report del calcolo come PDF? Vuoi che il calcolatore invii
> automaticamente i risultati via email all'utente (lead magnet)?
>
> **Prerequisiti:** Fase 3 completata (`fase_3_superfluid_landing_eseguito.md`)
> **Risultato atteso:** Pagina /calcolatore interattiva, aggiornamento real-time, nessun backend.
> **Stato file:** rinomina in `fase_4_calcolatore_incorso.md` quando inizi,
> in `fase_4_calcolatore_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Crea la pagina /calcolatore in nanopower. Strumento interattivo per calcolare
il risparmio energetico con IGK2. Tutto client-side in React, nessun backend.

━━━ LAYOUT ━━━

Due colonne su desktop (input sinistra, risultati destra), stack su mobile.
I risultati si aggiornano in tempo reale a ogni modifica input (no submit button).
Usa useCallback e useMemo per ottimizzare i calcoli.

━━━ INPUT (colonna sinistra) ━━━

1. Slider + input numerico: "Superficie da trattare (m²)"
   Range: 10–500 | Default: 80 | Step: 5

2. Slider: "Spessore applicazione IGK2"
   Opzioni: 2mm / 4mm / 6mm / 8mm (4 tacche con label)

3. Select: "Zona climatica dell'edificio"
   - A (> 2.400 GG) — es. Palermo, Agrigento, Catania
   - B (1.401–2.100 GG) — es. Napoli, Bari, Reggio Calabria
   - C (901–1.400 GG) — es. Roma, Genova, Firenze
   - D (601–900 GG) — es. Milano, Torino, Venezia
   - E (1.001–2.000 GG) — es. Trento, Aosta, Cuneo
   - F (> 2.000 GG) — es. Cortina, zone montane >1.000m

4. Select: "Sistema di riscaldamento principale"
   - Gas naturale (costo ref. €/kWh: 0,11)
   - Pompa di calore elettrica (costo ref. €/kWh: 0,25)
   - Gasolio (costo ref. €/kWh: 0,13)
   - Teleriscaldamento (costo ref. €/kWh: 0,09)
   - Pellet (costo ref. €/kWh: 0,07)

5. Select: "Tipo di edificio"
   - Appartamento in condominio
   - Casa indipendente
   - Edificio commerciale / uffici
   - Struttura pubblica

━━━ ALGORITMO DI CALCOLO ━━━

// Fabbisogno energetico base per zona (kWh/m²/anno, riscaldamento)
const fabbisognoBase = { A: 40, B: 60, C: 80, D: 100, E: 130, F: 160 }

// Riduzione con IGK2 per spessore applicato
const riduzione = { 2: 0.18, 4: 0.28, 6: 0.35, 8: 0.40 }

// Fattore moltiplicativo per tipo edificio (efficienza dispersione)
const fattoreEdificio = {
  'Appartamento': 0.7,      // meno superfici esposte
  'Casa indipendente': 1.0,
  'Commerciale': 0.85,
  'Pubblica': 0.9
}

// Costo riferimento per sistema riscaldamento (€/kWh)
const costoKwh = { gas: 0.11, pompa: 0.25, gasolio: 0.13, tele: 0.09, pellet: 0.07 }

// Calcoli principali
const kwhTotaleAnno = mq * fabbisognoBase[zona] * fattoreEdificio[edificio]
const kwhRisparmiatoAnno = kwhTotaleAnno * riduzione[spessore]
const risparmioEuroAnno = kwhRisparmiatoAnno * costoKwh[sistema]
const co2RidottaKg = kwhRisparmiatoAnno * 0.233  // fattore medio gas naturale
const costoIGK2Stimato = mq * spessore * 8       // €8/mm/m² stima installata
const paybackAnni = costoIGK2Stimato / risparmioEuroAnno

// Miglioramento classe energetica (stima qualitativa)
const miglioramento = riduzione[spessore] >= 0.35 ? "2 classi" : "1 classe"

━━━ OUTPUT (colonna destra) ━━━

4 card risultato con icona SVG e animazione count-up (da 0 al valore in 1s):
- 💶 "€ [risparmioEuroAnno.toFixed(0)] / anno" — "Risparmio sulla bolletta energetica"
- ⚡ "[kwhRisparmiatoAnno.toFixed(0)] kWh / anno" — "Energia risparmiata"
- 🌱 "[co2RidottaKg.toFixed(0)] kg CO₂ / anno" — "Emissioni evitate"
- 📅 "[paybackAnni.toFixed(1)] anni" — "Stima tempo di rientro investimento"

Barra "Miglioramento classe energetica":
- Gradiente orizzontale: A+ (verde) → G (rosso)
- Indicatore mobile che mostra la posizione attuale e quella stimata post-IGK2
- Label: "Stima: miglioramento di [miglioramento] energetiche"

Box CTA dopo i risultati:
"Per un'analisi precisa del tuo edificio, richiedi una consulenza gratuita."
Bottone: "Richiedi consulenza gratuita" → /richiedi-info

━━━ FOOTER CALCOLATORE ━━━

Nota legale piccola:
"I valori sono stime indicative basate su dati statistici medi per zona climatica.
I risultati effettivi possono variare in funzione delle caratteristiche specifiche
dell'edificio, del sistema impiantistico e delle condizioni di posa del prodotto.
Spessori e riduzioni secondo specifiche tecniche i-GlooKlima."

━━━ ANIMAZIONI ━━━

- Count-up: quando i valori cambiano, i numeri animano verso il nuovo valore in 800ms
  (usa requestAnimationFrame o una semplice funzione di interpolazione)
- Highlight input: quando un slider/select cambia, il card risultato corrispondente
  flasha brevemente (outline teal per 300ms)
- La barra classe energetica si anima con CSS transition sulla posizione
```
