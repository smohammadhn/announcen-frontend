// import './index.scss'

import RichTextEditor from '@/components/ui/rich-text-editor'
import obituaryTemplates from '@/constants/templates'
import { cn } from '@/lib/utils'
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
  let ObituaryTemplate = template === -1 ? undefined : obituaryTemplates.find((e) => e.id === template)?.data

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm5) => void, onInvalid: (message?: string) => void) => {
      if (editorData.length < 10) onInvalid('Notice field is too short')
      else onValid({ obituary: editorData })
    },
  }))

  useEffect(() => {
    // write your own
    if (template === -1) return

    const obituaryContainer = document.getElementById('obituary-container')
    if (obituaryContainer) setEditorData(obituaryContainer.innerHTML)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (manualEditMode) {
    return <RichTextEditor initialData={editorData} onBlur={setEditorData} />
  } else {
    if (ObituaryTemplate) {
      return (
        <div id="obituary-container" className="show-empty-p">
          <ObituaryTemplate data={ann} />
        </div>
      )
    } else {
      return <div className="show-empty-p" dangerouslySetInnerHTML={{ __html: editorData }} />
    }
  }
})
