import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

console.info('Starting app... <-----')

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
