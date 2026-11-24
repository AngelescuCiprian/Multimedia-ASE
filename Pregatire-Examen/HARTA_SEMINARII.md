# Harta seminariilor

Sursa completă e `SeminariiDescarcateONLINEASE/` (zip-urile grupei 1073). În repo-ul de GitHub sunt dezarhivate în `Seminarii-prof/`. Proful a construit fiecare proiect pe parcursul a 2–3 seminarii. Versiunea cu numărul cel mai mare e cea finală, așa că pe aia o citești.
Folderele tale (`Seminar2`, `1073-2-…`, `1073Seminar4_Hystogram`, `1075-…`) sunt versiuni intermediare sau de la grupa 1075. Nu aduc nimic în plus.

| Seminar | Versiunea finală (zip) | Concepte | Echivalent în repo-ul profului | Modul |
|---|---|---|---|---|
| 2–4 | `1073-4-bar-chart-library` | `<canvas>`, `getContext('2d')`, `canvas.width = clientWidth`, `fillRect`, `strokeRect`, `fillText`, `measureText`, factor de scalare, `toDataURL` + download; clasă ES cu câmpuri private `#`, `export/import`, `options?.drawValues` | `Labs/03…/canvas-bar-chart` | M01 |
| 4–5 | `1073-5-histogram` | drag & drop (`dragover` + `preventDefault`), `FileReader.readAsDataURL`, `img` + evenimentul `load`, `drawImage`, `getImageData`, tabloul RGBA parcurs cu `i += 4`, histogramă cu 256 de valori | `Labs/03…/canvas-histogram` | M03 |
| 6–7 | `1073-7-image-editor` | canvas offscreen (original) + canvas vizibil (rezultat), `<input type="file">`, `data-effect` + `dataset`, efecte: grayscale, threshold (luminanță 0.2126/0.7152/0.0722), sepia, negativ, canal roșu, pixelare | `Labs/03…/canvas-image-editor` | M03 |
| 7–8 | `1073-8-svg-bar-chart` | namespace SVG, `createElementNS`, `setAttribute`, `<rect>`, `<text>`, `text-anchor`, CSS `.bar:hover { fill }`, `replaceChildren()`, click pe un element SVG | `Labs/04…/svg-bar-chart` | M04 |
| 8–9 | `1073-9-audio-element` | `<audio controls src>`, `play()`, `pause()`, `paused`, evenimentele `timeupdate`, `durationchange` și `ended`, `formatTime` cu `padStart`, playlist cu `createDocumentFragment` | `Labs/06…/audio-playlist` | M05 |
| urmează | — | probabil video (`Labs/07`) și animație (`Labs/08`) | `Labs/07`, `Labs/08` | M07 |

## Materiale utile din repo-ul profului (`ase-multimedia/`)

- `Curs/Exemple/02. Graphics.2D - Raster/04…12`: desen, text, `save/restore`, transformări. Exact ce trebuie pentru M01–M02.
- `Curs/Exemple/03. Graphics - Vector/`: exemple SVG.
- `Labs/03…/cheat-sheet.pdf`: cheat sheet oficial pentru Canvas.
- `Curs/multimedia-ro.pdf`: cursul complet, folosit la teorie și grilă (M08).

## Observații de la citirea codului

- În `image-editor.js` (1073-7), funcția `#pixelate` face `fillRect(x, y, x + blocksize - 1, y + blocksize - 1)`. Al 3-lea și al 4-lea parametru sunt **lățime și înălțime**, nu coordonate. Corect e `fillRect(x, y, blocksize, blocksize)`. Merge vizual doar pentru că blocurile se suprapun. Prinde-l, că e exact genul de detaliu de grilă.
- În `1073-9-audio-element`, butonul Play/Pause își schimbă textul doar când îl apeși. Dacă dai play din controalele native, rămâne greșit. Varianta ta din `1075-9-audio` (ascultă evenimentele `play`/`pause`) e mai corectă.
