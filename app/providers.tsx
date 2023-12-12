'use client'

import axiosInstance from '@/services/apiClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 60 * 60 * 1000, // 10s
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  const { toast } = useToast()
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err: AxiosError<ErrorMessage>) => {
      console.log(err.response?.data.message)

      toast({
        variant: 'destructive',
        title: err.response?.data.message,
      })
    }
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
