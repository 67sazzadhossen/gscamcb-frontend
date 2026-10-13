import { baseApi } from '@/redux/api/baseApi';
import type { THealth, TResponse } from '@/types/index.type';
export const healthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<TResponse<THealth>, void>({
      query: () => '/health',
    }),
  }),
});
export const { useGetHealthQuery } = healthApi;
