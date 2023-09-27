import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from './button'
import Slider from './slider'
import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AppContext } from './home'

export enum SpeedOptions {
  Normal = 1,
  Speed125 = 1.25,
  Speed150 = 1.5,
  Speed200 = 2,
}
export const speedOptions = [
  { label: '1', value: SpeedOptions.Normal },
  { label: '1.25', value: SpeedOptions.Speed125 },
  { label: '1.5', value: SpeedOptions.Speed150 },
  { label: '2', value: SpeedOptions.Speed200 },
]

const Player2: React.FC = React.forwardRef(function Player2(
  props: { className?: string },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { className = '', ...other } = props
  //const [playing, toggle, duration, currentTime, audioRef] = useAudio()
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [timeProgress, setTimeProgress] = useState(0)
  const [speed, setSpeed] = useState(SpeedOptions.Normal)

  const toggle: MouseEventHandler = () => setPlaying(!playing)
  const playAnimationRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement>(audio)
  const [progressValue, setProgressValue] = React.useState<number>(30)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleSpeedClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const context = useContext(AppContext)

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context

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

  const repeat = useCallback(() => {
    if (audio) {
      const currentTime = audio.currentTime
      setTimeProgress(currentTime)

      setProgressValue((currentTime / duration) * 4550)

      playAnimationRef.current = requestAnimationFrame(repeat)
    }
  }, [audio, duration, setProgressValue, setTimeProgress])

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause()
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [playing, audio, repeat])

  useEffect(() => {
    if (state.url) {
      setAudio(new Audio(state.url))
    }
  }, [state.url])

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
    if (state.url) {
      setPlaying(true)
    } else {
      setPlaying(false)
    }
  }, [state.url, audio])

  useEffect(() => {
    if (audio && playing) {
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      return () => {
        audio.removeEventListener('timeupdate', () => setPlaying(false))
      }
    }
  }, [audio, duration, currentTime])

  const handleProgressChange = (event: Event, newValue: number | number[]) => {
    const newTime = ((newValue as number) * duration) / 4550
    if (audio) {
      audio.currentTime = newTime
    }
    setProgressValue(newValue as number)
    setTimeProgress(newValue as number)
  }

  const position = (action: 'skip' | 'rewind') => () => {
    if (audio) {
      if (action === 'skip') {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5)
      } else if (action === 'rewind') {
        audio.currentTime = Math.max(0, audio.currentTime - 5)
      }
    }
  }
  const changeSpeed = (newSpeed: SpeedOptions) => {
    if (audio) {
      audio.playbackRate = newSpeed
    }
    setSpeed(newSpeed)
  }

  return (
    <div
      className={`md:w-[60%] lg:w-[50%] xxl:w-[30%] max-h-[240px] m-auto ${className}`}
      {...other}
      ref={ref}
    >
      <div className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-2 pb-3 sm:p-5 sm:pb-4 lg:p-3 xl:p-5 xl:pb-4 space-y-6 sm:space-y-4 lg:space-y-3 xl:space-y-4">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-auto space-y-1 font-semibold">
            {state.url && (
              <>
                <p className="text-[#608bff] dark:text-[#608bff] text-sm leading-6">
                  {getDateAndVersion().date} - &nbsp;
                  <abbr title="Episode">Take</abbr> # 128
                  {getDateAndVersion().version}
                </p>

                <p className="text-slate-900 dark:text-slate-50 text-lg">
                  {state.trackTitle}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="">
          <div className="relative">
            <Slider
              step={100}
              defaultValue={0}
              max={4550}
              min={0}
              aria-label="Audio"
              value={progressValue}
              onChange={handleProgressChange}
            />
          </div>
          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div className="text-[#608bff] dark:text-slate-100">
              {formatTime(currentTime)}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <a
            href={state.url?.replace(/\?.*$/, '')}
            download="audio"
            className="ml-8"
          >
            <svg
              className="h-7 w-7 text-stone-200 hover:text-[#608bff] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </a>

          <Button
            aria-label="Rewind 10 seconds"
            onClick={position('rewind')}
            className="ml-auto mr-auto"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 5v3.111c0 .491.398.889.889.889H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <Button
          disabled={!state.url}
          onClick={toggle}
          className="  flex-none -my-2 mx-auto w-20 h-20 flex items-center justify-center"
          aria-label="Play-Pause"
        >
          {playing && (
            <>
              <svg
                className="h-w-24 w-24 cursor-pointer text-[#608bff] transition-all hover:text-[#96aae0]"
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
                className={`h-w-14 w-14 cursor-pointer text-[#608bff] transition-all hover:text-[#96aae0] ${
                  !state.url ? ' opacity-25' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </>
          )}
        </Button>
        <div className="flex-auto flex items-center justify-evenly">
          <Button
            aria-label="Skip 10 seconds"
            onClick={position('skip')}
            className="ml-auto mr-auto"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            aria-label="more"
            id="seed-button"
            aria-controls={open ? 'speed-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleSpeedClick}
            className="rounded-lg text-xs w-[60px] leading-6 font-semibold px-2 border-2 border-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500 hover:ring-[#608bff] mr-4"
          >
            {speed}x
          </Button>
          <Menu
            id="speed-menu"
            MenuListProps={{
              'aria-labelledby': 'speed-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {speedOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  changeSpeed(option.value)
                  handleClose()
                }}
              >
                {option.label}
              </MenuItem>
            ))}{' '}
          </Menu>
        </div>
      </div>
    </div>
  )
})

export default Player2
