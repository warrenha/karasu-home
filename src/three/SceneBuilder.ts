import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createShapes } from './ShapeBuilder'

const Radius = 5

/*
 * Creates the complete 3d scene, with camera, lighting and renderer.
 */
export const createScene = (div: HTMLDivElement) => {
    console.debug('Creating 3d scene...')

    // Container dimensions
    const width = div.clientWidth
    const height = div.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    // scene.fog = new THREE.Fog(0xf0f0f0, 10, 50)
    
    // Camera
    const createCamera = () => {
        const camera = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        )
        camera.position.set(0, 4, 7)
        // Has no effect, use controls.target instead.
        //camera.lookAt(0, 10, 0)
        return camera;
    }
    const camera = createCamera()

    // Renderer
    const createRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        //renderer.shadowMap.enabled = true
        div.appendChild(renderer.domElement)
        return renderer;
    }
    const renderer = createRenderer()

    // Lighting
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
    addLighting();

    const addGround = () => {
        //const plane = new THREE.Mesh(
        //    new THREE.PlaneGeometry(10, 10),
        //    new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false })
        //    //new THREE.MeshStandardMaterial({ color: 0xffffff })
        //);
        //plane.position.set(0, 0, -10)
        //plane.rotation.x = -Math.PI / 2;
        //plane.rotation.x = -Math.PI / 8;
        //plane.receiveShadow = true;
        //scene.add(plane);

        const grid = new THREE.GridHelper(35, 35, 0xff0000, 0xe0e0e0);
        grid.rotation.x = Math.PI / 8;
        //(grid.material as THREE.Material).opacity = 0.2;
        //(grid.material as THREE.Material).transparent = true;
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
    const shapes = addShapes();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(0, 4, 0)
    controls.update();

    const animate = (time: any) => {
        for (const shape of shapes) {
            shape.rotation.x = time / 15000
            shape.rotation.y = time / 5000
        }
        controls.update()
        renderer.render(scene, camera)
    }

    const addAnimation = () => {
        renderer.setAnimationLoop(animate)
    }
    addAnimation();

    return renderer;
}