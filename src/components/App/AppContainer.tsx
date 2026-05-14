import { FrontPage } from '@/components/Pages/FrontPage'
import { useSystemCpu } from '@/services/system-cpu'
import { useSystemStream } from '@/services/system-temps'

/*
 * - - - - - - - - - - - - - - -
 *
 * App container.
 *
 * Note: This needs to be inside QueryClientProvider for 'useSystemCpu', which fetches the
 *       the CPU details.
 *
 * - - - - - - - - - - - - - - -
 */
export const AppContainer = () => {

    // Get the CPU details (brand, model, number of cores, etc.)
    useSystemCpu()

    // Connect to the websocket, start receiving live system information.
    useSystemStream()

    // - - - - - Render - - - - - //

    // data-id="App" needed for playwright tests!
    return (
        <div data-id="App" className="w-full h-full bg-white">
            <FrontPage />
        </div>
    )
}
