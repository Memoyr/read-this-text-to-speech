import Head from 'next/head'
import EditIcon from '../svgs/editIcon.svg'

import styles from '../styles/Home.module.css'
import React, { useRef, useState, useContext, FormEvent } from 'react'
import Textarea from 'react-expanding-textarea'
import Signin from '@/components/signin'
import Header from '@/components/header'
import { StatusProvider, StatusContext } from './authStatus.provider'

const HomeContent = () => {
  const textareaRef = useRef(null)
  const audioRef = useRef(null)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioDisabled, setIsAudioDisabled] = useState(false)
  const [editDisabled, setEditDisabled] = useState(true)
  const [audioHash, setAudioHash] = useState(Date.now())
  const { status, data } = useContext(StatusContext)
  const apiAccessToken: string = data?.accessToken

  const handleSubmit = async (event: FormEvent) => {
    audioRef.current.src = ''
    readText(textareaRef.current.value)
  }

  const handleClear = () => {
    textareaRef.current.value = ''
    audioRef.current.autoplay = false
    audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
    setEditDisabled(true)
  }

  const handleEdit = () => {
    audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const readText = async (text) => {
    setIsAudioLoading(true)
    setIsAudioDisabled(true)

    const response = await fetch('/api/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        token: apiAccessToken,
      }),
    })

    if (!response.ok) {
      alert("there's probably an error of authentication")
      //throw new Error("Read api returned an error");
    }

    const data = await response.json()

    if (!data) {
      //throw new Error("Read api returned empty");
      alert('please enter paste some text')
      return
    }
    setAudioHash(Date.now())
    writeMp3(data)
  }

  const writeMp3 = async (base64MP3) => {
    const response = await fetch('/api/toMP3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64MP3,
      }),
    })

    if (!response) {
      throw new Error('ToMP3 api returned an error')
    }
    const data = await response.json()

    if (!data) {
      throw new Error('Write MP3 empty')
    }

    setIsAudioLoading(true)
    setIsAudioDisabled(true)
    setTimeout(() => {
      // TODO know when audiofile ready, in case of longer process

      if (audioRef.current !== null) {
        audioRef.current.src = `./audio/audio.mp3?${audioHash}`
        audioRef.current.autoplay = true
        setIsAudioLoading(false)
        setEditDisabled(false)
      }
    }, 1000)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Read this!</title>
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
          <svg className="h-24" role="img" aria-label="Read me this!">
            <title>Read me this!</title>
            <desc>A text image that says 'Read me this!'</desc>
            <text
              x="10"
              y="50"
              fill="black"
              fontSize="55"
              fontFamily="Marker Felt"
            >
              Read me this!
            </text>
          </svg>
        </h1>

        <p className={styles.description}>This is a text-to-speech tool.</p>

        {status != 'authenticated' && (
          <>
            <p>You need to get authentication</p>
            <Signin />
          </>
        )}
        {status === 'authenticated' && (
          <>
            <p>Keayboard Shortcuts: Command: Read - Keybinding:Shift+Enter</p>
            <div className={styles.containerCopyText}>
              <form className={styles.formGroup}>
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

      <footer className={styles.footer}>
        <div className={styles.audioPlayerContainer}>
          <audio
            className={styles.audioPlayer}
            src={''}
            controls
            ref={audioRef}
          />
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
