import { createBrowserRouter } from 'react-router-dom'

import ResizeListNavProvider from './context/ResizeListNavProvider'

import { useAuthorization } from './hooks/useAuthorization'

import DashboardLayout from './layouts/DashboardLayout'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsManagePage from './pages/ProductsManagePage'
import ProductCreatePage from './pages/ProductCreatePage'
import BrandsManagePage from './pages/BrandsManagePage'
import CategoriesManagePage from './pages/CategoriesManagePage'
import ColorsManagePage from './pages/ColorsManagePage'
import CategoryCreatePage from './pages/CategoryCreatePage'

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
        path: 'products/create',
        element: <ProductCreatePage />
      },
      {
        path: 'brands',
        element: <BrandsManagePage />
      },
      {
        path: 'categories',
        element: <CategoriesManagePage />
      },
      {
        path: 'categories/create',
        element: <CategoryCreatePage />
      },
      {
        path: 'colors',
        element: <ColorsManagePage />
      }
    ]
  }
])

export default router
