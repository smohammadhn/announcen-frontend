import './index.scss'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { NavigationProps } from '../NavDrawer'

import {
  CircleUserRound,
  ClipboardList,
  HelpCircle,
  Mail,
  Menu,
  Settings,
} from 'lucide-react'

export default function AppBar({
  isNavExpanded,
  setIsNavExpanded,
}: NavigationProps) {
  return (
    <header className="app-bar">
      <Button
        className="ms-2 app-bar__chevron"
        size="icon"
        variant="ghost"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        <Menu />
      </Button>

      <div className="app-bar__logo">
        <Image
          className="logo"
          src="/logos/Logo.svg"
          width={45}
          height={45}
          alt="website logo"
        />
        <h1>Announcen</h1>
      </div>

      <div className="app-bar__actions">
        <Button size="icon" variant="ghost">
          <ClipboardList />
        </Button>
        <Button size="icon" variant="ghost">
          <Mail />
        </Button>
        <Button size="icon" variant="ghost">
          <HelpCircle />
        </Button>
        <Button size="icon" variant="ghost">
          <Settings />
        </Button>
      </div>

      <div className="app-bar__profile">
        <CircleUserRound />
        <h2>User Name</h2>
      </div>
    </header>
  )
}
