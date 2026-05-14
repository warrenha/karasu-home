import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/api'
import { config } from '@/config'

import type { SystemCpu } from '@/types/SystemCpu'

// Configured in files .env.production, .env.development
const API_URL = config.apiUrl  // http://localhost:3000/

const SYSTEM_CPU_URL = `${API_URL}/sysinfo/cpu`

// - - - - - API - - - - - //

/*
 * Send a request to the system cpu api.
 */
export const fetchSystemCpu = async () => {
    return apiGet(SYSTEM_CPU_URL)
        .then((response) => {
            // todo validate response, handle error
            return response as SystemCpu
        })
}

/*
 * Hook -- Hide the tanstack boilerplate
 */
export const useSystemCpu = () => {
    // The returned object is always a new instance
    const { data, isPending, isSuccess, isError } = useQuery({
        queryFn: async () => fetchSystemCpu(),
        queryKey: [`systemCpu`]
    })

    return {
        cpu: data || null,  // SystemCpu | null
        pending: isPending,
        error: isError,
        success: isSuccess
    }
}
