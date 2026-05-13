import { useEffect, useState } from 'react'
import { createScene } from './SystemSceneBuilder'
//import { createScene } from './TestBuilder'
import { useSystemStore } from '@/services/system/useSystemStore'
import { memo, useCallback, useRef } from 'react'

import type { Scene } from '../common/Scene'

const NoCores: number[] = [10, 20, 30, 40]

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const SystemScene = () => {

    // System information from the server (live).
    const data = useSystemStore((s) => s.latest)  // SystemInfo | null

    const cores = data?.cores || NoCores  // number[]

    useEffect(() => {
        console.debug('[SystemScene] MOUNT')
        return () => {
            console.debug('[SystemScene] UNMOUNT')
        }
    }, [])

    // Causes a re-render when the ref is set.
    const [ref, _setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`[SystemScene] RENDER (ref=${ref !== null})`)

    // useCallback prevents repeated calls to setRef.
    const setRef = useCallback((div: HTMLDivElement | null) => {
        console.debug(`[SystemScene] SET ref ${div !== null}`)
        _setRef(div)
    }, [])

    const sceneRef = useRef<Scene | null>(null)
    const [sceneIndex, setSceneIndex] = useState(0)

    // Create the 3d scene on mount
    useEffect(() => {
        if (ref && !sceneRef.current) {
            try {
                console.debug('[SystemScene] CREATE SCENE')
                sceneRef.current = createScene(ref, NoCores)  // Scene
                setSceneIndex(sceneIndex+1)  // re-render
            }
            catch (e) {
                console.warn('[SystemScene] ERROR in createScene')
                console.warn(e)
            }
        }
        return () => {
            if (sceneRef.current) {
                console.debug('[SystemScene] DISPOSE SCENE')
                sceneRef.current.dispose()  // And detach from the div
                sceneRef.current = null
            }
        }
    }, [ref])

    useEffect(() => {
        if (sceneRef.current && cores.length > 0) {  // and not the first, as done in createScene??
            console.debug('[SystemScene] TODO UPDATE CORES')
            // sceneRef.current.update(cores)
        }
    }, [cores])

    return (
        <div
            data-id="SystemScene"
            className="w-full h-[500px] min-h-[500px]">
            <div
                data-id="Scene" ref={setRef}
                className="w-full h-[500px] min-h-[500px]" />
        </div>
    )
}

export default memo(SystemScene)

