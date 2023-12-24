import './index.scss'

import RichTextEditor from '@/components/ui/rich-text-editor'
import obituaryTemplates from '@/constants/templates'
import { formatToUiDate } from '@/lib/utils'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export type IForm5 = {
  obituary: string
}

interface Props {
  announcementObject?: AnnouncementFrontend | AnnouncementBackend
  manualEditMode?: boolean
  template?: number
}

export default forwardRef(function CreateAnnouncementForm5(
  { announcementObject: ann = {}, manualEditMode = false, template = 1 }: Props,
  ref
) {
  const [editorData, setEditorData] = useState('')

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm5) => void, onInvalid: () => void) => {
      if (editorData.length < 5) onInvalid()
      else onValid({ obituary: editorData })
    },
  }))

  useEffect(() => {
    // write your own
    if (template === -1) return

    const obituaryTemplate = obituaryTemplates.find((e) => e.id === template)?.data
    if (!obituaryTemplate) return

    setEditorData(
      obituaryTemplate
        .replace(
          '{{relatives}}',
          ann.relatives?.map((e) => `<li>${e.name} a ${e.partnerName}</li>`).join('') || '{{relatives}}'
        )
        .replace('{{relativeCities}}', ann.relatives?.map((e) => e.city).join(', ') || '{{relativeCities}}')
        .replace('{{familyRoles}}', ann.familyRoles?.join(', ') || '{{familyRoles}}')
        .replace('{{nonProfits}}', ann.nonProfits?.map((e) => `"${e}"`).join(', ') || '{{nonProfits}}')
        .replaceAll('{{firstName}}', ann.firstName || '{{firstName}}')
        .replaceAll('{{lastName}}', ann.lastName || '{{lastName}}')
        .replace('{{partnerName}}', ann.partnerName || '{{partnerName}}')
        .replace('{{funeralTime}}', ann.funeralTime || '{{funeralTime}}')
        .replace('{{serviceTime}}', ann.serviceTime || '{{serviceTime}}')
        .replace('{{funeralPlace}}', ann.funeralPlace || '{{funeralPlace}}')
        .replace('{{servicePlace}}', ann.servicePlace || '{{servicePlace}}')
        .replace('{{specialThanks}}', ann.specialThanks || '{{specialThanks}}')
        .replace('{{maritalStatus}}', ann.maritalStatus || '{{maritalStatus}}')
        .replaceAll('{{serviceDate}}', formatToUiDate(ann.serviceDate, '{{serviceDate}}'))
        .replace('{{dateOfBirth}}', formatToUiDate(ann.dateOfBirth, '{{dateOfBirth}}'))
        .replace('{{dateOfDeath}}', formatToUiDate(ann.dateOfDeath, '{{dateOfDeath}}'))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (manualEditMode) return <RichTextEditor initialData={editorData} onBlur={setEditorData} />
  return <section className="ca-form5" dangerouslySetInnerHTML={{ __html: editorData }} />
})
