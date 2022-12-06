import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const profileService = createApi({
  reducerPath: 'profileServices',
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({ url: '/user/profile', method: 'get' })
    })
  })
});

export const { useGetProfileQuery } = profileService;
