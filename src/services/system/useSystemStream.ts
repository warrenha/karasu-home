import { useEffect, useRef } from "react"

import { SystemSocketService } from "./SystemSocketService"
import { useSystemStore } from "./useSystemStore"
import type { SystemInfo } from './SystemInfo'

// - - - - - Hook - - - - - //

/*
 *
 */
export function useSystemStream() {
    const setLatest = useSystemStore((state) => state.setLatest)

    // Keep one socket instance per hook lifecycle
    const serviceRef = useRef<SystemSocketService | null>(null)

    const onReceive = (data: SystemInfo) => {
        setLatest(data)
    }

    useEffect(() => {
        const service = new SystemSocketService()
        serviceRef.current = service

        service.connect(onReceive)

        return () => {
            service.disconnect()
            serviceRef.current = null
        }
    }, [setLatest])  // on mount, as setLatest is stable
}
