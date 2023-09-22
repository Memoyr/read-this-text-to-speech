import React, { useContext, FormEvent, useState } from 'react'
import { StatusProvider } from './authStatus.provider'
import { AppContext } from './home'

interface TBProps {
  txtref: React.RefObject<HTMLTextAreaElement>
}

const TextBox: React.FC<TBProps> = ({ txtref }) => {
  const context = useContext(AppContext)
  const [content, setContent] = useState('')

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context

  const handleSubmit = () => {
    dispatch({
      type: 'read',
      textSent: txtref.current.value,
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
    if (txtref.current.value != '') {
      setContent(txtref.current.value)
    } else {
      setContent('')
    }
  }

  const handleBlur = (event: React.FocusEvent) => {
    if (txtref.current.value != '') {
      setContent(txtref.current.value)
    } else {
      setContent('')
    }
  }

  const handleClear = () => {
    // TODO
    txtref.current.value = ''
    setContent('')
    /*     audioRef.current.autoplay = false
    audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false)
    setEditDisabled(true) */
  }

  const handleEdit = () => {
    // TODO
    /* audioRef.current.src = ''
    setIsAudioDisabled(false)
    setIsAudioLoading(false) */
  }

  return (
    <>
      <StatusProvider>
        <div className="w-[100%]">
          <form className="w-[100%]">
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="copied" className="sr-only">
                  Text to read
                </label>
                <textarea
                  id="copied"
                  name="copied"
                  placeholder="Enter some text with a max of 3000 characters."
                  ref={txtref}
                  disabled={state.isAudioLoading}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <button
                    onClick={handleClear}
                    type="button"
                    className="text-xs inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    Clear
                    {/*           <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                    />
                  </svg>
                  <span className="sr-only">clear</span> */}
                  </button>
                  {/*                   <button
                    onClick={handleEdit}
                    type="button"
                    className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>{' '}
                    </svg>
                    <span className="sr-only">Edit</span>
                  </button> */}
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={state.isAudioLoading || content == ''}
                  className="read-btn disabled:pointer-events-none disabled:bg-gray-500 disabled:opacity-50 text-sm inline-flex items-center py-2.5 px-4  font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  {!state.isAudioLoading ? 'Read' : 'loading'}
                </button>
              </div>
            </div>
          </form>
          <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            Maximum 3000 characters per render{' '}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              more details
            </a>
            .
          </p>
        </div>
      </StatusProvider>
    </>
  )
}

export default TextBox
