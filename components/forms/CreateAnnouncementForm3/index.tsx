'use client'
import './index.scss'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { REGEX_TIME } from '@/constants/core'
import { cn, formatToUiDate } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  serviceDate: z.date().nullable(),
  serviceTime: z.string().regex(REGEX_TIME, 'Correct format is HH:mm').nullable(),
  servicePlace: z.string().min(1, 'Required').max(100).nullable(),

  closestFamilyCircle: z.boolean(),
  funeralTime: z.string().regex(REGEX_TIME, 'Correct format is HH:mm').nullable(),
  funeralPlace: z.string().min(1, 'Required').max(100).nullable(),
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
      serviceDate: announcementObject?.serviceDate || ('' as any),
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

              if (e === false) {
                form.setValue('serviceDate', null)
                form.setValue('serviceTime', null)
                form.setValue('servicePlace', null)
              } else {
                form.resetField('serviceDate')
                form.resetField('serviceTime')
                form.resetField('servicePlace')
              }
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
                <FormItem className="flex flex-col mb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'formField'}
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? formatToUiDate(field.value) : <span>Date of service & funeral</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    <Input placeholder="Time of service" {...field} value={field.value || undefined} />
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
                    <Input placeholder="Place of service" {...field} value={field.value || undefined} />
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

              if (e === false) {
                form.setValue('funeralTime', null)
                form.setValue('funeralPlace', null)
              } else {
                form.resetField('funeralTime')
                form.resetField('funeralPlace')
              }
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
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(e) => {
                        field.onChange(e)

                        if (e === false) {
                          form.resetField('funeralTime')
                          form.resetField('funeralPlace')
                        } else {
                          form.setValue('funeralTime', null)
                          form.setValue('funeralPlace', null)
                        }
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>The funeral will take place in the closest family circle.</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('closestFamilyCircle') === false && (
              <>
                {/* funeral time */}
                <FormField
                  control={form.control}
                  name="funeralTime"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input placeholder="Time of funeral" {...field} value={field.value || undefined} />
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
                        <Input placeholder="Place of funeral" {...field} value={field.value || undefined} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </>
        )}
      </form>
    </Form>
  )
})
