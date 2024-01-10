/* eslint-disable react-hooks/rules-of-hooks */

import { Organization } from '@/app/(layoutBlank)/register/organization/page'
import axios from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface ICity {
  municipality: string
  name: string
  id: number
}

const generalService = {
  read() {
    return useQuery<ICity[], AxiosError<ErrorMessage>>({
      queryKey: ['cities'],
      queryFn: () => axios.get<ICity[]>('/cities').then((res) => res.data),
    })
  },

  getAllOrganizations() {
    return useQuery<Organization[], AxiosError<ErrorMessage>>({
      queryKey: ['organizations'],
      queryFn: () => axios.get<Organization[]>('/organizations').then((res) => res.data),
    })
  },
}

export default generalService
