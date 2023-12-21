'use client'
import './index.scss'

import axios from '@/services/apiClient'
import useAuthStore from '@/store/auth'
import authService from '@/services/authService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import Cookies, { CookieSetOptions } from 'universal-cookie'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const COOKIE_OPTIONS: CookieSetOptions = {
  secure: true,
  sameSite: 'none',
  maxAge: 6 * 3_600_000,
}

const formSchema = z.object({
  email: z.string().min(4).max(30),
  password: z.string().min(6).max(30),
})

export default function LoginForm() {
  const cookies = new Cookies(null, { path: '/' })
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const login = authService.login(({ access, user }) => {
    // save access token both in localstorage and cookies
    localStorage.setItem('auth-token', access)
    axios.defaults.headers['Authorization'] = access
    cookies.set('auth-token', access, COOKIE_OPTIONS)

    if (user) setUser(user)
    router.replace('/dashboard')
  })

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email-address</FormLabel>
              <FormControl>
                <Input
                  className="rounded-full page-login--field"
                  type="email"
                  placeholder="Enter Your Email-address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="rounded-full page-login--field"
                  placeholder="Enter Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={login.isPending} type="submit" className="page-login--submit-btn">
          Login
        </Button>
      </form>
    </Form>
  )
}
