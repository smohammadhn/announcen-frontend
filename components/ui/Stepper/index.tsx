import { Fragment } from 'react'
import './index.scss'

import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value: number
  onSelect: (index: number) => void
}

export default function Stepper({ value, onSelect }: Props) {
  const items = [
    'Announcement Type',
    'Template Selection',
    'Details about the defunct',
    'Details about the funeral',
    'Details about the family',
    'Preview',
  ]

  return (
    <>
      <div className="stepper">
        {items.map((item, index) => (
          <Fragment key={index}>
            <div className={cn('stepper--item', value > index && 'success')}>
              <Circle size={10} />
              <span className="stepper--item-text cursor-pointer" onClick={() => onSelect(index + 1)}>
                {item}
              </span>
            </div>
            {index !== items.length - 1 && <span className={cn('stepper--line', value > index + 1 && 'success')} />}
          </Fragment>
        ))}
      </div>
      <div className="stepper--title">{items[value - 1]}</div>
    </>
  )
}
