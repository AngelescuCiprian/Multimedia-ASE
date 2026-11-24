export class ImageEditor
{
    #visibleCanvas;
    #offscreenCanvas
   
    
    #visibleCanvasCtx;
    #offscreenCanvasCtx;
    #effect
    /**
     * @param {HTMLCanvasElement} visibleCanvas
     */
    constructor(visibleCanvas)
    {
        this.#visibleCanvas=visibleCanvas;
        this.#offscreenCanvas=document.createElement('canvas');
        this.#visibleCanvasCtx=this.#visibleCanvas.getContext('2d')
        this.#offscreenCanvasCtx=this.#offscreenCanvas.getContext('2d');

        
    }

    /**
     * 
     * @param {HTMLImageElement} img 
     */
    changeImage(img)
    {
        this.#visibleCanvas.width=this.#offscreenCanvas.width=img.naturalWidth
        this.#visibleCanvas.height=this.#offscreenCanvas.height=img.naturalHeight
        //2. Draw the image on the offscreen canvas
        this.#offscreenCanvasCtx.drawImage(img,0,0);
        // this.#visibleCanvasCtx.drawImage(this.#offscreenCanvas,0,0)
        this.changeEffect('normal')
    }

    /**
     * Change the effect
     * @param {string} effect 
     */
    changeEffect(effect)
    {
        if(this.#effect!==effect)
        {
            this.#effect=effect
            this.#drawImage();
        }
    }

    #drawImage()
    {
        switch(this.#effect)
        {
            case 'normal':
                this.#visibleCanvasCtx.drawImage(this.#offscreenCanvas,0,0)
                break;
            case 'grayscale':
                this.#grayscale();
                break;
            case 'sepia':
                this.#sepia();
                break;
        }
    }

    #grayscale()
    {
        const imageData=this.#offscreenCanvasCtx.getImageData(0,0,this.#offscreenCanvas.width,this.#offscreenCanvas.height);
        const data=imageData.data;
        for(let i=0;i<data.length;i+=4)
        {
            const avg=Math.round((data[i]+data[i+1]+data[i+2])/3);
            data[i]=data[i+1]=data[i+2]=avg;
        }
        this.#visibleCanvasCtx.putImageData(imageData,0,0);
    }

    #sepia()
    {
        const imageData=this.#offscreenCanvasCtx.getImageData(0,0,this.#offscreenCanvas.width,this.#offscreenCanvas.height);
        const data=imageData.data;
        for(let i=0;i<data.length;i+=4)
        {
            const r=data[i];
            const g=data[i+1];
            const b=data[i+2];
            data[i]  =Math.min(255,Math.round(r*0.393+g*0.769+b*0.189));
            data[i+1]=Math.min(255,Math.round(r*0.349+g*0.686+b*0.168));
            data[i+2]=Math.min(255,Math.round(r*0.272+g*0.534+b*0.131));
        }
        this.#visibleCanvasCtx.putImageData(imageData,0,0);
    }
}