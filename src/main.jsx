import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CovidTracker from './CovidTracker/CovidTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CovidTracker />
  </StrictMode>,
)
