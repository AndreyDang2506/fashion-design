import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ThreeDFBXObject from './threeDFBXObject';

export default class TheDesignModule {
    //scene
    public camera: THREE.PerspectiveCamera
    public controls: OrbitControls

    // light
    private light: THREE.HemisphereLight
    private mesh: THREE.Mesh
    private grid: THREE.GridHelper

    constructor(
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer,
        camera: THREE.PerspectiveCamera,
        controls: OrbitControls
    ) {
        this.camera = camera
        this.controls = controls


        // add light
        this.light = new THREE.HemisphereLight(0xffffff, 0x444444);
        this.light.position.set(0, 200, 0);
        scene.add(this.light);

        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2000, 2000),
            new THREE.MeshPhongMaterial({
                color: 0x999999,
                depthWrite: false,
            })
        );
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.receiveShadow = true;
        
        scene.add(this.mesh);

        this.grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);

        scene.background = new THREE.Color(0xa0a0a0);
        scene.add(this.grid);

        new ThreeDFBXObject(scene, 'model/3d-ao-fixed.fbx')
    }
}