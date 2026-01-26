import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ApplicationList from './ApplicationList'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApplicationList />
  </StrictMode>,
)
