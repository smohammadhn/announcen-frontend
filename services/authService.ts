/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface User {
  email: string
  password: string
}

const authService = {
  login(onSuccess?: () => void) {
    return useMutation<User, AxiosError<ErrorMessage>, User>({
      mutationFn: (user: User) =>
        axios.post<User>('/auth', user).then((res) => res.data),
      onSuccess,
    })
  },

  logout(onSuccess?: () => void) {
    return useMutation<undefined, AxiosError<ErrorMessage>>({
      mutationFn: () => axios.post('/auth/logout'),
      onSuccess,
    })
  },

  register(onSuccess: (savedUser: User) => void) {
    return useMutation<User, AxiosError<ErrorMessage>, User>({
      mutationFn: (user: User) =>
        axios.post<User>('/users', user).then((res) => res.data),
      onSuccess,
    })
  },

  async verifyToken(authToken: string) {
    // TODO: make sure that the authToken variable contains a valid base64-encoded JWT token (object). and not any malicious input

    return fetch('http://localhost:8000/api/auth/verify', {
      method: 'POST',
      headers: {
        Cookie: `auth-token=${authToken}`,
      },
    }).then((res) => {
      res.status

      if (res.status === 200) {
        return true
      }

      return false
    })
  },
}

export default authService
