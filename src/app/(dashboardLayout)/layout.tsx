'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetMeQuery } from '@/redux/features/auth/authApi';
import { logout } from '@/redux/features/auth/authSlice';
import { baseApi } from '@/redux/api/baseApi';
import ChangePasswordForm from '@/components/Auth/ChangePasswordForm';
import SchoolBrand from '@/components/Dashboard/SchoolBrand';
import { getUserName } from '@/utils/getUserName';
import { Sidebar } from '@/components/SidebarItems/SideBar';
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { data, error, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const unavailable = error && 'status' in error && error.status === 401;
  function signOut() {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    router.replace('/login');
  }
  useEffect(() => {
    if (!token || unavailable) {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      router.replace('/login');
    }
  }, [token, unavailable, dispatch, router]);
  if (!token || unavailable || isLoading)
    return (
      <p role="status" className="p-8">
        Checking your session…
      </p>
    );
  if (error || !data)
    return (
      <div className="p-8">
        <p role="alert">Unable to verify your session.</p>
        <button
          onClick={() => void refetch()}
          className="mt-4 rounded-lg border px-4 py-2"
        >
          Try again
        </button>
      </div>
    );
  return (
    <div className="flex min-h-dvh bg-slate-100">
      <Sidebar
        role={data.data.role}
        userId={data.data.userId}
        imageUrl={data.data.profile?.image?.displayUrl}
        username={getUserName(data.data)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSignOut={signOut}
      />
      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isSidebarOpen}
            aria-controls="dashboard-sidebar"
            className="rounded-lg border border-slate-200 px-3 py-2 lg:hidden"
          >
            ☰
          </button>
          <SchoolBrand />
          <Link
            href="/"
            className="ml-auto shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-school-blue transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-school-blue sm:text-sm"
          >
            Back to home
          </Link>
        </header>
        <main className="w-full p-6 sm:p-8">
          {data.data.mustChangePassword ? <ChangePasswordForm /> : children}
        </main>
      </div>
    </div>
  );
}
