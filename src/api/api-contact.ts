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
 * Hook
 */
export const usePostContactUs = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: postContactUs,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactUs'] })
        }
    })

    const contactUs = async (message: ContactMessage) => {
        mutation.mutate(message)
    }

    return {
        pending: mutation.isPending,
        error: mutation.isError,
        success: mutation.isSuccess,
        contactUs
    }
}
