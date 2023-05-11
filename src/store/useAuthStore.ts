import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import IUserMe from '../interfaces/auth/IUserMe'

interface AuthState {
  user: IUserMe | null
  token: string | null
  isAuth: boolean
}

interface AuthActions {
  setAuth: (user: IUserMe) => void
  setToken: (toke: string) => void
  logOut: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      set => ({
        isAuth: false,
        token: null,
        user: null,
        logOut: () => set(() => ({ isAuth: false, token: null, user: null })),
        setAuth: user => set(state => ({ ...state, isAuth: true, user })),
        setToken: token => set(state => ({ ...state, token }))
      }),
      {
        name: 'auth-store'
      }
    )
  )
)
