import { createSlice } from '@reduxjs/toolkit';

interface UISlice {
  darkMode: boolean;
}

const initialState: UISlice = {
  darkMode: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
