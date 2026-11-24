# Multimedia – pregătire examen

Ținta: să scrii singur, din cap, cod HTML + Canvas + SVG + Audio de tipul celui de la examen.
Focus pe practică. Teoria și grila le luăm în ultima săptămână.

## Ce cere examenul (pattern-ul din cele 2 exemple)

Mereu aceeași structură, în 3 pași:

| Pas | Ce se cere | Ce trebuie să știi |
|---|---|---|
| a) | `<svg>` + `<audio controls>` + `<canvas>` în pagină | HTML de bază, atributul `controls` |
| b) | ceva desenat/afișat în **SVG** (dreptunghi în colț + hover, text cu timpul curent) | coordonate, `<rect>`, `<text>`, CSS `:hover`, `createElementNS` |
| c) | ceva desenat pe **Canvas** (text cu durata, pătrat rotit 45°) | `fillRect`, `fillText`, `font`, `save/translate/rotate/restore` |
| liant | legătura cu audio-ul | `duration`, `currentTime`, evenimentele `loadedmetadata` / `timeupdate` |

Cele două modele sunt în [`00-tinta-examen/`](00-tinta-examen/). Sunt ținta finală. Încearcă-le la sfârșitul săptămânii 2, nu acum.

> ⚠️ **Examenul e „scris”.** Dacă înseamnă pe hârtie (verifică cu colegii din anii trecuți), nu vei avea autocomplete.
> Va trebui să știi pe de rost `getContext('2d')`, `'http://www.w3.org/2000/svg'`, `'timeupdate'`, `'loadedmetadata'`.
> De aceea, din săptămâna 3 scriem soluțiile întâi fără IDE și abia apoi le testăm.

## Planul pe 4 săptămâni

| Săpt. | Modul | Concepte | La final poți face |
|---|---|---|---|
| 1 | **M01 Canvas – baze** ✅ gata | dimensiuni canvas, coordonate, `fillRect`, text, path-uri, redesenare | punctul c) din modelul 1 (fără audio) |
| 1 | **M02 Canvas – transformări** | `save/restore`, `translate`, `rotate`, `scale` | pătratul rotit la 45° |
| 2 | **M03 Canvas – imagini și pixeli** | `drawImage`, `FileReader`, `getImageData`, efecte, histogramă | editorul de imagini de la seminar, scris de tine |
| 2 | **M04 SVG** | SVG static vs. JS, `createElementNS`, `rect/circle/text`, CSS hover, evenimente | punctul b) din ambele modele |
| 3 | **M05 Audio** | `<audio>`: proprietăți, metode, evenimente, `formatTime`, playlist | „liantul” din modele |
| 3 | **M06 Combinat (format examen)** | 8–10 subiecte noi în stilul profului, contra cronometru | ambele modele, fără ajutor |
| 4 | **M07 Video + animație** | ce se face la ultimele seminarii (`<video>` pe canvas, `requestAnimationFrame`) | — |
| 4 | **M08 Teorie + grilă** | din `ase-multimedia/Curs/multimedia-ro.pdf`: raster vs. vector, culori, numerizarea sunetului, formate, compresie | grila |

Modulele M02–M08 le construim pe rând, pe măsură ce le termini pe cele de dinainte. Le ajustez după greșelile pe care le faci.

## Cum lucrăm (learn by doing)

1. Citești `LECTIE.md` din modul (~10 min). Rulează fiecare snippet.
2. Faci exercițiile **în ordine**, în `exercitii/`. Fiecare fișier are cerința și `TODO`-uri.
3. **Nu deschide `solutii/`** până nu ai o variantă a ta care rulează, sau până nu te-ai blocat 15 min.
4. Îmi scrii „am terminat M01 ex 03”. Citesc direct fișierul tău din folder și îți dau review: ce e greșit, de ce și ce capcană e.
5. Capcanele în care cazi ajung în `CHEATSHEET.md`. Ăla e fișierul pe care îl citești în dimineața examenului.

## Setup (o singură dată)

- **VS Code + extensia Live Server.** Click dreapta pe `.html` → *Open with Live Server*.
  Nu deschide fișierele cu dublu-click (`file://`). Modulele ES (`type="module"`) și `getImageData` pe imagini nu merg așa.
- **F12 → Console** deschis tot timpul. 90% din „nu merge” e o eroare roșie acolo.
- Fișierul audio comun e în `media/audio.mp3`.

## Progres

- [ ] M01 Canvas – baze (6 exerciții)
- [ ] M02 Canvas – transformări
- [ ] M03 Imagini și pixeli
- [ ] M04 SVG
- [ ] M05 Audio
- [ ] M06 Combinat – format examen
- [ ] M07 Video + animație
- [ ] M08 Teorie + grilă
- [ ] Modelul 1 rezolvat singur, fără IDE
- [ ] Modelul 2 rezolvat singur, fără IDE

Vezi și [`HARTA_SEMINARII.md`](HARTA_SEMINARII.md): ce s-a făcut la fiecare seminar și unde găsești codul.
