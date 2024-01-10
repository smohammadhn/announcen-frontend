/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { AnnouncementListQueryParams } from '@/app/(layoutDefault)/dashboard/page'
import { cleanObject } from '@/lib/utils'

const announcementService = {
  readAll(searchParams: AnnouncementListQueryParams | undefined) {
    return useQuery<AnnouncementBackend[], AxiosError<ErrorMessage>>({
      queryKey: ['announcements', searchParams?.type || 'all', searchParams?.sorting || 'all'],
      queryFn: () =>
        axios.get<AnnouncementBackend[]>('/announcements', { params: searchParams }).then((res) => res.data),
    })
  },

  readOwn() {
    return useQuery<AnnouncementBackend[], AxiosError<ErrorMessage>>({
      queryKey: ['myAnnouncements'],
      queryFn: () => axios.get<AnnouncementBackend[]>('/announcements/own').then((res) => res.data),
    })
  },

  details(announcementId: string) {
    return useQuery<AnnouncementBackend, AxiosError<ErrorMessage>>({
      queryKey: ['announcements', announcementId],
      queryFn: () => axios.get<AnnouncementBackend>(`/announcements/${announcementId}`).then((res) => res.data),
    })
  },

  update(announcementId: string, onSuccess?: () => void) {
    return useMutation<AnnouncementBackend, AxiosError<ErrorMessage>, AnnouncementFrontend>({
      mutationFn: (payload) =>
        axios
          .put<AnnouncementFrontend, AxiosResponse<AnnouncementBackend>>(
            `/announcements/${announcementId}`,
            cleanObject(payload)
          )
          .then((res) => res.data),
      onSuccess,
    })
  },

  remove(announcementId: string, onSuccess?: () => void) {
    return useMutation({
      mutationFn: () => axios.delete<AnnouncementFrontend>(`/announcements/${announcementId}`).then((res) => res.data),
      onSuccess,
    })
  },

  create(onSuccess?: () => void) {
    return useMutation<AnnouncementFrontend, AxiosError<ErrorMessage>, AnnouncementFrontend>({
      mutationFn: (payload) =>
        axios.post<AnnouncementFrontend>('/announcements', cleanObject(payload)).then((res) => res.data),
      onSuccess,
    })
  },
}

export default announcementService
