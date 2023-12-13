'use client'

import './page.scss'

import { useState } from 'react'
import Stepper from '@/components/ui/Stepper'
import CreateAnnouncementForm1 from '@/components/forms/CreateAnnouncementForm1'
import CreateAnnouncementForm2 from '@/components/forms/CreateAnnouncementForm2'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { IForm1 } from '@/components/forms/CreateAnnouncementForm1'
import { IForm2 } from '@/components/forms/CreateAnnouncementForm2'

type AnnouncementObject = IForm1 | IForm2

export default function CreateAnnouncement() {
  const [announcementObject, setAnnouncementObject] = useState({})
  const [stepperValue, setStepperValue] = useState(1)
  const [formInvalid, setFormInvalid] = useState(true)

  const onFormSuccess = (incomingData: AnnouncementObject) => {
    console.log('incomingData :>> ', incomingData)
    setFormInvalid(false)

    setAnnouncementObject((item) => {
      const announcementObjectCopy = { ...item }
      return Object.assign(announcementObjectCopy, incomingData)
    })
  }

  const forms = [
    <CreateAnnouncementForm1
      key="form-type"
      onSubmit={onFormSuccess}
      onError={() => setFormInvalid(true)}
    />,
    <CreateAnnouncementForm2
      key="detail-defunct"
      onSubmit={onFormSuccess}
      onError={() => setFormInvalid(true)}
    />,
    <CreateAnnouncementForm1 key="3" />,
    <CreateAnnouncementForm1 key="4" />,
    <CreateAnnouncementForm1 key="5" />,
  ]

  const handleAction = (direction: 'next' | 'back') => {
    if (formInvalid) {
      toast({
        title: 'Please fill in the form correcly!',
        variant: 'destructive',
      })
      return
    }

    console.log('announcementObject :>> ', announcementObject)

    if (direction === 'back') {
      if (stepperValue === 1) return
      setStepperValue((prev) => prev - 1)
    }
    if (direction === 'next') {
      if (stepperValue > forms.length - 1) {
        // send the payload to the backend
        return
      }

      // next form
      setStepperValue((prev) => prev + 1)
    }
  }

  return (
    <section className="create-ann">
      <Stepper value={stepperValue} />

      <div className="create-ann__form">{forms[stepperValue - 1]}</div>

      <div className="create-ann__actions">
        <Button
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
