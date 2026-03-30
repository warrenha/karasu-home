import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPost } from './api'

import type { ContactMessage } from '@/models/ContactMessage'

// - - - - - API - - - - - //

/*
 * Send a contact message to the Cloudflare Worker.
 */
export const postContactUs = async (
    message: ContactMessage
) => {
    const url = 'https://karasu-cf-worker-test.karasu-account.workers.dev/?test=contactUs'
    return apiPost(url, message)
}

/*
 * Hook -- hide the tanstack boilerplate
 */
export const usePostContactUs = () => {
    const queryClient = useQueryClient()

    // The returned object is always a new instance, but mutate never changes
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: postContactUs,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactUs'] })
        }
    })

    const contactUs = useCallback(async (message: ContactMessage) => {
        mutate(message)  // --> postContactUs
    }, [mutate])

    return {
        pending: isPending,
        error: isError,
        success: isSuccess,
        contactUs
    }
}
