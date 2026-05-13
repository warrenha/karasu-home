import { useEffect, useState } from 'react'
import { createScene } from './SceneBuilder'

/*
 * - - - - - - - - - - - - - - -
 *
 * - - - - - - - - - - - - - - -
 */
const WireframeScene = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`ThreeScene ref=${ref === null}`)

    // Create the 3d scene on mount
    useEffect(() => {
        console.debug('[WireframeScene] CREATE SCENE')
        const renderer = ref ? createScene(ref) : null
        return () => {
            console.debug('[WireframeScene] DISPOSE SCENE')
            if (ref && renderer?.domElement) {
                ref.removeChild(renderer?.domElement)
            }
            renderer?.dispose()
        }
    }, [ref])

    useEffect(() => {
        console.debug('[WireframeScene] MOUNT')
        return () => {
            console.debug('[WireframeScene] UNMOUNT')
        }
    }, [])

    return (
        <div
            data-id="WireframeScene"
            className="w-full bg-white border-y-1 border-neutral-400">
            <div data-id="Scene" ref={setRef} className="w-full h-64" />
        </div>
    )
}

export default WireframeScene
