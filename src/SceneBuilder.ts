import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createShapes } from './ShapeBuilder'

export const createScene = (div: HTMLDivElement) => {
    // Container dimensions
    const width = div.clientWidth
    const height = div.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    // scene.fog = new THREE.Fog(0xf0f0f0, 10, 50)
    
    const createCamera = () => {
        const camera = new THREE.PerspectiveCamera(
            25,
            width / height,
            0.1,
            1000
        )
        camera.position.set(0, 0, 5)
        camera.lookAt(0, 0, 0)
        return camera;
    }
    const camera = createCamera()
    
    const createRenderer = () => {
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        // renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        div.appendChild(renderer.domElement)
        return renderer;
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
    addLighting();

    /*const addGround = () => {
        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        planeMesh.rotation.x = -Math.PI / 2;
        planeMesh.receiveShadow = true;
        scene.add(planeMesh);

        const grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000);
        (grid.material as THREE.Material).opacity = 0.2;
        (grid.material as THREE.Material).transparent = true;
        scene.add(grid)
    }*/
    //addGround()
    
    const addShapes = () => {
        //const shape = createCube(false)
        //const shape2 = createCube(true)
        //const shape3 = createEdgesCube()
        //scene.add(shape2)
        //scene.add(shape2)
        // scene.add(cube)
    
        // const material = new THREE.MeshBasicMaterial({ color: 0x404040 })
        // const cube = new THREE.Mesh(geometry, material)
        // scene.add(cube)

        const shapes = createShapes()
        for (const shape of shapes) {
            scene.add(shape)
        }

        return shapes
    }
    const shapes = addShapes();

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update();
    
    const addAnimation = () => {
        function animate(time: any) {
            // cube.rotation.x = time / 2000
            // cube.rotation.y = time / 1000
            for (const shape of shapes) {
                shape.rotation.x = time / 15000
                shape.rotation.y = time / 5000
            }
            controls.update()
            renderer.render(scene, camera)
        }
        renderer.setAnimationLoop(animate)
        return renderer
    }
    addAnimation();

    return renderer;
}