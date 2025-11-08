const Scene = new THREE.Scene();
Scene.background = new THREE.Color(0x87ceeb);
Scene.fog = new THREE.Fog(0xb3e5fc, 20, 50);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
Scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfff9c4, 1.2);
directionalLight.position.set(15, 25, 10);
Scene.add(directionalLight);

const PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geo = new THREE.PlaneGeometry(200, 200, 32, 32);
const mat = new THREE.MeshStandardMaterial({
  color: 0x7cb342,
  roughness: 0.8,
});
const floor = new THREE.Mesh(geo, mat);
floor.rotation.x = -Math.PI / 2;
Scene.add(floor);

const treex = [];
const treez = [];

function createTrees(x, z) {
  treex.push(x);
  treez.push(z);

  const trunkHeight = 1.5 + Math.random() * 1.5;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, trunkHeight, 8),
    new THREE.MeshStandardMaterial({
      color: 0x5d4037,
      roughness: 0.9,
    })
  );
  trunk.position.set(x, trunkHeight / 2, z);

  const leavesSize = 0.8 + Math.random() * 0.6;
  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(leavesSize, 7, 5),
    new THREE.MeshStandardMaterial({
      color: 0x388e3c,
      roughness: 0.6,
      transparent: true,
      opacity: 0.9,
    })
  );
  leaves.position.set(x, trunkHeight + leavesSize / 2, z);

  Scene.add(trunk);
  Scene.add(leaves);
}

function createTreasure(wX, wZ) {
  const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.3,
    metalness: 0.9,
  });
  const treasure = new THREE.Mesh(geometry, material);
  treasure.position.set(wX, 0.2, wZ);
  Scene.add(treasure);
}

function willCollide(newX, newZ, treeRadius, playerRadius) {
  for (let i = 0; i < treex.length; i++) {
    let distance = Math.sqrt((newX - treex[i]) ** 2 + (newZ - treez[i]) ** 2);
    if (distance < treeRadius + playerRadius) {
      return true;
    }
  }
  return false;
}

for (let i = 6; i >= -6; i--) {
  for (let j = 6; j >= -6; j--) {
    if (Math.random() > 0.3) {
      createTrees(i * 3, j * 3);
    }
  }
}

for (let i = 0; i < 8; i++) {
  createTreasure(Math.random() * 30 - 15, Math.random() * 30 - 15);
}

floor.position.y = -0.5;
PerspectiveCamera.position.set(0, 3, 8);

const canvas = document.getElementById("gameCanvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const keys = { w: false, a: false, s: false, d: false };

document.addEventListener("keydown", (event) => {
  if (["w", "a", "s", "d"].includes(event.key)) keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  if (["w", "a", "s", "d"].includes(event.key)) keys[event.key] = false;
});

const moveSpeed = 0.15;
function handleMovement() {
  if (keys.w) {
    let newZ = PerspectiveCamera.position.z - moveSpeed;
    if (!willCollide(PerspectiveCamera.position.x, newZ, 1.2, 0.4)) {
      PerspectiveCamera.position.z = newZ;
    }
  }
  if (keys.s) {
    let newZ = PerspectiveCamera.position.z + moveSpeed;
    if (!willCollide(PerspectiveCamera.position.x, newZ, 1.2, 0.4)) {
      PerspectiveCamera.position.z = newZ;
    }
  }
  if (keys.d) {
    let newX = PerspectiveCamera.position.x + moveSpeed;
    if (!willCollide(newX, PerspectiveCamera.position.z, 1.2, 0.4)) {
      PerspectiveCamera.position.x = newX;
    }
  }
  if (keys.a) {
    let newX = PerspectiveCamera.position.x - moveSpeed;
    if (!willCollide(newX, PerspectiveCamera.position.z, 1.2, 0.4)) {
      PerspectiveCamera.position.x = newX;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  handleMovement();
  renderer.render(Scene, PerspectiveCamera);
}

animate();

window.addEventListener("resize", () => {
  PerspectiveCamera.aspect = window.innerWidth / window.innerHeight;
  PerspectiveCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
