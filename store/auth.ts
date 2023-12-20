import { create } from 'zustand'

export interface User {
  _id?: string
  email: string
  password: string
}

interface AuthStore {
  user: User
  setUser: (payload: User) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {} as User,
  setUser: (payload) => set((_) => ({ user: payload })),
}))

export default useAuthStore
