'use client'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import announcementService from '@/services/announcementService'
import './page.scss'

import { FormElement, FormRef } from '@/app/(layoutDefault)/dashboard/create-announcement/page'
import { DialogDeleteAnnouncement } from '@/components/dialogs/DialogDeleteAnnouncement'
import CreateAnnouncementForm1 from '@/components/forms/CreateAnnouncementForm1'
import CreateAnnouncementForm2 from '@/components/forms/CreateAnnouncementForm2'
import CreateAnnouncementForm3 from '@/components/forms/CreateAnnouncementForm3'
import CreateAnnouncementForm4 from '@/components/forms/CreateAnnouncementForm4'
import CreateAnnouncementForm5 from '@/components/forms/CreateAnnouncementForm5'
import { toast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import moment from 'moment'
import { DATE_FORMAT } from '@/constants/core'
import { FieldErrors } from 'react-hook-form'

interface Props {
  params: { id: string }
}

export default function AnnouncementDetails({ params }: Props) {
  const { data: item, isLoading } = announcementService.details(params.id)

  return (
    <div className="ann-details-edit">
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
  const queryClient = useQueryClient()
  const router = useRouter()

  const removeAnnouncement = announcementService.remove(item._id!, async () => {
    toast({ title: 'Announcement deleted successfully!' })
    queryClient.removeQueries({ queryKey: ['announcements', item._id] })
    await queryClient.invalidateQueries({ queryKey: ['announcements'] })
    router.replace('/dashboard')
  })

  const editAnnouncement = announcementService.update(item._id!, async () => {
    toast({ title: 'Announcement Edited successfully!' })
    await queryClient.invalidateQueries({ queryKey: ['announcements'] })
    router.replace('/dashboard')
  })

  // refs
  const refForm1 = useRef<FormRef>(null)
  const refForm2 = useRef<FormRef>(null)
  const refForm3 = useRef<FormRef>(null)
  const refForm4 = useRef<FormRef>(null)
  const refForm5 = useRef<FormRef>(null)

  // forms
  const forms = [
    <CreateAnnouncementForm1 ref={refForm1} announcementObject={item} key="ann-type" dense />,
    <CreateAnnouncementForm2 ref={refForm2} announcementObject={item} key="detail-defunct" dense />,
    <CreateAnnouncementForm3 ref={refForm3} announcementObject={item} key="detail-funeral" dense />,
    <CreateAnnouncementForm4 ref={refForm4} announcementObject={item} key="detail-family" dense />,
    <CreateAnnouncementForm5 ref={refForm5} announcementObject={item} manualEditMode={true} key="ann-preview" dense />,
  ] as FormElement[]

  const handleDeleteAnnouncement = () => {
    removeAnnouncement.mutate()
  }

  const handleEditAnnouncement = () => {
    let announcementObject: AnnouncementFrontend = {}
    let isFormValid = true

    let promise = new Promise((resolve) => {
      let formCount = 0

      forms.forEach((announcementForm, i) => {
        announcementForm.ref?.current?.submit(
          (incomingData) => {
            // when form valid
            if (incomingData) announcementObject = Object.assign(announcementObject, { ...incomingData })

            if (formCount === forms.length - 1) resolve(true)
            else formCount++
          },
          (message) => {
            // when form invalid
            const title = typeof message === 'string' ? message : 'Please fill in the form correcly!'
            toast({ title, variant: 'destructive' })
            isFormValid = false
          }
        )
      })
    })

    promise.then(() => {
      if (!isFormValid) return

      // send data to the backend
      const dateFields: (keyof AnnouncementFrontend)[] = ['dateOfBirth', 'dateOfDeath', 'serviceDate']
      dateFields.forEach((e) => {
        const dateValue = announcementObject[e] as Date | undefined

        if (dateValue && typeof announcementObject[e] !== 'undefined')
          announcementObject[e] = moment(dateValue).format(DATE_FORMAT) as any
      })

      editAnnouncement.mutate(announcementObject)
    })
  }

  return (
    <>
      <h1 className="header">Edit Announcement</h1>

      {/* <h2 className="heading">Announcement Type</h2> */}
      <section className="section">{forms[0]}</section>

      {/* <h2 className="heading">Details about the defunct</h2> */}
      <section className="section">{forms[1]}</section>

      {/* <h2 className="heading">Service & Funeral</h2> */}
      <section className="section">{forms[2]}</section>

      {/* <h2 className="heading">Family / Special thanks / Non-profits</h2> */}
      <section className="section">{forms[3]}</section>

      {/* <h2 className="heading">Form 1</h2> */}
      <section className="section">{forms[4]}</section>

      <section className="actions">
        <DialogDeleteAnnouncement onConfirm={handleDeleteAnnouncement}>
          <Button loading={removeAnnouncement.isPending} variant={'destructive'} className="rounded-full">
            Remove Item
          </Button>
        </DialogDeleteAnnouncement>

        <Button loading={editAnnouncement.isPending} className="rounded-full" onClick={handleEditAnnouncement}>
          Apply changes
        </Button>
      </section>

      {/* dialogs */}
    </>
  )
}
