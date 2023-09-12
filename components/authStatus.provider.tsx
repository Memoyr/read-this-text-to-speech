import React, { createContext } from 'react'
import { useSession } from 'next-auth/react'

export const StatusContext = createContext({ status: null, data: null })

export function StatusProvider({ children }) {
  const { status, data } = useSession()

  return (
    <StatusContext.Provider value={{ status, data }}>
      {children}
    </StatusContext.Provider>
  )
}
