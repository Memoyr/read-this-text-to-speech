import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import Menu from '@/components/menu'
import { useRouter } from 'next/router'
import React from 'react'

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-blue-500 text-white w-full">
      <Link href="/">Logo</Link>
      <nav className="align-self-right flex items-center">
        <Link
          href="/about"
          className={router.pathname === '/about' ? 'l-active' : ''}
        >
          About
        </Link>
        <Menu />
      </nav>
      <button className="lg:hidden">
        <FaBars size={24} />
      </button>
    </header>
  )
}
