'use client'
import './index.scss'

import allCities from '@/constants/cities.json'
import familyRoles from '@/constants/familyRoles.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { forwardRef, useImperativeHandle, useState } from 'react'

const formSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  city: z.string().min(1, 'Required').max(100),

  maritalStatus: z.enum(['single', 'married', '']).optional(),
  partnerName: z.string().max(100).optional(),
  placeOfBirth: z.string().max(100).optional(),
  placeOfDeath: z.string().max(100).optional(),
  dateOfBirth: z.date().optional(),
  dateOfDeath: z.date().optional(),
  familyRoles: z.array(z.string()),
})

export type IForm2 = z.infer<typeof formSchema>

interface Props {
  announcementObject?: Partial<IForm2 & {}>
}

export default forwardRef(function CreateAnnouncementForm1({ announcementObject }: Props, ref) {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: announcementObject?.firstName || '',
      lastName: announcementObject?.lastName || '',
      city: announcementObject?.city || '',
      maritalStatus: announcementObject?.maritalStatus || '',
      partnerName: announcementObject?.partnerName || '',
      placeOfBirth: announcementObject?.placeOfBirth || '',
      placeOfDeath: announcementObject?.placeOfDeath || '',
      dateOfBirth: announcementObject?.dateOfBirth,
      dateOfDeath: announcementObject?.dateOfDeath,
      familyRoles: announcementObject?.familyRoles || [],
    },
  })

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm2) => void, onInvalid: () => void) => {
      form.handleSubmit(onValid, onInvalid)()
    },
  }))

  const [checkboxMaritalStatus, setCheckboxMaritalStatus] = useState(true)
  const [checkboxFamilyRoles, setCheckboxFamilyRoles] = useState(true)

  return (
    <Form {...form}>
      <form className="ca-form2">
        <h3 className="form-title hide-mobile">Details about the defunct</h3>

        <section className="grid grid-col-3 mb-5">
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* city */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? allCities.find((e) => e.value === field.value)?.label : 'City'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="search city" />
                      <CommandEmpty>Not Found!</CommandEmpty>
                      <CommandGroup>
                        {allCities.map((e) => (
                          <CommandItem
                            value={e.label}
                            key={e.value}
                            onSelect={() => {
                              form.setValue('city', e.value)
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', e.value === field.value ? 'opacity-100' : 'opacity-0')}
                            />
                            {e.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* include marital status checkbox */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={checkboxMaritalStatus}
            onCheckedChange={(e: boolean) => {
              setCheckboxMaritalStatus(e)
            }}
            id="checkbox-marital-status"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-marital-status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include marital status?
            </label>
          </div>
        </div>

        {checkboxMaritalStatus && (
          <section className="grid grid-col-2 mb-5">
            {/* marital status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value} required>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Marital Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* name of partner */}
            <FormField
              control={form.control}
              name="partnerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name of Partner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? 'dsd' : <span>Date of Birth</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
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

            {/* place of birth */}
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Place of Birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Death */}
            <FormField
              control={form.control}
              name="dateOfDeath"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value as Date, 'PPP') : <span>Date of Birth</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
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

            {/* place of death */}
            <FormField
              control={form.control}
              name="placeOfDeath"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Place of Death" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        )}

        {/* include family roles checkbox */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={checkboxFamilyRoles}
            onCheckedChange={(e: boolean) => {
              form.setValue('familyRoles', [])
              setCheckboxFamilyRoles(e)
            }}
            id="checkbox-family-roles"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-family-roles"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include family roles?
            </label>
          </div>
        </div>

        {/* family role checkboxes */}
        {checkboxFamilyRoles && (
          <FormField
            control={form.control}
            name="familyRoles"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Family Role</FormLabel>
                  <FormDescription>Select at least one item.</FormDescription>
                </div>
                <div className="grid grid-col-2">
                  {familyRoles.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="familyRoles"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  )
})
