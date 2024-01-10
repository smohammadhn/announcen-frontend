'use client'

import { toast } from '@/components/ui/use-toast'
import axiosInstance from '@/services/apiClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import { useState } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // staleTime: 30 * 60 * 1000, // 30 mins
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ErrorMessage>) => {
    let message = err.response?.data.message

    if (!message) {
      const statusCode = err.response?.status.toString() || '520'
      const statusObjectMap: { [key: string]: string } = {
        '404': '404: Not found',
        '400': '400: Bad request',
        '401': '401: Unauthorized',
        '403': '403: Forbidden',
        '500': '500: Server error',
        '520': '520: Unknown error',
      }

      message = statusObjectMap[statusCode]
    }

    toast({ variant: 'destructive', title: message })
  }
)

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 30 * 60 * 1000, // 30 mins
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
