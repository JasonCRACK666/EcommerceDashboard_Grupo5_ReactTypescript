import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import IUserMe from '../interfaces/auth/IUserMe'

interface AuthState {
  user: IUserMe | null
  token: string | null
  isAuth: boolean
}

interface AuthActions {
  setAuth: (user: IUserMe, token: string) => void
  logOut: () => void
}

export const authStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      set => ({
        isAuth: false,
        token: null,
        user: null,
        logOut: () => set(() => ({ isAuth: false, token: null, user: null })),
        setAuth: (user, token) => set(() => ({ isAuth: true, token, user }))
      }),
      {
        name: 'auth-store'
      }
    )
  )
)
