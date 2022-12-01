import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const profileServices = createApi({
  reducerPath: 'profileServices',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({ url: '/user/profile', method: 'get' })
    })
  })
});

export const { useGetProfileQuery } = profileServices;
