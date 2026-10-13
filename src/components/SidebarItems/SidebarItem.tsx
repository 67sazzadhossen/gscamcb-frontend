import Link from 'next/link';
import {
  isNavigationActive,
  type NavigationItem,
} from '@/constants/dashboardNavigation';
export default function SidebarItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavigationActive(pathname, item.href);
  if (!item.available)
    return (
      <button
        type="button"
        disabled
        title="This page is coming soon"
        className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm text-blue-200/60"
      >
        <span>{item.label}</span>
        <span className="rounded bg-white/5 px-2 py-0.5 text-[10px]">Soon</span>
      </button>
    );
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? 'bg-school-yellow text-blue-950' : 'text-blue-100 hover:bg-white/10'}`}
    >
      {item.label}
    </Link>
  );
}
