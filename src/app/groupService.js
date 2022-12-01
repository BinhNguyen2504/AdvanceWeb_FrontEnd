import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const groupServices = createApi({
  reducerPath: 'groupServices',
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    // header: Bearer <token>
    getListGroup: build.query({
      query: () => ({ url: '/group', method: 'get' })
    }),
    getGroupDetail: build.query({
      query: () => ({ url: '/group/:id', method: 'get' })
    }),
    createGroup: build.mutation({
      query: (body) => ({ url: '/group', method: 'post', data: body })
    })
  })
});

export const { useCreateGroupMutation, useGetGroupDetailQuery, useGetListGroupQuery } = groupServices;
