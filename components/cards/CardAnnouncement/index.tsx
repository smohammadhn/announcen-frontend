import './index.scss'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

export default function CardAnnouncement() {
  return (
    <div className="card-announcement">
      <Image
        className="card-announcement__image"
        src="/images/placeholder-avatar.jpg"
        width={100}
        height={100}
        alt="website logo"
      />

      <h3 className="card-announcement__title">Marguerite Back-Poos</h3>
      <p className="card-announcement__subtitle">From: Luxembourg</p>
      <p className="card-announcement__subtitle">12.08.1926 - 28.08.2023</p>

      <div className="card-announcement__actions">
        <Button variant="secondary" className="w-full">
          Open
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
