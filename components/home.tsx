import Head from 'next/head'

import styles from '../styles/Home.module.css'
import React, { useRef, useContext, useReducer, createContext } from 'react'
import Signin from '@/components/signin'
import Header from '@/components/header'
import Audio from '@/components/audio'
import Textbox from '@/components/textbox'
import { IAppContext, IAppState, appReducer } from '@/store/app-reducer'

import { StatusProvider, StatusContext } from './authStatus.provider'

const initialAppState: IAppContext = {
  isAudioDisabled: true,
  isAudioLoading: false,
}

export const AppContext = createContext<IAppState | undefined>(undefined)

const HomeContent = () => {
  const textareaRef = useRef(null)
  const audioRef = useRef(null)
  const { status, data } = useContext(StatusContext)
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={styles.container}>
        <Head>
          <title>Read that!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {status == 'authenticated' && (
          <>
            <header className={styles.header}></header>
          </>
        )}
        <main className={` w-[100%] max-w-prose ${styles.main}`}>
          <h1 className="mt-8">
            <svg className="h-24" role="img" aria-label="Read that!">
              <title>Read that!</title>
              <desc>A text image that says 'Read that!'</desc>
              <text
                x="10"
                y="50"
                fill="black"
                fontSize="55"
                fontFamily="Marker Felt"
              >
                Read that!
              </text>
            </svg>
          </h1>

          <p className="text-center max-w-lg text-2xl font-semibold leading-loose text-gray mb-10">
            This is a text-to-speech tool.
          </p>

          {status != 'authenticated' && (
            <>
              <Signin asButton={true} />
            </>
          )}
          {status === 'authenticated' && (
            <>
              <p className="text-sm p-10">
                Keayboard Shortcuts: Command: Read - Keybinding:Shift+Enter
              </p>

              <Textbox txtref={textareaRef} />
            </>
          )}
        </main>
        <Audio aref={audioRef} />

        <footer>
          <div>
            <a
              href="https://github.com/Memoyr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by @memoyr
            </a>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}

const Home = () => {
  return (
    <StatusProvider>
      <HomeContent />
    </StatusProvider>
  )
}

export default Home
