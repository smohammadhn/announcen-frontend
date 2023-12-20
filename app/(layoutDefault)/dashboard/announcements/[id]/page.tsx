'use client'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import announcementService from '@/services/announcementService'

interface Props {
  params: { id: string }
}

export default function AnnouncementDetails({ params }: Props) {
  const { data: item, isLoading } = announcementService.details(params.id)

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {item && item._id ? (
            <DetailsSection />
          ) : (
            <p className="no-content">No Announcement found with the given id ...!</p>
          )}
        </>
      )}
    </>
  )
}

function DetailsSection() {
  return <div>fdfd</div>
}
