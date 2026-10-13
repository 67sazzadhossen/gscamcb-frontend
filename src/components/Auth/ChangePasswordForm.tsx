'use client';
import { useState, type FormEvent } from 'react';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import AuthField from './AuthField';
import { authError } from './authError';
export default function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setError('');
    try {
      await changePassword({
        currentPassword: String(values.get('currentPassword')),
        newPassword: String(values.get('newPassword')),
      }).unwrap();
      form.reset();
    } catch (error) {
      setError(authError(error));
    }
  }
  return (
    <section className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Change your initial password</h1>
      <p className="mt-3 text-slate-600">
        Choose a new password before accessing your dashboard.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <AuthField
          label="Current password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          maxLength={72}
        />
        <AuthField
          label="New password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
        />
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          disabled={isLoading}
          className="w-full rounded-xl bg-school-blue px-5 py-3 font-bold text-white disabled:opacity-50"
        >
          {isLoading ? 'Saving…' : 'Save password'}
        </button>
      </form>
    </section>
  );
}
