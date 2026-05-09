import { create } from "zustand"

import type { SystemInfo } from './SystemInfo'

type SystemInfoStore = {
    latest: SystemInfo | null

    history: SystemInfo[]

    maxHistory: number

    setLatest: (data: SystemInfo) => void

    clearHistory: () => void
}

/*
 *
 */
export const useSystemStore = create<SystemInfoStore>((set) => ({
    latest: null,

    history: [],

    maxHistory: 50,

    setLatest: (data: SystemInfo) => set((state) => {
        const updatedHistory = [...state.history, data]
        if (updatedHistory.length > state.maxHistory) {
            updatedHistory.shift()
        }
        return {
            latest: data,
            history: updatedHistory
        }
    }),

    clearHistory: () => set({
        latest: null,
        history: []
    })
}))
