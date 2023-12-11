'use client'
import './index.scss'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
  field1: z.string().min(4).max(30),
})

export default function LoginForm() {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field1: '',
    },
  })

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-8 flex flex-col">
        {/* email */}
        <FormField
          control={form.control}
          name="field1"
          render={({ field }) => (
            <FormItem onBlur={() => onSubmit(form.getValues())}>
              <FormLabel>Sample Field</FormLabel>
              <FormControl>
                <Input
                  className="rounded-full"
                  placeholder="Enter Information"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
