import { createContext } from 'react';
import type { Theme } from '@mui/material/styles';

export interface SettingsContextType {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  currentTheme: Theme;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  sidebarVariant: 'mini' | 'full';
  setSidebarVariant: (variant: 'mini' | 'full') => void;
  appBarDense: boolean;
  setAppBarDense: (dense: boolean) => void;
  layout: string; // e.g., 'vertical', 'horizontal'
  setLayout: (layout: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
