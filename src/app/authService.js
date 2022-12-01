import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const authServices = createApi({
  reducerPath: 'authServices',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: '/auth/signup', method: 'post', data: body })
    }),
    login: build.mutation({
      query: (body) => ({ url: '/auth/login', method: 'post', data: body })
    }),
    logout: build.mutation({
      query: () => ({ url: '/auth/logout', method: 'post' })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authServices;
