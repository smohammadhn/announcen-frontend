import { IForm1 } from '@/components/forms/CreateAnnouncementForm1'
import { IForm2 } from '@/components/forms/CreateAnnouncementForm2'
import { IForm3 } from '@/components/forms/CreateAnnouncementForm3'
import { IForm4 } from '@/components/forms/CreateAnnouncementForm4'

type OmittedFrontendKeys = 'dateOfBirth' & 'dateOfDeath' & 'serviceDate'

export {}

declare global {
  interface ErrorMessage {
    message: string
  }

  interface DashboardUrlQuery {
    [index: string]: string
    type?: string
    sorting?: string
  }

  type AnnouncementFrontend = Partial<IForm1 & IForm2 & IForm3 & IForm4 & { _id: string } & {}>

  type AnnouncementBackend = Omit<AnnouncementFrontend, OmittedFrontendKeys> & {
    dateOfBirth: string
    dateOfDeath: string
    serviceDate: string
  }
}
