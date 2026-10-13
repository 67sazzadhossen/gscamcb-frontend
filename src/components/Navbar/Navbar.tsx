import Link from 'next/link';
import Image from 'next/image';
import { school, schoolName } from '@/constants/school';
import MenuBar from './MenuBar';

export default function Navbar() {
  return (
    <>
      <header className="border-b border-blue-100 bg-white">
        <div className="bg-school-blue text-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-2.5 text-xs sm:px-6 sm:text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="shrink-0 text-school-yellow"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Address{school.address ? `: ${school.address}` : ''}</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 py-4 sm:px-6">
          <Link
            href="/"
            aria-label={`${schoolName} home`}
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-blue"
          >
            <Image
              src={school.logo}
              alt={`${schoolName} logo`}
              width={64}
              height={64}
              priority
              className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            />
            <span className="min-w-0 font-school-heading lg:flex lg:items-center lg:gap-3">
              <span className="block max-w-xs text-sm font-normal leading-snug text-school-blue sm:max-w-md sm:text-2xl lg:max-w-none lg:whitespace-nowrap lg:text-[34px] xl:text-[42px]">
                {school.name}
              </span>
              <span
                aria-hidden="true"
                className="hidden font-bold text-slate-300 lg:block"
              >
                |
              </span>
              <span className="mt-1 block text-sm font-normal tracking-normal text-school-red sm:text-xl lg:mt-0 lg:whitespace-nowrap lg:text-[30px] xl:text-[38px]">
                {school.branch}
              </span>
            </span>
          </Link>
        </div>
      </header>
      <MenuBar />
    </>
  );
}
