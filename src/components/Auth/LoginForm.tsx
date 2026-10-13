'use client';

import { useState, type FormEvent } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const inputClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white focus:ring-4 focus:ring-blue-100';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(
      'Sign-in is not available yet. Please contact the school office for assistance.',
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Enter your email address"
          required
          className={inputClass}
          onChange={() => setError('')}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-semibold text-slate-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={`${inputClass} pr-20`}
            onChange={() => setError('')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-2 mt-2 rounded-lg px-3 text-xs font-bold text-school-blue hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-school-blue"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
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
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-school-blue px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-blue"
      >
        Sign in <span aria-hidden="true">→</span>
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
