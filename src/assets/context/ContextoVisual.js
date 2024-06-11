import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ContextoVisual = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ContextoVisual.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ContextoVisual.Provider>
  );
};

export const useTheme = () => useContext(ContextoVisual);
