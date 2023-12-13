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

const formSchema = z.object({
  type: z.string({ required_error: 'Field is required' }),
})
export type IForm1 = z.infer<typeof formSchema>

interface Props {
  onSubmit?: (values: z.infer<typeof formSchema>) => void
  onError?: () => void
}

export default function CreateAnnouncementForm1({
  onSubmit = () => {},
  onError = () => {},
}: Props) {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form className="space-y-4 w-60 flex justify-self-center flex-col ca-form1">
        <h3>Announcement Type</h3>
        {/* type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem onBlur={form.handleSubmit(onSubmit, onError)}>
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
}
