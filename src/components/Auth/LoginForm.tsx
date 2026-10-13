'use client';

import { useState, type FormEvent } from 'react';

import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authSlice';
import { baseApi } from '@/redux/api/baseApi';
import AuthField from './AuthField';
import { authError } from './authError';
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const values = new FormData(event.currentTarget);
    try {
      const result = await login({
        userId: String(values.get('userId')).trim(),
        password: String(values.get('password')),
      }).unwrap();
      dispatch(baseApi.util.resetApiState());
      dispatch(setUser(result.data));
      router.replace('/dashboard');
    } catch (error) {
      setError(authError(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <AuthField
        label="School ID"
        name="userId"
        inputMode="numeric"
        autoComplete="username"
        placeholder="Enter your 8-digit ID"
        pattern="[0-9]{8}"
        minLength={8}
        maxLength={8}
        required
        onChange={() => setError('')}
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        maxLength={72}
        required
        onChange={() => setError('')}
      />
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-school-blue px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-blue"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}{' '}
        <span aria-hidden="true">→</span>
      </button>
      <details className="group text-center">
        <summary className="cursor-pointer list-none rounded text-sm font-medium text-school-blue hover:underline focus-visible:outline-2 focus-visible:outline-school-blue [&::-webkit-details-marker]:hidden">
          Need help signing in?
        </summary>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Contact the school office to request an account or reset your
          password.
        </p>
      </details>
    </form>
  );
}
