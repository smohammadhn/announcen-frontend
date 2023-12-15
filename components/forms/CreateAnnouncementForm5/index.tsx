'use client'
import './index.scss'

import { forwardRef } from 'react'
import { AnnouncementObject } from '@/app/(layoutDefault)/dashboard/create-announcement/page'
import moment from 'moment'
import { DATE_FORMAT } from '@/constants/core'

interface Props {
  announcementObject?: AnnouncementObject
}

export default function CreateAnnouncementForm1({ announcementObject: ann }: Props) {
  return (
    <section className="ca-form5">
      <p>In love and gratitude, we share the news of the death of our beloved {ann?.familyRoles?.join(', ')}</p>
      <br />
      <p className="font-bold text-lg">{`${ann?.firstName} ${ann?.lastName}`}</p>
      <p>{`${moment(ann?.dateOfBirth).format(DATE_FORMAT)} ${moment(ann?.dateOfDeath).format(DATE_FORMAT)}`}</p>
      <br />
      <p>Widower of {ann?.partnerName}</p>
      <p>
        The funeral takes place on {ann?.serviceDate} at {ann?.funeralTime} o&apos;clock at the cemetery in{' '}
        {ann?.funeralPlace}, followed by a ceremony in the {ann?.servicePlace}{' '}
      </p>
      <br />
      <p>
        Mourning:
        <br />
        {ann?.relatives?.map((e) => (
          <p key={e.name}>{`${e?.name} a ${e?.partnerName}`}</p>
        ))}
      </p>
      <br />

      <p>
        {ann?.nonProfits?.map((e) => e.name).join(', ')} on the {ann?.serviceDate}
      </p>
      <br />

      <p>{ann?.specialThanks}</p>
    </section>
  )
}
