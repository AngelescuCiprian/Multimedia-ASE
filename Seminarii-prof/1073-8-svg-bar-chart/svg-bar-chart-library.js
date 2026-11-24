export class BarChart{
    #svgns = 'http://www.w3.org/2000/svg'; 
    #svg

    /**
     * Creates a new instance
     * @param {HTMLDivElement} chartDiv 
     */
    constructor(chartDiv){
        this.#svg = document.createElementNS(this.#svgns, 'svg');
        this.#svg.style.borderColor = 'black';
        this.#svg.style.borderWidth = '1px';
        this.#svg.style.borderStyle = 'solid';
        this.#svg.style.backgroundColor = 'WhiteSmoke';

        this.#svg.setAttribute('width', '100%');
        this.#svg.setAttribute('height', '100%');

        chartDiv.appendChild(this.#svg);
    }

    /**
     * Draw the bar chart
     * @param {Array<Array>>} data 
     */
    draw(data){
        // Clear the chart
        this.#svg.replaceChildren();
        
        // Add bars
        const barWidth = this.#svg.clientWidth / data.length;

        const maxValue = Math.max(...data.map(x=>x[1]));
        const f = this.#svg.clientHeight / maxValue;

        for(let i = 0; i < data.length; i++){
            const element = data[i];
            const label = element[0];
            const value = element[1];

            const barHeight = f * value * 0.9;
            const barX = i * barWidth;
            const barY = this.#svg.clientHeight - barHeight;

            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY);
            bar.setAttribute('width', barWidth / 2);
            bar.setAttribute('height', barHeight);
            //bar.style.fill = 'orange';
            bar.classList.add('bar');

            bar.addEventListener('click', ()=>{alert(value);})
            this.#svg.appendChild(bar);

            const text = document.createElementNS(this.#svgns, 'text');
            text.textContent = label;
            text.setAttribute('x', barX + barWidth / 2);
            text.setAttribute('y', barY - 10);
            text.setAttribute('text-anchor', 'middle');
            this.#svg.appendChild(text);           
        }
    }
}