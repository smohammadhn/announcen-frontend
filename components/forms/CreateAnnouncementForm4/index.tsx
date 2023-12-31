'use client'
import './index.scss'

import allCities from '@/constants/cities.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  relatives: z.array(
    z.object({
      name: z.string().min(1, 'Required').min(3),
      partnerName: z.string().optional().or(z.literal('')),
      children: z.enum(['yes', 'no', '']),
      city: z.string().min(1, 'Required').nullable(),
    })
  ),

  nonProfits: z.array(
    z.object({
      name: z.string().min(1, 'Required').min(3),
    })
  ),

  specialThanks: z.string().min(1, 'Required').max(1000).nullable(),
})

export type IForm4 = z.infer<typeof formSchema>

interface Props {
  announcementObject?: Partial<IForm4 & {}>
  dense?: boolean
}

export default forwardRef(function CreateAnnouncementForm1({ announcementObject, dense = false }: Props, ref) {
  const [includeRelativeNames, setIncludeRelativeNames] = useState(true)
  const [includeRelativeCities, setIncludeRelativeCities] = useState(true)
  const [includeSpecialThanks, setIncludeSpecialThanks] = useState(true)
  const [includeNonProfit, setIncludeNonProfit] = useState(true)

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      relatives: announcementObject?.relatives || [
        {
          name: '',
          partnerName: '',
          city: '',
          children: '',
        },
      ],
      nonProfits: announcementObject?.nonProfits || [
        {
          name: '',
        },
      ],
      specialThanks: announcementObject?.specialThanks || '',
    },
  })

  useImperativeHandle(ref, () => ({
    submit: (onValid: (values: IForm4) => void, onInvalid: () => void) => {
      form.handleSubmit(onValid, onInvalid)()
    },
  }))

  const handleAddNewRelative = () => {
    form.setValue('relatives', [
      ...form.getValues('relatives'),
      {
        name: '',
        partnerName: '',
        city: '',
        children: '',
      },
    ])
  }

  const handleAddNewNonProfit = () => {
    form.setValue('nonProfits', [
      ...form.getValues('nonProfits'),
      {
        name: '',
      },
    ])
  }

  return (
    <Form {...form}>
      <form className="ca-form ca-form4">
        {!dense && <h3 className="form-title hide-mobile">Details about the family</h3>}

        {/* include relative names */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={includeRelativeNames}
            onCheckedChange={(e: boolean) => {
              setIncludeRelativeNames(e)

              if (e === false) {
                form.setValue('relatives', [])
              } else handleAddNewRelative()
            }}
            id="checkbox-rel-names"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-rel-names"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add names of relatives to the announcement
            </label>
          </div>
        </div>

        {includeRelativeNames && (
          <>
            {/* include relative cities */}
            <div className="items-top flex space-x-2 mb-3">
              <Checkbox
                checked={includeRelativeCities}
                onCheckedChange={(e: boolean) => {
                  setIncludeRelativeCities(e)

                  const relativesArray = form.getValues('relatives')

                  if (e === false) relativesArray.forEach((e) => (e.city = null))
                  else relativesArray.forEach((e) => (e.city = ''))

                  form.setValue('relatives', relativesArray)
                }}
                id="checkbox-rel-cities"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="checkbox-rel-cities"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add cities of relatives to the announcement
                </label>
              </div>
            </div>

            {form.watch('relatives').map((_, index) => (
              <div className="grid grid-col-4 my-4" key={index}>
                {/* name relative */}
                <FormField
                  control={form.control}
                  name={`relatives.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name Relative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* name partner */}
                <FormField
                  control={form.control}
                  name={`relatives.${index}.partnerName`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Name partner</FormLabel>
                      <FormControl>
                        <Input placeholder="Name partner of Relative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* children */}
                <FormField
                  control={form.control}
                  name={`relatives.${index}.children`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Children</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Yes / No" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {includeRelativeCities && (
                  <>
                    {/* city */}
                    <FormField
                      control={form.control}
                      name={`relatives.${index}.city`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1" onChange={(e) => console.log(e)}>
                          <FormLabel>City</FormLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="formField"
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
                                        form.setValue(`relatives.${index}.city`, e.value)
                                        form.clearErrors(`relatives.${index}.city`)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          e.value === field.value ? 'opacity-100' : 'opacity-0'
                                        )}
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
                  </>
                )}
              </div>
            ))}

            <Button type="button" variant={'secondary'} className="w-full mb-5" onClick={handleAddNewRelative}>
              Add new
            </Button>
          </>
        )}

        {!dense && <h4 className="mt-7">Special Thanks</h4>}

        {/* include special thanks */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={includeSpecialThanks}
            onCheckedChange={(e: boolean) => {
              setIncludeSpecialThanks(e)

              if (e === false) {
                form.setValue('specialThanks', null)
              } else form.resetField('specialThanks')
            }}
            id="checkbox-special-thanks"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-special-thanks"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include special thanks.
            </label>
          </div>
        </div>

        {includeSpecialThanks && (
          <>
            {/* special thanks text */}
            <FormField
              control={form.control}
              name="specialThanks"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormControl>
                    <Input placeholder="Write special thanks" {...field} value={field.value || undefined} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {!dense && <h4 className="mt-7">Non-profit to support</h4>}

        {/* include non profit */}
        <div className="items-top flex space-x-2 mb-3">
          <Checkbox
            checked={includeNonProfit}
            onCheckedChange={(e: boolean) => {
              setIncludeNonProfit(e)

              if (e === false) {
                form.setValue('nonProfits', [])
              } else handleAddNewNonProfit()
            }}
            id="checkbox-non-profit"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="checkbox-non-profit"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add non-profit to the announcement
            </label>
          </div>
        </div>

        {includeNonProfit && (
          <>
            {form.watch('nonProfits').map((_, index) => (
              <div key={index} className="my-4">
                {/* non profits */}
                <FormField
                  control={form.control}
                  name={`nonProfits.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="none-profit name 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button variant={'secondary'} type="button" className="w-full mb-3" onClick={handleAddNewNonProfit}>
              Add new
            </Button>
          </>
        )}
      </form>
    </Form>
  )
})
