/* eslint-disable react-refresh/only-export-components -- route table, not a fast-refresh boundary */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'

// Each page is code-split: its chunk loads on first navigation and streams into
// the App layout's Suspense boundary.
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Markets = lazy(() => import('./pages/Markets'))
const AssetDetail = lazy(() => import('./pages/AssetDetail'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Portfolio /> },
      { path: 'markets', element: <Markets /> },
      { path: 'markets/:pair', element: <AssetDetail /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
