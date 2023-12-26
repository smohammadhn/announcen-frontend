'use client'
import './page.scss'

import useAuthStore from '@/store/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import allCities from '@/constants/cities.json'
import { Check, ChevronsUpDown } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import authService from '@/services/authService'
import { toast } from '@/components/ui/use-toast'

const formDetailsSchema = z.object({
  email: z.string().email().min(1, 'Required'),
})

const formOrganizationSchema = z.object({
  name: z.string().min(3).max(50).optional().or(z.literal('')),
  address: z.string().min(3).max(500).optional().or(z.literal('')),
  postalCode: z.string().min(3).max(20).optional().or(z.literal('')),
  city: z.string().min(3).max(20).optional().or(z.literal('')),
  homepage: z.string().min(5).max(50).optional().or(z.literal('')),
  description: z.string().min(10).max(150).optional().or(z.literal('')),
})

const formFinancialSchema = z.object({
  iban: z.string().min(5).max(30).optional().or(z.literal('')),
  bic: z.string().min(5).max(30).optional().or(z.literal('')),
  stripeAccount: z.string().min(5).max(30).optional().or(z.literal('')),
})

export type FormDetails = z.infer<typeof formDetailsSchema>
export type FormOrganization = z.infer<typeof formOrganizationSchema>
export type FormFinancial = z.infer<typeof formFinancialSchema>

export type UpdateUserPayload = FormDetails | FormOrganization | FormFinancial

export default function Account() {
  const { user, setUser } = useAuthStore()

  const updateUser = authService.updateUser((savedUser) => {
    setUser(savedUser)

    toast({
      title: 'Profile updated Successfully',
    })
  })

  const formDetails = useForm<FormDetails>({
    mode: 'all',
    resolver: zodResolver(formDetailsSchema),
    defaultValues: {
      email: user.email || '',
    },
  })

  const formOrganization = useForm<FormOrganization>({
    mode: 'all',
    resolver: zodResolver(formOrganizationSchema),
    defaultValues: {
      name: user.name || '',
      address: user.address || '',
      postalCode: user.postalCode || '',
      city: user.city || '',
      homepage: user.homepage || '',
      description: user.description || '',
    },
  })

  const formFinancial = useForm<FormFinancial>({
    mode: 'all',
    resolver: zodResolver(formFinancialSchema),
    defaultValues: {
      iban: user.iban || '',
      bic: user.bic || '',
      stripeAccount: user.stripeAccount || '',
    },
  })

  // methods
  const onSubmitForm = (data: UpdateUserPayload & Partial<FormDetails>) => {
    if (!data.email) data.email = user.email
    updateUser.mutate(data)
  }

  return (
    <div className="page-account">
      {/* account details section */}
      <section>
        <h2>Account details</h2>

        {/* form */}
        <Form {...formDetails}>
          <form>
            {/* email */}
            <FormField
              control={formDetails.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="outlined-field" type="email" placeholder="Email-address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* action */}
          <Button
            loading={updateUser.isPending}
            className="w-full rounded-full"
            onClick={formDetails.handleSubmit(onSubmitForm)}
          >
            Change account details
          </Button>
        </Form>
      </section>

      {/* about organisation section */}
      <section>
        <h2>About your organisation</h2>

        {/* form */}
        <Form {...formOrganization}>
          <form>
            <div className="grid-col-2">
              {/* org name */}
              <FormField
                control={formOrganization.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="outlined-field" placeholder="Organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* postal code */}
              <FormField
                control={formOrganization.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="outlined-field" placeholder="Postal Code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* city */}
              <FormField
                control={formOrganization.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="formField"
                            role="combobox"
                            className={cn('justify-between outlined-field', !field.value && 'text-muted-foreground')}
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
                                  formOrganization.setValue('city', e.value)
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

              {/* homepage */}
              <FormField
                control={formOrganization.control}
                name="homepage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="outlined-field" placeholder="Homepage" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* address */}
            <FormField
              control={formOrganization.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="outlined-field" placeholder="Address (street and number)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={formOrganization.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Description of your organisation (max 150 words)"
                      className="resize-none outlined-textarea"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* action */}
          <Button
            loading={updateUser.isPending}
            className="w-full rounded-full"
            onClick={formOrganization.handleSubmit(onSubmitForm)}
          >
            Change organisation details
          </Button>
        </Form>
      </section>

      {/* Financial information section */}
      <section>
        <h2>Financial information</h2>

        {/* form */}
        <Form {...formFinancial}>
          <form>
            {/* email */}
            <FormField
              control={formFinancial.control}
              name="iban"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="outlined-field"
                      type="number"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Bank account (IBAN)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* bic */}
            <FormField
              control={formFinancial.control}
              name="bic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="outlined-field" placeholder="BIC" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* stripe account */}
            <FormField
              control={formFinancial.control}
              name="stripeAccount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="outlined-field" placeholder="Stripe account" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* action */}
          <Button
            loading={updateUser.isPending}
            className="w-full rounded-full"
            onClick={formFinancial.handleSubmit(onSubmitForm)}
          >
            Change financial details
          </Button>
        </Form>
      </section>
    </div>
  )
}
