import './styles.scss'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import LoginForm from '@/components/forms/LoginForm'

export default function Home() {
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
          <Button asChild className="rounded-full">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="rounded-full login-tabbar-btn"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <p className="page-login__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <LoginForm />
      </section>
    </div>
  )
}
