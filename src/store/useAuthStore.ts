import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import IUserMe from '../interfaces/auth/IUserMe'

interface AuthState {
  user: IUserMe | null
  token: string | null
}

interface AuthActions {
  setAuth: (user: IUserMe) => void
  setToken: (toke: string) => void
  logOut: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(set => ({
    token: null,
    user: null,
    logOut: () => set(() => ({ token: null, user: null })),
    setAuth: user => set(state => ({ ...state, user })),
    setToken: token => set(state => ({ ...state, token }))
  }))
)
