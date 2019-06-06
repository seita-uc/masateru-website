let canvasWidth;
let canvasHeight;
let canvas;
let masaterus = new Array();
const sketch = function(p5) {
    p5.setup = async function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvas = craeateCanvasOfParentSize(p5, hero);
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;

        const imgPath = "./images/masateru.png";
        for(let i = 0; i < 5; i++) {
            const x = p5.random(0, canvasWidth);
            const y = p5.random(0, canvasHeight);
            const xspeed = p5.random(-15, 15);
            const yspeed = p5.random(-15, 15);
            const masateru = new Person(p5, imgPath, x, y, xspeed, yspeed);
            masaterus.push(masateru);
        }
    }

    p5.draw = async function() {
        p5.clear();
        p5.imageMode(p5.CENTER);
        for(let i = 0; i < masaterus.length; i++) {
            masaterus[i].walk();
        }
    }

    p5.windowResized = function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;
        p5.resizeCanvas(canvasWidth, canvasHeight);
    }

    p5.mousePressed = function() {
        for(let i = 0; i < masaterus.length; i++) {
            let size;
            const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if(iOS) {
                size = p5.random(10, 100);
            } else {
                size = p5.random(100, 300);
            }
            masaterus[i].changeSize(size);
        }
    }

    p5.mouseWheel = function(event) {
    }
}

class Person {
    constructor(p5, imgPath, x, y, xspeed, yspeed) {
        this.p5 = p5;
        this.img = p5.loadImage(imgPath);
        this.px = x;
        this.py = y;
        this.pxspeed = xspeed;
        this.pyspeed = yspeed;
        this.isOn = true;
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if(iOS) {
            this.psize = p5.random(10, 100);
        } else {
            this.psize = p5.random(100, 300);
        }
    }

    walk() {
        const p5 = this.p5;
        if(this.isOn) {
            p5.image(this.img, this.px, this.py, this.psize, this.psize);
        }

        this.px = this.px + this.pxspeed;
        this.py = this.py + this.pyspeed;

        if(this.px > canvasWidth) {
            this.pxspeed = -this.pxspeed;
        } else if (this.px < 0) {
            this.pxspeed = -this.pxspeed;
        }

        if(this.py > canvasHeight) {
            this.pyspeed = -this.pyspeed;
        } else if (this.py < 0) {
            this.pyspeed = -this.pyspeed;
        }
    }

    changeSize(size) {
        this.psize = size;
    }
}

function craeateCanvasOfParentSize(p5, parent) {
    canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight);
    canvas.parent(parent);
    canvas.position(0, 0);
    canvas.style('z-index', '100');
    return canvas;
}

export let masateru = sketch;
