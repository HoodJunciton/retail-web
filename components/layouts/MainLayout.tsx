'use client';

import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/Sidebar';
import SettingsDrawer from '../settings/SettingsDrawer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const { layout, colorScheme, navbarPosition, sidebarStyle } = useSelector((state: RootState) => state.settings);

  // Color scheme mapping
  const colorSchemeMap = {
    blue: { primary: '#0ea5e9', secondary: '#f59e0b' },
    green: { primary: '#10b981', secondary: '#f59e0b' },
    purple: { primary: '#8b5cf6', secondary: '#ec4899' },
    orange: { primary: '#f59e0b', secondary: '#0ea5e9' },
    teal: { primary: '#14b8a6', secondary: '#8b5cf6' }
  };

  // Create a theme instance based on dark mode preference and color scheme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: colorSchemeMap[colorScheme].primary,
          },
          secondary: {
            main: colorSchemeMap[colorScheme].secondary,
          },
        },
        components: {
          MuiContainer: {
            styleOverrides: {
              root: {
                maxWidth: layout === 'wide' ? '1600px' : 
                         layout === 'compact' ? '960px' : '1200px',
              },
            },
          },
        },
      }),
    [darkMode, colorScheme, layout]
  );

  // Calculate main content padding based on sidebar style
  const mainPaddingLeft = sidebarStyle === 'full' ? 240 : 
                          sidebarStyle === 'compact' ? 70 : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          ml: `${mainPaddingLeft}px`,
          transition: 'margin-left 0.3s ease'
        }}>
          <Navbar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: layout === 'compact' ? 2 : 3,
              mt: navbarPosition === 'fixed' ? '64px' : 0
            }}
          >
            {children}
          </Box>
        </Box>
        <SettingsDrawer />
      </Box>
    </ThemeProvider>
  );
}
