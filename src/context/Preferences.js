import React, { createContext, useContext } from "react"
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks";

const PreferencesContext = createContext({})

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useLocalStorage(
    "theme", { mode: "light" }
  )

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

PreferencesProvider.propTypes = {
  children: PropTypes.any
}

export const usePreferences = () => useContext(PreferencesContext)