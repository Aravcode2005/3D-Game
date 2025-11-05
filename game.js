const Scene = new THREE.Scene();

const geometry=new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
Scene.add(cube);




const PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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
 

if(keys.w){

    PerspectiveCamera.position.z-=moveSpeed;

}


if(keys.s){

    PerspectiveCamera.position.z+=moveSpeed;
    
}


if(keys.d){

    PerspectiveCamera.position.x+=moveSpeed;
    
}

if(keys.a){

    PerspectiveCamera.position.x-=moveSpeed;
    
}
}

function animate() {
  requestAnimationFrame(animate);
  handleMovement();
  renderer.render(Scene, PerspectiveCamera);
}


animate();