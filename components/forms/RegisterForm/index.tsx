'use client'
import './index.scss'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().min(4).max(50).email(),
  password: z.string().min(6).max(255),
  confirmation: z.string().min(6).max(255),
})

export default function RegisterForm() {
  // 1. Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmation: '',
    },
  })

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
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

        {/* password */}
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="rounded-full page-login--field"
                  placeholder="Re-enter Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* submit button */}
        <Button type="submit" className="page-login--submit-btn">
          Login
        </Button>
      </form>
    </Form>
  )
}
