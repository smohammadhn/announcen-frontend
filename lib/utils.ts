import { UI_DATE_FORMAT } from '@/constants/core'
import { type ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'
import _ from 'lodash'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---

export function formatToUiDate(date: Date | string | undefined | null, fallbackText = ''): string {
  if (!date) return fallbackText
  if (typeof date === 'string' && date.includes('{{')) return date
  return moment(date).format(UI_DATE_FORMAT)
}

export function cleanObject(object: { [key: string]: any }) {
  return _.omitBy(object, _.isNil)
}
