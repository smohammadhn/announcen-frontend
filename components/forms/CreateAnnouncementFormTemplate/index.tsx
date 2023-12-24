'use client'
import { Dispatch, SetStateAction } from 'react'
import './index.scss'
import obituaryTemplates from '@/constants/templates'
import { cn } from '@/lib/utils'

interface Props {
  onSelectTemplate: (id: number) => void
  selectedTemplate: number
}

export default function CreateAnnouncementForm1({ onSelectTemplate, selectedTemplate }: Props) {
  return (
    <div className="ca-form-preview">
      <h2>General</h2>
      <ul>
        {obituaryTemplates
          .filter((e) => e.category === 'general')
          .map((e) => (
            <li
              key={e.id}
              className={cn(selectedTemplate === e.id && 'selected')}
              dangerouslySetInnerHTML={{ __html: e.data }}
              onClick={() => onSelectTemplate(e.id)}
            ></li>
          ))}
      </ul>

      <h2>Write your own</h2>
      <ul>
        <li className={cn(selectedTemplate === -1 && 'selected')} onClick={() => onSelectTemplate(-1)}>
          Write you own announcement from scratch
        </li>
      </ul>
    </div>
  )
}
