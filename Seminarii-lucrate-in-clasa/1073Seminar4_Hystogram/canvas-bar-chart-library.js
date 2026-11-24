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
    draw(values,options){
        const context = this.#canvas.getContext('2d');
        
        this.#canvas.width=this.#canvas.clientWidth
        this.#canvas.height=this.#canvas.clientHeight
        context.fillStyle='#DEDEDE';
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        
        const maxValue=Math.max(...values)
        const scaleFactor=this.#canvas.height/maxValue;
        const barWidth=this.#canvas.width / values.length;
        context.fillStyle = 'red';
        context.strokeStyle='green'
        context.lineWidth=3
        //adaugare valoare per bara
        context.textAlign="center"
        for(let i=0;i<values.length;i++)
        {
            const barHeight=values[i]*scaleFactor * 0.9;
            const barX=i*barWidth + barWidth*0.1;
            const barY=this.#canvas.height-barHeight;
            context.fillRect(barX + barWidth/4,barY,barWidth/2,barHeight);
            if(options?.drawOutline)
                context.strokeRect(barX+barWidth/4,barY,barWidth/2,barHeight)

            if(options?.drawValues)
            {
                const text=values[i]
                const textWidth=context.measureText(text).width;
                context.fillText(values[i],barX+barWidth/2,barY);
            }
            
            // context.fillText(values[i],barX+barWidth/2-textWidth/2,this.#canvas.height-20)
        }
    }

    download()
    {
        const dataURL=this.#canvas.toDataURL('image/jpeg',1);
        const acnhor=document.createElement('a')
        acnhor.href=dataURL
        acnhor.download='chart';
        acnhor.click();
    }
}