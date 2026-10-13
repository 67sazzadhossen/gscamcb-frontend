'use client';
import SidebarItem from './SidebarItem';
import UserAvatar from '@/components/Shared/UserAvatar';
import { usePathname } from 'next/navigation';
import {
  getDashboardNavigation,
  getDashboardGroups,
  isNavigationActive,
  roleLabel,
  type UserRole,
} from '@/constants/dashboardNavigation';
export function Sidebar({
  isOpen,
  onClose,
  onSignOut,
  role,
  username,
  userId,
  imageUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  role: UserRole;
  username: string;
  userId: string;
  imageUrl?: string | null;
}) {
  const pathname = usePathname();
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
        />
      )}
      <aside
        id="dashboard-sidebar"
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 shrink-0 flex-col overflow-hidden bg-blue-950 p-5 text-white transition-transform lg:sticky lg:top-0 lg:visible lg:translate-x-0 ${isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}
      >
        <div className="mb-5 flex shrink-0 items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar name={username} src={imageUrl} />
            <div className="min-w-0">
              <p className="break-words text-lg font-bold text-white">
                {username}
              </p>
              <p className="mt-1 text-sm text-blue-200">{userId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-2 lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <p className="mb-4 shrink-0 border-b border-white/10 pb-4 text-xs font-semibold uppercase tracking-wider text-blue-200">
          {roleLabel(role)} workspace
        </p>
        <nav
          aria-label="Dashboard"
          className="min-h-0 flex-1 space-y-1 overflow-y-auto"
        >
          {getDashboardNavigation(role).map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onClose}
            />
          ))}
          {getDashboardGroups(role).map((group) => {
            const active = group.items.some((item) =>
              isNavigationActive(pathname, item.href),
            );
            return (
              <details
                key={`${group.label}-${active}`}
                open={active || undefined}
                className="group rounded-xl"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-school-yellow [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="mb-2 ml-4 space-y-1 border-l border-white/15 pl-2">
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      onNavigate={onClose}
                    />
                  ))}
                </div>
              </details>
            );
          })}
        </nav>
        <div className="mt-4 shrink-0 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onSignOut}
            className="w-full rounded-xl border border-white/20 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-school-yellow"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
