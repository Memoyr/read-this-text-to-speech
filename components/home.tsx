import Head from 'next/head'

import styles from '../styles/Home.module.css'
import React, { useRef, useContext, useReducer, createContext } from 'react'
import Signin from '@/components/signin'
import Header from '@/components/header'
import Audio from '@/components/audio'
import Textbox from '@/components/textbox'
import { appReducer } from '@/store/app-reducer'

import { StatusProvider, StatusContext } from './authStatus.provider'
import LanguageMenu from './language'
import { IAppContext, IAppState } from '@/types/app'
import VoicesMenu from './voices'

const initialAppState: IAppContext = {
  isAudioDisabled: true,
  isAudioLoading: false,
  reRun: false,
}

export const AppContext = createContext<IAppState | undefined>(undefined)

const HomeContent = () => {
  const textareaRef = useRef(null)
  const audioRef = useRef(null)
  const { status, data } = useContext(StatusContext)
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={` w-full px-2.5 ${styles.container}`}>
        <Head>
          <title>Read that!</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        {status == 'authenticated' && (
          <>
            <header className={styles.header}></header>
          </>
        )}
        <main
          className={` w-full md:w-[60%] lg:w-[50%] xxl:w-[30%] ${styles.main}`}
        >
          <h1 className={styles.slogan}>READ THAT!</h1>

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

              <LanguageMenu />
              <VoicesMenu />
              <Textbox txtref={textareaRef} />
            </>
          )}
        </main>
        <Audio aref={audioRef} />

        <footer className="px-2 text-xs h-16 mt-16">
          <a
            href="https://github.com/Memoyr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by @memoyr
          </a>
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
