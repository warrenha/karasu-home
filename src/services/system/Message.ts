
/*
 * Message received from the websocket.
 */
export type Message<T> = {
    type: string  // 'system.cpu.temperature'

    payload: T
};
