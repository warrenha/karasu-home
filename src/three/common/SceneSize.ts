// - - - - - Types - - - - - //

export type Size = {
    width: number,
    height: number,
    aspect: number  // width / height
}

// - - - - - Size - - - - - //

export const getSceneSize = (div: HTMLDivElement): Size => {
    // const rect = div.getBoundingClientRect()
    // rect.width, rect.height
    const width = Math.max(1, div.clientWidth)
    const height = Math.max(1, div.clientHeight)
    const aspect = width / height
    return { width, height, aspect }
}
