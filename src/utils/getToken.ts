import { useAuthStore } from '../store/useAuthStore'

export const getToken = (): string | null => {
  const tokenFromStorage = useAuthStore.getState().token

  const tokenFromLocalStorage = localStorage.getItem('token')

  const token = tokenFromStorage ?? tokenFromLocalStorage

  return token ? `Bearer ${token}` : null
}
