import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authServices } from './authService';
import { groupServices } from './groupService';
import { profileService } from './profileService';
import { presentationService } from './presentationService';
import authReducer from './authSlice';
import presentationReducer from './presentationSlice';
import socketReducer from './socketSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    presentation: presentationReducer,
    socket: socketReducer,
    [authServices.reducerPath]: authServices.reducer,
    [profileService.reducerPath]: profileService.reducer,
    [groupServices.reducerPath]: groupServices.reducer,
    [presentationService.reducerPath]: presentationService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(
      authServices.middleware,
      groupServices.middleware,
      profileService.middleware,
      presentationService.middleware
    )
});

setupListeners(store.dispatch);
export default store;
