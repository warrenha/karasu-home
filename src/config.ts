
//const WS_URL = 'ws://localhost:3000/ws'
//const WS_URL = 'ws://api.karasu.co.uk:3000/ws'
//const WS_URL = 'wss://api.karasu.co.uk/ws'

// Configured in files .env.production, .env.development
export const config = {
    apiUrl: import.meta.env.VITE_API_URL,

    wsUrl: import.meta.env.VITE_WS_URL
};
