import * as THREE from 'three'

export const createShapes = () => {

    /*const createCube = (wireframe: boolean) => {
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshBasicMaterial({
            color: wireframe ? 0x404040 : 0xffffff,
            wireframe: false
        })
        return new THREE.Mesh(geometry, material)
    }
        
    const createEdgesCube = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const edges = new THREE.EdgesGeometry(geometry)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x404040 })
        const lines = new THREE.LineSegments(edges, lineMaterial)
        return lines
    }
    
    const createWireAndMeshCube = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        //const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
        //const mesh = new THREE.Mesh(geometry, material)
    
        const edges = new THREE.EdgesGeometry(geometry)
        const material2 = new THREE.LineBasicMaterial({ color: 0x404040 })
        const lines = new THREE.LineSegments(edges, material2)
        return [lines]
    }*/

    const createBall = () => {
        const geometry = new THREE.SphereGeometry(2.8, 32, 16)

        const material = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } );

        const ball = new THREE.Mesh(geometry, material)

        //ball.position.set(0, 8, 0)
        //ball.castShadow = true
        return [ball]
    }

    const shapes = createBall()
    return shapes
}
