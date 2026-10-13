'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import UserAvatar from '@/components/Shared/UserAvatar';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetMeQuery } from '@/redux/features/auth/authApi';
import { logout } from '@/redux/features/auth/authSlice';
import { baseApi } from '@/redux/api/baseApi';
import { getUserName } from '@/utils/getUserName';
import NavLinks from './NavLinks';
import { loginUrl } from '@/constants/navigation';

export default function MenuBar() {
  const dispatch = useAppDispatch();
  const { token, user: savedUser } = useAppSelector((state) => state.auth);
  const { data, error } = useGetMeQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const invalidSession = error && 'status' in error && error.status === 401;
  const user = token && !invalidSession ? (data?.data ?? savedUser) : null;
  useEffect(() => {
    if (invalidSession) {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
    }
  }, [invalidSession, dispatch]);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const closeMenu = () => {
    setOpen(false);
    nav.current
      ?.querySelectorAll('details[open]')
      .forEach((item) => item.removeAttribute('open'));
  };
  return (
    <div
      className="sticky top-0 z-50 border-b-4 border-school-yellow bg-school-blue shadow-sm"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          const details = (event.target as HTMLElement).closest('details');
          closeMenu();
          if (details) details.querySelector('summary')?.focus();
          else toggle.current?.focus();
        }
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-5 sm:px-6">
        <button
          ref={toggle}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="school-menu"
          className="flex w-full items-center justify-between py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-school-yellow lg:hidden"
        >
          Menu{' '}
          <span aria-hidden="true" className="text-lg">
            {open ? '✕' : '☰'}
          </span>
        </button>
        <nav
          ref={nav}
          id="school-menu"
          aria-label="Main navigation"
          className={`${open ? 'flex' : 'hidden'} col-span-2 row-start-2 flex-col gap-1 pb-3 lg:col-span-1 lg:row-start-1 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pb-0`}
        >
          <NavLinks onNavigate={closeMenu} />
        </nav>
        {user ? (
          <Link
            href="/dashboard/profile"
            onClick={closeMenu}
            className="col-start-2 row-start-1 my-2 flex min-w-0 items-center gap-2 rounded-xl px-2 py-1 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-school-yellow"
            aria-label="View your profile"
          >
            <UserAvatar
              name={getUserName(user)}
              src={user.profile?.image?.displayUrl}
            />
            <span className="max-w-28 truncate text-sm font-semibold sm:max-w-40">
              {getUserName(user)}
            </span>
          </Link>
        ) : (
          <Link
            href={loginUrl}
            className="col-start-2 row-start-1 my-2 shrink-0 rounded-lg bg-school-red px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-yellow"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
