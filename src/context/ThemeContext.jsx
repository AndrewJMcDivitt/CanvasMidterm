
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#8B4513' : '#D2B48C', //Dark brown in dark mode, light tan in light mode
      },
      background: {
        default: darkMode ? '#2C2C2C' : '#FFFAF0', //Very dark gray in dark mode
        paper: darkMode ? '#3C3C3C' : '#fff', //Slightly lighter gray for containers in dark mode
      },
      text: {
        primary: darkMode ? '#E0E0E0' : '#000000', //Lighter gray in dark mode, black in light mode
        secondary: darkMode ? '#B0B0B0' : '#666666', //medium gray in dark mode, dark gray in light mode
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#5D4037' : '#D2B48C', //Darker brown in dark mode
            color: darkMode ? '#FFFFFF' : '#000000', //White text in dark mode for better contrast
            '&:hover': {
              backgroundColor: darkMode ? '#795548' : '#C2A478',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#3C3C3C' : '#fff', //Slightly lighter background for containers in dark mode
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: darkMode ? '#B0B0B0' : 'rgba(0, 0, 0, 0.6)', //Darker label color in dark mode
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#6C6C6C' : 'rgba(0, 0, 0, 0.23)', //Darker border in dark mode
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#878787' : 'rgba(0, 0, 0, 0.87)', //Darker border on hover in dark mode
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);