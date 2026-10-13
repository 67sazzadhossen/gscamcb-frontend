'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-blue-950 p-6 text-white transition-transform lg:static lg:visible lg:translate-x-0 ${isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            GSCAMCB
          </Link>
          <button
            onClick={onClose}
            className="rounded p-2 lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav aria-label="Dashboard">
          <Link
            href="/dashboard"
            onClick={onClose}
            aria-current={pathname === '/dashboard' ? 'page' : undefined}
            className="block rounded-xl bg-white/10 px-4 py-3"
          >
            Overview
          </Link>
        </nav>
        <Link href="/" className="mt-auto pt-6 text-sm text-blue-200">
          Back to home
        </Link>
      </aside>
    </>
  );
}
