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
}
