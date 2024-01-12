'use client'

// default layout
import './layout.scss'

import AppBar from '@/components/navigation/AppBar'
import NavDrawer from '@/components/navigation/NavDrawer'
import authService from '@/services/authService'
import useAuthStore from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const cookies = new Cookies()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { user, setUser } = useAuthStore()
  const router = useRouter()

  // all routes under this layout are protected
  // check to see if the token that is present inside browser cookie is valid
  // runs only once on page refresh
  useEffect(() => {
    if (!user || !user?._id) {
      authService.verifyToken().then((res) => {
        if (res.isTokenVerified) setUser(res.user as User)
        else {
          localStorage.removeItem('auth-token')
          cookies.remove('auth-token')

          router.replace('/login')
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="layout-default">
      <AppBar isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} />
      <NavDrawer isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} />

      <main className="layout-default-main">{children}</main>
    </div>
  )
}
