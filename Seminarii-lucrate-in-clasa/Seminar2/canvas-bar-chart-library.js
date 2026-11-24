export class BarChart
{
    #canvas; // atribut/membru privat

    /**
     *  Creates a new bar chart
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas)
    {
        this.#canvas=canvas;
    }

    draw(values)
    {
        const context=this.#canvas.getContext('2d');
        context.fillStyle="#DEDEDE"
        context.fillRect(0,0,this.#canvas.width,this.#canvas.height);
    }
}