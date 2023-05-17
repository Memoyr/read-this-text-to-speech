import Head from 'next/head';
import { FormEvent } from 'react'
import EditIcon from '../svgs/editIcon.svg'

import styles from '../styles/Home.module.css';
import React, { useRef } from 'react';
import Textarea from 'react-expanding-textarea';
import { useState } from 'react';
import { useSession } from "next-auth/react"
import Signin from '@/components/signin';


export default function Home() {
  const textareaRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioDisabled, setIsAudioDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(true);
  const [audioHash, setAudioHash] = useState(Date.now());
  const { status, data } = useSession();
  const apiAccessToken: string = data?.accessToken;


  const handleSubmit = async (event: FormEvent) => {
    audioRef.current.src = ""
    readText(textareaRef.current.value)
  }

  const handleClear = () => {
    textareaRef.current.value = ""
    audioRef.current.autoplay = false
    audioRef.current.src = ""
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
    setEditDisabled(true)
  }

  const handleEdit = () => {
    audioRef.current.src = ""
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
  }

  const readText = async (text) => {
    setIsAudioLoading(true)
    setIsAudioDisabled(true)

    const response = await fetch("/api/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        token: apiAccessToken
      })
    });

    if (!response.ok) {
      alert('there\'s probably an error of authentication')
      //throw new Error("Read api returned an error");
    }

    const data = await response.json();

    if (!data) {
      //throw new Error("Read api returned empty");
      alert('please enter paste some text')
      return
    }
    setAudioHash(Date.now())
    writeMp3(data)
  };


  const writeMp3 = async (base64MP3) => {
    const response = await fetch("/api/toMP3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        base64MP3
      })
    });

    if (!response) {
      throw new Error("ToMP3 api returned an error");
    }
    const data = await response.json();

    if (!data) {
      throw new Error("Write MP3 empty");
    }

    setIsAudioLoading(true)
    setIsAudioDisabled(true)
    setTimeout(() => { // TODO know when audiofile ready, in case of longer process

      if (audioRef.current !== null) {
        audioRef.current.src = `./audio/audio.mp3?${audioHash}`
        audioRef.current.autoplay = true
        setIsAudioLoading(false)
        setEditDisabled(false)
      }
    }, 1000)

  };


  return (

    <div className={styles.container}>
      <Head>
        <title>Read this!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}><Signin /></header>

      <main className={styles.main}>
        <h1 className={styles.title}>Read me this!</h1>

        <p className={styles.description}>This is a text-to-speech tool.</p>

        {status != "authenticated" && (
          <>
            <p>You need to sign in</p>
          </>
        )}
        {status === "authenticated" && (
          <>
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
                />

                <div className={styles.entryGroup}>            
                  <button className={[styles.button, styles.buttonPrimary, isAudioDisabled && styles.buttonDisabled].filter(e => !!e).join(' ')} type="button" onClick={handleSubmit} disabled={isAudioDisabled}>
                    {!isAudioLoading ? 'Read' : 'loading'}
                  </button> 

                  <div className={styles.buttonGroup}>
                     <a className={[styles.button,  editDisabled && styles.buttonDisabled].filter(e => !!e).join(' ')} onClick={handleEdit}>
                      <EditIcon className={styles.editIcon} />
                    </a> 
                    <a className={[styles.button,styles.buttonSecondary, editDisabled && styles.buttonDisabled].filter(e => !!e).join(' ')} onClick={handleClear}>Clear</a>
                  </div>
                </div>

              </form>

            </div>
          </>
        )}


      </main>

      <footer className={styles.footer}>
        <div className={styles.audioPlayerContainer}>
          <audio className={styles.audioPlayer} src={''}
            controls ref={audioRef} />
        </div>
        <div>
          <a href="https://github.com/Memoyr"
            target="_blank"
            rel="noopener noreferrer">
            Powered by @memoyr 
          </a>
        </div>
      </footer>

    </div>
  )
}
