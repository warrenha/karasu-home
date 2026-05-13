import { useEffect, useState } from 'react'
//import { createScene } from './TemperatureBuilder'
//import { createScene } from './SystemSceneBuilder'
import { createScene } from './TestBuilder'
import { useSystemStore } from '@/services/system/useSystemStore'

const NoCores: number[] = []

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const TestScene = () => {

    // System information from the server (live).
    const data = useSystemStore((s) => s.latest)  // SystemInfo | null

    const cores = data?.cores || NoCores  // number[]

    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`[TestScene] ref=${ref === null}`)

    // Create the 3d scene on mount
    useEffect(() => {
        if (cores.length > 0) {
            console.debug('[TestScene] CREATE SCENE')
            const test = ref ? createScene(ref, cores) : null
            const renderer = test?.renderer || null
            //const renderer = ref ? createScene(ref, cores) : null
            return () => {
                console.debug('[TestScene] DISPOSE SCENE')
                if (ref && renderer?.domElement) {
                    ref.removeChild(renderer?.domElement)
                }
                renderer?.dispose()
            }
        }
    }, [ref, cores])

    useEffect(() => {
        console.debug('[TestScene] MOUNT')
        return () => {
            console.debug('[TestScene] UNMOUNT')
        }
    }, [])

    return (
        <div
            data-id="TestScene"
            className="w-full h-[500px] min-h-[500px]">
            <div
                data-id="Scene" ref={setRef}
                className="w-full h-[500px] min-h-[500px]" />
        </div>
    )
}

export default TestScene

