import { Button } from '@/components/ui/button'
import './index.scss'
import Image from 'next/image'

import {
  CircleUserRound,
  ClipboardList,
  HelpCircle,
  Mail,
  Settings,
} from 'lucide-react'

export default function AppBar() {
  return (
    <header className="app-bar">
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
        <h2>S.Mohammad Hn.</h2>
      </div>
    </header>
  )
}
