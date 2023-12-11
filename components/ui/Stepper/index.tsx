import { Fragment } from 'react'
import './index.scss'

import { Circle, Key } from 'lucide-react'

interface Props {
  value: number
}

export default function Stepper({ value }: Props) {
  const items = [
    'Announcement Type',
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
            <div
              className={['stepper--item', value > index && 'success'].join(
                ' '
              )}
            >
              <Circle size={10} />
              <span className="stepper--item-text">{item}</span>
            </div>
            {index !== items.length - 1 && (
              <span
                className={[
                  'stepper--line',
                  value > index + 1 && 'success',
                ].join(' ')}
              />
            )}
          </Fragment>
        ))}
      </div>
      <div className="stepper--title">{items[value - 1]}</div>
    </>
  )
}
