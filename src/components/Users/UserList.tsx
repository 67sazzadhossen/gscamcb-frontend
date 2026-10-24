'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  useGetUsersQuery,
  useGetRecycleBinUsersQuery,
  useUpdateUserMutation,
  useRecycleUserMutation,
  useRestoreUserMutation,
  usePermanentlyDeleteUserMutation,
} from '@/redux/features/user/userApi';
import type { TUser } from '@/types/index.type';

export default function UserList({
  role,
  title,
  createHref,
  isRecycleBin = false,
}: {
  role: TUser['role'];
  title: string;
  createHref?: string;
  isRecycleBin?: boolean;
}) {
  const [shiftFilter, setShiftFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const queryArgs = {
    role,
    shift: shiftFilter || undefined,
  };

  const {
    data: normalData,
    isLoading: isNormalLoading,
    refetch: refetchNormal,
  } = useGetUsersQuery(queryArgs, { skip: isRecycleBin });

  const {
    data: recycleData,
    isLoading: isRecycleLoading,
    refetch: refetchRecycle,
  } = useGetRecycleBinUsersQuery(queryArgs, { skip: !isRecycleBin });

  const [updateUser] = useUpdateUserMutation();
  const [recycleUser] = useRecycleUserMutation();
  const [restoreUser] = useRestoreUserMutation();
  const [permanentlyDeleteUser] = usePermanentlyDeleteUserMutation();

  const isLoading = isRecycleBin ? isRecycleLoading : isNormalLoading;
  const users: TUser[] = isRecycleBin
    ? recycleData?.data?.data || []
    : normalData?.data?.data || [];

  const filteredUsers = users.filter((u) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const name =
      `${u.profile?.name?.firstName || ''} ${u.profile?.name?.lastName || ''}`.toLowerCase();
    const id = (u.userId || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const phone = (u.profile?.phone || '').toLowerCase();
    return (
      name.includes(term) ||
      id.includes(term) ||
      email.includes(term) ||
      phone.includes(term)
    );
  });

  async function handleToggleStatus(user: TUser) {
    const nextStatus = user.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    try {
      await updateUser({
        userId: user.userId,
        body: { status: nextStatus },
      }).unwrap();
      toast.success(`User ${user.userId} is now ${nextStatus.toLowerCase()}`);
      refetchNormal();
    } catch {
      toast.error('Failed to update status');
    }
  }

  async function handleRecycle(user: TUser) {
    if (
      !confirm(
        `Move ${user.profile?.name?.firstName} (${user.userId}) to the recycle bin?`,
      )
    )
      return;
    try {
      await recycleUser(user.userId).unwrap();
      toast.success(`Account moved to recycle bin`);
      refetchNormal();
    } catch {
      toast.error('Failed to move account to recycle bin');
    }
  }

  async function handleRestore(user: TUser) {
    try {
      await restoreUser(user.userId).unwrap();
      toast.success(`Account restored from recycle bin`);
      refetchRecycle();
    } catch {
      toast.error('Failed to restore account');
    }
  }

  async function handlePermanentDelete(user: TUser) {
    if (
      !confirm(
        `WARNING: This will permanently delete ${user.profile?.name?.firstName} (${user.userId}) from the database. This action cannot be undone. Proceed?`,
      )
    )
      return;
    try {
      await permanentlyDeleteUser(user.userId).unwrap();
      toast.success(`Account permanently deleted`);
      refetchRecycle();
    } catch {
      toast.error('Failed to permanently delete account');
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isRecycleBin
              ? 'Restore or permanently delete removed accounts.'
              : `Manage registered ${role.replace('_', ' ').toLowerCase()} accounts.`}
          </p>
        </div>
        {!isRecycleBin && createHref && (
          <Link
            href={createHref}
            className="inline-flex items-center justify-center rounded-xl bg-school-blue px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-900"
          >
            + Add New {role.replace('_', ' ')}
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, email or phone..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-school-blue focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-school-blue focus:bg-white"
          >
            <option value="">All Shifts</option>
            <option value="MORNING">Morning Shift</option>
            <option value="DAY">Day Shift</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading accounts...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-base font-semibold text-slate-700">
              No accounts found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {search || shiftFilter
                ? 'Try adjusting your search filters.'
                : isRecycleBin
                  ? 'Recycle bin is empty.'
                  : 'Get started by adding a new user.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">School ID</th>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Role / Details</th>
                  <th className="px-5 py-3.5">Shift</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-5 py-4 font-mono font-bold text-school-blue">
                      {user.userId}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">
                        {user.profile?.name?.firstName}{' '}
                        {user.profile?.name?.lastName}
                      </div>
                      {user.profile?.name?.bengaliFirstName && (
                        <div className="text-xs text-slate-400">
                          {user.profile.name.bengaliFirstName}{' '}
                          {user.profile.name.bengaliLastName}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600">
                      <div>{user.email || 'No email'}</div>
                      <div className="text-slate-400">
                        {user.profile?.phone || 'No phone'}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600">
                      {user.role === 'STUDENT' ? (
                        <span>
                          {user.profile?.studentInfo?.version || 'General'}
                          {user.profile?.studentInfo?.isCadet && ' (Cadet)'}
                        </span>
                      ) : (
                        <span>
                          {user.profile?.employmentInfo?.designation ||
                            user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        {user.profile?.shift || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                          user.status === 'BLOCKED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {user.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-xs">
                      {isRecycleBin ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleRestore(user)}
                            className="rounded-lg bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700 hover:bg-emerald-100"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(user)}
                            className="rounded-lg bg-red-50 px-3 py-1.5 font-bold text-red-700 hover:bg-red-100"
                          >
                            Permanent Delete
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            {user.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                          </button>
                          <button
                            onClick={() => handleRecycle(user)}
                            className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
                          >
                            Recycle
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
