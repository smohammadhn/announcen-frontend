'use client'

import './index.scss'

import {
  CircleUserRound,
  ClipboardList,
  LogOut,
  PencilLine,
  PlusCircle,
  Server,
} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export interface NavigationProps {
  isNavExpanded: boolean
  setIsNavExpanded: Dispatch<SetStateAction<boolean>>
}

export default function AppBar({
  isNavExpanded,
  setIsNavExpanded,
}: NavigationProps) {
  const pathname = usePathname()
  const queryType = useSearchParams().get('type')
  const onDashboard = pathname === '/dashboard'

  return (
    <nav
      className={['nav-drawer', isNavExpanded && 'expand'].join(' ')}
      onClick={() => {
        setIsNavExpanded(false)
      }}
    >
      <div className="nav-container" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li className="accordion">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem className="no-border" value="item-1">
                <AccordionTrigger className="accordion-trigger">
                  <Server />
                  <span className="me-auto">Announcements</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="accordion-list">
                    <li className={onDashboard && !queryType ? 'selected' : ''}>
                      <Link href={{ pathname: '/dashboard' }}>All</Link>
                    </li>
                    <li
                      className={
                        onDashboard && queryType === 'death' ? 'selected' : ''
                      }
                    >
                      <Link
                        href={{
                          pathname: '/dashboard',
                          query: { type: 'death' },
                        }}
                      >
                        Death
                      </Link>
                    </li>
                    <li
                      className={
                        onDashboard && queryType === 'birth' ? 'selected' : ''
                      }
                    >
                      <Link
                        href={{
                          pathname: '/dashboard',
                          query: { type: 'birth' },
                        }}
                      >
                        Birth
                      </Link>
                    </li>
                    <li
                      className={
                        onDashboard && queryType === 'wedding' ? 'selected' : ''
                      }
                    >
                      <Link
                        href={{
                          pathname: '/dashboard',
                          query: { type: 'wedding' },
                        }}
                      >
                        Wedding
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li
            className={
              pathname.includes('/create-announcement') ? 'selected' : ''
            }
          >
            <Link href="/dashboard/create-announcement">
              <PlusCircle />
              Create Announcement
            </Link>
          </li>
          <li className={pathname.includes('/partners') ? 'selected' : ''}>
            <Link href="/dashboard/partners">
              <PencilLine />
              Partners
            </Link>
          </li>
          <li className={pathname.includes('/contact') ? 'selected' : ''}>
            <Link href="/dashboard/contact">
              <ClipboardList />
              Contact
            </Link>
          </li>
        </ul>

        <p className="nav-drawer__seperator">Account Information</p>

        <ul>
          <li className={pathname.includes('/account') ? 'selected' : ''}>
            <Link href="/dashboard/account">
              <CircleUserRound />
              Account Details
            </Link>
          </li>
          <li>
            <button>
              <LogOut />
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
