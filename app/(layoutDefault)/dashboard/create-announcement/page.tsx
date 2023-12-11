'use client'

import './page.scss'

import { useState } from 'react'
import Stepper from '@/components/ui/Stepper'
import CreateAnnouncementForm1 from '@/components/forms/CreateAnnouncementForm1'
import { Button } from '@/components/ui/button'

export default function CreateAnnouncement() {
  const [announcementObject, setAnnouncementObject] = useState({})
  const [stepperValue, setStepperValue] = useState(1)

  // const onFinishForm = (formPayload, isFinalForm = false) => {
  //   setAnnouncementObject((item) => {
  //     return Object.assign(item, formPayload)
  //   })

  //   if (isFinalForm) {
  //     console.log(announcementObject)
  //   } else {
  //     setStepperValue((prev) => prev + 1)
  //   }
  // }

  const forms = [
    <CreateAnnouncementForm1 key="1" />,
    <CreateAnnouncementForm1 key="2" />,
    <CreateAnnouncementForm1 key="3" />,
    <CreateAnnouncementForm1 key="4" />,
    <CreateAnnouncementForm1 key="5" />,
  ]

  const handleAction = (direction: 'next' | 'back') => {
    if (direction === 'back') {
      if (stepperValue === 1) return
      setStepperValue((prev) => prev - 1)
    }
    if (direction === 'next') {
      if (stepperValue > forms.length - 1) return
      setStepperValue((prev) => prev + 1)
    }
  }

  return (
    <section className="create-ann">
      <Stepper value={stepperValue} />

      <div className="create-ann__form">{forms[stepperValue]}</div>

      <div className="create-ann__actions">
        <Button
          variant={'default'}
          disabled={stepperValue === 1}
          onClick={() => handleAction('back')}
        >
          Back
        </Button>
        <Button onClick={() => handleAction('next')}>Next</Button>
      </div>
    </section>
  )
}
