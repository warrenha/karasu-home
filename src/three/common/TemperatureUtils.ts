import * as THREE from 'three'

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


