import ReconnectingWebSocket from "reconnecting-websocket"

import type { SystemInfo } from './SystemInfo'
import type { Message } from './Message'

//const WS_URL = 'ws://localhost:3000/ws'
const WS_URL = 'ws://api.karasu.co.uk:3000/ws'

type OnMessageFn = (data: SystemInfo) => void

// - - - - - Service - - - - - //

/*
 * WebSocket service for receiving system information, e.g., cpu temps.
 */
export class SystemSocketService {

    private ws: ReconnectingWebSocket | null = null

    /*
     * Connect to the websocket and start receiving live data.
     */
    connect(onMessage: OnMessageFn) {
        console.info('[SystemSocketService] Connecting to WebSocket...')
        this.ws = new ReconnectingWebSocket(WS_URL)

        this.ws.addEventListener('message', (event) => {
            try {
                const message: Message<SystemInfo> = JSON.parse(event.data)
                console.debug(`[SystemSocketService] Message:\n${JSON.stringify(message)}`)

                // data.type "system.cpu.temperature"
                const data = message?.payload || null

                if (data) {
                    onMessage?.(data)
                }
            }
            catch (err) {
                console.error('Invalid WS message', err)
            }
        })
    }

    disconnect() {
        console.info('[SystemSocketService] Disconnecting')
        this.ws?.close()
        this.ws = null
    }
}
