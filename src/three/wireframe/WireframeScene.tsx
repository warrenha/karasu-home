import { memo, useState } from 'react'
import { createWireframeScene } from './WireframeBuilder'

import { ThreeScene, type ThreeSceneT } from '../common'

import type { SceneI } from '../common'
import type { WireframePayload } from './WireframeBuilder'

type WireframeSceneT = SceneI<WireframePayload>

const NoPayload: WireframePayload = {}

/*
 * - - - - - - - - - - - - - - -
 *
 * 
 * - - - - - - - - - - - - - - -
 */
const WireframeScene = () => {

    // The 3d scene that is rendered to the child canvas. It is
    // created on mount, and disposed of on unmount.
    const [scene] = useState<WireframeSceneT>(() => createWireframeScene())

    // - - - - - Render - - - - - //

    const ThreeSceneTyped = ThreeScene as ThreeSceneT<WireframePayload>

    return (
        <div
            data-id="WireframeScene"
            className="w-full bg-white border-y-1 border-neutral-400">
            <ThreeSceneTyped
                scene={scene}
                payload={NoPayload}
                className="w-full h-64" />
        </div>
    )
}

export default memo(WireframeScene)
