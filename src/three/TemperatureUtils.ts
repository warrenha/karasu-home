import * as THREE from 'three'

export type Size = { width: number, height: number };

// - - - - - Temperature - - - - - //

export const limitTemperature = (n: number): number => (
    Math.max(0, Math.min(100, Number(n) || 0))
)

export const colorForTemperature = (n: number): any => {
    const t = limitTemperature(n) / 100
    const hue = THREE.MathUtils.lerp(210, 0, t)
    const lightness = THREE.MathUtils.lerp(54, 58, t)

    //return new THREE.Color().setHSL(hue / 360, 0.86, lightness / 100)
    return new THREE.Color().setHSL(
        hue / 360,
        1.0,
        lightness / 100,
        THREE.SRGBColorSpace
    )
}

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

// - - - - - Disposal - - - - - //

export type DisposableMaterial = {
    map?: { dispose: () => void };
    dispose: () => void;
};

export type DisposableSceneObject = {
    geometry?: { dispose: () => void };
    material?: DisposableMaterial | DisposableMaterial[];
};

const _disposeMaterial = (
    material: DisposableMaterial
) => {
    material.map?.dispose()
    material.dispose()
}

const disposeMaterial = (
    material: DisposableMaterial | DisposableMaterial[] | undefined
) => {
    if (Array.isArray(material)) {
        material.forEach(_disposeMaterial)
    } else if (material) {
        _disposeMaterial(material)
    }
}

export const disposeSceneObject = (
    obj: DisposableSceneObject
) => {
    obj.geometry?.dispose()
    disposeMaterial(obj.material)
}
