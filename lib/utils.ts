import { UI_DATE_FORMAT } from '@/constants/core'
import { type ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---

export function formatToUiDate(date: Date | string | undefined): string {
  if (!date) return ''
  return moment(date).format(UI_DATE_FORMAT)
}
