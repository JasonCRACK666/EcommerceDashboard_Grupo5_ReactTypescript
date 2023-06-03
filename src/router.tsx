import { createBrowserRouter, redirect } from 'react-router-dom'

import ResizeListNavProvider from './context/ResizeListNavProvider'

import { useAuthorization } from './hooks/useAuthorization'

import DashboardLayout from './layouts/DashboardLayout'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsManagePage from './pages/ProductsManagePage'
import ProductCreatePage from './pages/ProductCreatePage'
import BrandsManagePage from './pages/BrandsManagePage'
import CategoriesManagePage from './pages/CategoriesManagePage'
import CategoryCreatePage from './pages/CategoryCreatePage'
import ColorsManagePage from './pages/ColorsManagePage'
import ColorCreatePage from './pages/ColorCreatePage'
import BrandCreatePage from './pages/BrandCreatePage'

const router = createBrowserRouter([
  {
    path: '*',
    loader: () => {
      return redirect('/dashboard')
    }
  },
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
        path: 'brands/create',
        element: <BrandCreatePage />
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
      },
      {
        path: 'colors/create',
        element: <ColorCreatePage />
      }
    ]
  }
])

export default router
