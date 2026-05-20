import * as THREE from 'three'

const ColorScale = [  // 0 - 100
    0x31b72a,
    0x5bbd24,
    0x85c21e,
    0xafc718,
    0xd9cc11,
    0xd8a317,
    0xd67a1c,
    0xd45122,
    0xd22727
]

const HotScale = [  // > 100
    0xad1f7c,
    0x9a1ba7,
    0x8717d1,
    0x6617ba
]

// - - - - - Temperature - - - - - //

export const limitTemperature = (n: number): number => (
    Math.max(0, /*Math.min(100,*/ Number(n) || 0)//)
)

export const colorForTemperature = (n: number): THREE.Color => {
    const t = limitTemperature(n)

    let color = 0xffffff  // default white
    let index = 0

    if (t > 100) {
        index = Math.floor(((t-100)/40) * HotScale.length)

        if (index >= HotScale.length) index = HotScale.length-1  // 100

        color = HotScale[index]

        console.info(`[TEMP] ${t} -> ${index} -> ${color}`)
    }
    else {  // 0 - 100
        index = Math.floor((t/100) * ColorScale.length)

        if (index >= ColorScale.length) index = ColorScale.length-1  // 100

        color = ColorScale[index]
    }
    return new THREE.Color(color)

    /*
    const hue = THREE.MathUtils.lerp(210, 0, t)
    const lightness = THREE.MathUtils.lerp(54, 58, t)

    //return new THREE.Color().setHSL(hue / 360, 0.86, lightness / 100)
    return new THREE.Color().setHSL(
        hue / 360,
        1.0,
        lightness / 100,
        THREE.SRGBColorSpace
    )
    */
}


