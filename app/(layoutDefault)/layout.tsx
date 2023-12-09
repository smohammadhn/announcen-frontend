// default layout
import './layout.scss'

import AppBar from '@/components/navigation/AppBar'
import NavDrawer from '@/components/navigation/NavDrawer'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="layout-default">
      <AppBar />
      <NavDrawer />
      <main className="layout-default-main">{children}</main>
    </div>
  )
}
