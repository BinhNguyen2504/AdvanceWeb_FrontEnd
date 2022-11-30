import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const groupServices = createApi({
  reducerPath: 'groupServices',
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getListGroup: build.query({
      query: () => ({ url: '/groups', method: 'get' })
    }),
    getGroupDetail: build.query({
      query: () => ({ url: '/groups/:id', method: 'get' })
    }),
    createGroup: build.mutation({
      query: (body) => ({ url: '/groups', method: 'post', data: body })
    })
  })
});

export const { useCreateGroupMutation, useGetGroupDetailQuery, useGetListGroupQuery } = groupServices;
