'use client'

import './page.scss'
import moment from 'moment'
import { RefObject, useEffect, useRef, useState } from 'react'
import { DATE_FORMAT } from '@/constants/core'

import Stepper from '@/components/ui/Stepper'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import CreateAnnouncementForm1, { IForm1 } from '@/components/forms/CreateAnnouncementForm1'
import CreateAnnouncementForm2, { IForm2 } from '@/components/forms/CreateAnnouncementForm2'
import CreateAnnouncementForm3, { IForm3 } from '@/components/forms/CreateAnnouncementForm3'
import CreateAnnouncementForm4, { IForm4 } from '@/components/forms/CreateAnnouncementForm4'
import CreateAnnouncementForm5 from '@/components/forms/CreateAnnouncementForm5'

export type AnnouncementObject = Partial<IForm1 & IForm2 & IForm3 & IForm4 & {}>

interface FormRef {
  submit: (onValid: (values: AnnouncementObject) => void, onInvalid: () => void) => void
}

interface FormElement extends Element {
  ref: RefObject<FormRef>
}

export default function CreateAnnouncement() {
  // data
  const [announcementObject, setAnnouncementObject] = useState<AnnouncementObject>({})
  const [stepperValue, setStepperValue] = useState(1)
  const [isLastForm, setIsLastForm] = useState(false)

  // refs
  const refForm1 = useRef<FormRef>(null)
  const refForm2 = useRef<FormRef>(null)
  const refForm3 = useRef<FormRef>(null)
  const refForm4 = useRef<FormRef>(null)

  // forms
  const forms = [
    <CreateAnnouncementForm1 announcementObject={announcementObject} ref={refForm1} key="ann-type" />,
    <CreateAnnouncementForm2 announcementObject={announcementObject} ref={refForm2} key="detail-defunct" />,
    <CreateAnnouncementForm3 announcementObject={announcementObject} ref={refForm3} key="detail-funeral" />,
    <CreateAnnouncementForm4 announcementObject={announcementObject} ref={refForm4} key="detail-family" />,
    <CreateAnnouncementForm5 announcementObject={announcementObject} key="ann-preview" />,
  ]

  // hooks
  useEffect(() => {
    setIsLastForm(stepperValue === forms.length)
  }, [stepperValue])

  // methods
  const onFormInvalid = () => {
    toast({
      title: 'Please fill in the form correcly!',
      variant: 'destructive',
    })
  }

  const onFormValid = (incomingData: AnnouncementObject) => {
    setAnnouncementObject((item) => {
      const announcementObjectCopy = { ...item }
      return Object.assign(announcementObjectCopy, incomingData)
    })

    // next form
    setStepperValue((prev) => prev + 1)
  }

  const submitForm = () => {
    if (stepperValue === forms.length) {
      // send the payload to the backend
      console.log('final backend payload :>> ', announcementObject)
      return
    }

    const announcementForm = forms[stepperValue - 1] as unknown as FormElement

    announcementForm.ref.current?.submit(onFormValid, onFormInvalid)
  }

  return (
    <section className="create-ann">
      <Stepper value={stepperValue} />

      <div className="create-ann__form">{forms[stepperValue - 1]}</div>

      <div className="create-ann__actions">
        <Button
          className="rounded-full"
          disabled={stepperValue === 1}
          onClick={() => {
            if (stepperValue !== 1) setStepperValue((prev) => prev - 1)
          }}
        >
          Back
        </Button>
        <Button className="rounded-full" onClick={submitForm}>
          {isLastForm ? 'Create' : 'Next'}
        </Button>
      </div>
    </section>
  )
}
