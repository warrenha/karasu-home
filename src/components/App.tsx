import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FrontPage from './FrontPage'

const queryClient = new QueryClient()

/*
 * - - - - - - - - - -
 *
 * - - - - - - - - - -
 */
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div data-id="App" className="w-full h-full bg-white">
                <FrontPage />
            </div>
        </QueryClientProvider>
    )
}

export default App
