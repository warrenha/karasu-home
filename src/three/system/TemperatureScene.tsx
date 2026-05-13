import { useEffect, useState } from 'react'
import { createScene } from './TemperatureBuilder'
import { useSystemStore } from '@/services/system/useSystemStore'

const NoCores: number[] = []

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const TemperatureScene = () => {

    // System information from the server (live).
    const data = useSystemStore((s) => s.latest)  // SystemInfo | null

    const cores = data?.cores || NoCores  // number[]

    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    console.debug(`TemperatureScene ref=${ref === null}`)

    // Create the 3d scene on mount
    useEffect(() => {
        if (cores.length > 0) {
            console.debug('[TemperatureScene] CREATE SCENE')
            const renderer = ref ? createScene(ref, cores) : null
            return () => {
                console.debug('[TemperatureScene] DISPOSE SCENE')
                if (ref && renderer?.domElement) {
                    ref.removeChild(renderer?.domElement)
                }
                renderer?.dispose()
            }
        }
    }, [ref, cores])

    useEffect(() => {
        console.debug('[TemperatureScene] MOUNT')
        return () => {
            console.debug('[TemperatureScene] UNMOUNT')
        }
    }, [])

    return (
        <div
            data-id="TemperatureScene"
            className="w-full h-[500px] min-h-[500px]">
            <div
                data-id="Scene" ref={setRef}
                className="w-full h-[500px] min-h-[500px]" />
        </div>
    )
}

export default TemperatureScene

