import * as THREE from 'three'

// - - - - - Text - - - - - //

const makeTextTexture = (
    text: string,
    font: string
): any => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
        throw new Error('Canvas text rendering is unavailable.')
    }
    canvas.width = 256
    canvas.height = 96

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#f6f7fb'
    context.font = font
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    return new THREE.CanvasTexture(canvas)
}

export const makeLabel = (
    text: string
): any => {
    const texture = makeTextTexture(text, 'bold 34px Arial')
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
    const sprite = new THREE.Sprite(material)

    sprite.scale.set(1.4, 0.52, 1)
    return sprite
}

export const makeGroundLabel = (
    text: string
): any => {
    const texture = makeTextTexture(text, 'bold 44px Arial')
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false
    })
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.55), material)
    label.rotation.x = -Math.PI / 2
    return label
}