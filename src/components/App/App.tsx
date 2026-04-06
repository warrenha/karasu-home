import { FrontPage } from '@/components/Pages/FrontPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
            <div data-id="App" className="w-full h-full bg-white">
                <FrontPage />
            </div>
        </QueryClientProvider>
    )
}
