'use client'

import './page.scss'

import { useState } from 'react'
import CardAnnouncement from '@/components/cards/CardAnnouncement'

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState(Array.from({ length: 9 }))

  return (
    <>
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
