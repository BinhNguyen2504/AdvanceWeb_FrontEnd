import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const groupServices = createApi({
  reducerPath: 'groupServices',
  refetchOnFocus: true,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getListGroup: build.query({
      query: () => ({ url: '/group/mygroups', method: 'get' })
    }),
    getGroupDetail: build.query({
      query: (id) => ({ url: `/group/${id}`, method: 'get' })
    }),
    createGroup: build.mutation({
      query: (body) => ({ url: '/group', method: 'post', data: body })
    })
  })
});

export const { useCreateGroupMutation, useGetGroupDetailQuery, useGetListGroupQuery } = groupServices;
