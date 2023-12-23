'use client'
import './index.scss'

import { DATE_FORMAT } from '@/constants/core'
import { cn, formatToUiDate } from '@/lib/utils'
import moment from 'moment'

interface Props {
  announcementObject?: AnnouncementFrontend | AnnouncementBackend
  variant?: string
  manualEditMode?: boolean
}

export default function CreateAnnouncementForm1({
  announcementObject: ann,
  variant = undefined,
  manualEditMode = false,
}: Props) {
  return (
    <section className={cn('ca-form5', variant)}>
      <p>In love and gratitude, we share the news of the death of our beloved {ann?.familyRoles?.join(', ')}</p>
      <br />
      <p className="font-bold text-lg">{`${ann?.firstName} ${ann?.lastName}`}</p>
      <p>{`${formatToUiDate(ann?.dateOfBirth)} - ${formatToUiDate(ann?.dateOfDeath)}`}</p>
      <br />
      <p>Widower of {ann?.partnerName}</p>
      <p>
        The funeral takes place on {formatToUiDate(ann?.serviceDate)} at {ann?.funeralTime} o&apos;clock at the cemetery
        in {ann?.funeralPlace}, followed by a ceremony in the {ann?.servicePlace}{' '}
      </p>
      <br />
      <p>
        Mourning:
        <br />
        {ann?.relatives?.map((e) => (
          <div key={e.name}>{`${e?.name} a ${e?.partnerName}`}</div>
        ))}
      </p>
      <br />

      <p>
        {ann?.relatives?.map((e) => e.city).join(', ')} on the {formatToUiDate(ann?.serviceDate)}
      </p>
      <br />

      <p>{ann?.specialThanks}</p>
    </section>
  )
}
