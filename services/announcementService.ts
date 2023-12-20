/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AnnouncementObject } from '@/app/(layoutDefault)/dashboard/create-announcement/page'
import { AxiosError } from 'axios'
import { AnnouncementListQueryParams } from '@/app/(layoutDefault)/dashboard/page'

const announcementService = {
  read(searchParams: AnnouncementListQueryParams | undefined) {
    return useQuery<AnnouncementObject[], AxiosError<ErrorMessage>>({
      queryKey: ['announcements', searchParams?.type || 'all', searchParams?.sorting || 'all'],
      queryFn: () =>
        axios.get<AnnouncementObject[]>('/announcements', { params: searchParams }).then((res) => res.data),
    })
  },

  details(announcementId: string) {
    return useQuery<AnnouncementObject, AxiosError<ErrorMessage>>({
      queryKey: ['announcements', announcementId],
      queryFn: () => axios.get<AnnouncementObject>(`/announcements/${announcementId}`).then((res) => res.data),
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
