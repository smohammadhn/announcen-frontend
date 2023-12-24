'use client'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { formatToUiDate } from '@/lib/utils'
import announcementService from '@/services/announcementService'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import './page.scss'

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

function DetailsSection({ item }: { item: AnnouncementBackend }) {
  const maritalStatusText = {
    married: 'Married to',
    widow: 'Widow of',
    widower: 'Widower of',
    partner: 'Partner of',
  }

  // methods
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
            Born in {item.placeOfBirth} on {formatToUiDate(item.dateOfBirth)}
          </span>
          <span>
            Deceased at {item.placeOfDeath} on {item.dateOfDeath} aged {getPersonAge()}
          </span>

          {item.maritalStatus && item.maritalStatus !== 'single' && (
            <span>
              {maritalStatusText[item.maritalStatus]} {item.partnerName}
            </span>
          )}
        </div>
      </div>

      {/* obituary */}
      <h2 className="heading">Obituary notice</h2>

      <section className="section ca-form5 small" dangerouslySetInnerHTML={{ __html: item.obituary || '' }} />
      {/* --- */}

      {/* buttons */}
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
      {/* --- */}

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
