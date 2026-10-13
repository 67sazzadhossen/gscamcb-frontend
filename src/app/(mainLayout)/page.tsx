import Link from 'next/link';
export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
        GSCAMCB
      </p>
      <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        School management system
      </h1>
      <p className="mt-6 max-w-xl text-lg text-slate-600">
        A central place for your school’s students, teachers, academics, and
        daily operations.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-block rounded-xl bg-blue-900 px-6 py-3 font-medium text-white"
      >
        Open dashboard
      </Link>
    </section>
  );
}
