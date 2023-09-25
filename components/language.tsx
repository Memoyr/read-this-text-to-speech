import { LanguageTags } from '@/types/app'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './home'

const LanguageMenu: React.FC = () => {
  const context = useContext(AppContext)
  const [selectedValue, setSelectedValue] = useState('default')

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context
  const sortedLanguageTags = [...LanguageTags].sort((a, b) =>
    a.description.localeCompare(b.description)
  )

  useEffect(() => {
    setSelectedValue('default')
  }, []) // Empty dependency array means this effect runs once on mount

  const handleOnChange = (e) => {
    dispatch({
      type: 'lang',
      language: sortedLanguageTags[e.target.value]?.tag,
    })
    setSelectedValue(e.target.value)
  }

  return (
    <>
      <label
        htmlFor="languages"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        onChange={handleOnChange}
        value={selectedValue}
        id="languages"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="default">Choose a language</option>
        {sortedLanguageTags.map((languageTag, index) => (
          <option value={index} key={index}>
            {languageTag.description}
          </option>
        ))}
      </select>
    </>
  )
}

export default LanguageMenu
