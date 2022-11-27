/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */

import { createApi } from '@reduxjs/toolkit/query/react';
import axiosClient from '../api/client';

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosClient({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      console.log(err);
      return {
        error: {
          status: err.response.status,
          data: err.response.data || err.message
        }
      };
    }
  };

export const authServices = createApi({
  reducerPath: 'authServices',
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({ url: '/auth/register', method: 'get', data: body })
    }),
    login: build.mutation({
      query: (body) => ({ url: '/auth/login', method: 'post', data: body })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authServices;
