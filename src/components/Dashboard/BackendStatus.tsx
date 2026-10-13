'use client';
import { useGetHealthQuery } from '@/redux/features/health/healthApi';
export default function BackendStatus() {
  const { data, isLoading, isError, isFetching, refetch } = useGetHealthQuery();
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Server connection</h2>
      <p role="status" className="mt-3 text-slate-600">
        {isLoading
          ? 'Checking server…'
          : isError
            ? 'Unable to reach the backend. Please try again.'
            : data?.data.status === 'ok'
              ? 'Backend is online.'
              : 'Server status is unavailable.'}
      </p>
      <button
        onClick={() => void refetch()}
        disabled={isFetching}
        className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-50"
      >
        {isFetching ? 'Checking…' : 'Check again'}
      </button>
    </section>
  );
}
