let canvasWidth;
let canvasHeight;
let canvas;
const sketch = function(p5) {
    p5.setup = async function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvas = craeateCanvasOfParentSize(p5, hero);
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;
    }

    p5.draw = async function() {
        p5.clear();
        p5.orbitControl();
        p5.translate(240, 0, 0);
        p5.push();
        p5.rotateZ(p5.frameCount * 0.01);
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotateY(p5.frameCount * 0.01);
        p5.box(70, 70, 70);
        p5.pop();
    }

    p5.windowResized = function() {
        const hero = document.getElementsByClassName("hero")[0];
        p5.resizeCanvas(hero.clientWidth, hero.clientHeight);
    }

    p5.mousePressed = function() {
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
    canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight, p5.WEBGL);
    canvas.parent(parent);
    canvas.position(0, 0);
    canvas.style('z-index', '100');
    return canvas;
}

export let threeD = sketch;
