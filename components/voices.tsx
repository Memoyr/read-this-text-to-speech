import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './home'
import { StatusContext } from './authStatus.provider'

const VoicesMenu: React.FC = () => {
  const context = useContext(AppContext)
  const { status, data } = useContext(StatusContext)
  const [voiceList, setVoiceList] = useState([])
  const [selectedValue, setSelectedValue] = useState('default')
  const apiAccessToken: string = data?.accessToken

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context

  useEffect(() => {
    setSelectedValue('default')
  }, []) // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (state.language) {
      getVoices(state.language)
      setSelectedValue('default')
    }
  }, [state.language])

  const handleOnChange = (e) => {
    dispatch({
      type: 'voice',
      voice: voiceList[e.target.value],
    })
    setSelectedValue(e.target.value)
  }

  const getVoices = async (tag) => {
    const response = await fetch(`/api/voices`, {
      method: 'POST',
      body: JSON.stringify({
        languageCode: tag,
        token: apiAccessToken,
      }),
    })
    if (!response.ok) {
      throw new Error('Lang list returned an error')
    }

    const data = await response.json()

    if (!data) {
      throw new Error('Lang list returned empty')
    }
    setVoiceList(data)
  }

  return (
    <>
      <label
        htmlFor="languages"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray mr-auto pt-4"
      >
        Select a voice
      </label>
      <select
        onChange={handleOnChange}
        value={selectedValue}
        id="voices"
        className=" mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="default">-</option>
        {voiceList.map((voice, index) => (
          <option value={index} key={index}>
            {voice.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default VoicesMenu
