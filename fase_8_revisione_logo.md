# FASE 8 — Revisione Logo
## nanopower.it

> **Stato:** da fare — appunto aperto durante la Fase 1, da riprendere in un secondo momento.

---

## Contesto

Durante la Fase 1 è stato integrato il logo storico nanopower (dagli asset in `Logo/`)
in Navbar e Footer. Per arrivare a un risultato accettabile sono stati necessari diversi
tentativi:

1. Il file `Logo_casetta_trasp.gif` (nome che suggerisce "trasparente") in realtà aveva
   uno sfondo bianco pieno, non trasparente — ricostruita la trasparenza via color-key
   + un-premultiply (formula contro sfondo bianco noto) per evitare aloni e bordi
   frastagliati.
2. Il testo "nanopower" inizialmente renderizzato come immagine raster del logo
   completo (`Logo_nanopower.gif`) risultava "stracciato" via via scalato. Sostituito
   con il font ufficiale del brand `NANO-LOW.TTF` (trovato in
   `Logo/1_Logo/set_box_logo_nanopower/nanopower Font/`), caricato via `next/font/local`
   in `app/fonts/NanoLow.ttf`.
3. L'icona (house-lattice + cerchio molecola) è stata inserita in un contenitore
   ottagonale bianco (CSS `clip-path: polygon(...)` in `Navbar.tsx` e `Footer.tsx`),
   per richiamare gli spigoli smussati del font del logo.

## Cosa rivedere

- Verificare con il cliente/brand owner se l'ottagono bianco e le proporzioni
  attuali (icona quasi a riempire il contenitore) sono coerenti con le linee guida
  del brand, se esistono.
- Valutare se serve una versione vettoriale pulita dell'icona (SVG) invece del PNG
  ricostruito via canvas, per una qualità garantita a qualsiasi risoluzione/DPI.
- Controllare la resa dell'icona (`public/logo-icon.png`) su schermi ad alta densità
  (retina) e in dark/light mode se in futuro verrà introdotto un tema chiaro.
- Considerare se il font `NanoLow` (peso unico, nessun bold/italic) è sufficiente per
  tutti gli usi futuri del wordmark (es. titoli grandi, favicon, opengraph image) o
  se serve un fallback/adeguamento per quei contesti.
- `app/opengraph-image.tsx` usa ancora un rendering testuale generico (non il font
  NanoLow): valutare se allinearlo.

## File coinvolti

- `components/Navbar.tsx`
- `components/Footer.tsx`
- `app/layout.tsx` (caricamento font `nanoLogo`)
- `app/fonts/NanoLow.ttf`
- `public/logo-icon.png`
