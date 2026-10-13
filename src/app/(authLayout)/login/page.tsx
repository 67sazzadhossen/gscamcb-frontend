import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/Auth/LoginForm';
import { school, schoolName } from '@/constants/school';

export const metadata: Metadata = { title: `Login | ${schoolName}` };

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-school-blue px-12 py-12 text-white lg:flex lg:flex-col xl:px-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[60px] border-white/5"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full border-[50px] border-white/5"
        />
        <Link
          href="/"
          className="relative flex items-center gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-school-yellow"
        >
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
            <Image
              src={school.logo}
              alt=""
              width={64}
              height={64}
              priority
              className="object-contain"
            />
          </span>
          <span>
            <span className="block max-w-xs text-lg font-bold leading-snug">
              {school.name}
            </span>
            <span className="mt-2 block text-xs font-semibold tracking-wider text-school-yellow">
              {school.branch}
            </span>
          </span>
        </Link>
        <div className="relative my-auto py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-school-yellow"
            />
            Your school. Connected.
          </span>
          <h1 className="mt-8 max-w-lg text-5xl font-extrabold leading-tight tracking-tight xl:text-6xl">
            A brighter future
            <br />
            starts with <span className="text-school-yellow">you.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-8 text-blue-100">
            One place to stay connected with your school, your learning, and
            your next step forward.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-1 w-12 rounded-full bg-school-red"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Learn · Grow · Lead
            </span>
          </div>
        </div>
        <p className="relative text-sm text-blue-200">{school.address}</p>
      </section>
      <section className="flex min-h-dvh flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <Link
          href="/"
          className="self-start rounded-lg text-sm font-semibold text-slate-500 transition hover:text-school-blue focus-visible:outline-2 focus-visible:outline-school-blue"
        >
          <span aria-hidden="true">← </span>Back to home
        </Link>
        <div className="mx-auto my-auto w-full max-w-md py-12">
          <Image
            src={school.logo}
            alt={`${schoolName} logo`}
            width={72}
            height={72}
            priority
            className="mb-7 h-18 w-18 object-contain"
          />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-school-red">
            School portal
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-school-blue">
            Welcome back.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in with your school account to continue.
          </p>
          <LoginForm />
          <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-school-blue"
            >
              ✓
            </span>
            <p className="text-xs leading-5 text-slate-500">
              For students, teachers, and school staff.
              <br />
              Use the account provided by your school.
            </p>
          </div>
        </div>
        <p className="text-center text-xs leading-5 text-slate-400">
          © {new Date().getFullYear()} {school.branch}
        </p>
      </section>
    </main>
  );
}
