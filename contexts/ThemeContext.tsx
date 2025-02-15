import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: (value: boolean) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    loadDarkModeSetting();
  }, []);

  const loadDarkModeSetting = async () => {
    try {
      const isDarkMode = await AsyncStorage.getItem('darkMode');
      setDarkMode(isDarkMode === 'true');
    } catch (error) {
      console.error('Error loading dark mode setting:', error);
    }
  };

  const toggleDarkMode = async (value: boolean) => {
    try {
      setDarkMode(value);
      await AsyncStorage.setItem('darkMode', value.toString());
    } catch (error) {
      console.error('Error saving dark mode setting:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};