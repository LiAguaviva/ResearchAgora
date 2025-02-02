import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import '../src/styles/formApp.css'
import '../src/styles/userCard.css'
import '../src/styles/projectCard.css'
import '../src/styles/ProfileResearcherCard.css'
import '../src/styles/VerificationModal.css'
import '../src/styles/reviewCard.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
