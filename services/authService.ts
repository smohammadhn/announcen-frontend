/* eslint-disable react-hooks/rules-of-hooks */

import { Organization } from '@/app/(layoutBlank)/register/organization/page'
import { cleanObject } from '@/lib/utils'
import axios from '@/services/apiClient'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

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
      mutationFn: (user) => axios.post<User>('/users', user).then((res) => res.data),
      onSuccess,
    })
  },

  createOrganization(onSuccess: (savedOrganization: Organization) => void) {
    return useMutation<Organization, AxiosError<ErrorMessage>, Organization>({
      mutationFn: (organization) =>
        axios
          .post<Organization, AxiosResponse<Organization>>('/organizations', cleanObject(organization))
          .then((res) => res.data),
      onSuccess,
    })
  },

  async verifyToken() {
    return axios
      .post<undefined, AxiosResponse<VerifyEndpointResponse>>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`)
      .then(({ data }) => {
        if (data.user?._id)
          return {
            isTokenVerified: true,
            user: data.user,
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
