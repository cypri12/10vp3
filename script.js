// Initialisation de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Chargement des textures
const loader = new THREE.TextureLoader();
const textures = {
    grass: loader.load('grass_block.png'),
    dirt: loader.load('dirt_block.png'),
    water: loader.load('eau.jpg'),
};

// Ajout du sol
const terrainGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
const terrainMaterial = new THREE.MeshBasicMaterial({ map: textures.grass, side: THREE.DoubleSide });
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// Contrôles FPS
const controls = new THREE.PointerLockControls(camera, document.body);
document.getElementById("startButton").addEventListener("click", function () {
    controls.lock();
    document.getElementById("startButton").style.display = "none";
});

// Position initiale de la caméra
camera.position.y = 2;

// Lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7).normalize();
scene.add(light);

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajustement de la fenêtre
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
