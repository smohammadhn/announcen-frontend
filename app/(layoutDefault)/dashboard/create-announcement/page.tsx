'use client'

import './page.scss'

import moment from 'moment'

import { RefObject, useRef, useState } from 'react'

import Stepper from '@/components/ui/Stepper'
import CreateAnnouncementForm1 from '@/components/forms/CreateAnnouncementForm1'
import CreateAnnouncementForm2 from '@/components/forms/CreateAnnouncementForm2'
import CreateAnnouncementForm3 from '@/components/forms/CreateAnnouncementForm3'
import { IForm1 } from '@/components/forms/CreateAnnouncementForm1'
import { IForm2 } from '@/components/forms/CreateAnnouncementForm2'
import { IForm3 } from '@/components/forms/CreateAnnouncementForm3'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { DATE_FORMAT } from '@/constants/core'

type AnnouncementObject = Partial<IForm1 & IForm2 & IForm3 & {}>

interface FormRef {
  submit: (
    onValid: (values: AnnouncementObject) => void,
    onInvalid: () => void
  ) => void
}

interface FormElement extends Element {
  ref: RefObject<FormRef>
}

export default function CreateAnnouncement() {
  // data
  const [announcementObject, setAnnouncementObject] =
    useState<AnnouncementObject>({})
  const [stepperValue, setStepperValue] = useState(1)

  // refs
  const refForm1 = useRef<FormRef>(null)
  const refForm2 = useRef<FormRef>(null)
  const refForm3 = useRef<FormRef>(null)
  const refForm4 = useRef<FormRef>(null)
  const refForm5 = useRef<FormRef>(null)

  // forms
  const forms = [
    <CreateAnnouncementForm1
      announcementObject={announcementObject}
      ref={refForm1}
      key="form-type"
    />,
    <CreateAnnouncementForm2
      announcementObject={announcementObject}
      ref={refForm2}
      key="detail-defunct"
    />,
    <CreateAnnouncementForm3
      announcementObject={announcementObject}
      ref={refForm3}
      key="detail-funeral"
    />,
    <CreateAnnouncementForm1 ref={refForm1} key="form-type3" />,
    <CreateAnnouncementForm1 ref={refForm1} key="form-type4" />,
  ]

  // methods
  const onFormInvalid = () => {
    toast({
      title: 'Please fill in the form correcly!',
      variant: 'destructive',
    })
  }

  const onFormValid = (incomingData: AnnouncementObject) => {
    console.log('ann object updated :>> ', incomingData)

    setAnnouncementObject((item) => {
      const announcementObjectCopy = { ...item }
      return Object.assign(announcementObjectCopy, incomingData)
    })

    if (stepperValue > forms.length - 1) {
      // send the payload to the backend
      return
    }

    // next form
    setStepperValue((prev) => prev + 1)
  }

  const submitForm = () => {
    const announcementForm = forms[stepperValue - 1] as unknown as FormElement

    announcementForm.ref.current?.submit(onFormValid, onFormInvalid)
  }

  return (
    <section className="create-ann">
      <Stepper value={stepperValue} />

      <div className="create-ann__form">{forms[stepperValue - 1]}</div>

      <div className="create-ann__actions">
        <Button
          disabled={stepperValue === 1}
          onClick={() => {
            if (stepperValue !== 1) setStepperValue((prev) => prev - 1)
          }}
        >
          Back
        </Button>
        <Button onClick={submitForm}>Next</Button>
      </div>
    </section>
  )
}
