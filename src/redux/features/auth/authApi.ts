import { baseApi } from '@/redux/api/baseApi';
import type { TResponse, TUser } from '@/types/index.type';
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TResponse<{ user: TUser; accessToken: string }>,
      { userId: string; password: string }
    >({ query: (body) => ({ url: '/auth/login', method: 'POST', body }) }),
    getMe: builder.query<TResponse<TUser>, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    changePassword: builder.mutation<
      TResponse<null>,
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({ url: '/auth/change-password', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
  }),
});
export const { useLoginMutation, useGetMeQuery, useChangePasswordMutation } =
  authApi;
