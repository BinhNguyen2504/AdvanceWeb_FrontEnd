import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const gameService = createApi({
  reducerPath: 'gameService',
  refetchOnFocus: false,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '/game' }),
  endpoints: (build) => ({
    createGame: build.mutation({
      query: (body) => ({ url: '/creategame', method: 'post', data: body })
    })
  })
});

export const { useCreateGameMutation } = gameService;
