'use client'

import './page.scss'

import { useState } from 'react'
import CardAnnouncement from '@/components/cards/CardAnnouncement'
import { Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type SortingKeys = 'announceDate' | 'eventDate' | 'name'

export default function Dashboard() {
  const querySorting = useSearchParams().get('sorting')
  const searchParams = useSearchParams()

  const [announcements, setAnnouncements] = useState(Array.from({ length: 9 }))

  const getNewUrlQueryObject = (key: SortingKeys) => {
    let query: DashboardUrlQuery = {}
    for (const [k, v] of searchParams.entries()) query[k] = v
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
            Sort by announcement date
          </Link>
        </li>
        <li className={querySorting === 'eventDate' ? 'selected' : ''}>
          <Link
            href={{
              query: getNewUrlQueryObject('eventDate'),
            }}
          >
            <Filter />
            Sort by event date
          </Link>
        </li>
        <li className={querySorting === 'name' ? 'selected' : ''}>
          <Link
            href={{
              query: getNewUrlQueryObject('name'),
            }}
          >
            <Filter />
            Sort by name
          </Link>
        </li>
      </ul>

      <ul className="dashboard-grid">
        {announcements.map((item, index) => (
          <li key={index}>
            <CardAnnouncement />
          </li>
        ))}
      </ul>
    </>
  )
}
