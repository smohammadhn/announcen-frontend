'use client'

import { DATE_FORMAT } from '@/constants/core'
import moment from 'moment'
import { RefObject, useEffect, useRef, useState } from 'react'
import './page.scss'

import Stepper from '@/components/ui/Stepper'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import CreateAnnouncementForm1 from '@/components/forms/CreateAnnouncementForm1'
import CreateAnnouncementForm2 from '@/components/forms/CreateAnnouncementForm2'
import CreateAnnouncementForm3 from '@/components/forms/CreateAnnouncementForm3'
import CreateAnnouncementForm4 from '@/components/forms/CreateAnnouncementForm4'
import CreateAnnouncementForm5 from '@/components/forms/CreateAnnouncementForm5'
import CreateAnnouncementFormTemplate from '@/components/forms/CreateAnnouncementFormTemplate'

import announcementService from '@/services/announcementService'
import { useRouter } from 'next/navigation'

interface FormRef {
  submit: (onValid: (values: AnnouncementFrontend) => void, onInvalid: () => void) => void
}

interface FormElement extends Element {
  ref: RefObject<FormRef>
}

export default function CreateAnnouncement() {
  const router = useRouter()
  const annService = announcementService.create(() => {
    toast({
      title: 'Announcement Created Successfully!',
    })
    router.push('/dashboard')
  })

  // data
  const [announcementObject, setAnnouncementObject] = useState<AnnouncementFrontend>({})
  const [stepperValue, setStepperValue] = useState(1)
  const [isLastForm, setIsLastForm] = useState(false)
  const [manualEditMode, setManualEditMode] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(1)

  // refs
  const refForm1 = useRef<FormRef>(null)
  const refForm2 = useRef<FormRef>(null)
  const refForm3 = useRef<FormRef>(null)
  const refForm4 = useRef<FormRef>(null)
  const refForm5 = useRef<FormRef>(null)

  // hooks
  useEffect(() => {
    setIsLastForm(stepperValue === forms.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepperValue])

  // methods
  const handleTemplateSelect = (selectedTemplateId: number) => {
    if (selectedTemplateId === -1) setManualEditMode(true)
    setSelectedTemplate(selectedTemplateId)
  }

  const onFormInvalid = () => {
    toast({ title: 'Please fill in the form correcly!', variant: 'destructive' })
  }

  const onFormValid = (incomingData?: AnnouncementFrontend, mode?: 'preview') => {
    // update announcement object
    if (incomingData)
      setAnnouncementObject((item) => {
        const announcementObjectCopy = { ...item }
        return Object.assign(announcementObjectCopy, incomingData)
      })

    // jump to preview form
    if (mode === 'preview') return setStepperValue(forms.length)

    // go to next form
    if (!isLastForm) return setStepperValue((prev) => prev + 1)

    // send data to the backend
    const dateFields: (keyof AnnouncementFrontend)[] = ['dateOfBirth', 'dateOfDeath', 'serviceDate']
    dateFields.forEach((e) => {
      const dateValue = announcementObject[e] as Date | undefined

      if (dateValue && typeof announcementObject[e] !== 'undefined') {
        // fuck you typescript
        announcementObject[e] = moment(dateValue).format(DATE_FORMAT) as any
      }
    })

    annService.mutate(announcementObject)
  }

  const submitForm = (mode?: 'preview') => {
    // last form + click on preview button
    if (isLastForm && mode === 'preview') return setManualEditMode((p) => !p)

    // preview form
    if (stepperValue === 2) onFormValid()

    // normal senario
    const announcementForm = forms[stepperValue - 1] as unknown as FormElement
    announcementForm.ref?.current?.submit((data) => onFormValid(data, mode), onFormInvalid)
  }

  // forms
  const forms = [
    <CreateAnnouncementForm1 ref={refForm1} announcementObject={announcementObject} key="ann-type" />,
    <CreateAnnouncementFormTemplate
      onSelectTemplate={handleTemplateSelect}
      selectedTemplate={selectedTemplate}
      key="ann-template"
    />,
    <CreateAnnouncementForm2 ref={refForm2} announcementObject={announcementObject} key="detail-defunct" />,
    <CreateAnnouncementForm3 ref={refForm3} announcementObject={announcementObject} key="detail-funeral" />,
    <CreateAnnouncementForm4 ref={refForm4} announcementObject={announcementObject} key="detail-family" />,
    <CreateAnnouncementForm5
      ref={refForm5}
      template={selectedTemplate}
      announcementObject={announcementObject}
      manualEditMode={manualEditMode}
      key="ann-preview"
    />,
  ]

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

        {stepperValue >= 2 && (
          <Button className="rounded-full " variant={'outline'} onClick={() => submitForm('preview')}>
            {isLastForm ? 'Edit Manually' : 'Preview'}
          </Button>
        )}

        <Button className="rounded-full" onClick={() => submitForm()}>
          {isLastForm ? 'Create' : 'Next'}
        </Button>
      </div>
    </section>
  )
}
