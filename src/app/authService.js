import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const authServices = createApi({
  reducerPath: 'authServices',
  refetchOnFocus: false,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '/auth' }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: '/signup', method: 'post', data: body })
    }),
    login: build.mutation({
      query: (body) => ({ url: '/login', method: 'post', data: body })
    }),
    logout: build.mutation({
      query: () => ({ url: '/logout', method: 'post' })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authServices;
