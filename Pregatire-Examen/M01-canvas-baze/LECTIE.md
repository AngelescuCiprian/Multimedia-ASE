# M01 · Canvas – baze

**Ce știi la final:** creezi un canvas cu dimensiunile corecte, desenezi forme și text exact unde vrei (inclusiv în colțuri și pe centru) și redesenezi la un eveniment.
Pe baza asta stau `bar-chart` (seminarele 2–4) și punctul c) de la examen.

---

## 1. Ce e un `<canvas>`

O **suprafață de pixeli** (grafică raster). Desenezi pe ea cu JavaScript și rămân doar pixelii.
Canvas-ul **nu ține minte** obiectele. După ce ai desenat un dreptunghi, nu mai există niciun „dreptunghi”, doar pixeli roșii.

Consecința practică: **ca să schimbi ceva, ștergi tot și redesenezi**. (La SVG e invers: fiecare formă e un element pe care îl modifici direct. Asta e și o întrebare clasică de teorie.)

```html
<canvas id="canvas" width="400" height="300">
    Browserul nu suportă canvas.   <!-- fallback: apare doar dacă nu e suportat -->
</canvas>
```

## 2. Cele DOUĂ dimensiuni (capcana nr. 1)

| | Ce controlează | Implicit |
|---|---|---|
| atributele `width` / `height` | **câți pixeli** are suprafața de desen (rezoluția) | 300 × 150 |
| CSS `width` / `height` | **cât de mare apare** pe ecran | = atributele |

Dacă pui doar CSS `style="width:600px;height:400px"`, suprafața are tot 300×150 pixeli, întinși pe 600×400. Totul iese **mare, blurat și deformat**.

De asta proful face, la începutul lui `draw()`:

```js
canvas.width = canvas.clientWidth;   // clientWidth = mărimea afișată (din CSS)
canvas.height = canvas.clientHeight;
```

> Efect secundar util: **orice atribuire la `canvas.width` șterge tot canvas-ul** și resetează stilurile contextului.

Pentru examen, cea mai simplă variantă: pui atributele direct în HTML (`width="400" height="300"`) și nu pui CSS de dimensiune.

## 3. Contextul și sistemul de coordonate

```js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');   // toate desenele se fac prin context
```

```
(0,0) ──────────────► x        (canvas.width, 0)
  │
  │
  ▼ y  (crește în JOS!)
(0, canvas.height)              (canvas.width, canvas.height)
```

Formula pentru colțuri (o folosești la examen):

| Colț | x | y |
|---|---|---|
| stânga-sus | `0` | `0` |
| dreapta-sus | `canvas.width - w` | `0` |
| stânga-jos | `0` | `canvas.height - h` |
| **dreapta-jos** | `canvas.width - w` | `canvas.height - h` |
| centru | `(canvas.width - w) / 2` | `(canvas.height - h) / 2` |

Scrie mereu cu `canvas.width` / `canvas.height`, nu cu `350`. Dacă se schimbă dimensiunea, codul rămâne corect.

## 4. Stilul e o „stare” a contextului

Setezi stilul **înainte** să desenezi. Rămâne valabil pentru tot ce urmează, până îl schimbi.

```js
context.fillStyle = 'red';          // umplere: 'red', '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)'
context.strokeStyle = 'darkred';    // contur
context.lineWidth = 4;              // grosimea conturului

context.fillRect(10, 10, 100, 50);   // x, y, LĂȚIME, ÎNĂLȚIME  (nu x2, y2!)
context.strokeRect(10, 10, 100, 50);
context.clearRect(0, 0, canvas.width, canvas.height);  // șterge (face transparent)
```

## 5. Text

