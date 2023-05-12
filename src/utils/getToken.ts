import { useAuthStore } from '../store/useAuthStore'

export const getToken = (): string => {
  const token = useAuthStore.getState().token
  return token ? `Bearer ${token}` : ''
}
