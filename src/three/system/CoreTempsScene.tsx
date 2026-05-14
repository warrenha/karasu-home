import { memo, useMemo, useState } from 'react'
import { useSystemStore } from '@/services/system-temps/useSystemStore'
import { createCoreTempsScene, type CoreTempsPayload } from './CoreTempsBuilder'
import { cn } from '@/lib/utils'

import { ThreeScene, type ThreeSceneT } from '../common'

import { useSystemCpu } from '@/services/system-cpu'

import type { SceneI } from '../common'

type CoreTempsSceneT = SceneI<CoreTempsPayload>

const NoCores: number[] = []
const Title = 'Server Core Temperatures'

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const CoreTempsScene = () => {

    // - - - - - System - - - - - //

    // Get the CPU details (brand, model, number of cores, etc.)
    const { cpu } = useSystemCpu()  // SystemCpu | null

    let label = ''
    if (cpu && !!cpu.manufacturer) {
        label += `${cpu.manufacturer} ${cpu.brand}`

        if (cpu.cores > 0) {
            label += `, ${cpu.cores} Cores`

            if (cpu.physicalCores !== cpu.cores) {
                label += ` (${cpu.physicalCores} Physical)`
            }
            else if ((cpu.performanceCores > 0) && (cpu.efficiencyCores > 0)) {
                label += ` (${cpu.performanceCores} Performance, ${cpu.efficiencyCores} Efficiency)`
            }
        }
    }

    // System information from the server (live).
    const data = useSystemStore((s) => s.latest)  // SystemInfo | null

    const cores = data?.cores || NoCores  // number[]

    const payload: CoreTempsPayload = useMemo(() => ({
        coreTemperatures: cores
    }), [cores])

    // - - - - - Scene - - - - - //

    // The 3d scene that is rendered to the child canvas. It is
    // created on mount, and disposed of on unmount.
    const [scene] = useState<CoreTempsSceneT>(() => createCoreTempsScene())

    // - - - - - Render - - - - - //

    const ThreeSceneTyped = ThreeScene as ThreeSceneT<CoreTempsPayload>

    return (
        <div
            data-id="CoreTempsScene"
            className="relative w-full h-[500px] min-h-[500px]">
            <ThreeSceneTyped
                scene={scene}
                payload={payload}
                className="w-full h-[500px] min-h-[500px]" />
            <div 
                className={cn(
                    "absolute top-2 left-1/2 -translate-x-1/2 p-2",
                    "text-neutral-200 pointer-events-none")} >
                <div className="text-xl" >{Title}</div>
                { label && (
                <>
                    <div className="text-base text-neutral-400" >{label}</div>
                    <div className="text-base text-neutral-400" >CPU Sensors:</div>
                </>
                )}
            </div>
        </div>
    )
}

export default memo(CoreTempsScene)
