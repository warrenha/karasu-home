import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppContainer } from './AppContainer'

const queryClient = new QueryClient()

/*
 * - - - - - - - - - - - - - - -
 *
 * Application component.
 *
 * - - - - - - - - - - - - - - -
 */
export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContainer />
        </QueryClientProvider>
    )
}
