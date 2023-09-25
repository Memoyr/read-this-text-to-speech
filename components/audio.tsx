import styles from '../styles/signin.module.css'
import { StatusContext, StatusProvider } from './authStatus.provider'
import { useContext, useState, useEffect } from 'react'
import Player from '@/components/player'
import { AppContext } from './home'

interface AudioProps {
  audioref: any // tempo
}

const AudioContent: React.FC<AudioProps> = ({ audioref }) => {
  const { status, data } = useContext(StatusContext)
  const [audioHash, setAudioHash] = useState(Date.now())
  const apiAccessToken: string = data?.accessToken

  const context = useContext(AppContext)

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context

  useEffect(() => {
    if (state.reRun && state.textSent != null) {
      readText(state.textSent)
    }
  }, [state.textSent, state.reRun])

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

    setTimeout(() => {
      dispatch({
        type: 'ready',
        url: `./audio/audio.mp3?${audioHash}`,
      })

      /*       if (audioRef.current !== null) {
        audioRef.current.src = `./audio/audio.mp3?${audioHash}`
        audioRef.current.autoplay = true

        setIsAudioLoading(false)
        setEditDisabled(false)
      } */
    }, 1000)
  }

  const readText = async (text) => {
    const response = await fetch('/api/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: text,
        token: apiAccessToken,
        voice: state.voice,
      }),
    })

    if (!response.ok) {
      throw new Error('Read api returned an error')
    }

    const data = await response.json()

    if (!data) {
      throw new Error('Read api returned empty')
    }
    setAudioHash(Date.now())
    writeMp3(data)
  }

  return (
    <>
      {status != 'authenticated' && <></>}
      {status === 'authenticated' && (
        <>
          <Player />
        </>
      )}
    </>
  )
}

const Audio = ({ aref }) => {
  return (
    <StatusProvider>
      <AudioContent audioref={aref} />
    </StatusProvider>
  )
}

export default Audio
