import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'uno.css'
import './global.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <div className="font-en">
    <App />
  </div>
</StrictMode>,
)
