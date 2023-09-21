import styles from '../styles/signin.module.css'
import { StatusContext, StatusProvider } from './authStatus.provider'
import { useContext, useState, useEffect } from 'react'
import Player from '@/components/player'

interface AudioProps {
  toRead: string
  audioref: any // tempo
}

const AudioContent: React.FC<AudioProps> = ({ audioref, toRead }) => {
  const { status, data } = useContext(StatusContext)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioDisabled, setIsAudioDisabled] = useState(false)
  const [audioHash, setAudioHash] = useState(Date.now())
  const [start, setStart] = useState(false)
  const [trackurl, setTrackurl] = useState('')
  const [extractTitle, setExtractTitle] = useState('')

  const apiAccessToken: string = data?.accessToken

  useEffect(() => {
    if (toRead != '') {
      readText(toRead)
      setExtractTitle(toRead.slice(0, 45))
    }
  }, [toRead])

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
      setTrackurl(`./audio/audio.mp3?${audioHash}`)

      /*       if (audioRef.current !== null) {
        audioRef.current.src = `./audio/audio.mp3?${audioHash}`
        audioRef.current.autoplay = true

        setIsAudioLoading(false)
        setEditDisabled(false)
      } */
    }, 1000)
    //trackurl = `./audio/audio.mp3?${audioHash}`
    setStart(true)
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

  return (
    <>
      {status != 'authenticated' && <></>}
      {status === 'authenticated' && (
        <>
          {/*           <audio
            className={styles.audioPlayer}
            src={''}
            controls
            ref={audioref}
          /> */}
          <Player src={trackurl} shouldPlay={start} title={extractTitle} />
        </>
      )}
    </>
  )
}

const Audio = ({ aref, txt }) => {
  return (
    <StatusProvider>
      <AudioContent audioref={aref} toRead={txt} />
    </StatusProvider>
  )
}

export default Audio
