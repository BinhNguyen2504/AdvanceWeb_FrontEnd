import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/client';

export const groupServices = createApi({
  reducerPath: 'groupServices',
  refetchOnFocus: true,
  refetchOnReconnect: false,
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getListOwnerGroup: build.query({
      query: () => ({ url: '/group/mygroups', method: 'get' })
    }),
    getListJoinedGroup: build.query({
      query: () => ({ url: '/group/myjoinedgroups', method: 'get' })
    }),
    getGroupDetail: build.query({
      query: (id) => ({ url: `/group/${id}`, method: 'get' })
    }),
    createGroup: build.mutation({
      query: (body) => ({ url: '/group', method: 'post', data: body })
    }),
    removeGroup: build.mutation({
      query: (id) => ({ url: `group/${id}`, method: 'delete' })
    }),
    kickOut: build.mutation({
      query: (body) => ({ url: '/group/kickmember', method: 'put', data: body })
    }),
    getInviteLink: build.mutation({
      query: (body) => ({ url: '/group/invitelink', method: 'post', data: body })
    }),
    sendInviteMail: build.mutation({
      query: (body) => ({ url: '/group/invitemail', method: 'post', data: body })
    })
  })
});

export const {
  useCreateGroupMutation,
  useGetGroupDetailQuery,
  useGetListJoinedGroupQuery,
  useGetListOwnerGroupQuery,
  useRemoveGroupMutation,
  useKickOutMutation,
  useGetInviteLinkMutation,
  useSendInviteMailMutation
} = groupServices;
