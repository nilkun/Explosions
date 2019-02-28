class PixelManipulation {
    constructor(canvas) {
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = this.context.getImageData(0, 0, this.width, this.height);
    }
    getImage() {
        this.image = this.context.getImageData(0, 0, this.width, this.height);
    }
    setImage() {
        this.context.putImageData(this.image, 0, 0);
    }

    setPixel(x, y, red, green, blue) {
        const pixelIndex = (y * this.width + x) * 4;
        this.image.data[pixelIndex] = red;
        this.image.data[pixelIndex + 1] = green;
        this.image.data[pixelIndex + 2] = blue;

    } 
    fillColor(red, green, blue, alpha = 255) {
        for (let i = 0; i < this.width * this.height * 4; i+=4) {
            this.image.data[i] = red;
            this.image.data[i + 1] = green;
            this.image.data[i + 2] = blue;
            this.image.data[i + 3] = alpha;
        }      
    }
}

export default PixelManipulation;