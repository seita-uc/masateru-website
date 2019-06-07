window.addEventListener('load', init);

function init() {
    const scene = new THREE.Scene();
    const hero = document.getElementsByClassName("hero")[0];
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    let mouseX;
    let mouseY;
    document.onmousemove = function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    }

    const onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    const onError = function (xhr) { 
        console.error("Error loading obj mtl: " + xhr);
    };
    let model;
    const ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.load("models/mask.obj", function(obj) {
        model = obj;
        obj.scale.set(0.25, 0.25, 0.25);
        obj.traverse(function(node) {
            if(node.material) {
                node.material.side = THREE.DoubleSide;
            }
        });
        scene.add(obj);
    }, onProgress, onError);

    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 0, 30);
    light.castShadow = true;
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.set(0, 0, 1000);

    const axis = new THREE.AxesHelper(2000);
    axis.position.set(0, -1, 0);        
    scene.add(axis);

    const renderer = new THREE.WebGLRenderer({alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xeeeee, 0);    
    renderer.shadowMap.enabled = true;       

    hero.appendChild(renderer.domElement);
    tick();

    function tick() {
        renderer.render(scene, camera);
        if(model != undefined) {
            model.rotation.y += 0.01;
        }
        requestAnimationFrame(tick);
    }
}
