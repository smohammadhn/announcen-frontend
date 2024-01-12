import { create } from 'zustand'

interface AuthStore {
  user: User
  setUser: (payload: User) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {
    _id: undefined,
    email: 'UserName@gmail.com',
  },
  setUser: (payload: User) => set((_) => ({ user: payload })),
}))

export default useAuthStore
