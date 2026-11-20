import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { injectStore } from '../services/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

injectStore(store);

export default store;
