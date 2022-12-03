import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authServices } from './authService';
import { groupServices } from './groupService';
import { profileServices } from './profileService';
import { presentServices } from './presentService';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authServices.reducerPath]: authServices.reducer,
    [profileServices.reducerPath]: profileServices.reducer,
    [groupServices.reducerPath]: groupServices.reducer,
    [presentServices.reducerPath]: presentServices.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(
      authServices.middleware,
      groupServices.middleware,
      profileServices.middleware,
      presentServices.middleware
    )
});

setupListeners(store.dispatch);
export default store;
