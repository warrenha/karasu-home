import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { limitTemperature, colorForTemperature, makeLabel, makeGroundLabel } from '../common'
import { getSceneSize, disposeScene, disposeSceneObject, type DisposableSceneObject } from '../common'

import type { SceneI, SceneSize, SceneStatus } from '../common'

const BarDepth = 0.55
const MaxBarHeight = 5
const MinBarHeight = 0.12
const BaseY = 0

export type CoreTempsPayload = {
    coreTemperatures: number[]
}

/*
 * Creates the 3d scene, with camera, lighting and renderer.
 */
export const createCoreTempsScene = (): SceneI<CoreTempsPayload> => {

    // TODO put into a typed object? SceneContext?
    let div: HTMLDivElement | null = null
    let width = 1
    let height = 1
    let aspect = 1

    let status: SceneStatus = 'unset'
    let scene: THREE.Scene | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let controls: OrbitControls | null = null

    let group: THREE.Group | null = null
    //let shapes: THREE.Mesh[] = NoShapes
    //let controls: OrbitControls | null = null

    const addContainer = (container: HTMLDivElement) => {
        div = container;
        const size: SceneSize = getSceneSize(div);
        width = size.width  // ({ width, height, aspect } = size);  // SceneSize
        height = size.height
        aspect = size.aspect
    }

    const addScene = () => {
        console.debug('Creating 3d core temps scene...')
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x202020)
    }

    const addCamera = () => {
        camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100)  // fov (degrees), near/far plane
        camera.position.set(0, 5.5, 5.5)
        camera.lookAt(0, 2.85, -0.05)  // overridden by orbit controls
    }

    const addControls = () => {
        if (!camera || !renderer) return
        // https://threejs.org/docs/#OrbitControls
        controls = new OrbitControls(camera, renderer.domElement)
        //controls.target = new THREE.Vector3(0, 4, 0)
        controls.target = new THREE.Vector3(0, 2.0, -0.05)
        controls.enableRotate = false;
        controls.enableZoom = false;
        controls.screenSpacePanning = true;
        controls.update()

        controls.addEventListener('change', () => {
            if (!camera || !controls) return
            camera.position.x = THREE.MathUtils.clamp(
                camera.position.x, -5, 5)
            camera.position.y = 5.5
            camera.position.z = 5.5
            controls.target.x = THREE.MathUtils.clamp(
                controls.target.x, -5, 5)
            controls.target.y = 2.0
            controls.target.z = -0.05
        })
    }

    const addRenderer = () => {
        if (!div) return
        renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        //renderer.toneMapping = THREE.NoToneMapping;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        div.appendChild(renderer.domElement);
    }

    const addLighting = () => {
        if (!scene) return

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.52)
        scene.add(ambientLight)

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.35)
        keyLight.position.set(-5, 7, 3)
        keyLight.castShadow = true
        keyLight.shadow.mapSize.set(2048, 2048)
        keyLight.shadow.camera.left = -7
        keyLight.shadow.camera.right = 7
        keyLight.shadow.camera.top = 7
        keyLight.shadow.camera.bottom = -7
        keyLight.shadow.camera.near = 0.5
        keyLight.shadow.camera.far = 18
        scene.add(keyLight)
    }

    const addGround = () => {
        if (!scene) return

        const grid = new THREE.GridHelper(12, 12, 0x364150, 0x242b35)
        grid.position.y = -0.02
        scene.add(grid)

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 14),
            new THREE.ShadowMaterial({
                color: 0x000000,
                opacity: 0.34
            })
        )
        floor.rotation.x = -Math.PI / 2
        floor.position.y = -0.03
        floor.receiveShadow = true
        scene.add(floor)
    }

    const addGroup = () => {
        if (!scene) return
        group = new THREE.Group()
        scene.add(group)
    }

    const clearBars = () => {
        if (!group) return
        while (group.children.length) {
            const child = group.children.pop() as DisposableSceneObject
            disposeSceneObject(child)
        }
    }

    const setCoreTemperatures = (temperatures: number[]) => {
        if (!group) return
        clearBars()

        const values = temperatures.map(limitTemperature)
        const spacing = 1.1
        const totalWidth = (values.length - 1) * spacing

        values.forEach((temperature, index) => {
            const height = THREE.MathUtils.lerp(MinBarHeight, MaxBarHeight, temperature / 100)
            const geometry = new THREE.BoxGeometry(0.72, height, BarDepth)
            const material = new THREE.MeshStandardMaterial({
            //const material = new THREE.MeshLambertMaterial({
                color: colorForTemperature(temperature),
                //roughness: 0.42,
                //metalness: 0.08
            })
            const bar = new THREE.Mesh(geometry, material)
            bar.castShadow = true
            bar.receiveShadow = true

            bar.position.x = index * spacing - totalWidth / 2
            bar.position.y = BaseY + height / 2
            group!.add(bar)

            const label = makeLabel(`${Math.round(temperature)}°`)
            label.position.set(bar.position.x, height + 0.45, 0)
            group!.add(label)

            const coreLabel = makeGroundLabel(`${index}`)
            coreLabel.position.set(bar.position.x, 0.02, BarDepth / 2 + 0.42)
            group!.add(coreLabel)
        })
    }

    const update = (payload: CoreTempsPayload) => {
        if (!payload) return
        setCoreTemperatures(payload.coreTemperatures)  // [48, 38, 64, 81, 96])
    }

    // https://threejs.org/docs/#Global.onAnimationCallback
    // time  A timestamp indicating the end time of the previous frame's rendering.
    const onAnimation = (time: any) => {
        if (!scene || !renderer || !camera || !controls) {
            console.debug('[WireframeScene] onAnimation skipped, missing:',
                {scene: !!scene, renderer: !!renderer, camera: !!camera, controls: !!controls})
            return
        }
        controls.update()
        renderer.render(scene, camera)
    }

    const addAnimation = () => {
        if (!renderer) return
        // https://threejs.org/docs/#WebGLRenderer.setAnimationLoop
        renderer.setAnimationLoop(onAnimation)
    }
    addAnimation()

    const createScene = (container: HTMLDivElement, payload: CoreTempsPayload) => {
        console.debug('[CoreTempsBuilder] CREATE SCENE...')

        addContainer(container)
        addScene()
        addCamera()
        addRenderer()

        addLighting()
        addGround()
        addGroup()
        update(payload)

        addControls()
        addAnimation()
        status = 'created'
    }

    const resize = () => {
        if (!div || !camera || !renderer) return
        console.debug('[CoreTempsBuilder] RESIZE')
        const size = getSceneSize(div)
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
        renderer.setSize(size.width, size.height)
        // TODO update width, height, aspect in outer scope?
    }

    const dispose = () => {
        if (!scene || !renderer || !controls) return
        console.debug('[WireframeBuilder] DISPOSE')

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
        //shapes = NoShapes
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

