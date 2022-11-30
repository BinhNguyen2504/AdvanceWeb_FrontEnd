import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const authServices = createApi({
  reducerPath: 'authServices',
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: '/auth/register', method: 'post', data: body })
    }),
    login: build.mutation({
      query: (body) => ({ url: '/auth/login', method: 'post', data: body })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authServices;
