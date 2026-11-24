# Cheatsheet – citește-l în dimineața examenului

Crește pe măsură ce terminăm module. La final adăugăm și capcanele tale personale (din review-uri).

## Schelet de examen (a)

```html
<svg id="svg" width="400" height="200"></svg>
<audio id="audio" controls src="media/audio.mp3">Browserul nu suportă audio.</audio>
<canvas id="canvas" width="400" height="200">Browserul nu suportă canvas.</canvas>
```
`controls` = interfața implicită a browserului. Fără el, `<audio>` e invizibil.

## Canvas – baze (M01)

```js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.fillStyle = 'red';  context.fillRect(x, y, w, h);      // w, h = LĂȚIME, ÎNĂLȚIME
context.strokeStyle = 'blue'; context.lineWidth = 2; context.strokeRect(x, y, w, h);
context.clearRect(0, 0, canvas.width, canvas.height);
context.font = 'bold 24px Arial';
context.textAlign = 'center';  context.textBaseline = 'middle';
context.fillText(text, x, y);   context.measureText(text).width;
context.beginPath(); context.moveTo(x, y); context.lineTo(x, y); context.closePath(); context.fill(); context.stroke();
context.arc(cx, cy, r, 0, 2 * Math.PI);    // radiani: grade * Math.PI / 180
```

| Colț | x | y |
|---|---|---|
| dreapta-jos | `W - w` | `H - h` |
| centru | `(W - w) / 2` | `(H - h) / 2` |

```js
function formatTime(s) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
```

### Capcane Canvas
1. Atributele `width/height` ≠ CSS. Doar CSS = desen blurat/deformat. Implicit 300×150.
2. Lipsește `beginPath()` → `fill()` recolorează și formele vechi.
3. `textBaseline` implicit e `'alphabetic'` → text la `y = 0` iese în afara canvas-ului.
4. Stilurile rămân setate (`textAlign = 'right'` afectează și textul următor).
5. Redesenare fără `clearRect` → texte suprapuse.
6. `Math.max(values)` → `NaN`. Corect: `Math.max(...values)`.
7. `lineWidth` se întinde jumătate în afara formei.

## Capcanele mele (din review-uri)
- **M01 ex 01:** `querySelector('canvas')` dă autocomplete, dar ia doar PRIMUL canvas. Cu id + autocomplete: `/** @type {HTMLCanvasElement} */` deasupra lui `getElementById`. Folosește `const` pentru ce nu reatribui (`canvas`, `context`).
