export class ImageEditor
{
    #visibleCanvas
    #visibleCanvasContext
    #offscreenCanvas
    #offscreenCanvasContext

    #effect
    

     /**
     * @param {HTMLCanvasElement} visibleCanvas
     */

    constructor(visibleCanvas)
    {
        this.#visibleCanvas=visibleCanvas
        this.#offscreenCanvas=document.createElement('canvas');

        this.#visibleCanvasContext=this.#visibleCanvas.getContext('2d')
        this.#offscreenCanvasContext=this.#offscreenCanvas.getContext('2d')


    }

    /**
     * @param {HTMLImageElement} img
     */

    changeImage(img)
    {
        this.#visibleCanvas.width=this.#offscreenCanvas.width=img.naturalWidth
        this.#visibleCanvas.height=this.#offscreenCanvas.height=img.naturalHeight
        this.#offscreenCanvasContext.drawImage(img,0,0)

        // this.#visibleCanvasContext.drawImage(img,0,0)
        this.#effect='normal'
        this.#drawImage()


    }

    /**
     * @param {string} effect
     */
    
    changeEffect(effect)
    {
        if(this.#effect!== effect)
        {
            this.#effect=effect
            this.#drawImage()
        }
    }
    #drawImage()
    {
        switch(this.#effect)
        {
            case 'normal':
                this.#visibleCanvasContext.drawImage(this.#offscreenCanvas,0,0)
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
        const imageData=this.#offscreenCanvasContext.getImageData(0,0,this.#offscreenCanvas.width,this.#offscreenCanvas.height);
        const data=imageData.data;
        for(let i=0;i<data.length;i+=4)
        {
            data[i]=data[i+1]=data[i+2]=Math.round((data[i]+data[i+1]+data[i+2])/3)
            
        }
        this.#visibleCanvasContext.putImageData(imageData,0,0)
    }

    #sepia()
    {
        const imageData=this.#offscreenCanvasContext.getImageData(0,0,this.#offscreenCanvas.width,this.#offscreenCanvas.height);
        const data=imageData.data;
        for(let i=0;i<data.length;i+=4)
        {
            const r=data[i]
            const g=data[i+1]
            const b=data[i+2]

            data[i]=Math.min(255,Math.round(r*.393+g*.769+b*.189))
            data[i+1]=Math.min(255,Math.round(r*.349+g*.686+b*.168))
            data[i+2]=Math.min(255,Math.round(r*.272+g*.534+b*.131))
        }
        this.#visibleCanvasContext.putImageData(imageData,0,0)
    }
}