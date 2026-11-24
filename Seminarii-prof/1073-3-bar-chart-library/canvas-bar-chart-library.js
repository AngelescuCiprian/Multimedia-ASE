export class BarChart{
    #canvas; // atribut privat

    /**
     * Creates a new bar chart
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
        this.#canvas = canvas;
    }

    /**
     * Draws the bar chart
     * @param {Array<number>} values 
     */
    draw(values){
        this.#canvas.width = this.#canvas.clientWidth;
        this.#canvas.height = this.#canvas.clientHeight;

        const context = this.#canvas.getContext('2d');
        context.fillStyle = '#DEDEDE'; // 'red', rgb(), rgba()
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        
        const maxValue = Math.max(...values);
        const scaleFactor = this.#canvas.height / maxValue;
        const barWidth = this.#canvas.width / values.length;
        context.lineWidth = 2;
        //context.fillStyle = 'red';
        context.strokeStyle = 'darkred';
        //context.textAlign = 'center';
        for(let i = 0; i < values.length; i++){
            const barHeight = values[i]*scaleFactor * 0.9;
            const barX = i * barWidth;
            const barY = this.#canvas.height - barHeight;
            context.fillStyle = 'red';
            context.fillRect(barX + barWidth / 4, barY, barWidth / 2, barHeight);
            context.strokeRect(barX + barWidth / 4, barY, barWidth / 2, barHeight);
            context.fillStyle = 'orange';

            const text = values[i];
            const textWidth = context.measureText(text).width;
            //context.fillText(values[i], barX + barWidth / 2, this.#canvas.height - 20);
            context.fillText(values[i], barX + barWidth / 2 - textWidth / 2, this.#canvas.height - 20);
        }
    }
}