import { createBrowserRouter } from 'react-router-dom'

import ResizeListNavProvider from './context/ResizeListNavProvider'

import { useAuthorization } from './hooks/useAuthorization'

import DashboardLayout from './layouts/DashboardLayout'

import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    loader: useAuthorization,
    element: (
      <ResizeListNavProvider>
        <DashboardLayout />
      </ResizeListNavProvider>
    ),
    children: []
  }
])

export default router
