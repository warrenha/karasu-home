import * as THREE from 'three'

import { limitTemperature, colorForTemperature, makeLabel, makeGroundLabel } from '../common'
import { /*getSceneSize, */disposeScene, disposeSceneObject, type DisposableSceneObject } from '../common'
import type { Scene, Size } from '../common'

const BarDepth = 0.55
const MaxBarHeight = 5
const MinBarHeight = 0.12
const BaseY = 0

/*
 * Creates the complete 3d scene, with camera, lighting and renderer.
 */
export const createScene = (
    div: HTMLDivElement,
    coreTemperatures: number[]  // [48, 38, 64, 81, 96]
): Scene => {
    console.debug('Creating 3d temperature scene...')

    //const { width, height, aspect } = getSceneSize(div)
    const getSceneSize = (): Size => {
        const rect = div.getBoundingClientRect()
        return {
            width: Math.max(1, rect.width),
            height: Math.max(1, rect.height),
            aspect: 0
        }
    }
    const { width, height } = getSceneSize()

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x202020)

    const createCamera = () => {
        const aspect = width / height
        const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100)  // fov (degrees), near/far plane
        camera.position.set(0, 6.7, 6.6)
        camera.lookAt(0, 2.85, -0.05)
        return camera;
    }
    const camera = createCamera()

    const createRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        div.appendChild(renderer.domElement);
        return renderer
    }
    const renderer = createRenderer()

    const addLighting = () => {
        scene.add(new THREE.AmbientLight(0xffffff, 0.52))

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
    addLighting()

    const addGrid = () => {
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
    addGrid()

    const group = new THREE.Group()
    scene.add(group)

    const clearBars = () => {
        while (group.children.length) {
            const child = group.children.pop() as DisposableSceneObject
            disposeSceneObject(child)
        }
    }

    const setCoreTemperatures = (temperatures: number[]) => {
        clearBars()

        const values = temperatures.map(limitTemperature)
        const spacing = 1.1
        const totalWidth = (values.length - 1) * spacing

        values.forEach((temperature, index) => {
            const height = THREE.MathUtils.lerp(MinBarHeight, MaxBarHeight, temperature / 100)
            const geometry = new THREE.BoxGeometry(0.72, height, BarDepth)
            const material = new THREE.MeshStandardMaterial({
                color: colorForTemperature(temperature),
                roughness: 0.42,
                metalness: 0.08
            })
            const bar = new THREE.Mesh(geometry, material)
            bar.castShadow = true
            bar.receiveShadow = true

            bar.position.x = index * spacing - totalWidth / 2
            bar.position.y = BaseY + height / 2
            group.add(bar)

            const label = makeLabel(`${Math.round(temperature)}°`)
            label.position.set(bar.position.x, height + 0.45, 0)
            group.add(label)

            const coreLabel = makeGroundLabel(`${index}`)
            coreLabel.position.set(bar.position.x, 0.02, BarDepth / 2 + 0.42)
            group.add(coreLabel)
        })
    }
    setCoreTemperatures(coreTemperatures)

    const onResize = () => {
        const size = getSceneSize()
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
        renderer.setSize(size.width, size.height)
    }
    window.addEventListener('resize', onResize)

    //const animate = () => {
    //    renderer.render(scene, camera)
    //    requestAnimationFrame(animate)
    //}
    //animate()

    const dispose = () => {
        if (div && renderer.domElement) {
            div.removeChild(renderer.domElement)
        }
        //controls.dispose()
        disposeScene(scene)
        //renderer.setAnimationLoop(null)
        renderer.dispose()
        //renderer.forceContextLoss()
    }

    return {
        renderer,  // THREE.WebGLRenderer
        dispose
    }
}

