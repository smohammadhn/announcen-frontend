'use client'

import { Button } from '@/components/ui/button'
import announcementService from '@/services/announcementService'

export default function Home() {
  const { data, isLoading, error, refetch } = announcementService.read()

  const fetchData = () => {
    refetch()
  }

  return (
    <main>
      <Button onClick={fetchData}>landing page</Button>
    </main>
  )
}
