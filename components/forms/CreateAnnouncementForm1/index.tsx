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
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { forwardRef, useImperativeHandle } from 'react'

const formSchema = z.object({
  type: z.string().min(1, 'Required'),
})

export type IForm1 = z.infer<typeof formSchema>

interface Props {
  announcementObject?: Partial<IForm1 & {}>
}

export default forwardRef(function CreateAnnouncementForm1(
  { announcementObject }: Props,
  ref
) {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: announcementObject?.type || '',
    },
  })

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm1) => void, onInvalid: () => void) => {
      form.handleSubmit(onValid, onInvalid)()
    },
  }))

  return (
    <Form {...form}>
      <form className="space-y-4 w-60 flex justify-self-center flex-col ca-form1">
        <h3>Announcement Type</h3>
        {/* type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="death">Death</SelectItem>
                  <SelectItem value="birth">Birth</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})
