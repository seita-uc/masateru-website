let canvasWidth;
let canvasHeight;
let canvas;
let shape;
const sketch = function(p5) {
    p5.setup = async function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvas = craeateCanvasOfParentSize(p5, hero);
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;
        shape = p5.loadModel('models/mask.obj');
    }

    p5.draw = async function() {
        p5.clear();
        p5.orbitControl();
        p5.lights();

        p5.push();
        p5.translate(width/2, height/2, -6000);
        p5.rotateZ(radians(180));
        p5.rotateY(radians(-90));
        if(mouseY < height/2) {
            p5.rotateZ(map(mouseY, 0, height/2, HALF_PI/2, 0));
        } else {
            p5.rotateZ(map(mouseY, height/2, height, 0, -HALF_PI/2));
        }
        p5.rotateY(map(mouseX, 0, width, HALF_PI, -HALF_PI));
        p5.shape(s);

        p5.stroke(255, 0, 0);
        p5.line(-4000, 0, 0, 4000, 0, 0);
        p5.stroke(0, 255, 0);
        p5.line(0, -4000, 0, 0, 4000, 0);
        p5.stroke(0, 0, 255);
        p5.line(0, 0, -4000, 0, 0, 4000);
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

function craeateCanvasOfParentSize(p5, parent) {
    canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight, p5.WEBGL);
    canvas.parent(parent);
    canvas.position(0, 0);
    canvas.style('z-index', '100');
    return canvas;
}

export let face3d = sketch;
