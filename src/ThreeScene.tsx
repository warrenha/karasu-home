import { useEffect, useState } from 'react'
import { createScene } from './SceneBuilder'

/*
 * - - - - - - - - - -
 *
 * - - - - - - - - - -
 */
const ThreeScene = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    console.info(`ThreeScene ref=${ref === null}`)

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
            className="h-64 w-full bg-white border-y-1 border-neutral-400">
            <div data-id="Scene" ref={setRef} className="w-full h-full" />
        </div>
    )
}

export default ThreeScene
