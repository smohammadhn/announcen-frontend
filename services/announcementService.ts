/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AnnouncementListQueryParams } from '@/app/(layoutDefault)/dashboard/page'

const announcementService = {
  read(searchParams: AnnouncementListQueryParams | undefined) {
    return useQuery<AnnouncementBackend[], AxiosError<ErrorMessage>>({
      queryKey: ['announcements', searchParams?.type || 'all', searchParams?.sorting || 'all'],
      queryFn: () =>
        axios.get<AnnouncementBackend[]>('/announcements', { params: searchParams }).then((res) => res.data),
    })
  },

  details(announcementId: string) {
    return useQuery<AnnouncementBackend, AxiosError<ErrorMessage>>({
      queryKey: ['announcements', announcementId],
      queryFn: () => axios.get<AnnouncementBackend>(`/announcements/${announcementId}`).then((res) => res.data),
    })
  },

  create(onSuccess?: () => void) {
    return useMutation<AnnouncementFrontend, AxiosError<ErrorMessage>, AnnouncementFrontend>({
      mutationFn: (payload) => axios.post<AnnouncementFrontend>('/announcements', payload).then((res) => res.data),
      onSuccess,
    })
  },
}

export default announcementService
