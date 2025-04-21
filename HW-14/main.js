import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/GLTFLoader.js';

let scene, camera, renderer;
let cube, sphere, model;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // Cube
  const cubeGeometry = new THREE.BoxGeometry();
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -2;
  scene.add(cube);

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 2;
  scene.add(sphere);

  // Load model
  const loader = new GLTFLoader();
  loader.load('./models/yourModel.glb', function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.y = -1;
    scene.add(model);
  });
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.01;

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
