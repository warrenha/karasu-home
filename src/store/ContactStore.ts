import { create } from 'zustand'
import type { FetchStatus } from './FetchStatus'

// - - - - - Zustand Store - - - - - //

type ContactState = {
    status: FetchStatus
}

/*
 * Store for sending a 'contact us' message.
 */
export const useContactStore = create<ContactState>()(() => ({
    status: 'unset'
}))
