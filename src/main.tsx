import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ApplicationList from './ApplicationList'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApplicationList />
  </StrictMode>,
)
