import React, { createContext, useContext } from "react"
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks";

const InternalThemeContext = createContext({})

export const InternalThemeProvider = ({ children }) => {
  const [internalTheme, setInternalTheme] = useLocalStorage(
    "theme", "light"
  )

  return (
    <InternalThemeContext.Provider value={{ internalTheme, setInternalTheme }}>
      {children}
    </InternalThemeContext.Provider>
  )
}

InternalThemeProvider.propTypes = {
  children: PropTypes.any
}

export const useInternalTheme = () => useContext(InternalThemeContext)