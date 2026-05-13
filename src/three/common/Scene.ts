import * as THREE from 'three'

// - - - - - Types - - - - - //

/*
 * The return type of a scene builder.
 */
export type Scene = {
    renderer: THREE.WebGLRenderer | null,

    // Calls renderer.dispose, etc. to clean up.
    dispose: () => void,

    update?: (coreTemperatures: number[]) => void  // TODO generic payload
}
