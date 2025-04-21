// Setup three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a rotating cube (like an ice cube)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xadd8e6, 
  roughness: 0.1, 
  metalness: 0.2, 
  transparent: true, 
  opacity: 0.7
});
const iceCube = new THREE.Mesh(geometry, material);
scene.add(iceCube);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040, 2); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Camera setup
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  iceCube.rotation.x += 0.01;
  iceCube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
