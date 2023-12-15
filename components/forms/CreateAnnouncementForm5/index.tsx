'use client'
import './index.scss'

import { forwardRef } from 'react'
import { AnnouncementObject } from '@/app/(layoutDefault)/dashboard/create-announcement/page'

interface Props {
  announcementObject?: AnnouncementObject
}

export default forwardRef(function CreateAnnouncementForm1({ announcementObject }: Props, ref) {
  console.log(announcementObject)

  return <div></div>
})
