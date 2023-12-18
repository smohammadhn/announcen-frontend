/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/store/auth'

interface LoginResponse {
  access: string
  user: User
}

interface VerifyEndpointResponse {
  user: User
  message: string
}

const authService = {
  login(onSuccess?: (loginResponse: LoginResponse) => void) {
    return useMutation<LoginResponse, AxiosError<ErrorMessage>, Partial<User>>({
      mutationFn: (user) =>
        axios.post<Partial<User>, AxiosResponse<LoginResponse>>('/auth', user).then((res) => res.data),
      onSuccess,
    })
  },

  register(onSuccess: (savedUser: User) => void) {
    return useMutation<User, AxiosError<ErrorMessage>, User>({
      mutationFn: (user: User) => axios.post<User>('/users', user).then((res) => res.data),
      onSuccess,
    })
  },

  async verifyToken(authToken: string) {
    // TODO: make sure that the authToken variable contains a valid base64-encoded JWT token (object). and not any malicious input

    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: `auth-token=${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((res: VerifyEndpointResponse) => {
        if (res.user?._id) {
          return {
            isTokenVerified: true,
            user: res.user,
          }
        }

        return {
          isTokenVerified: false,
          user: {},
        }
      })
      .catch(() => ({
        isTokenVerified: false,
        user: {},
      }))
  },
}

export default authService
