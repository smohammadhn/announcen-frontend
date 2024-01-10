'use client'

import './page.scss'

import CardAnnouncement from '@/components/cards/CardAnnouncement'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import announcementService from '@/services/announcementService'

export default function myAnnouncements() {
  const { data: announcements, isLoading } = announcementService.readOwn()

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Array.isArray(announcements) && announcements.length > 0 ? (
            <ul className="dashboard-grid">
              {announcements.map((item) => (
                <li key={item._id}>
                  <CardAnnouncement item={item} own />
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-content">No announcement has been created so far.</p>
          )}
        </>
      )}
    </>
  )
}
