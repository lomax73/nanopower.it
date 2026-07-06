# FASE 2 — Pagine Prodotto: IGK2 e SuperElastiK
## nanopower.it

> ⚠️ **DISCUTI QUESTO PROMPT CON CLAUDE PRIMA DI ESEGUIRLO**
> Prima di eseguire, discuti: hai foto termografiche da inserire in IGK2?
> Hai immagini di cantieri reali? I placeholder sono pronti ma è meglio sapere
> cosa avrai disponibile per strutturare le sezioni nel modo più utile.
>
> **Prerequisiti:** Fase 1 completata (`fase_1_struttura_base_eseguito.md`)
> **Risultato atteso:** Pagine /igk2 e /superelastik complete con form lead.
> **Stato file:** rinomina in `fase_2_pagine_prodotto_incorso.md` quando inizi,
> in `fase_2_pagine_prodotto_eseguito.md` quando completata.

---

## Prompt da incollare in Claude Code

```
Crea le pagine prodotto per IGK2 e SuperElastiK nel progetto nanopower.

━━━ PAGINA /igk2 (app/igk2/page.tsx) ━━━

HERO:
- Sfondo con gradiente freddo (da #0D1F33 a #0A2A3A con accento teal)
- Badge: "λ = 0,0014 W/mk — Il più basso sul mercato"
- H1: "IGK2 — Isolamento Termico Nanotecnologico"
- Sub: "Solo 2-8 mm equivalenti a 12 cm di cappotto tradizionale. Senza demolizioni."
- 2 CTA: "Richiedi un campione gratuito" (primario) | "Scarica scheda tecnica PDF" (secondario)

SCHEDA TECNICA (tabella stilizzata con Tailwind):
Intestazione blu scuro, righe alternate, bordi sottili:
| Caratteristica | Valore | Note |
- Tipologia | Rasante nanocomposito in pasta, monocomponente premiscelato | Pronto all'uso
- Spessore applicazione | 2–8 mm | Adattabile alle esigenze
- Conducibilità termica | λD = 0,0014 W/mk a 10°C | Il più basso tra i rasanti
- Confezione | 22 litri | Resa ~0,73 kg/m²/mm
- Applicazione | A spatola, interno ed esterno | 4–5 giorni per appartamento
- Proprietà | Antimuffa, traspirante, idrofugo, atossico | 100% riciclabile
- iGK1 Resina | λD = 0,0026 W/mk | Classe fuoco Euro B s1 d0
- Agevolazioni | Ecobonus 65%, Bonus Ristrutturazione 50% | Verifica con tecnico abilitato

SEZIONE COMPARAZIONE VISIVA:
Grafico a barre orizzontali in SVG o React puro (senza librerie chart):
Confronto spessore necessario per stessa performance termica:
- IGK2: 8 mm ████ (barra corta verde)
- Lana di rocca: 80 mm ████████████████████
- EPS: 100 mm █████████████████████████
- Polistirene: 120 mm ██████████████████████████████
Etichetta: "Spessore necessario per resistenza termica equivalente R=5,7 m²K/W"
Nota: "Dati illustrativi. La conducibilità termica effettiva dipende dalle condizioni di posa."

SEZIONE "QUANDO USARE IGK2" (3 card con icona SVG):
- Edifici storici con vincoli: "Dove il cappotto esterno è vietato o impossibile"
- Ambienti interni: "Riduzione di spessore minima, nessuna perdita di metratura"
- Ristrutturazioni veloci: "Applicazione rapida, senza opere murarie invasive"

SEZIONE "PRIMA E DOPO" (placeholder termografico):
2 card affiancate:
- "Prima": gradiente rosso-arancio con label "Dispersione termica elevata"
- "Dopo": gradiente blu-verde con label "Dispersione termica ridotta"
Sotto: "Le immagini termografiche dei tuoi cantieri vanno inserite qui."
(Aggiungi commento nel codice: <!-- Sostituire con immagini termografiche reali -->)

SEZIONE AGEVOLAZIONI FISCALI:
Box con bordo teal e sfondo teal chiaro:
- Ecobonus 65%: per interventi di riqualificazione energetica
- Bonus Ristrutturazione 50%: lavori di manutenzione straordinaria
- SuperBonus: verificare applicabilità caso per caso
Disclaimer: "Verifica con il tuo tecnico abilitato le condizioni specifiche di accesso."

FORM PREVENTIVO (fondo pagina):
Campi: Nome, Email, Telefono, Città, m² da trattare (number input),
Tipo edificio (select: Appartamento, Condominio, Casa ind., Ufficio, Altro),
Note libere, Privacy checkbox.
Server Action: aggiungi contatto Brevo con listId = BREVO_LIST_ID_IGK2,
attributo PRODOTTO="IGK2", poi email notifica a CONTACT_EMAIL.

━━━ PAGINA /superelastik (app/superelastik/page.tsx) ━━━

HERO:
- Sfondo scuro con pattern geometrico CSS (linee diagonali sottili, opacity 0.05)
- Badge: "EN 14891 + EN 1504-2"
- H1: "SuperElastiK — Membrana Impermeabilizzante Elastica Bicomponente"
- Sub: "Ponte su fessure fino a 2,8 mm · Protezione dalla carbonatazione per 50+ anni"
- CTA: "Richiedi consulenza tecnica"

SCHEDA TECNICA (stessa struttura tabella IGK2):
| Caratteristica | Valore | Note |
- Tipologia | Membrana bicomponente cementizia elastica | Pennello o rullo
- Componenti | Componente A: 10 kg polvere + Componente B: 25 kg liquido | Miscelazione meccanica
- Spessore per mano | 2 mm | Tipicamente 2 mani per impermeabilizzazione completa
- Varianti | Low Density (flessibile) / High Density (rigida) | Scegliere in base all'applicazione
- Capacità di ponte | Fino a 2,8 mm | Fessure strutturali e da ritiro
- Protezione CO₂ | 50+ anni | Barriera alla carbonatazione del calcestruzzo armato
- Normative | EN 14891 + EN 1504-2 | Impermeabilizzanti cementizi + protezione CA
- Resistenza | Acqua marina, acque reflue, acidi diluiti, fertilizzanti | —

SEZIONE "LOW DENSITY vs HIGH DENSITY" (tabella comparativa):
| Aspetto | Low Density | High Density |
- Flessibilità | Alta (elastomero) | Media (semi-rigida)
- Applicazione ideale | Strutture soggette a movimenti, fessure | Vasche, piscine, alta pressione idrostatica
- Spessore finale | 4-6 mm (2 mani) | 4-6 mm (2 mani)
- Ponte fessure | Fino a 2,8 mm | Fino a 1,5 mm

SEZIONE "APPLICAZIONI" (griglia icone + testo, 3x2):
- Fondamenta e interrati
- Vasche e piscine
- Terrazze e balconi
- Ponti e tunnel
- Pareti con spinta idrostatica
- Strutture in CA deteriorate

SEZIONE "PERCHÉ PROTEGGE IL CALCESTRUZZO":
Box narrativo con icona "scudo":
"Il calcestruzzo armato si deteriora quando la CO₂ atmosferica penetra nella massa
e abbassa il pH fino a corrodere le armature (carbonatazione). SuperElastiK forma
una barriera impermeabile che blocca CO₂ e umidità per oltre 50 anni, preservando
le strutture senza interventi successivi."

FORM CONTATTO:
Campi: Nome, Azienda, Email, Telefono, Tipo progetto (select: Nuova costruzione,
Ristrutturazione, Manutenzione, Progetto arch.), m² stimati, Descrizione breve, Privacy.
Server Action: Brevo con listId = BREVO_LIST_ID_SUPERELASTIK, attributo PRODOTTO="SuperElastiK".
```
