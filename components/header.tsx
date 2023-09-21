import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import Menu from '@/components/menu'
import { useRouter } from 'next/router'
import React from 'react'

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-8 py-4 text-black w-full">
      <Link href="/">
        <svg
          width="97"
          height="88"
          viewBox="0 0 97 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.71594"
            width="49.5444"
            height="75.0569"
            rx="24.7722"
            transform="rotate(1.31 1.71594 0)"
            fill="#5F8BFF"
          />
          <rect
            x="14.3098"
            y="52.1749"
            width="65.019"
            height="52.7439"
            rx="22"
            transform="rotate(-48.0543 14.3098 52.1749)"
            fill="#00FF85"
          />
          <rect
            x="2.45227"
            y="40.5416"
            width="54.3458"
            height="56.0909"
            rx="7"
            transform="rotate(-47.2793 2.45227 40.5416)"
            fill="black"
          />
          <path
            d="M44.3013 19.4549C43.8062 7.07275 38.7146 7.43952 38.4119 20.5063C38.2542 27.312 38.0713 44.236 38.6011 57.4871C39.131 70.7382 44.8706 65.9396 44.5231 57.2503C44.6555 49.8111 44.7964 31.8371 44.3013 19.4549Z"
            fill="#00FD47"
          />
          <path
            d="M44.5454 37.0229C43.917 29.7513 38.842 30.2863 38.682 38.0116C38.5987 42.0353 38.6001 52.028 39.2727 59.8099C39.9452 67.5919 45.6184 64.4025 45.1774 59.2996C45.2286 54.9039 45.1738 44.2946 44.5454 37.0229Z"
            fill="#9FFFBA"
          />
          <ellipse
            cx="50.9593"
            cy="38.3773"
            rx="3.68408"
            ry="15.6573"
            fill="#5F8BFF"
          />
          <path
            d="M54.0294 43.2894C54.0294 47.5283 52.7923 50.9646 51.2664 50.9646C49.7404 50.9646 48.5033 47.5283 48.5033 43.2894C48.5033 39.0505 49.7404 35.6143 51.2664 35.6143C52.7923 35.6143 54.0294 39.0505 54.0294 43.2894Z"
            fill="#A2BCFF"
          />
          <ellipse
            cx="60.0911"
            cy="38.2873"
            rx="2.9916"
            ry="6.35714"
            fill="#05E142"
          />
          <circle cx="60.1417" cy="41.7903" r="2.76306" fill="#B7FFCB" />
        </svg>
      </Link>
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
