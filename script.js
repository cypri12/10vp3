// Initialisation de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière ambiante
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Contrôles FPS
const controls = new THREE.PointerLockControls(camera, document.body);
document.getElementById("startButton").addEventListener("click", () => {
    controls.lock();
});

// Déplacement du joueur
const player = { velocity: new THREE.Vector3(), speed: 0.1 };
document.addEventListener("keydown", (event) => {
    if (event.code === "KeyW") player.velocity.z = -player.speed;
    if (event.code === "KeyS") player.velocity.z = player.speed;
    if (event.code === "KeyA") player.velocity.x = -player.speed;
    if (event.code === "KeyD") player.velocity.x = player.speed;
});
document.addEventListener("keyup", () => {
    player.velocity.set(0, 0, 0);
});

// Génération du sol
const taille = 10; // Taille du terrain
const geometrieBloc = new THREE.BoxGeometry(1, 1, 1);

for (let x = -taille / 2; x < taille / 2; x++) {
    for (let z = -taille / 2; z < taille / 2; z++) {
        const couleur = new THREE.Color(Math.random(), Math.random(), Math.random()); // Couleurs aléatoires
        const materiauBloc = new THREE.MeshStandardMaterial({ color: couleur });
        const bloc = new THREE.Mesh(geometrieBloc, materiauBloc);
        bloc.position.set(x, -1, z);
        scene.add(bloc);
    }
}

// Position de la caméra
camera.position.set(0, 2, 5);
scene.add(controls.getObject());

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.moveRight(player.velocity.x);
    controls.moveForward(player.velocity.z);
    renderer.render(scene, camera);
}
animate();

// Ajustement à la taille de l'écran
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
