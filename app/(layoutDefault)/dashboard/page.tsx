'use client'

import './page.scss'

import CardAnnouncement from '@/components/cards/CardAnnouncement'
import { Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import announcementService from '@/services/announcementService'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

type SortingKeys = 'announceDate' | 'eventDate' | 'name'

export interface AnnouncementListQueryParams {
  type?: 'death' | 'birth' | 'wedding'
  sorting?: 'announceDate' | 'eventDate' | 'name'
}

interface Props {
  searchParams: AnnouncementListQueryParams
}

export default function Dashboard({ searchParams }: Props) {
  const querySorting = searchParams.sorting

  const { data: announcements, isLoading } = announcementService.readAll(searchParams)

  // methods
  const getNewUrlQueryObject = (key: SortingKeys) => {
    let query: DashboardUrlQuery = {}
    for (const [k, v] of Object.entries(searchParams)) query[k] = v
    return (query = Object.assign(query, { sorting: key }))
  }

  return (
    <>
      <ul className="dashboard-sorting">
        <li className={querySorting === 'announceDate' ? 'selected' : ''}>
          <Link
            href={{
              query: getNewUrlQueryObject('announceDate'),
            }}
          >
            <Filter />
            <span>Sort by</span>
            announcement date
          </Link>
        </li>
        <li className={querySorting === 'eventDate' ? 'selected' : ''}>
          <Link
            href={{
              query: getNewUrlQueryObject('eventDate'),
            }}
          >
            <Filter />
            <span>Sort by</span>
            event date
          </Link>
        </li>
        <li className={querySorting === 'name' ? 'selected' : ''}>
          <Link
            href={{
              query: getNewUrlQueryObject('name'),
            }}
          >
            <Filter />
            <span>Sort by</span>
            name
          </Link>
        </li>
      </ul>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Array.isArray(announcements) && announcements.length > 0 ? (
            <ul className="dashboard-grid">
              {announcements.map((item) => (
                <li key={item._id}>
                  <CardAnnouncement item={item} />
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
