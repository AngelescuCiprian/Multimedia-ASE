export class BarChart{
    #svgns = 'http://www.w3.org/2000/svg';
    #svg

    /**
     * Creates a new bar chart
     * @param {HTMLDivElement} chartDiv 
     */
    constructor(chartDiv){
       this.#svg = document.createElementNS(this.#svgns, 'svg'); 
       this.#svg.style.borderColor ='black';
       this.#svg.style.borderWidth = '1px';
       this.#svg.style.borderStyle = 'solid';
       this.#svg.style.background = 'WhiteSmoke';

       this.#svg.setAttribute('width', '100%');
       this.#svg.setAttribute('height', '100%');

       chartDiv.appendChild(this.#svg);
    }

    /**
     * Display the barchart
     * @param {Array<Array<>>} data 
     */
    draw(data){
        // Clear the chart
        this.#svg.replaceChildren();

        // Add the bars
        const barWidth = this.#svg.clientWidth / data.length;
        const maxValue = Math.max(...data.map(x=>x[1]));
        const f = this.#svg.clientHeight / maxValue;

        for(let i = 0; i < data.length; i++){
            const element = data[i];
            const label = element[0];
            const value = element[1];

            const barHeight = f * value *0.9;
            const barX = i * barWidth;
            const barY = this.#svg.clientHeight - barHeight;
            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY);
            bar.setAttribute('fill', 'orange');
            bar.setAttribute('width', barWidth / 2);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('stroke-width','2')
            bar.setAttribute('stroke','black')
            bar.classList.add('bar');
            bar.addEventListener('click',()=>
            {
                alert(value);
            })
            this.#svg.appendChild(bar);

            //assigment
            const text=document.createElementNS(this.#svgns,'text')
            text.setAttribute('x',barX+barWidth/2)
            text.setAttribute('y',barY-5)
            text.setAttribute('text-anchor', 'middle');
            text.textContent = label;
            this.#svg.appendChild(text);
        }
    }
}