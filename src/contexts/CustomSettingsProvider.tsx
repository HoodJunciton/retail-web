import React, { useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {
  lightTheme,
  darkTheme,
  blueLightTheme,
  blueDarkTheme,
  greenLightTheme,
  greenDarkTheme,
  purpleLightTheme,
  purpleDarkTheme,
  orangeLightTheme,
  orangeDarkTheme,
  tealLightTheme,
  tealDarkTheme,
} from '../themes';
import { SettingsContext } from './SettingsContextDefinition';

// useCustomTheme hook is in src/hooks/useCustomTheme.ts
// ThemeContext and ThemeContextType are now in ./ThemeContextDefinition.ts

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomSettingsProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [colorScheme, setColorScheme] = useState<string>('default'); // e.g., 'default', 'blue', 'green'
  const [sidebarVariant, setSidebarVariant] = useState<'mini' | 'full'>('mini');
  const [appBarDense, setAppBarDense] = useState<boolean>(false);
  const [layout, setLayout] = useState<string>('vertical'); // Default layout

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = useMemo(() => {
    switch (colorScheme) {
      case 'blue':
        return themeMode === 'light' ? blueLightTheme : blueDarkTheme;
      case 'green':
        return themeMode === 'light' ? greenLightTheme : greenDarkTheme;
      case 'purple':
        return themeMode === 'light' ? purpleLightTheme : purpleDarkTheme;
      case 'orange':
        return themeMode === 'light' ? orangeLightTheme : orangeDarkTheme;
      case 'teal':
        return themeMode === 'light' ? tealLightTheme : tealDarkTheme;
      case 'default':
      default:
        return themeMode === 'light' ? lightTheme : darkTheme;
    }
  }, [themeMode, colorScheme]);

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        toggleTheme,
        currentTheme,
        colorScheme,
        setColorScheme,
        sidebarVariant,
        setSidebarVariant,
        appBarDense,
        setAppBarDense,
        layout,
        setLayout,
      }}
    >
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};
