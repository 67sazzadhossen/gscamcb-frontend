'use client';
import { useGetMeQuery } from '@/redux/features/auth/authApi';
import { getUserName } from '@/utils/getUserName';
import { roleLabel } from '@/constants/dashboardNavigation';
export default function ProfilePage() {
  const { data } = useGetMeQuery();
  if (!data) return null;
  const user = data.data;
  const fields = [
    ['School ID', user.userId],
    ['Role', roleLabel(user.role)],
    ['Email', user.email ?? 'Not provided'],
  ];
  return (
    <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-school-blue">
        My profile
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        {getUserName(user)}
      </h1>
      <dl className="mt-6 divide-y divide-slate-100">
        {fields.map(([label, value]) => (
          <div key={label} className="grid gap-2 py-4 sm:grid-cols-3">
            <dt className="text-sm font-semibold text-slate-500">{label}</dt>
            <dd className="break-words text-sm font-medium text-slate-900 sm:col-span-2">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
