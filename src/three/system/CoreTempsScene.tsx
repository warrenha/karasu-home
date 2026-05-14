import { memo, useMemo, useState } from 'react'
import { useSystemStore } from '@/services/system/useSystemStore'
import { createCoreTempsScene, type CoreTempsPayload } from './CoreTempsBuilder'

import { ThreeScene, type ThreeSceneT } from '../common'

import type { SceneI } from '../common'

type CoreTempsSceneT = SceneI<CoreTempsPayload>

const NoCores: number[] = []

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const CoreTempsScene = () => {

    // - - - - - System - - - - - //

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
            className="w-full h-[500px] min-h-[500px]">
            <ThreeSceneTyped
                scene={scene}
                payload={payload}
                className="w-full h-[500px] min-h-[500px]" />
        </div>
    )
}

export default memo(CoreTempsScene)
