import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@borderline/ui'
import './index.css'
import { router } from './router'
import { SettingsProvider } from './state/SettingsContext'
import { PortfolioProvider } from './state/PortfolioContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <PortfolioProvider>
          <RouterProvider router={router} />
        </PortfolioProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
