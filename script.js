// Initialisation de la scène
const scene = new THREE.Scene();

// Ajout de la lumière
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Initialisation de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Initialisation du rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Création du sol avec des blocs de différentes couleurs
const size = 10; // Taille du terrain (10x10 blocs)
const tileSize = 1; // Taille de chaque bloc

const colors = {
    grass: 0x00ff00,  // Vert
    dirt: 0x8B4513,   // Marron
    stone: 0x808080,  // Gris
};

// Génération du terrain
for (let x = -size / 2; x < size / 2; x++) {
    for (let z = -size / 2; z < size / 2; z++) {
        // Déterminer la couleur du bloc
        let color = colors.dirt;
        if (Math.random() < 0.1) color = colors.stone; // 10% de blocs gris
        if (Math.random() < 0.05) color = colors.grass; // 5% de blocs verts

        const geometry = new THREE.BoxGeometry(tileSize, tileSize, tileSize);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const block = new THREE.Mesh(geometry, material);
        block.position.set(x * tileSize, 0, z * tileSize);
        scene.add(block);
    }
}

// Contrôles clavier pour bouger la caméra
const keys = { forward: false, backward: false, left: false, right: false };
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") keys.forward = true;
    if (event.code === "ArrowDown" || event.code === "KeyS") keys.backward = true;
    if (event.code === "ArrowLeft" || event.code === "KeyA") keys.left = true;
    if (event.code === "ArrowRight" || event.code === "KeyD") keys.right = true;
});
document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") keys.forward = false;
    if (event.code === "ArrowDown" || event.code === "KeyS") keys.backward = false;
    if (event.code === "ArrowLeft" || event.code === "KeyA") keys.left = false;
    if (event.code === "ArrowRight" || event.code === "KeyD") keys.right = false;
});

// Animation et mise à jour de la caméra
function animate() {
    requestAnimationFrame(animate);

    // Déplacement de la caméra
    const speed = 0.1;
    if (keys.forward) camera.position.z -= speed;
    if (keys.backward) camera.position.z += speed;
    if (keys.left) camera.position.x -= speed;
    if (keys.right) camera.position.x += speed;

    renderer.render(scene, camera);
}
animate();
