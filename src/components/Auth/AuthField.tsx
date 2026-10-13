'use client';
import { useState, type InputHTMLAttributes } from 'react';
export default function AuthField({
  label,
  name,
  type = 'text',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const [visible, setVisible] = useState(false);
  const password = type === 'password';
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          id={name}
          name={name}
          type={password && visible ? 'text' : type}
          className={`mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white focus:ring-4 focus:ring-blue-100 ${password ? 'pr-20' : ''}`}
        />
        {password && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute inset-y-0 right-2 mt-2 rounded-lg px-3 text-xs font-bold text-school-blue hover:bg-blue-50"
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
    </div>
  );
}
