'use client'

import './index.scss'

import { CircleUserRound, ClipboardList, LogOut, PencilLine, PlusCircle, Server } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { COOKIE_OPTIONS } from '@/components/forms/LoginForm'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import useAuthStore from '@/store/auth'

export interface NavigationProps {
  isNavExpanded: boolean
  setIsNavExpanded: Dispatch<SetStateAction<boolean>>
}

export default function AppBar({ isNavExpanded, setIsNavExpanded }: NavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const queryType = useSearchParams().get('type')
  const onDashboard = pathname === '/dashboard'
  const cookies = new Cookies(null, { path: '/' })
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  const handleSignOut = () => {
    localStorage.removeItem('auth-token')
    cookies.remove('auth-token', COOKIE_OPTIONS)
    queryClient.clear()

    router.replace('/login')
  }

  return (
    <nav
      className={cn('nav-drawer', isNavExpanded && 'expand')}
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
                    <li className={onDashboard && queryType === 'death' ? 'selected' : ''}>
                      <Link
                        href={{
                          pathname: '/dashboard',
                          query: { type: 'death' },
                        }}
                      >
                        Death
                      </Link>
                    </li>
                    <li className={onDashboard && queryType === 'birth' ? 'selected' : ''}>
                      <Link
                        href={{
                          pathname: '/dashboard',
                          query: { type: 'birth' },
                        }}
                      >
                        Birth
                      </Link>
                    </li>
                    <li className={onDashboard && queryType === 'wedding' ? 'selected' : ''}>
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
          <li className={pathname.includes('/create-announcement') ? 'selected' : ''}>
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
          <li className="accordion">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem className="no-border" value="item-1">
                <AccordionTrigger className="accordion-trigger">
                  <CircleUserRound className="no-transform" />
                  <span className="me-auto">{user.email?.split('@')[0]}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="accordion-list">
                    <li className={cn(pathname.includes('/dashboard/account') && 'selected')}>
                      <Link href="/dashboard/account">
                        <span>Account Details</span>
                      </Link>
                    </li>
                    <li className={cn(pathname.includes('/dashboard/my-announcements') && 'selected')}>
                      <Link href="/dashboard/my-announcements">
                        <span>My announcements</span>
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <button onClick={handleSignOut}>
              <LogOut />
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
