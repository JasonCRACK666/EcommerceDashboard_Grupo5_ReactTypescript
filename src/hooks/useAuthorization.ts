import { LoaderFunction, redirect } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStore'

import { getMe } from '../services/authService'

import Role from '../interfaces/Role'

export const useAuthorization: LoaderFunction = async () => {
  const { setAuth, token } = useAuthStore.getState()

  if (!token) return redirect('/login')

  try {
    const userData = await getMe()
    setAuth(userData)

    if (userData.role !== Role.ADMIN) return redirect('/login')

    return null
  } catch (error) {
    return redirect('/login')
  }
}
