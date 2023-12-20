import './index.scss'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'

interface Props {
  item: AnnouncementFrontend
}

export default function CardAnnouncement({ item }: Props) {
  return (
    <div className="card-announcement">
      <Image
        className="card-announcement__image"
        src="/images/placeholder-avatar.jpg"
        width={100}
        height={100}
        alt="website logo"
      />

      <h3 className="card-announcement__title">{`${item.firstName} ${item.lastName}`}</h3>
      <p className="card-announcement__subtitle">From: {item.city}</p>
      <p className="card-announcement__subtitle">{`${item.dateOfBirth} - ${item.dateOfDeath}`}</p>

      <div className="card-announcement__actions">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/dashboard/announcements/${item._id}`}>Open</Link>
        </Button>
        <Button variant="secondary" className="w-full">
          Donate
        </Button>
        <Button variant="secondary" className="w-full">
          Burn a candle
        </Button>
        <Button variant="secondary" className="w-full">
          Send card
        </Button>
        <Button variant="secondary" className="w-full">
          Send testimony
        </Button>
        <Button variant="secondary" className="w-full">
          Send flowers
        </Button>
      </div>
    </div>
  )
}
