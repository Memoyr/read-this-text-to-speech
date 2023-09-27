import { LanguageTags } from '@/types/app'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './home'
//import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const LanguageMenu: React.FC = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('ChildComponent must be used within a AppContext.Provider')
  }

  const { state, dispatch } = context
  const sortedLanguageTags = [...LanguageTags].sort((a, b) =>
    a.description.localeCompare(b.description)
  )
  const defaultLanguageIndex = sortedLanguageTags.findIndex(
    (languageTag) => languageTag.tag === 'en-US'
  )
  const [selectedValue, setSelectedValue] = useState(defaultLanguageIndex)

  useEffect(() => {
    dispatch({
      type: 'lang',
      language: sortedLanguageTags[selectedValue]?.tag,
    })
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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray mr-auto"
      >
        Choose a language
      </label>
      <select
        onChange={handleOnChange}
        value={selectedValue}
        id="languages"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {sortedLanguageTags.map((languageTag, index) => (
          <option value={index} key={index}>
            {languageTag.description}
          </option>
        ))}
      </select>
      {/* 
      
      // TODO use MUI & style
      <InputLabel id="languages-label">Language</InputLabel>

      <Select
        labelId="languages-label"
        id="languages"
        value={selectedValue}
        onChange={handleOnChange}
      >
        <MenuItem value="default">Choose a language</MenuItem>
        {sortedLanguageTags.map((languageTag, index) => (
          <MenuItem value={index} key={index}>
            {languageTag.description}
          </MenuItem>
        ))}
      </Select> */}
    </>
  )
}

export default LanguageMenu
