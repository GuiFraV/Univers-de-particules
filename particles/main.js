import { MathUtils, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three';
import { BoxBufferGeometry } from 'three';
import { MeshNormalMaterial } from 'three';
import { Mesh } from 'three';
import { AxesHelper } from 'three';
import { Scene } from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Points } from 'three';
import { PointsMaterial } from 'three';
import { BufferGeometry } from 'three';
import { Float32BufferAttribute } from 'three';
import { TextureLoader } from 'three';
import { Group } from 'three';
import { Clock } from 'three';
import { LineBasicMaterial } from 'three';
import { Line } from 'three';
import { SphereBufferGeometry } from 'three';

const textureLoader = new TextureLoader();
const circleTexture = textureLoader.load("/circle.png");

const scene = new Scene();
const count = 100;
const distance = 4;
const size= 0.2;

// scene.add(new AxesHelper());

const camera = new PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight, 
  0.01, 
  1000
);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for(let i = 0; i < points.length; i++){
  points[i] = MathUtils.randFloatSpread(distance * 2);
  colors[i] = Math.random();

}

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

const pointMaterial = new PointsMaterial({
  size,
  vertexColors: true,
  map: circleTexture,
  alphaTest: 0.01,
  transparent: true,
})

const pointsObject = new Points(geometry, pointMaterial);
const group = new Group();
group.add(pointsObject);

// const lineMaterial = new LineBasicMaterial({
//   color: 0x000000,
//   opacity: 0.05,
//   depthTest: false,
// });

// const lineObject = new Line(geometry, lineMaterial);
// group.add(lineObject);

scene.add(group);

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock();

let mouseX = 0;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX
})

function tick(){
  const time = clock.getElapsedTime();
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
  //group.rotation.y = time * 0.1;
  const ratio = (mouseX / window.innerWidth - 0.5) *2;
  group.rotation.y = ratio * Math.PI * .1;
}

tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})