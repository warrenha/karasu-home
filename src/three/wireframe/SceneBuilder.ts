import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { createShapes } from './ShapeBuilder'
import { disposeScene } from './SceneUtils'

import type { Scene } from './Scene'

/*
 * Creates the complete 3d scene, with camera, lighting and renderer.
 */
export const createScene = (
    div: HTMLDivElement
): Scene => {
    console.debug('Creating 3d scene...')

    // Container dimensions
    const width = div.clientWidth
    const height = div.clientHeight
    const aspect = width / height

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    
    const createCamera = () => {
        const camera = new THREE.PerspectiveCamera(25, aspect, 0.1, 1000)
        camera.position.set(0, 4, 7)
        // Has no effect, use controls.target instead.
        //camera.lookAt(0, 10, 0)
        return camera
    }
    const camera = createCamera()

    const createRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        //renderer.shadowMap.enabled = true
        div.appendChild(renderer.domElement)
        return renderer
    }
    const renderer = createRenderer()

    const addLighting = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)
    
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
        dirLight.position.set(10, 20, 10)
        dirLight.castShadow = true
        dirLight.shadow.camera.top = 20
        dirLight.shadow.camera.bottom = -20
        dirLight.shadow.camera.left = -20
        dirLight.shadow.camera.right = 20
        scene.add(dirLight)
    
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
        hemiLight.position.set(0, 20, 0)
        scene.add(hemiLight)
    }
    addLighting()

    const addGround = () => {
        const grid = new THREE.GridHelper(35, 35, 0xff0000, 0xe0e0e0)
        grid.rotation.x = Math.PI / 8
        scene.add(grid)
    }
    addGround()
    
    const addShapes = () => {
        const shapes = createShapes()
        for (const shape of shapes) {
            scene.add(shape)
        }
        return shapes
    }
    const shapes = addShapes()

    const addControls = () => {
        // https://threejs.org/docs/#OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = new THREE.Vector3(0, 4, 0)
        controls.update()
        return controls
    }
    const controls = addControls()

    // https://threejs.org/docs/#Global.onAnimationCallback
    // time  A timestamp indicating the end time of the previous frame's rendering.
    const onAnimation = (time: any) => {
        for (const shape of shapes) {
            shape.rotation.x = time / 15000
            shape.rotation.y = time / 5000
        }
        controls.update()
        renderer.render(scene, camera)
    }

    const addAnimation = () => {
        // https://threejs.org/docs/#WebGLRenderer.setAnimationLoop
        renderer.setAnimationLoop(onAnimation)
    }
    addAnimation()

    const dispose = () => {
        controls.dispose()
        if (div && renderer.domElement) {
            div.removeChild(renderer.domElement)
        }
        disposeScene(scene)
        renderer.setAnimationLoop(null)
        renderer.dispose()
        //renderer.forceContextLoss()
    }

    return {
        renderer,  // THREE.WebGLRenderer
        dispose
    }
}
