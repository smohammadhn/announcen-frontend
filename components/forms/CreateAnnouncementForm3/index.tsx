'use client'
import './index.scss'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { forwardRef, useImperativeHandle, useState } from 'react'

const formSchema = z.object({
  serviceDate: z.string().max(100).optional(),
  serviceTime: z.string().max(100).optional(),
  servicePlace: z.string().max(100).optional(),

  funeralTime: z.string().max(100).optional(),
  funeralPlace: z.string().max(100).optional(),

  closestFamilyCircle: z.boolean(),
})

export type IForm3 = z.infer<typeof formSchema>

interface Props {
  announcementObject?: Partial<IForm3 & {}>
}

export default forwardRef(function CreateAnnouncementForm1({ announcementObject }: Props, ref) {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceDate: announcementObject?.serviceDate || '',
      serviceTime: announcementObject?.serviceTime || '',
      servicePlace: announcementObject?.servicePlace || '',

      funeralTime: announcementObject?.funeralTime || '',
      funeralPlace: announcementObject?.funeralPlace || '',

      closestFamilyCircle: announcementObject?.closestFamilyCircle || false,
    },
  })

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm3) => void, onInvalid: () => void) => {
      form.handleSubmit(onValid, onInvalid)()
    },
  }))

  const [checkboxService, setCheckboxService] = useState(true)
  const [checkboxFuneral, setCheckboxFuneral] = useState(true)

  return (
    <Form {...form}>
      <form className="ca-form ca-form3">
        <h3 className="form-title hide-mobile">Details about the funeral</h3>

        <h4>Service</h4>

        {/* include service checkbox */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={checkboxService}
            onCheckedChange={(e: boolean) => {
              setCheckboxService(e)
            }}
            id="checkbox-service"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-service"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include details about the service in the announcement?
            </label>
          </div>
        </div>

        {checkboxService && (
          <>
            {/* service date */}
            <FormField
              control={form.control}
              name="serviceDate"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input placeholder="Date of service & funeral" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* service time */}
            <FormField
              control={form.control}
              name="serviceTime"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input placeholder="Time of service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* service place */}
            <FormField
              control={form.control}
              name="servicePlace"
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormControl>
                    <Input placeholder="Place of service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <h4>Funeral</h4>

        {/* include funeral checkbox */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={checkboxFuneral}
            onCheckedChange={(e: boolean) => {
              setCheckboxFuneral(e)
            }}
            id="checkbox-funeral"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-funeral"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include details about the funeral in the announcement?
            </label>
          </div>
        </div>

        {checkboxFuneral && (
          <>
            {/* closest family circle */}
            <FormField
              control={form.control}
              name="closestFamilyCircle"
              render={({ field }) => (
                <FormItem className="items-top flex space-x-2 mb-5 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>The funeral will take place in the closest family circle.</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* funeral time */}
            <FormField
              control={form.control}
              name="funeralTime"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input placeholder="Time of funeral" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* funeral place */}
            <FormField
              control={form.control}
              name="funeralPlace"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input placeholder="Time of funeral" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </form>
    </Form>
  )
})
