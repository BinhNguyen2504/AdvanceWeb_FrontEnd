import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const presentServices = createApi({
  reducerPath: 'presentServices',
  refetchOnFocus: false,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getListPresent: build.query({
      query: () => ({ url: '/user/profile', method: 'get' })
    }),
    getPresent: build.query({
      query: () => ({ url: '/group/:id', method: 'get' })
    }),
    createPresent: build.mutation({
      query: (body) => ({ url: '/group', method: 'post', data: body })
    }),
    updatePresent: build.mutation({
      query: (body) => ({ url: '/group', method: 'post', data: body })
    }),
    deletePresent: build.mutation({
      query: (body) => ({ url: '/group', method: 'delete', data: body })
    })
  })
});

export const {
  useGetListPresentQuery,
  useCreatePresentMutation,
  useDeletePresentMutation,
  useUpdatePresentMutation,
  useGetPresentQuery
} = presentServices;
