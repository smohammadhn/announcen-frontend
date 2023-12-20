/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AnnouncementObject } from '@/app/(layoutDefault)/dashboard/create-announcement/page'
import { AxiosError } from 'axios'

const announcementService = {
  read() {
    return useQuery<AnnouncementObject[], AxiosError<ErrorMessage>>({
      queryKey: ['announcements'],
      queryFn: () => axios.get<AnnouncementObject[]>('/announcements').then((res) => res.data),
    })
  },

  create(onSuccess?: () => void) {
    return useMutation<AnnouncementObject, AxiosError<ErrorMessage>, AnnouncementObject>({
      mutationFn: (payload) => axios.post<AnnouncementObject>('/announcements', payload).then((res) => res.data),
      onSuccess,
    })
  },
}

export default announcementService
