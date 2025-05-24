import React from 'react';
import { Box, ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { createThemeOptions } from '../../../theme/ThemeConfig';

interface BaseLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  navbar?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function BaseLayout({ children, sidebar, navbar, footer }: BaseLayoutProps) {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  // Get the current theme option from settings
  const { themeOption } = useSelector((state: RootState) => state.settings);
  
  // Create a theme instance based on dark mode preference and theme option
  const theme = React.useMemo(
    () => {
      // Create theme options based on the selected theme and dark mode
      const themeOptions = createThemeOptions(themeOption, darkMode);
      
      // Create the MUI theme with the options
      return createTheme(themeOptions);
    },
    [darkMode, themeOption]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        {sidebar}
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {navbar}
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          {footer}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
