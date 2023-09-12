import { signIn, signOut } from 'next-auth/react'
import styles from '../styles/signin.module.css'
import { StatusContext, StatusProvider } from './authStatus.provider'
import { useContext } from 'react'

const SigninContent = () => {
  const { status } = useContext(StatusContext)
  return (
    <>
      {status != 'authenticated' && (
        <>
          <a
            href={`/api/auth/signin`}
            className={styles.buttonPrimary}
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign in
          </a>
        </>
      )}
      {status === 'authenticated' && (
        <>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Log out
          </a>
        </>
      )}
    </>
  )
}

const Signin = () => {
  return (
    <StatusProvider>
      <SigninContent />
    </StatusProvider>
  )
}

export default Signin
