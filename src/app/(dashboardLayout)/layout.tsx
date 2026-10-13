'use client';
import { useState, type ReactNode } from 'react';
import { Sidebar } from '@/components/SidebarItems/SideBar';
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-dvh bg-slate-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isSidebarOpen}
            aria-controls="dashboard-sidebar"
            className="rounded-lg border border-slate-200 px-3 py-2 lg:hidden"
          >
            ☰
          </button>
          <span className="font-semibold text-slate-900">
            GSCAMCB dashboard
          </span>
        </header>
        <main className="mx-auto max-w-6xl p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
