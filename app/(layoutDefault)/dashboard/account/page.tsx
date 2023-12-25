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

const formDetailsSchema = z.object({
  email: z.string().email().min(1, 'Required'),
})

const formOrganizationSchema = z.object({
  name: z.string().email().min(3).max(50).nullable(),
  address: z.string().min(5).max(500).nullable(),
  postalCode: z.string().min(5).max(20).nullable(),
  city: z.string().min(3).max(20).nullable(),
  homepage: z.string().min(5).max(50).nullable(),
  description: z.string().min(5).max(150).nullable(),
})

const formFinancialSchema = z.object({
  iban: z.number().min(5).max(30).nullable(),
  bic: z.string().min(5).max(30).nullable(),
  stripeAccount: z.string().min(5).max(30).nullable(),
})

export type FormDetails = z.infer<typeof formDetailsSchema>
export type FormOrganization = z.infer<typeof formOrganizationSchema>
export type FormFinancial = z.infer<typeof formFinancialSchema>

export type UpdateUserPayload = FormDetails | FormOrganization | FormFinancial

export default function Account() {
  const { user, setUser } = useAuthStore()

  console.log('user :>> ', user)

  const updateUser = authService.updateUser((savedUser) => {
    setUser(savedUser)
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
    resolver: zodResolver(formDetailsSchema),
    defaultValues: {
      name: user.name || null,
      address: user.address || null,
      postalCode: user.postalCode || null,
      city: user.city || null,
      homepage: user.homepage || null,
      description: user.description || null,
    },
  })

  const formFinancial = useForm<FormFinancial>({
    mode: 'all',
    resolver: zodResolver(formDetailsSchema),
    defaultValues: {
      iban: user.iban || null,
      bic: user.bic || null,
      stripeAccount: user.stripeAccount || null,
    },
  })

  // methods
  const onSubmitForm = (data: UpdateUserPayload) => {
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
          <Button className="w-full rounded-full" type="submit">
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
                      <Input
                        {...field}
                        className="outlined-field"
                        placeholder="Organization name"
                        value={field.value || undefined}
                      />
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
                      <Input
                        {...field}
                        className="outlined-field"
                        placeholder="Postal Code"
                        value={field.value || undefined}
                      />
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
                      <Input
                        {...field}
                        className="outlined-field"
                        placeholder="Homepage"
                        value={field.value || undefined}
                      />
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
                    <Input
                      {...field}
                      className="outlined-field"
                      placeholder="Address (street and number)"
                      value={field.value || undefined}
                    />
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
                      value={field.value || undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* action */}
          <Button className="w-full rounded-full" type="submit">
            Change organisation details
          </Button>
        </Form>
      </section>

      {/* Financial information section */}
      <section>
        <h2>Financial information</h2>

        {/* form */}
        <Form {...formFinancial}>
          <form onSubmit={formFinancial.handleSubmit(onSubmitForm)}>
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
                      value={field.value || undefined}
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
                    <Input {...field} className="outlined-field" placeholder="BIC" value={field.value || undefined} />
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
                    <Input
                      {...field}
                      className="outlined-field"
                      placeholder="Stripe account"
                      value={field.value || undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          {/* action */}
          <Button className="w-full rounded-full" type="submit">
            Change financial details
          </Button>
        </Form>
      </section>
    </div>
  )
}
