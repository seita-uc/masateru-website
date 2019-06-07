let canvasWidth;
let canvasHeight;
let canvas;
let shape;
let video;
let renderer;
let pg;
let context;
const sketch = function(p5) {
    p5.preload = async function() {
        shape = p5.loadModel('models/mask.obj', true);
    }

    p5.setup = async function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvas = craeateCanvasOfParentSize(p5, hero);
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;

        //p5.background(0, 255, 255);
        //pg = p5.createGraphics(canvasWidth, canvasHeight, p5.WEBGL)
        //pg = p5.createGraphics(100, 100, p5.WEBGL)
        //pg.background(0, 255, 255);
        //video = p5.createVideo(['videos/roller-coaster-short.mp4']);
        //video.style('z-index', '4000');
        //video.position(0, 0);

        //video.loop().hide();
        //pg = p5.createGraphics(canvasWidth, canvasHeight, p5.WEBGL);
    }

    p5.draw = async function() {
        const canvasEl = document.getElementById(canvas.id());
        context = canvasEl.getContext('webgl', { alpha: true });
        //context.clearDepth(0.1);
        context.colorMask(true, true, true, true);
        context.clearColor(0, 0, 0, 0);
        //p5.clear();
        context.clear(context.DEPTH_BUFFER_BIT | context.COLOR_BUFFER_BIT);
        //context.drawElements(context.TRIANGLES, 100, context.UNSIGNED_SHORT, 0);

        //p5.push();
        //p5.imageMode(p5.CENTER);
        //p5.image(video, 0, 0);
        //p5.pop();

        //p5.image(pg, 0, 0);

        //p5.push();
        //p5.orbitControl();
        //p5.lights();
        //p5.rotateZ(p5.radians(180));
        //p5.rotateY(p5.radians(-90));
        //if(p5.mouseY < canvasHeight/2) {
        //p5.rotateZ(p5.map(p5.mouseY, 0, canvasHeight/2, p5.HALF_PI/2, 0));
        //} else {
        //p5.rotateZ(p5.map(p5.mouseY, canvasHeight/2, canvasHeight, 0, -p5.HALF_PI/2));
        //}
        //p5.rotateY(p5.map(p5.mouseX, 0, canvasWidth, p5.HALF_PI, -p5.HALF_PI));
        //p5.specularMaterial(250);
        //p5.noStroke();
        //p5.scale(2.5);
        p5.model(shape);
        //p5.pop();
    }

    p5.windowResized = function() {
        const hero = document.getElementsByClassName("hero")[0];
        canvasWidth = hero.clientWidth;
        canvasHeight = hero.clientHeight;
        p5.resizeCanvas(canvasWidth, canvasHeight);
    }

    p5.mousePressed = function() {
    }

    p5.mouseWheel = function(event) {
    }
}

function craeateCanvasOfParentSize(p5, parent) {
    canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight, p5.WEBGL);
    //canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight);
    //canvas = p5.select('#canvas3d');
    //canvas.parent(parent);
    canvas.position(0, 0);
    canvas.style('z-index', '3000');
    const gl = start(canvas);
    //canvas.style('opacity', '0.5');
    //renderer = new THREE.WebGLRenderer({
    //canvas: document.querySelector("#" + canvas.id())
    //});
    return canvas;
}

function start(glCanvas) {
    const can = document.getElementById(glCanvas.id());
    const gl = initWebGL(can);
    if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 0);
        // 深度テストを有効化
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    return gl;
}

function initWebGL(can) {
    let gl = null;
    try {
        gl = can.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
    if (!gl) {
        alert("WebGL を初期化できません。ブラウザはサポートしていないようです。");
        gl = null;
    }
    return gl;
}

export let face3d = sketch;
