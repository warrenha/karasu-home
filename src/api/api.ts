// - - - - - API - - - - - //

/*
 * Sends an API fetch request, for the specified method (GET/POST/etc).
 */
const apiFetch = async (
    url: string,
    options?: RequestInit
): Promise<Response> => {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    })
    .then((r: Response) => {
        if (!r.ok) {
            const m = `Error in API fetch: ${r.status}: ${r.statusText}`
            console.error(m)
            throw new Error(m)
        }
        return r
    })
}

/*
 * Sends a POST request, JSON body and JSON response.
 */
export const apiPost = async <R, T>(
    url: string,
    body: R,
    options?: RequestInit
): Promise<T> => {
    return apiFetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then((r: Response) => {
        return r.json()
    })
}
