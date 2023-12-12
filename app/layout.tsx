// root layout

import '@/assets/styles/global.scss'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import Providers from '@/app/providers'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Announcen',
  description: 'Announcen description',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
