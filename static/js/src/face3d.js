window.addEventListener('load', init);

function init() {
    const scene = new THREE.Scene();
    const hero = document.getElementsByClassName("hero")[0];
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;

    function onMouseMove(event) {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
        camera.position.x -= (mouseX + camera.position.x) * 0.1;
        console.log("camera: " + camera.position.x);
        console.log("mouseX: " + mouseX);
        camera.position.y += (mouseY - camera.position.y) * 0.2;
        camera.lookAt(scene.position);
    };

    window.addEventListener("mousemove", onMouseMove, false);

    const onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    }
    const onError = function (xhr) { 
        console.error("Error loading obj mtl: " + xhr);
    }
    let model;
    const ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.load("models/mask.obj", function(obj) {
        obj.scale.set(0.25, 0.25, 0.25);
        obj.rotation.y = -Math.PI / 2;
        obj.traverse(function(node) {
            if(node.material) {
                node.material.side = THREE.DoubleSide;
            }
        });
        model = obj;
        scene.add(obj);
    }, onProgress, onError);

    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 0, 30);
    light.castShadow = true;
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.set(0, 0, 1000);
    camera.position.x -= (mouseX + camera.position.x) * 0.15;
    camera.position.y += (mouseY - camera.position.y) * 0.15;
    camera.lookAt(scene.position);

    //const axis = new THREE.AxesHelper(2000);
    //axis.position.set(0, -1, 0);        
    //scene.add(axis);

    const renderer = new THREE.WebGLRenderer({alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xeeeee, 0);    
    renderer.shadowMap.enabled = true;       

    hero.appendChild(renderer.domElement);
    tick();

    let diffX = 0;
    let diffY = 0;
    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    function map(n, start1, stop1, start2, stop2) {
        return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
    };
}
