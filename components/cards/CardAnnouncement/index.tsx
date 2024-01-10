import { Button } from '@/components/ui/button'
import './index.scss'

import Image from 'next/image'
import Link from 'next/link'
import { PenBox } from 'lucide-react'

interface Props {
  item: AnnouncementBackend
  own?: boolean
}

export default function CardAnnouncement({ item, own = false }: Props) {
  return (
    <div className="card-announcement">
      <Link className="card-announcement__image" href={`/dashboard/announcements/${item._id}`}>
        <Image src="/images/placeholder-avatar.jpg" width={100} height={100} alt="website logo" />
      </Link>

      <div className="card-announcement__title">
        <h3>{`${item.firstName} ${item.lastName}`}</h3>
        {own && (
          <Button title="Edit" size={'icon'} className="rounded-full">
            <Link href={`/dashboard/announcements/${item._id}/edit`}>
              <PenBox size={18} />
            </Link>
          </Button>
        )}
      </div>

      <p className="card-announcement__subtitle">From: {item.city?.name}</p>
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
