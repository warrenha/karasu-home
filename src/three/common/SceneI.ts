// - - - - - Types - - - - - //

export type SceneStatus = 'unset' | 'created' | 'disposed'

/*
 * Three.js scene with camera, lighting and renderer.
 *   It renders as a <canvas> child of the container DOM element.
 */
export interface SceneI<Payload> {
    status: SceneStatus

    // Creates the scene once the container DOM element is available.
    createScene: (div: HTMLDivElement, payload: Payload) => void

    resize: () => void

    update: (payload: Payload) => void

    dispose: () => void
}
