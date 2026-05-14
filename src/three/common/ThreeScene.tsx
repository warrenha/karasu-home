import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react'

import type { ClassNameProps } from '@/utils'
import type { SceneI } from './SceneI'

type Props<T> = {
    // Builds the scene once the div element is available
    scene: SceneI<T>  // createScene, ..., update, dispose

    // Payload used to help build & update the scene.
    payload: T
}
& ClassNameProps

// Helps with type inference
export type ThreeSceneT<T> = React.FC<Props<T>>

/*
 * - - - - - - - - - - - - - - -
 *
 * 
 * - - - - - - - - - - - - - - -
 */
const _ThreeScene = <T,>(props: Props<T>) => {  // T = payload type, for create/update
    const { scene, payload, className } = props

    // - - - - - Ref - - - - - //

    // Causes a re-render when the ref is set.
    const [ref, _setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`[ThreeScene] RENDER (ref=${ref !== null})`)

    // useCallback prevents repeated calls to setRef.
    const setRef = useCallback((div: HTMLDivElement | null) => {
        console.debug(`[ThreeScene] SET ref ${div !== null}`)
        _setRef(div)
    }, [])

    useEffect(() => {
        console.debug('[ThreeScene] MOUNT')
        return () => {
            console.debug('[ThreeScene] UNMOUNT')
        }
    }, [])

    // - - - - - Scene - - - - - //

    const [index, setIndex] = useState(0)

    // Create the 3d scene...
    useLayoutEffect(() => {
        if (ref && (scene.status === 'unset')) {
            try {
                console.debug('[ThreeScene] CREATE SCENE')
                scene.createScene(ref, payload)  // Scene
                setIndex(index+1)  // re-render
            }
            catch (e) {
                console.warn('[ThreeScene] ERROR in createScene')
                console.warn(e)
            }
        }
        return () => {
            if (scene.status === 'created') {
                console.debug('[ThreeScene] DISPOSE SCENE')
                scene.dispose()  // And detach from the div
            }
        }
    }, [ref])

    // - - - - - Render - - - - - //

    return (
        <div data-id="ThreeScene"
            ref={setRef}
            className={className} />
    )
}

export const ThreeScene = memo(_ThreeScene)
