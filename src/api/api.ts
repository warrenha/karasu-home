// - - - - - API - - - - - //

/*
 * An API fetch request for the given method (GET/POST/etc).
 */
const apiFetch = async (
    url: string,
    options?: RequestInit
): Promise<Response> => {
    return fetch(url, {
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
 * POST request with a JSON body & JSON response.
 */
export const apiPost = async <B, T>(
    url: string,
    body: B
): Promise<T> => {
    return apiFetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((r: Response) => {
        return r.json()
    })
}

/*
 * GET request with a JSON response.
 */
export const apiGet = async <T>(
    url: string,
): Promise<T> => {
    return apiFetch(url, {
        method: 'GET'
    })
    .then((r: Response) => {
        return r.json()
    })
}
