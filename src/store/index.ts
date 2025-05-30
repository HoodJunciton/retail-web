import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './slices/uiSlice';
import productReducer from './slices/productSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
