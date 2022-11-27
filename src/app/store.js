import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authServices } from './authService';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authServices.reducerPath]: authServices.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authServices.middleware)
});

setupListeners(store.dispatch);
export default store;
