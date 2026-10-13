import Image from 'next/image';
import Link from 'next/link';
import { school, schoolName } from '@/constants/school';
export default function SchoolBrand() {
  return (
    <Link
      href="/"
      aria-label={`${schoolName} home`}
      className="flex min-w-0 flex-1 items-center gap-3"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
        <Image
          src={school.logo}
          alt="School logo"
          width={44}
          height={44}
          className="h-10 w-10 object-contain"
        />
      </span>
      <span className="min-w-0 text-xs font-extrabold leading-5 text-school-blue sm:text-sm lg:whitespace-nowrap lg:text-base">
        {school.name} <span className="text-school-red">| {school.branch}</span>
      </span>
    </Link>
  );
}
