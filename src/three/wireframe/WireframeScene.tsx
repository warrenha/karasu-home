import { useEffect, useState } from 'react'
import { createScene } from './SceneBuilder'
import { memo, useCallback, useRef } from 'react'

import type { Scene } from './Scene'

/*
 * - - - - - - - - - - - - - - -
 *
 * 
 * - - - - - - - - - - - - - - -
 */
const WireframeScene = () => {
    // Causes a re-render when the ref is set.
    const [ref, _setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`[WireframeScene] RENDER (ref=${ref !== null})`)

    // useCallback prevents repeated calls to setRef.
    const setRef = useCallback((div: HTMLDivElement | null) => {
        console.debug(`[WireframeScene] SET ref ${div !== null}`)
        _setRef(div)
    }, [])

    useEffect(() => {
        console.debug('[WireframeScene] MOUNT')
        return () => {
            console.debug('[WireframeScene] UNMOUNT')
        }
    }, [])

    const sceneRef = useRef<Scene | null>(null)
    const [sceneIndex, setSceneIndex] = useState(0)

    // Create the 3d scene
    useEffect(() => {
        if (ref && !sceneRef.current) {
            try {
                console.debug('[WireframeScene] CREATE SCENE')
                sceneRef.current = createScene(ref)  // Scene
                setSceneIndex(sceneIndex+1)  // re-render
            }
            catch (e) {
                console.warn('ERROR in createScene')
                console.warn(e)
            }
        }
        return () => {
            if (sceneRef.current) {
                console.debug('[WireframeScene] DISPOSE SCENE')
                sceneRef.current.dispose()  // And detach from the div
                sceneRef.current = null
            }
        }
    }, [ref])

    return (
        <div
            data-id="WireframeScene"
            className="w-full bg-white border-y-1 border-neutral-400">
            <div data-id="Scene" ref={setRef} className="w-full h-64" />
        </div>
    )
}

export default memo(WireframeScene)
