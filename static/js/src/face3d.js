$(document).ready(init);

function hideLoadingScreen() {
    //$('#loading-screen').hide('slide', { 
        //direction: 'right',
        //easing: 'easeOutBounce'
    //}, 800, function() {
    //});
}

function init() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const scene = new THREE.Scene();
    let hero = document.getElementsByClassName("hero")[0];
    let width = hero.clientWidth;
    let height = hero.clientHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;

    function onMouseMove(event) {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
        camera.position.x -= (mouseX + camera.position.x) * 0.1;
        camera.position.y += (mouseY - camera.position.y) * 0.2;
        camera.lookAt(scene.position);
    };

    function onTouchMove(event) {
        mouseX = getPositionX(event) - window.innerWidth / 2;
        mouseY = getPositionY(event) - window.innerHeight / 2;
        camera.position.x -= (mouseX + camera.position.x) * 0.2;
        camera.position.y += (mouseY - camera.position.y) * 0.2;
        camera.lookAt(scene.position);
        function getPositionX(event) {
            return event.touches[0].clientX;
        }
        function getPositionY(event) {
            return event.touches[0].clientY;
        }
    }

    function onResize() {
        hero = document.getElementsByClassName("hero")[0];
        width = hero.clientWidth;
        height = hero.clientHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize, false);
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("touchmove", onTouchMove, false);

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

    //const MtlLoader = new THREE.MTLLoader();
    //MtlLoader.load(".mtl", function( materials ) {
        //materials.preload();
        //const ObjLoader = new THREE.OBJLoader(); 
        ////ObjLoader.setMaterials( materials );
        //ObjLoader.load("models/masateru.obj", function(obj) {
            ////obj.scale.set(0.25, 0.25, 0.25);
            //obj.scale.set(1.5, 1.5, 1.5);
            //const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            //if(iOS) {
                //obj.scale.set(0.15, 0.15, 0.15);
            //}
            //obj.rotation.y = -Math.PI / 2;
            //obj.traverse(function(node) {
                //if(node.material) {
                    //node.material.side = THREE.DoubleSide;
                //}
            //});
            //scene.add(obj);
            //model = obj;
        //}, onProgress, onError);
    //});
    
    const onLoad = function(event) {
        $('#loading-screen').fadeOut(800, "swing");

        const obj = event.detail.loaderRootNode;
        obj.scale.set(4, 4, 4);
        obj.rotation.z = Math.PI;
        obj.position.x = 360;
        obj.position.y = 385;
        if(iOS) {
            obj.scale.set(3, 3, 3);
            obj.position.x = 275;
            obj.position.y = 300;
        }
        obj.traverse(async function(node) {
            if(node.material) {
                try {
                    //const texture = await loadTexture();
                    //node.material = new THREE.MeshBasicMaterial({
                        //map: texture,
                        //wireframe: true,
                    //});
                    //node.material = new THREE.MeshStandardMaterial({
                        //metalness: 0.7,
                        //roughness: 0.2,
                    //});
                    node.material.side = THREE.DoubleSide;
                } catch(err) {
                    console.error(err);
                }

                function loadTexture() {
                    const loader = new THREE.TextureLoader();
                    return new Promise((resolve, reject) => {
                        try {
                            const url = "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
                            return loader.load(url, (texture) => {
                                return resolve(texture);
                            });
                        } catch(err) {
                            return reject(err);
                        }
                    });
                }
            }
        });
        model = obj;
        scene.add(obj);
    }
    const ObjLoader = new THREE.OBJLoader2();
    const filename = 'models/masateru2.obj';
    //const filename = 'models/mask.obj';
    ObjLoader.load(filename, onLoad, onProgress, onError, null, true);

    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 0, 10);
    //light.castShadow = true;
    scene.add(light);

    let camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
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

    let controls;
    if(!iOS) {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    }

    hero.appendChild(renderer.domElement);
    tick();

    function tick() {
        if(!iOS) {
            controls.update();
        }
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
}
