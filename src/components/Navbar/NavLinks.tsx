import { mainNavigation } from '@/constants/navigation';

export default function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const itemClass =
    'flex items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:text-school-yellow focus-visible:outline-2 focus-visible:outline-school-yellow';
  return mainNavigation.map((item) =>
    'children' in item ? (
      <details
        key={item.label}
        name="school-navigation"
        className="group relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            event.currentTarget.open = false;
        }}
      >
        <summary
          className={`${itemClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
        >
          {item.label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="ml-3 border-l-2 border-school-yellow pl-2 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:ml-0 lg:min-w-56 lg:rounded-xl lg:border lg:border-blue-100 lg:bg-white lg:p-2 lg:shadow-xl">
          {item.children.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-3 text-sm text-blue-100 hover:bg-white/10 hover:text-school-yellow focus-visible:outline-2 focus-visible:outline-school-yellow lg:text-slate-700 lg:hover:bg-blue-50 lg:hover:text-school-blue"
            >
              {label}
            </a>
          ))}
        </div>
      </details>
    ) : (
      <a
        key={item.label}
        href={item.href}
        onClick={onNavigate}
        className={itemClass}
      >
        {item.label}
      </a>
    ),
  );
}
