import Image from 'next/image';
import { school } from '@/constants/school';

const values = [
  'Academic excellence',
  'Discipline & character',
  'A brighter future',
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f8fc]">
      <div
        aria-hidden="true"
        className="absolute -left-48 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-school-blue">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-school-red"
            />
            Welcome to {school.branch}
          </p>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.1] tracking-tight text-school-blue sm:text-6xl xl:text-7xl">
            Great learning.
            <br />
            Strong values.
            <br />
            <span className="relative inline-block text-school-red">
              Bright futures.
              <svg
                aria-hidden="true"
                viewBox="0 0 450 18"
                className="absolute -bottom-3 left-0 h-4 w-full text-school-yellow"
                fill="none"
              >
                <path
                  d="M4 13C115 2 296 2 446 10"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-9 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            A place to learn with curiosity, grow with confidence, and lead with
            character. Begin your child’s journey with Gazipurshaheen Cadet
            Academy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.gscam.edu.bd/about-us/mission&vision"
              className="group inline-flex items-center gap-3 rounded-xl bg-school-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-blue"
            >
              Discover our school{' '}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
            <a
              href="https://www.gscam.edu.bd/academic-info/notice"
              className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-school-blue transition hover:border-school-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-blue"
            >
              Notice board <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200 pt-6">
            {values.map((value) => (
              <li
                key={value}
                className="flex items-center gap-2 text-xs font-medium text-slate-600"
              >
                <span
                  aria-hidden="true"
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-school-blue"
                >
                  ✓
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-lg pb-7 lg:pb-0">
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-28 w-28 rounded-full border-[18px] border-school-yellow/80 sm:-right-7 sm:-top-7"
          />
          <div className="relative overflow-hidden rounded-[2rem] bg-school-blue p-7 shadow-2xl shadow-blue-950/15 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-white/5"
            />
            <div className="relative flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                <Image
                  src={school.logo}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-school-yellow">
                  Learn · Grow · Lead
                </p>
                <p className="mt-2 text-lg font-bold leading-snug text-white">
                  {school.name}
                </p>
              </div>
            </div>
            <svg
              role="img"
              aria-label="Illustration of a school with an open book"
              viewBox="0 0 440 300"
              className="relative mt-8 w-full"
            >
              <circle cx="350" cy="55" r="30" fill="#f5c542" />
              <path
                d="M26 96h55m-20-13h34M314 113h64"
                stroke="#fff"
                strokeOpacity=".3"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M36 239h368"
                stroke="#fff"
                strokeOpacity=".25"
                strokeWidth="3"
              />
              <path d="M80 139h280v100H80z" fill="#dce9fa" />
              <path d="M161 101h118v138H161z" fill="#fff" />
              <path d="m143 106 77-51 77 51z" fill="#c8323b" />
              <path d="M220 56V22" stroke="#fff" strokeWidth="4" />
              <path d="M222 22h39l-9 10 9 10h-39" fill="#f5c542" />
              <circle cx="220" cy="127" r="15" fill="#153b75" />
              <path
                d="M220 116v11l7 5"
                stroke="#f5c542"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {[100, 130, 292, 322].map((x) => (
                <path
                  key={x}
                  d={`M${x} 159h17v23h-17zM${x} 197h17v23h-17z`}
                  fill="#153b75"
                  opacity=".75"
                />
              ))}
              <path d="M197 187a23 23 0 0 1 46 0v52h-46z" fill="#153b75" />
              <path d="M214 171v68" stroke="#dce9fa" strokeWidth="2" />
              <path
                d="M49 239v-35m0 15-13-12m13 2 13-12M386 239v-46m0 25 15-15m-15 4-12-12"
                stroke="#f5c542"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M112 255q54-24 108-2 54-22 108 2v35q-54-20-108-2-54-18-108 2z"
                fill="#fff"
              />
              <path
                d="M220 253v35M130 264q34-11 72-1m-72 13q34-11 72-1m36-11q38-10 72 0m-72 12q38-10 72 0"
                stroke="#153b75"
                strokeOpacity=".25"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="mt-5 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold text-white">
                Every great journey starts with a school.
              </p>
              <p className="mt-2 text-xs text-blue-200">
                {school.branch} · {school.address}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-1 left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:-left-6 lg:-bottom-6">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-school-yellow text-xl text-school-blue"
            >
              ✦
            </span>
            <div>
              <p className="text-sm font-bold text-school-blue">
                Inspired to achieve
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Built on learning and character
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
