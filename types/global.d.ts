import { IForm1 } from '@/components/forms/CreateAnnouncementForm1'
import { IForm2 } from '@/components/forms/CreateAnnouncementForm2'
import { IForm3 } from '@/components/forms/CreateAnnouncementForm3'
import { IForm4 } from '@/components/forms/CreateAnnouncementForm4'
import { IForm5 } from '@/components/forms/CreateAnnouncementForm5'

import { FormDetails, FormOrganization, FormFinancial } from '@/app/(layoutBlank)/register/organization/page'

type OmittedFrontendKeys = 'dateOfBirth' & 'dateOfDeath' & 'serviceDate' & 'city'

interface ICity {
  name: string
  id: number
  municipality: string
}

export {}

declare global {
  type User = { _id?: string; password?: string; email: string }

  interface ErrorMessage {
    message: string
  }

  interface DashboardUrlQuery {
    [index: string]: string
    type?: string
    sorting?: string
  }

  type AnnouncementFrontend = Partial<IForm1 & IForm2 & IForm3 & IForm4 & IForm5 & {}>

  type AnnouncementBackend = Omit<AnnouncementFrontend, OmittedFrontendKeys> & {
    dateOfBirth: string
    dateOfDeath: string
    serviceDate: string
    _id: string
    city: ICity
  }
}
