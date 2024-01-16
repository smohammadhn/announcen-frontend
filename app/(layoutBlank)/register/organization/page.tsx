'use client'
import './page.scss'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import CitySelectField from '@/components/ui/CitySelectField'
import { toast } from '@/components/ui/use-toast'
import authService from '@/services/authService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email().min(1, 'Required'),
  password: z.string().min(1, 'Required').min(6).max(255),

  iban: z.string().min(1, 'Required').min(20).max(24),
  bic: z.string().min(1, 'Required').min(5).max(30),
  name: z.string().min(1, 'Required').min(3).max(500),

  address: z.string().min(3).max(500).optional().or(z.literal('')),
  postalCode: z.string().length(4, 'Please enter exactly 4 digits').optional().or(z.literal('')),
  city: z.number().optional().or(z.literal('')),
  homepage: z.string().min(5).max(50).optional().or(z.literal('')),
  description: z.string().min(10).max(150).optional().or(z.literal('')),

  stripeAccount: z.string().min(5).max(30).optional().or(z.literal('')),
})

export type Organization = z.infer<typeof formSchema> & { _id: string }

export default function Account() {
  const createOrganization = authService.createOrganization(() => {
    toast({
      title: 'Organization created Successfully',
    })
  })

  const form = useForm<Organization>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      address: '',
      postalCode: '',
      city: '',
      homepage: '',
      description: '',
      iban: '',
      bic: '',
      stripeAccount: '',
    },
  })

  // methods
  const onSubmitForm = (data: Organization) => {
    createOrganization.mutate(data)
  }

  return (
    <div className="page-register-org contained">
      <section className="section-filler">
        <h1 className="title">Lorem ipsum is simply</h1>
        <p className="subtitle">Lorem ipsum is simply</p>
      </section>

      <section className="section-form">
        {/* account details section */}
        <section>
          <h2>Account details</h2>

          {/* form */}
          <Form {...form}>
            <form>
              {/* email */}
              <FormField
                control={form.control}
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

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="outlined-field" type="password" placeholder="Enter a Password" {...field} />
                    </FormControl>
                    <FormMessage>
                      This password helps us identify you if you need to edit your data in the future.
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>

        {/* about organization section */}
        <section>
          <h2>About your organization</h2>

          {/* form */}
          <Form {...form}>
            <form>
              <div className="grid-col-2">
                {/* org name */}
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          inputMode="numeric"
                          pattern="\d*"
                          className="outlined-field"
                          placeholder="Postal Code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* city */}
                <CitySelectField<Organization>
                  form={form}
                  formFieldName="city"
                  outlined
                  onSelect={(cityId) => {
                    form.setValue('city', cityId)
                  }}
                />

                {/* homepage */}
                <FormField
                  control={form.control}
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
                control={form.control}
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
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Description of your organization (max 150 words)"
                        className="resize-none outlined-textarea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>

        {/* Financial information section */}
        <section>
          <h2>Financial information</h2>

          {/* form */}
          <Form {...form}>
            <form>
              {/* email */}
              <FormField
                control={form.control}
                name="iban"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="outlined-field" type="text" placeholder="Bank account (IBAN)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* bic */}
              <FormField
                control={form.control}
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
                control={form.control}
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
              loading={createOrganization.isPending}
              className="w-full rounded-full"
              onClick={form.handleSubmit(onSubmitForm)}
            >
              Register as a non-profit org.
            </Button>
          </Form>
        </section>
      </section>
    </div>
  )
}