```js
context.font = 'bold 32px Arial';     // la fel ca în CSS: [stil] mărime familie
context.fillStyle = 'black';
context.textAlign = 'center';         // 'left' | 'center' | 'right' → față de x
context.textBaseline = 'middle';      // 'top' | 'middle' | 'bottom' | 'alphabetic' → față de y
context.fillText('Salut', canvas.width / 2, canvas.height / 2);   // centrat perfect

const w = context.measureText('Salut').width;   // lățimea în pixeli (cu fontul curent!)
```

- Implicit, `textBaseline` e `'alphabetic'`: `y` e linia pe care „stau” literele. Cu `y = 0` textul iese **deasupra** canvas-ului, deci nu se vede. Capcană clasică.
- `measureText` folosește fontul setat **în acel moment**. Setează `font` înainte.
- Proful centrează în bar-chart manual: `x - textWidth / 2`. E echivalent cu `textAlign = 'center'`.

## 6. Path-uri (forme oarecare)

```js
context.beginPath();          // ÎNCEPE un path nou (uitarea lui = capcana nr. 2)
context.moveTo(50, 200);      // mută „creionul” fără să deseneze
context.lineTo(150, 50);      // linie până aici
context.lineTo(250, 200);
context.closePath();          // închide forma (linie înapoi la start)
context.fillStyle = 'green';
context.fill();               // umple
context.stroke();             // conturează

// Cerc: arc(cx, cy, raza, unghiStart, unghiFinal) — unghiuri în RADIANI
context.beginPath();
context.arc(300, 100, 40, 0, 2 * Math.PI);
context.fill();
```

- Radiani: `grade * Math.PI / 180`. 360° = `2 * Math.PI`, 180° = `Math.PI`, 90° = `Math.PI / 2`, 45° = `Math.PI / 4`.
- Fără `beginPath()`, următorul `fill()`/`stroke()` redesenează **și formele vechi** din path. Simptom: culoarea nouă se aplică și formelor de dinainte.

## 7. Redesenare la evenimente (pattern-ul de examen)

Canvas-ul nu ține minte nimic. Ține **starea în variabile** și scrie o funcție `draw()` care desenează totul de la zero:

```js
let value = 0;                       // starea

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);   // 1. șterge
    context.font = '24px Arial';                             // 2. desenează tot
    context.fillText('Valoare: ' + value, 20, 40);
}

button.addEventListener('click', () => {
    value++;      // 3. schimbi starea…
    draw();       // 4. …și redesenezi
});
draw();           // desenul inițial
```

Exact așa vei face „afișează pe canvas durata/timpul curent al audio-ului”. Doar că evenimentul nu va fi `click`, ci `loadedmetadata` / `timeupdate`.
Fără `clearRect`, textele se suprapun și iese un bloc negru.

## 8. Poziția mouse-ului pe canvas

```js
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;   // față de colțul stânga-sus al canvas-ului
    const y = e.offsetY;
});
```

(`offsetX` e corect doar dacă dimensiunea CSS = atributele, vezi secțiunea 2.)

## 9. Download ca imagine (din seminar)

```js
const a = document.createElement('a');
a.href = canvas.toDataURL('image/png');   // sau 'image/jpeg', 0.9
a.download = 'chart.png';
a.click();
```

---

## Exerciții (în `exercitii/`, în ordine)

| # | Fișier | Exersezi |
|---|---|---|
| 01 | `01-colturi.html` | coordonate, colțuri, centru, `fillRect` / `strokeRect` |
| 02 | `02-text.html` | `font`, `textAlign`, `textBaseline`, `measureText` |
| 03 | `03-path-uri.html` | `beginPath`, linii, triunghi, cerc, arc |
| 04 | `04-format-time-redesenare.html` | `formatTime` + pattern-ul `draw()` + `clearRect` |
| 05 | `05-click-pe-canvas.html` | `offsetX/Y`, starea într-un array, redesenare |
| 06 | `06-bar-chart-de-la-zero.html` | refaci bar chart-ul de la seminar **fără să te uiți** |

Când termini unul, scrie-mi „gata M01 ex X”.
