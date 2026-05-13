import * as THREE from 'three'

// - - - - - Utils - - - - - //

export const disposeScene = (
    scene: THREE.Scene
) => {
    scene.traverse((object) => {
        if ((object as THREE.Mesh).geometry) {
            (object as THREE.Mesh).geometry.dispose();
        }

        const material = (object as THREE.Mesh).material;
        if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose());
        }
        else if (material) {
            material.dispose();
        }
    })
}
