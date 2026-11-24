export class ImageEditor {
    #visibleCanvas
    #visibleCanvasContext
    #offscreenCanvas
    #offscreenCanvasContext

    #effect
    
    /**
     * Creates a new ImageEditor instance
     * @param {HTMLCanvasElement} visibleCanvas 
     */
    constructor(visibleCanvas){
        this.#visibleCanvas = visibleCanvas;
        this.#offscreenCanvas = document.createElement('canvas');

        this.#visibleCanvasContext = this.#visibleCanvas.getContext('2d');
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext('2d');
    }

    /**
     * Changes the current image
     * @param {HTMLImageElement} img 
     */
    changeImage(img){
      this.#visibleCanvas.width = this.#offscreenCanvas.width = img.naturalWidth;
      this.#visibleCanvas.height = this.#offscreenCanvas.height = img.naturalHeight;
      
      this.#offscreenCanvasContext.drawImage(img, 0, 0);
      //this.#visibleCanvasContext.drawImage(img, 0, 0);
      this.changeEffect('normal');
    }

    /**
     * Changes the current effect
     * @param {string} effect 
     */
    changeEffect(effect){
        if(this.#effect !== effect){
            this.#effect = effect;
            this.#drawImage();
        }
    }

    #drawImage(){
        switch(this.#effect){
            case 'normal':
                this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
            break;
            case 'grayscale':
                this.#grayscale();
            break;
            case 'threshold':
                this.#threshold(128);
                break;
            case 'sepia':
                this.#sepia();
                break;
            case 'negative':
                this.#negative();
                break;
            case 'red':
                this.#red();
                break;
            case 'pixelate':
                this.#pixelate();
                break;
        }
    }

    #grayscale(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i+=4){
            data[i] = data[i+1] = data[i+2] = Math.round((data[i]+data[i+1]+data[i+2]) / 3);
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    /**
     * 
     * @param {Number} value 
     */
    #threshold(value){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i+=4){
           if(0.2126*data[i] + 0.7152*data[i+1] + 0.0722*data[i+2] >= value){
                data[i] = data[i+1] = data[i+2] = 255;
           }
           else{
                data[i] = data[i+1] = data[i+2] = 0;
           }
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #sepia(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            const r = data[i]; //red
            const g = data[i+1]; //green
            const b = data[i+2]; //blue

            data[i] = (r * .393) + (g *.769) + (b * .189);
            data[i+1] = (r * .349) + (g *.686) + (b * .168);
            data[i+2] = (r * .272) + (g *.534) + (b * .131);
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #negative(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i+=4){
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #red(){
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i = 0; i < data.length; i+=4){
            // data[i] red
            data[i+1] = 0; //green
            data[i+2] = 0; //blue
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #pixelate(){
        const blocksize = 8;

        for(let x = 0; x < this.#offscreenCanvas.width; x+=blocksize)
             for(let y = 0; y < this.#offscreenCanvas.height; y+=blocksize){
                const pixel = this.#offscreenCanvasContext.getImageData(x, y, 1, 1);
                this.#visibleCanvasContext.fillStyle = 'rgb('+pixel.data[0]+','+pixel.data[1]+','+pixel.data[2]+')';
                this.#visibleCanvasContext.fillRect(x, y, x + blocksize - 1, y + blocksize - 1);
            }
    }
}