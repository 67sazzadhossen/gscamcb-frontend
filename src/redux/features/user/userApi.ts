import { baseApi } from '@/redux/api/baseApi';
import type {
  TCreateUserPayload,
  TResponse,
  TUser,
  TUserListResponse,
} from '@/types/index.type';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<TResponse<TUser>, TCreateUserPayload>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query<
      TResponse<TUserListResponse>,
      { role?: string; shift?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['User'],
    }),
    getRecycleBinUsers: builder.query<
      TResponse<TUserListResponse>,
      { role?: string; shift?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/users/recycle-bin',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['User'],
    }),
    getUser: builder.query<TResponse<TUser>, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<
      TResponse<TUser>,
      {
        userId: string;
        body: { email?: string; status?: 'ACTIVE' | 'BLOCKED' };
      }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    recycleUser: builder.mutation<TResponse<TUser>, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    restoreUser: builder.mutation<TResponse<TUser>, string>({
      query: (userId) => ({
        url: `/users/${userId}/restore`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    permanentlyDeleteUser: builder.mutation<TResponse<null>, string>({
      query: (userId) => ({
        url: `/users/${userId}/permanent`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetRecycleBinUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useRecycleUserMutation,
  useRestoreUserMutation,
  usePermanentlyDeleteUserMutation,
} = userApi;
