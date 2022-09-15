import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Group, TextureLoader } from "three";
import { TEXTURES } from "./constant"


export default class ThreeDFBXObject {
  constructor(scene: THREE.Scene,url: string) {
    const loader = new FBXLoader();
    loader.load(
      url,
      function (object: Group) {
        // console.log('object', object);
        object.traverse(function (node: any) {
          // console.log('node', node);
          if (node.type === "Mesh") {
            for (let key in TEXTURES) {
              if (TEXTURES[key].name === node.name) {
                const texture = new TextureLoader().load(TEXTURES[key].src);
                node.material.map = texture;
                break;
              }
            }
          }
        });
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error(error);
      }
    );
  }
}