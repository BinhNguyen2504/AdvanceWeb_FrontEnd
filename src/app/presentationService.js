import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const presentationService = createApi({
  reducerPath: 'presentationService',
  refetchOnFocus: true,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '/presentation' }),
  endpoints: (build) => ({
    getListPresent: build.query({
      query: () => ({ url: '/mypresentation', method: 'get' })
    }),
    getPresent: build.query({
      query: (id) => ({ url: `/mypresentation/${id}`, method: 'get' })
    }),
    createPresent: build.mutation({
      query: (body) => ({ url: '/create', method: 'post', data: body })
    }),
    updatePresent: build.mutation({
      query: (body) => ({ url: `/${body.id}`, method: 'put', data: { questions: body.questions } })
    }),
    deletePresent: build.mutation({
      query: (body) => ({ url: `/${body.id}`, method: 'delete' })
    }),
    joinPresent: build.mutation({
      query: (body) => ({ url: `/join/${body.username}/${body.pin}`, method: 'put' })
    })
  })
});

export const {
  useGetListPresentQuery,
  useCreatePresentMutation,
  useDeletePresentMutation,
  useUpdatePresentMutation,
  useGetPresentQuery,
  useJoinPresentMutation
} = presentationService;
