import { defaultAnnouncementObject } from '@/constants/core'
import obituaryTemplates from '@/constants/templates'
import { cn } from '@/lib/utils'
import './index.scss'

interface Props {
  onSelectTemplate: (id: number) => void
  selectedTemplate: number
}

export default function CreateAnnouncementForm1({ onSelectTemplate, selectedTemplate }: Props) {
  return (
    <div className="ca-form-preview">
      <h2>General</h2>
      <ul className="template-ul">
        {obituaryTemplates
          .filter((e) => e.category === 'general')
          .map((e) => (
            <li
              key={e.id}
              className={cn(selectedTemplate === e.id && 'selected', 'template-li')}
              onClick={() => onSelectTemplate(e.id)}
            >
              <e.data data={defaultAnnouncementObject as unknown as AnnouncementFrontend} />
            </li>
          ))}
      </ul>

      <h2>Write your own</h2>
      <ul className="template-ul">
        <li className={cn(selectedTemplate === -1 && 'selected', 'template-li')} onClick={() => onSelectTemplate(-1)}>
          Write you own announcement from scratch
        </li>
      </ul>
    </div>
  )
}
