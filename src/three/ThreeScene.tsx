import { useEffect, useState } from 'react'
import { createScene } from './SceneBuilder'

/*
 * - - - - - - - - - - - - - - -
 *
 * - - - - - - - - - - - - - - -
 */
const ThreeScene = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`ThreeScene ref=${ref === null}`)

    // Create the 3d scene on mount
    useEffect(() => {
        const renderer = ref ? createScene(ref) : null
        return () => {
            if (ref && renderer?.domElement) {
                ref.removeChild(renderer?.domElement)
            }
            renderer?.dispose()
        }
    }, [ref])

    return (
        <div
            data-id="ThreeScene"
            className="w-full bg-white border-y-1 border-neutral-400">
            <div data-id="Scene" ref={setRef} className="w-full h-64" />
        </div>
    )
}

export default ThreeScene
