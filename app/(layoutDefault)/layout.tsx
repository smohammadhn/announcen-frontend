'use client'

// default layout
import './layout.scss'

import AppBar from '@/components/navigation/AppBar'
import NavDrawer from '@/components/navigation/NavDrawer'
import authService from '@/services/authService'
import useAuthStore, { User } from '@/store/auth'
import { useState } from 'react'
import Cookies from 'universal-cookie'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isNavExpanded, setisNavExpanded] = useState(true)
  const { user, setUser } = useAuthStore()

  // check to see if the token that is present inside browser cookie is valid
  // runs only once on page refresh
  if (!user || !user._id) {
    const cookies = new Cookies()
    const authToken = cookies.get('auth-token')

    authService.verifyToken(authToken).then((res) => {
      if (res.isTokenVerified) setUser(res.user as User)
      console.log('reached here')
    })
  }

  return (
    <div className="layout-default">
      <AppBar isNavExpanded={isNavExpanded} setIsNavExpanded={setisNavExpanded} />
      <NavDrawer isNavExpanded={isNavExpanded} setIsNavExpanded={setisNavExpanded} />

      <main className="layout-default-main">{children}</main>
    </div>
  )
}
