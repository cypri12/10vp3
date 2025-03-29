// Initialisation de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Chargement de la texture dirt_block
const loader = new THREE.TextureLoader();
const dirtTexture = loader.load('dirt_block.png');
dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping;
dirtTexture.repeat.set(10, 10); // Répète la texture pour éviter les pixels étirés

// Création du sol
const terrainGeometry = new THREE.PlaneGeometry(50, 50);
const terrainMaterial = new THREE.MeshBasicMaterial({ map: dirtTexture, side: THREE.DoubleSide });
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2; // Mettre le sol à plat
scene.add(terrain);

// Contrôle FPS
const controls = new THREE.PointerLockControls(camera, document.body);
document.getElementById("startButton").addEventListener("click", function () {
    controls.lock();
    document.getElementById("startButton").style.display = "none";
});
scene.add(controls.getObject());

// Déplacement avec ZQSD / WASD
const movementSpeed = 0.2;
const keys = { forward: false, backward: false, left: false, right: false };

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            keys.forward = true;
            break;
        case "KeyS":
        case "ArrowDown":
            keys.backward = true;
            break;
        case "KeyA":
        case "ArrowLeft":
            keys.left = true;
            break;
        case "KeyD":
        case "ArrowRight":
            keys.right = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            keys.forward = false;
            break;
        case "KeyS":
        case "ArrowDown":
            keys.backward = false;
            break;
        case "KeyA":
        case "ArrowLeft":
            keys.left = false;
            break;
        case "KeyD":
        case "ArrowRight":
            keys.right = false;
            break;
    }
});

// Mise à jour de la position du joueur
function updateMovement() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Empêche de bouger en hauteur
    direction.normalize();

    if (keys.forward) controls.getObject().position.addScaledVector(direction, movementSpeed);
    if (keys.backward) controls.getObject().position.addScaledVector(direction, -movementSpeed);

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();
    if (keys.left) controls.getObject().position.addScaledVector(right, -movementSpeed);
    if (keys.right) controls.getObject().position.addScaledVector(right, movementSpeed);
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    renderer.render(scene, camera);
}
animate();

// Ajustement de la fenêtre
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
