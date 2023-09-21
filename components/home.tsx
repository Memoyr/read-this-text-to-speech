import Head from 'next/head'
import EditIcon from '../svgs/editIcon.svg'

import styles from '../styles/Home.module.css'
import React, { useRef, useState, useContext, FormEvent } from 'react'
import Textarea from 'react-expanding-textarea'
import Signin from '@/components/signin'
import Header from '@/components/header'
import Audio from '@/components/audio'
import Textbox from '@/components/textbox'

import { StatusProvider, StatusContext } from './authStatus.provider'

const HomeContent = () => {
  const textareaRef = useRef(null)
  const audioRef = useRef(null)
  const { status, data } = useContext(StatusContext)
  const [editDisabled, setEditDisabled] = useState(true)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioDisabled, setIsAudioDisabled] = useState(false)
  const [textSent, setTextSent] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    //audioRef.current.src = ''
    setTextSent(textareaRef.current.value)
    console.log(textSent)
    //readText(textareaRef.current.value)
  }

  const handleClear = () => {
    textareaRef.current.value = ''
    /*     audioRef.current.autoplay = false
    audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
    setEditDisabled(true) */
  }

  const handleEdit = () => {
    /* audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false) */
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
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
      <main className={styles.main}>
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

        {/*         <p className={styles.description}>This is a text-to-speech tool.</p>
         */}
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
            {/*             <Textbox />
             */}{' '}
            <p>Keayboard Shortcuts: Command: Read - Keybinding:Shift+Enter</p>
            <div className={styles.containerCopyText}>
              <form className={styles.formGroup}>
                {
                  <Textarea
                    className={styles.textArea}
                    defaultValue=""
                    id="copied"
                    name="copied"
                    placeholder="Enter some text with a max of 3000 characters."
                    ref={textareaRef}
                    disabled={isAudioDisabled}
                    onKeyDown={handleKeyDown}
                  />
                }

                <div className={styles.entryGroup}>
                  <button
                    className={[
                      styles.button,
                      styles.buttonPrimary,
                      isAudioDisabled && styles.buttonDisabled,
                    ]
                      .filter((e) => !!e)
                      .join(' ')}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isAudioDisabled}
                  >
                    {!isAudioLoading ? 'Read' : 'loading'}
                  </button>

                  <div className={styles.buttonGroup}>
                    <a
                      className={[
                        styles.button,
                        editDisabled && styles.buttonDisabled,
                      ]
                        .filter((e) => !!e)
                        .join(' ')}
                      onClick={handleEdit}
                    >
                      <EditIcon className={styles.editIcon} />
                    </a>
                    <a
                      className={[
                        styles.button,
                        styles.buttonSecondary,
                        editDisabled && styles.buttonDisabled,
                      ]
                        .filter((e) => !!e)
                        .join(' ')}
                      onClick={handleClear}
                    >
                      Clear
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </main>
      <Audio aref={audioRef} txt={textSent} />

      <footer>
        <div className={styles.audioPlayerContainer}>
          {/*      <audio
            className={styles.audioPlayer}
            src={''}
            controls
            ref={audioRef}
          /> */}
        </div>
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
