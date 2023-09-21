import { signIn, signOut } from 'next-auth/react'
import styles from '../styles/signin.module.css'
import { StatusContext, StatusProvider } from './authStatus.provider'
import { useContext } from 'react'

const SigninContent = ({ useButton = false }) => {
  const { status } = useContext(StatusContext)
  return (
    <>
      {status != 'authenticated' && (
        <>
          <a
            href={`/api/auth/signin`}
            className={
              useButton
                ? 'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-xl px-5 py-2.5 text-center mr-2 mb-2'
                : ' normal'
            }
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

const Signin = ({ asButton }) => {
  return (
    <StatusProvider>
      <SigninContent useButton={asButton} />
    </StatusProvider>
  )
}

export default Signin
