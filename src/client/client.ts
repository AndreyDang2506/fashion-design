import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TheDesignModule from './theDesignModule'

import './css/main.css'
// import './css/upLoadFile.css'
// import './css/artword.css'
// import './css/gallery.css'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(render);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    20000
)
camera.position.set(0, 100, 230);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.target.set(0, 40, 0);

const theDesignModule = new TheDesignModule(scene, renderer, camera, controls)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function render() {
    renderer.render(scene, camera)
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    render()
}

animate()
