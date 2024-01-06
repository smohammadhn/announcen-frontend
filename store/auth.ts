import { create } from 'zustand'

interface AuthStore {
  user: User
  setUser: (payload: User) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {} satisfies User,
  setUser: (payload: User) => set((_) => ({ user: payload })),
}))

export default useAuthStore
