const Scene = new THREE.Scene();

const PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geo = new THREE.PlaneGeometry(20, 20);
const mat = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const floor = new THREE.Mesh(geo, mat);
floor.rotation.x = -Math.PI / 2;
Scene.add(floor);

function createTrees(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x355e3b })
  );

  trunk.position.set(x, 0, z);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  leaves.position.set(x, 1, z);

  Scene.add(trunk);
  Scene.add(leaves);
}

for (let i = 4; i >= -4; i--) {
  for (let j = 4; j >= -4; j--) {
    createTrees(i * 2, j);
  }
}
floor.position.y = -1;
floor.position.z = -5;
PerspectiveCamera.position.set(0, 2, 5);

PerspectiveCamera.position.z = 5;
const canvas = document.getElementById("gameCanvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};
let Keydown = document.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    keys.w = true;
  }

  if (event.key === "a") {
    keys.a = true;
  }

  if (event.key === "s") {
    keys.s = true;
  }

  if (event.key === "d") {
    keys.d = true;
  }
});
let Keyup = document.addEventListener("keyup", function (event) {
  if (event.key === "w") {
    keys.w = false;
  }

  if (event.key === "a") {
    keys.a = false;
  }

  if (event.key === "s") {
    keys.s = false;
  }
  if (event.key === "d") {
    keys.d = false;
  }
});

const moveSpeed = 0.1;
function handleMovement() {
  if (keys.w) {
    PerspectiveCamera.position.z -= moveSpeed;
  }

  if (keys.s) {
    PerspectiveCamera.position.z += moveSpeed;
  }

  if (keys.d) {
    PerspectiveCamera.position.x += moveSpeed;
  }

  if (keys.a) {
    PerspectiveCamera.position.x -= moveSpeed;
  }
}

function animate() {
  requestAnimationFrame(animate);
  handleMovement();
  renderer.render(Scene, PerspectiveCamera);
}

animate();
