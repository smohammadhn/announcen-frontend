'use client'

import './page.scss'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import announcementService from '@/services/announcementService'
import { AnnouncementObject } from '@/app/(layoutDefault)/dashboard/create-announcement/page'
import Image from 'next/image'
import moment from 'moment'
import CreateAnnouncementForm5 from '@/components/forms/CreateAnnouncementForm5'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

export default function AnnouncementDetails({ params }: Props) {
  const { data: item, isLoading } = announcementService.details(params.id)

  return (
    <div className="ann-details">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {item && item._id ? (
            <DetailsSection item={item} />
          ) : (
            <p className="no-content">No Announcement found with the given id ...!</p>
          )}
        </>
      )}
    </div>
  )
}

function DetailsSection({ item }: { item: AnnouncementObject }) {
  const getPersonAge = () => {
    return moment().diff(moment(item.dateOfBirth), 'years')
  }

  const getMapUrl = (address: string) => {
    const encodedQuery = address.split(' ').join('+')
    return `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`
  }

  return (
    <>
      <h1 className="header">{`${item.firstName} ${item.lastName}`}</h1>

      <div className="section section-info">
        <Image src="/images/placeholder-avatar.jpg" width={100} height={100} alt="user image" />

        <div>
          <span>Living in {item.city}</span>
          <span>
            Born in {item.placeOfBirth} on the {item.dateOfBirth as string}
          </span>
          <span>
            Deceased at {item.placeOfDeath} on the {item.dateOfDeath as string} aged {getPersonAge()}
          </span>
          <span>Widower of {item.partnerName}</span>
        </div>
      </div>

      <h2 className="heading">Obituary notice</h2>

      <div className="section">
        <CreateAnnouncementForm5 variant={'small'} announcementObject={item} />
      </div>

      <h2 className="heading">Interact</h2>

      <div className="section section-actions">
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

      <h2 className="heading">About</h2>

      <p className="section py-3">
        Here should figure a little explanation given by the different organisations themselves (max 150 words)
        <br />
        Site web: www.lih.lu
      </p>

      <h2 className="heading">The ceremony</h2>

      <div className="section section-location">
        <div className="date">
          <Image src="/icons/calendar-clock.png" alt="calendar icon" width={40} height={40} />
          {item.serviceDate} - {item.serviceTime}
        </div>
        <div className="location">
          <Image src="/icons/location.png" alt="location icon" width={40} height={40} />
          {item.servicePlace}
        </div>
        {item.servicePlace && (
          <Link href={getMapUrl(item.servicePlace)} target="_blank" className="map">
            <Image src="/icons/map-placeholder.png" alt="google map image" width={120} height={120} />
          </Link>
        )}
      </div>

      <h2 className="heading">The funeral</h2>

      <div className="section section-location">
        <div className="date">
          <Image src="/icons/calendar-clock.png" alt="calendar icon" width={40} height={40} />
          {item.serviceDate} - {item.funeralTime}
        </div>
        <div className="location">
          <Image src="/icons/location.png" alt="location icon" width={40} height={40} />
          {item.funeralPlace}
        </div>
        {item.funeralPlace && (
          <Link href={getMapUrl(item.funeralPlace)} target="_blank" className="map">
            <Image src="/icons/map-placeholder.png" alt="google map image" width={120} height={120} />
          </Link>
        )}
      </div>
    </>
  )
}