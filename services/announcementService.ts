/* eslint-disable react-hooks/rules-of-hooks */

import axios from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

interface Announcement {
  name: string
}

const announcementService = {
  read() {
    return useQuery<Announcement[], Error>({
      queryKey: ['announcements'],
      queryFn: () =>
        axios.get<Announcement[]>('/announcements').then((res) => res.data),
    })
  },
}

export default announcementService
