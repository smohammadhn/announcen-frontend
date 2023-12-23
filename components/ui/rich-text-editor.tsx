'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const CustomEditor = dynamic(
  () => {
    return import('@/lib/ckeditor.js')
  },
  { ssr: false }
)

interface Props {
  initialData?: string
  onBlur?: (data: string) => void
}

function RichTextEditor({ initialData = '', onBlur }: Props) {
  return <CustomEditor initialData={initialData} onBlur={onBlur} />
}

export default RichTextEditor
