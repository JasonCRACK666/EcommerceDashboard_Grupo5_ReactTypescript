import { createBrowserRouter } from 'react-router-dom'

import ResizeListNavProvider from './context/ResizeListNavProvider'

import { useAuthorization } from './hooks/useAuthorization'

import DashboardLayout from './layouts/DashboardLayout'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsManagePage from './pages/ProductsManagePage'
import BrandsManagePage from './pages/BrandsManagePage'

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
    path: '/dashboard',
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'products',
        element: <ProductsManagePage />
      },
      {
        path: 'brands',
        element: <BrandsManagePage />
      }
    ]
  }
])

export default router
