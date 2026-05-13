//import * as THREE from 'three'

// - - - - - Types - - - - - //

export type DisposableMaterial = {
    map?: { dispose: () => void };
    dispose: () => void;
};

export type DisposableSceneObject = {
    geometry?: { dispose: () => void };
    material?: DisposableMaterial | DisposableMaterial[];
};

// - - - - - Disposal - - - - - //

const _disposeMaterial = (
    material: DisposableMaterial
) => {
    material.map?.dispose()
    material.dispose()
}

const disposeMaterial = (
    material: DisposableMaterial | DisposableMaterial[] | undefined
) => {
    if (Array.isArray(material)) {
        material.forEach(_disposeMaterial)
    } else if (material) {
        _disposeMaterial(material)
    }
}

export const disposeSceneObject = (
    obj: DisposableSceneObject
) => {
    obj.geometry?.dispose()
    disposeMaterial(obj.material)
}
