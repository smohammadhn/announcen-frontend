'use client'

// default layout
import './layout.scss'

import AppBar from '@/components/navigation/AppBar'
import NavDrawer from '@/components/navigation/NavDrawer'
import { useState } from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isNavExpanded, setisNavExpanded] = useState(true)

  return (
    <div className="layout-default">
      <AppBar
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setisNavExpanded}
      />
      <NavDrawer
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setisNavExpanded}
      />

      <main className="layout-default-main">{children}</main>
    </div>
  )
}
