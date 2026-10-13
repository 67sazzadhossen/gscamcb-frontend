import Link from 'next/link';
export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5"
      >
        <Link href="/" className="text-xl font-bold text-blue-900">
          GSCAMCB
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
