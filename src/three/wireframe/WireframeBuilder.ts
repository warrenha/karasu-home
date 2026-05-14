import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { createShapes } from './ShapeBuilder'
import { disposeScene, getSceneSize } from '../common'

import type { SceneI, SceneSize, SceneStatus } from '../common'

const NoShapes: THREE.Mesh[] = []

export type WireframePayload = {}  // not used, additional data for update

/*
 * Creates the 3d scene, with camera, lighting and renderer.
 */
export const createWireframeScene = (): SceneI<WireframePayload> => {

    // TODO put into a typed object? SceneContext?
    let div: HTMLDivElement | null = null
    let width = 1
    let height = 1
    let aspect = 1

    let status: SceneStatus = 'unset'
    let scene: THREE.Scene | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let camera: THREE.PerspectiveCamera | null = null

    let shapes: THREE.Mesh[] = NoShapes
    let controls: OrbitControls | null = null

    const addContainer = (container: HTMLDivElement) => {
        div = container;
        const size: SceneSize = getSceneSize(div);
        width = size.width  // ({ width, height, aspect } = size);  // SceneSize
        height = size.height
        aspect = size.aspect
    }

    const addScene = () => {
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xffffff)
    }

    const addCamera = () => {
        camera = new THREE.PerspectiveCamera(25, aspect, 0.1, 1000)
        camera.position.set(0, 4, 7)
        // Has no effect, use controls.target instead.
        //camera.lookAt(0, 10, 0)
    }

    const addRenderer = () => {
        if (!div) return
        console.debug('[WireframeScene] Adding renderer, div size:', width, height)
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        //renderer.shadowMap.enabled = true
        div.appendChild(renderer.domElement)
        console.debug('[WireframeScene] Canvas size:', renderer.domElement.width, renderer.domElement.height)
    }

    const addLighting = () => {
        if (!scene) return
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene!.add(ambientLight)
    
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
        dirLight.position.set(10, 20, 10)
        dirLight.castShadow = true
        dirLight.shadow.camera.top = 20
        dirLight.shadow.camera.bottom = -20
        dirLight.shadow.camera.left = -20
        dirLight.shadow.camera.right = 20
        scene!.add(dirLight)
    
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
        hemiLight.position.set(0, 20, 0)
        scene!.add(hemiLight)
    }

    const addGround = () => {
        if (!scene) return
        const grid = new THREE.GridHelper(35, 35, 0xff0000, 0xe0e0e0)
        grid.rotation.x = Math.PI / 8
        scene.add(grid)
    }

    const addShapes = () => {
        if (!scene) return
        shapes = createShapes()
        for (const shape of shapes) {
            scene.add(shape)
        }
    }

    const addControls = () => {
        if (!camera || !renderer) return
        // https://threejs.org/docs/#OrbitControls
        controls = new OrbitControls(camera, renderer.domElement)
        controls.target = new THREE.Vector3(0, 4, 0)
        controls.update()
    }

    // https://threejs.org/docs/#Global.onAnimationCallback
    // time  A timestamp indicating the end time of the previous frame's rendering.
    const onAnimation = (time: any) => {
        if (!scene || !renderer || !camera || !controls) {
            console.debug('[WireframeScene] onAnimation skipped, missing:',
                {scene: !!scene, renderer: !!renderer, camera: !!camera, controls: !!controls})
            return
        }
        for (const shape of shapes) {
            shape.rotation.x = time / 15000
            shape.rotation.y = time / 5000
        }
        controls.update()
        renderer.render(scene, camera)
    }
    const addAnimation = () => {
        // https://threejs.org/docs/#WebGLRenderer.setAnimationLoop
        renderer!.setAnimationLoop(onAnimation)
    }

    const createScene = (container: HTMLDivElement, payload: WireframePayload) => {
        console.debug('[WireframeBuilder] CREATE SCENE...')

        addContainer(container)
        addScene()
        addCamera()
        addRenderer()

        addLighting()
        addGround()
        addShapes()

        addControls()
        addAnimation()
        status = 'created'

        console.debug('[WireframeBuilder] CREATE SCENE DONE')
    }

    const resize = () => {  // not used yet
        console.debug('[WireframeBuilder] RESIZE')
    }

    const update = (payload: WireframePayload) => {  // not used
        console.debug('[WireframeBuilder] UPDATE')
    }

    const dispose = () => {
        if (!scene || !renderer || !controls) return
        console.debug('[WireframeBuilder] DISPOSE')
        status = 'disposed'
        if (div && renderer.domElement) {
            div.removeChild(renderer.domElement)
        }
        controls.dispose()
        disposeScene(scene)
        renderer.setAnimationLoop(null)
        renderer.dispose()
        //renderer.forceContextLoss()

        div = null
        scene = null
        renderer = null
        camera = null
        shapes = NoShapes
        controls = null
    }

    return {  // SceneI
        status,  // 'unset' | 'created' | 'disposed'
        createScene,  // (container: HTMLDivElement) => void
        resize,  // () => void
        update,  // (payload: WireframePayload) => void
        dispose  // () => void
    }
}
