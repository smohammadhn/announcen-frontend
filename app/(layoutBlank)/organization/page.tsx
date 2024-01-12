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

const formDetailsSchema = z.object({
  email: z.string().email().min(1, 'Required'),
})

const formOrganizationSchema = z.object({
  name: z.string().min(3).max(50).optional().or(z.literal('')),
  address: z.string().min(3).max(500).optional().or(z.literal('')),
  postalCode: z.string().min(3).max(20).optional().or(z.literal('')),
  city: z.number().optional().or(z.literal('')),
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

export type IOrganizationPayload = FormDetails | FormOrganization | FormFinancial

export default function Organization() {
  const createOrganization = authService.createOrganization(() => {
    toast({
      title: 'Organization created Successfully',
    })
  })

  const formDetails = useForm<FormDetails>({
    mode: 'all',
    resolver: zodResolver(formDetailsSchema),
    defaultValues: {
      email: '',
    },
  })

  const formOrganization = useForm<FormOrganization>({
    mode: 'all',
    resolver: zodResolver(formOrganizationSchema),
    defaultValues: {
      name: '',
      address: '',
      postalCode: '',
      city: '',
      homepage: '',
      description: '',
    },
  })

  const formFinancial = useForm<FormFinancial>({
    mode: 'all',
    resolver: zodResolver(formFinancialSchema),
    defaultValues: {
      iban: '',
      bic: '',
      stripeAccount: '',
    },
  })

  // methods
  // Partial<FormDetails> adds email optionally
  const onSubmitForm = (data: IOrganizationPayload) => {
    console.log('data :>> ', data)
    // createOrganization.mutate(data)
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
              loading={createOrganization.isPending}
              className="w-full rounded-full"
              onClick={formDetails.handleSubmit(onSubmitForm)}
            >
              Change account details
            </Button>
          </Form>
        </section>

        {/* about organization section */}
        <section>
          <h2>About your organization</h2>

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
                <CitySelectField<FormOrganization>
                  form={formOrganization}
                  formFieldName="city"
                  outlined
                  onSelect={(cityId) => {
                    formOrganization.setValue('city', cityId)
                  }}
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

            {/* action */}
            <Button
              loading={createOrganization.isPending}
              className="w-full rounded-full"
              onClick={formOrganization.handleSubmit(onSubmitForm)}
            >
              Change organization details
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
              loading={createOrganization.isPending}
              className="w-full rounded-full"
              onClick={formFinancial.handleSubmit(onSubmitForm)}
            >
              Change financial details
            </Button>
          </Form>
        </section>
      </section>
    </div>
  )
}
