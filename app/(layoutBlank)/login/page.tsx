'use client'

import './styles.scss'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import LoginForm from '@/components/forms/LoginForm'
import RegisterForm from '@/components/forms/RegisterForm'

import { usePathname } from 'next/navigation'

export default function LoginPage() {
  const onRegisterPage = usePathname() === '/register'

  return (
    <div className="page-login contained">
      <section className="page-login__filler">
        <h1 className="title">Lorem ipsum is simply</h1>
        <p className="subtitle">Lorem ipsum is simply</p>
      </section>

      <section className="page-login__form">
        <Image
          className="logo"
          src="/logos/Logo.svg"
          width={75}
          height={75}
          alt="website logo"
        />

        <h2 className="page-login__welcome">Welcome to Announcen</h2>

        <div className="page-login__tab-bar">
          <Button
            asChild
            variant={!onRegisterPage ? 'default' : 'ghost'}
            className={['rounded-full', onRegisterPage && 'ghost'].join(' ')}
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            variant={onRegisterPage ? 'default' : 'ghost'}
            className={['rounded-full', !onRegisterPage && 'ghost'].join(' ')}
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <p className="page-login__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {onRegisterPage ? <RegisterForm /> : <LoginForm />}
      </section>
    </div>
  )
}
