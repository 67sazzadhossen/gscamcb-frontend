import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
const backendUrl = (
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000'
).replace(/\/+$/, '');
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendUrl}/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Student', 'Teacher', 'Academic', 'Attendance', 'Payment'],
  endpoints: () => ({}),
});
