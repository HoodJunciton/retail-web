'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutType = 'default' | 'compact' | 'wide';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'teal';
export type NavbarPosition = 'fixed' | 'static';
export type SidebarStyle = 'full' | 'compact' | 'closed';

interface SettingsState {
  layout: LayoutType;
  colorScheme: ColorScheme;
  navbarPosition: NavbarPosition;
  sidebarStyle: SidebarStyle;
  isSettingsOpen: boolean;
}

const initialState: SettingsState = {
  layout: 'default',
  colorScheme: 'blue',
  navbarPosition: 'fixed',
  sidebarStyle: 'full',
  isSettingsOpen: false
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layout = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
    },
    setNavbarPosition: (state, action: PayloadAction<NavbarPosition>) => {
      state.navbarPosition = action.payload;
    },
    setSidebarStyle: (state, action: PayloadAction<SidebarStyle>) => {
      state.sidebarStyle = action.payload;
    },
    toggleSettingsDrawer: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    closeSettingsDrawer: (state) => {
      state.isSettingsOpen = false;
    }
  }
});

export const { 
  setLayout, 
  setColorScheme, 
  setNavbarPosition, 
  setSidebarStyle,
  toggleSettingsDrawer,
  closeSettingsDrawer
} = settingsSlice.actions;

export default settingsSlice.reducer;
