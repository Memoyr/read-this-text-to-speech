import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useRef,
  useCallback,
} from 'react'

const useAudio = (
  url: string,
  shouldPlay: boolean,
  progressBarRef: React.RefObject<HTMLInputElement>
): [
  boolean,
  MouseEventHandler | undefined,
  number,
  number,
  React.RefObject<HTMLAudioElement>
] => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [timeProgress, setTimeProgress] = useState(0)

  const toggle: MouseEventHandler = () => setPlaying(!playing)
  const playAnimationRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(audio)

  const repeat = useCallback(() => {
    if (audio && progressBarRef.current) {
      const currentTime = audio.currentTime
      setTimeProgress(currentTime)
      progressBarRef.current.value = currentTime.toString()
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(Number(progressBarRef.current.value) / duration) * 100 - 15}%`
      )

      playAnimationRef.current = requestAnimationFrame(repeat)
    }
  }, [audio, duration, progressBarRef, setTimeProgress])

  useEffect(() => {
    if (url) {
      setAudio(new Audio(url))
    }
  }, [url])

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause()
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [playing, audio, repeat])

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setPlaying(false))

      return () => {
        audio.removeEventListener('ended', () => setPlaying(false))
      }
    }
  }, [audio])

  useEffect(() => {
    if (audio) {
      const handleMetadataLoaded = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener('loadedmetadata', handleMetadataLoaded)

      return () => {
        audio.removeEventListener('loadedmetadata', handleMetadataLoaded)
      }
    }
  }, [audio, duration])

  useEffect(() => {
    if (shouldPlay) {
      setPlaying(true)
    } else {
      setPlaying(false)
    }
  }, [shouldPlay, audio])

  useEffect(() => {
    if (audio && playing) {
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      return () => {
        //audio.removeEventListener('ended', () => setPlaying(false))
      }
    }
  }, [audio, duration, currentTime])

  return [playing, toggle, duration, currentTime, audioRef]
}

interface PlayerProps {
  src: string
  shouldPlay: boolean
  title: string
}

const Player: React.FC<PlayerProps> = ({ src, shouldPlay, title }) => {
  const progressBarStyleRef = useRef<HTMLSpanElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  const [playing, toggle, duration, currentTime, audioRef] = useAudio(
    src,
    shouldPlay,
    progressBarRef
  )
  const getDateAndVersion = () => {
    const date = new Date()
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const month = monthNames[monthIndex]

    const version = '1.0.0' // TODO

    return {
      date: `${day} ${month} ${year}`,
      version: ` ${version}`,
    }
  }

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const seconds = Math.floor(time % 60)
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${formatMinutes}:${formatSeconds}`
    }
    return '00:00'
  }

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO - needed ?
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(event.target.value)
    }
  }

  const handleProgressClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    // TODO
    /*     if (progressBarRef.current && audioRef.current) {
      const rect = progressBarStyleRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const progress = x / rect.width
      const newTime = progress * audioRef.current.duration
      audioRef.current.currentTime = newTime
    } */
  }

  return (
    <>
      <section className="flex w-full items-center justify-center my-3.5">
        <article
          className={`group relative flex h-[12rem] w-[50rem] overflow-hidden  rounded-r-xl bg-[#3a4448] ${
            !src ? ' pointer-events-none' : ''
          }`}
        >
          <aside className="absolute right-0 flex h-full flex-col justify-center space-y-8 p-3">
            <a href={src.replace(/\?.*$/, '')} download="audio">
              <svg
                className="invisible h-7 w-7 text-stone-200 opacity-0 transition-all hover:scale-[120%] hover:text-white group-hover:visible group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </a>
          </aside>

          <div className="absolute inset-y-0 left-0 w-48">
            <img
              src="https://unsplash.it/id/185/640/425"
              alt=""
              className="h-full w-full object-cover object-center opacity-95"
            />

            <button
              disabled={!src}
              onClick={toggle}
              className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#0c0c0c]/70 opacity-100 transition-all  disabled:pointer-events-none"
            >
              {playing && (
                <>
                  <svg
                    className="h-w-24 w-24 cursor-pointer text-white transition-all hover:text-yellow-400"
                    stroke="currentColor"
                    height="48"
                    viewBox="0 -960 960 960"
                    width="48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M400-320q17 0 28.5-11.5T440-360v-240q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v240q0 17 11.5 28.5T400-320Zm160 0q17 0 28.5-11.5T600-360v-240q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v240q0 17 11.5 28.5T560-320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </>
              )}
              {!playing && (
                <>
                  <svg
                    className={`h-w-14 w-14 cursor-pointer text-white transition-all hover:text-yellow-400 ${
                      !src ? ' opacity-25' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="absolute inset-y-0 left-44 w-[39rem] overflow-hidden rounded-2xl transition-all group-hover:w-[36rem]">
            <div
              style={{
                backgroundImage: "url('https://unsplash.it/id/185/640/425')",
              }}
              className="h-full w-full bg-cover bg-center"
            >
              <div className="h-full w-full bg-[#455055]/80 transition-all group-hover:bg-[#31383b]/80"></div>
            </div>

            <section className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              <header className="space-y-1">
                <div className="text-3xl font-medium truncate">{title}</div>

                {src && (
                  <>
                    <div className="text-sm">
                      Version: {getDateAndVersion().version}
                    </div>
                  </>
                )}
                {/*             <div className="text-sm">
                        mapped by
                        <a
                          href="#"
                          className="text-[#96bacc] transition-all hover:text-yellow-400"
                        >
                          something
                        </a>
                      </div>  */}
              </header>

              <div className="flex space-x-3">
                {src && (
                  <>
                    <span className="flex items-center space-x-1">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>{getDateAndVersion().date}</div>
                    </span>
                  </>
                )}
              </div>

              <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
              />

              <div className="flex">
                <div className="flex-none">{formatTime(currentTime)} </div>
                <span
                  className="rounded-full bg-green-800 px-2 font-medium text-white w-full flex-auto mx-2"
                  ref={progressBarStyleRef}
                  onClick={handleProgressClick}
                >
                  <span
                    className="absolute h-6  rounded-full bg-green-500 px-0  font-medium opacity-75 w-[var(--range-progress)]  ml-[-7px]"
                    ref={progressBarRef}
                  ></span>
                  <div className="flex justify-end">{formatTime(duration)}</div>
                </span>
              </div>
            </section>
          </div>
        </article>
      </section>
    </>
  )
}

export default Player
