import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authServices } from './authService';
import { groupServices } from './groupService';
import { profileService } from './profileService';
import { presentationService } from './presentationService';
import { gameService } from './gameService';
import authReducer from './authSlice';
import presentationReducer from './presentationSlice';
import socketReducer from './socketSlice';
import gameReducer from './gameSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    presentation: presentationReducer,
    socket: socketReducer,
    game: gameReducer,
    [authServices.reducerPath]: authServices.reducer,
    [profileService.reducerPath]: profileService.reducer,
    [groupServices.reducerPath]: groupServices.reducer,
    [presentationService.reducerPath]: presentationService.reducer,
    [gameService.reducerPath]: gameService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(
      authServices.middleware,
      groupServices.middleware,
      profileService.middleware,
      presentationService.middleware,
      gameService.middleware
    )
});

setupListeners(store.dispatch);
export default store;
