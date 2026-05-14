import { FrontPage } from '@/components/Pages/FrontPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSystemStream } from '@/services/system'
const queryClient = new QueryClient()

/*
 * - - - - - - - - - - - - - - -
 *
 * Application component.
 *
 * - - - - - - - - - - - - - - -
 */
export const App = () => {

    // Connect to the websocket, start receiving live system information.
    useSystemStream()

    return (
        <QueryClientProvider client={queryClient}>
            <div data-id="App" className="w-full h-full bg-white">
                <FrontPage />
            </div>
        </QueryClientProvider>
    )
}
