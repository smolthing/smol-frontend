import React, { useState, createContext, useEffect } from 'react'
// import { useColorScheme } from 'react-native'

export const ColorSchemeContext = createContext()

export const ColorSchemeContextProvider = (props) => {
  // const colorScheme = useColorScheme()
  const colorScheme = "light" // I want light!
  const [scheme, setScheme] = useState(colorScheme)

  useEffect(() => {
    setScheme(colorScheme)
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider
      value={{
        scheme, setScheme
      }}
    >
      {props.children}
    </ColorSchemeContext.Provider>
  )
}