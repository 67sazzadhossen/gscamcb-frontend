import Image from 'next/image';
import Link from 'next/link';
import { loginUrl, mainNavigation } from '@/constants/navigation';
import { school, schoolName } from '@/constants/school';

const linkGroups = [
  {
    title: 'Explore',
    links: mainNavigation.flatMap((item) => ('href' in item ? [item] : [])),
  },
  {
    title: 'Academic resources',
    links: mainNavigation.flatMap((item) =>
      item.label === 'Academic Info' && 'children' in item ? item.children : [],
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-school-blue text-white">
      <div aria-hidden="true" className="flex h-1.5">
        <span className="flex-[6] bg-school-blue" />
        <span className="flex-1 bg-school-red" />
        <span className="flex-1 bg-school-yellow" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1fr_1fr_1.3fr] lg:gap-12 lg:py-16">
        <div>
          <Link
            href="/"
            aria-label={`${schoolName} home`}
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-yellow"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
              <Image
                src={school.logo}
                alt=""
                width={52}
                height={52}
                className="h-13 w-13 object-contain"
              />
            </span>
            <span>
              <span className="block max-w-64 text-base font-bold leading-snug">
                {school.name}
              </span>
              <span className="mt-1.5 block text-xs font-semibold tracking-wider text-school-yellow">
                {school.branch}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
            Learning with curiosity. Growing with confidence. Leading with
            character.
          </p>
        </div>
        {linkGroups.map(({ title, links }) => (
          <nav key={title} aria-label={`Footer ${title}`}>
            <h2 className="text-sm font-bold text-white">{title}</h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-0.5 w-7 bg-school-yellow"
            />
            <ul className="mt-5 space-y-3">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="rounded text-sm text-blue-100 transition-colors hover:text-school-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-yellow"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-sm font-bold">Visit our school</h2>
          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-7 bg-school-yellow"
          />
          <address className="mt-5 flex items-start gap-2 text-sm not-italic leading-6 text-blue-100">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="mt-0.5 shrink-0 text-school-yellow"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {school.address}
          </address>
          <a
            href={loginUrl}
            className="mt-6 inline-flex items-center gap-3 rounded-lg bg-school-yellow px-4 py-2.5 text-sm font-bold text-school-blue transition-colors hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-yellow"
          >
            School login <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs leading-5 text-blue-200 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {schoolName}. All rights reserved.
          </p>
          <a
            href="#"
            className="shrink-0 rounded font-medium text-white transition-colors hover:text-school-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-yellow"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
