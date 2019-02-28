import PixelManipulation from "./PixelManipulation.js";

class Particle {
    constructor() {
        this.x;
        this.y;
        this.direction;
        this.speed;
        this.init;
        this.update;
    }
}

class Swarm {
    constructor(canvas, amount = 10000, color = 1) {
        this.size = amount;
        this.particles = [];
        this.pixels = new PixelManipulation(canvas);
        this.color = color;
        this.style = this.initSpin;
        this.update = this.updateSpin;
    }

    setPattern(pattern) {
        switch(pattern) {
            case "fallout": {
                this.style = this.initFallout;
                this.update = this.updateFallout;
                break;
            }
            case "spin": {
                this.style = this.initSpin;
                this.update = this.updateSpin;
                break;
            }
            case "amoeba": {
                this.style = this.initAmoeba;
                this.update = this.updateAmoeba;
                break;
            }
            case "explosion": {
                this.style = this.initExplosion;
                this.update = this.updateExplosion;
                break;
            }
        }
        this.init();
    };

    setColor(color) {
        this.color = color;
    };
    setParticles(value) {
        this.size = value;
        this.init();
    }
    init() {
        ; // 0 = red, 1 = green, 2 = blue
        
        this.particles = [];
        for(let i = 0; i < this.size; i++) {
            this.particles.push(new Particle);
            // this.particles[i].update = this.particles[i].updateSpin;
            this.particles[i].update = this.update;
            this.particles[i].init = this.style;
            this.particles[i].init();
        }        
        this.pixels.fillColor(0, 0, 0);
        this.pixels.setImage();
    }

    initFallout() {
        this.direction = 2 * Math.PI * Math.random();
        this.speed = 0.02 * Math.random();
        this.x = 0;
        this.y = 0;
        // this.update = this.updateFallout;
    }
    updateFallout(delta) {
        const xspeed = this.speed * Math.cos(this.direction);
        const yspeed = this.speed * Math.sin(this.direction);

        this.x += xspeed * delta;
        this.y += yspeed * delta;
        if(this.x <= -1.0 || this.x >= 1.0 || this.y <= -1.0 || this.y >= 1.0) {
            this.x = -1.10;
            this.y = -1.10
        }
    }

    initExplosion() {
        this.direction = 2 * Math.PI * Math.random();
        this.speed = 0.02 * Math.random();
        this.x = 0;
        this.y = 0;
        this.speed *= this.speed/2;
        // this.update = this.updateExplosion;
    }
    updateExplosion(delta) {
        const xspeed = this.speed * Math.cos(this.direction);
        const yspeed = this.speed * Math.sin(this.direction);

        this.x += xspeed * delta;
        this.y += yspeed * delta;
        if(this.x <= -1.0 || this.x >= 1.0 || this.y <= -1.0 || this.y >= 1.0) {
            // this.init();
            this.x = -1.10;
            this.y = -1.10
        }
    }
    initSpin() {
        this.direction = 2 * Math.PI * Math.random();
        this.speed = 0.02 * Math.random();
        this.x = 0;
        this.y = 0;
        this.speed *= this.speed/2;
        // this.update = this.updateSpin;
    }
    updateSpin(delta) {
        this.direction += 0.01;
        const xspeed = this.speed * Math.cos(this.direction);
        const yspeed = this.speed * Math.sin(this.direction);

        this.x += xspeed * delta;
        this.y += yspeed * delta;
        if(this.x <= -1.0 || this.x >= 1.0 || this.y <= -1.0 || this.y >= 1.0) {
            // this.init();
            this.x = -1.10;
            this.y = -1.10
        }
    }

    initAmoeba() {
        this.direction = 2 * Math.PI * Math.random();
        this.speed = 0.02 * Math.random();
        this.x = 0;
        this.y = 0;
        this.speed *= this.speed/2;
        // this.update = this.updateAmoeba;
    }
    updateAmoeba(delta) {
        this.direction += Math.random();;
        const xspeed = this.speed * Math.cos(this.direction);
        const yspeed = this.speed * Math.sin(this.direction);

        this.x += xspeed * delta;
        this.y += yspeed * delta;
        if(this.x <= -1.0 || this.x >= 1.0 || this.y <= -1.0 || this.y >= 1.0) {
            // this.init();
            this.x = -1.10;
            this.y = -1.10
        }
    }

    render(delta) {
        const width = 800;
        const height = 600;

        const oldPixels = this.pixels.context.getImageData(0, 0, width, height).data;
        for(let y=0; y<height; y++) {
            for(let x = 0; x<width; x++) {

                let redTotal = 0;

                for(let row = -1; row <=1; row++) {
                    for(let col = -1; col <=1; col++) {
                        let currentX = x + col;
                        let currentY = y + row;

                        if(currentX >= 0 && currentX < width && currentY >= 0 && currentY < height) {
                            let red = oldPixels[4*(currentY * width + currentX) + this.color]                            
                            redTotal += red;
                        }
                    }
                }
                this.pixels.image.data[4*(y * width + x) + this.color] = redTotal / 9;
            }
        }

        for(let i = 0; i < this.size; i++) {
            const p = this.particles[i];
            p.update(delta);
            const xPos = Math.floor((1 + p.x) * width/2);
            const yPos = Math.floor(p.y * width/2 + height/2);
            this.pixels.image.data[4 * (yPos * width + xPos) + this.color] = 255;  
        }
        this.pixels.setImage();
    }
}

export { Particle, Swarm };