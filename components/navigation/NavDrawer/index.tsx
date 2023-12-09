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

export default function AppBar() {
  return (
    <nav className="nav-drawer">
      <div>
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
                    <li>Death</li>
                    <li>Birth</li>
                    <li>Wedding</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <PlusCircle />
            Create Announcemnet
          </li>
          <li>
            <PencilLine />
            Partners
          </li>
          <li>
            <ClipboardList />
            Contact
          </li>
        </ul>

        <p className="nav-drawer__seperator">Account Information</p>

        <ul>
          <li>
            <CircleUserRound />
            S.Mohammadhn
          </li>
          <li>
            <LogOut />
            Sign out
          </li>
        </ul>
      </div>
    </nav>
  )
}
