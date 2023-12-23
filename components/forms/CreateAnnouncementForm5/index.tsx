import './index.scss'

import { cn, formatToUiDate } from '@/lib/utils'
import RichTextEditor from '@/components/ui/rich-text-editor'
import { useEffect, useState } from 'react'
import obituaryTemplates from '@/constants/templates'

interface Props {
  announcementObject?: AnnouncementFrontend | AnnouncementBackend
  variant?: 'small' | undefined
  manualEditMode?: boolean
}

export default function CreateAnnouncementForm1({
  announcementObject: ann = {},
  variant = undefined,
  manualEditMode = false,
}: Props) {
  const [editorData, setEditorData] = useState(ann?.obituary || '')

  useEffect(() => {
    if (variant === 'small') return

    const obituaryTemplate = obituaryTemplates[0].data

    setEditorData(
      obituaryTemplate
        .replace(
          '{{relatives}}',
          ann.relatives?.map((e) => `<li>${e.name} a ${e.partnerName}</li>`).join('') || '{{relatives}}'
        )
        .replace('{{relativeCities}}', ann.relatives?.map((e) => e.city).join(', ') || '{{relativeCities}}')
        .replace('{{familyRoles}}', ann.familyRoles?.join(', ') || '{{familyRoles}}')
        .replace('{{firstName}}', ann.firstName || '{{firstName}}')
        .replace('{{lastName}}', ann.lastName || '{{lastName}}')
        .replace('{{partnerName}}', ann.partnerName || '{{partnerName}}')
        .replace('{{funeralTime}}', ann.funeralTime || '{{funeralTime}}')
        .replace('{{funeralPlace}}', ann.funeralPlace || '{{funeralPlace}}')
        .replace('{{servicePlace}}', ann.servicePlace || '{{servicePlace}}')
        .replace('{{specialThanks}}', ann.specialThanks || '{{specialThanks}}')
        .replaceAll('{{serviceDate}}', formatToUiDate(ann.serviceDate, '{{serviceDate}}'))
        .replace('{{dateOfBirth}}', formatToUiDate(ann.dateOfBirth, '{{dateOfBirth}}'))
        .replace('{{dateOfDeath}}', formatToUiDate(ann.dateOfDeath, '{{dateOfDeath}}'))
    )
  }, [])

  if (manualEditMode) return <RichTextEditor initialData={editorData} onBlur={setEditorData} />

  // variant === 'small' or manualEditMode === false
  return <section className={cn('ca-form5', variant)} dangerouslySetInnerHTML={{ __html: ann?.obituary || '' }} />
}
