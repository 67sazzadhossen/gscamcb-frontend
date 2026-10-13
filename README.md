# GSCAMCB frontend

Next.js App Router frontend following the structure of [cadet-client](https://github.com/67sazzadhossen/cadet-client). The existing Next.js 16 installation is retained.

## Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_BACKEND_URL` to the backend origin, without `/api/v1` (default: `http://localhost:5000`). This variable is public and must not contain credentials. The backend must allow your frontend origin through CORS. Open `http://localhost:3000` or `/dashboard`.

## Structure

```text
src/
  app/
    layout.tsx                         # Root layout and providers
    provider.tsx                       # Redux and toast provider
    globals.css
    (mainLayout)/                      # Public layout: navbar and footer
      layout.tsx
      page.tsx
    (dashboardLayout)/                 # Dashboard shell and responsive sidebar
      layout.tsx
      dashboard/page.tsx
  components/
    Navbar/Navbar.tsx
    Footer/Footer.tsx
    SidebarItems/SideBar.tsx
    Dashboard/BackendStatus.tsx
  redux/
    ReduxProvider.tsx
    store.ts
    storage.ts
    hook.ts
    api/baseApi.ts
    features/
      auth/authSlice.ts
      health/healthApi.ts
  types/index.type.ts
  assets/
  constants/
  hooks/
  utils/
```

The parenthesized groups do not appear in URLs. Add public pages to `(mainLayout)` and dashboard pages beneath `(dashboardLayout)/dashboard`. Add feature API modules under `redux/features/<feature>/<feature>Api.ts` using `baseApi.injectEndpoints`.

## Redux and persistence

Redux Toolkit manages the store, with typed `useAppDispatch` and `useAppSelector` hooks. Only auth state is persisted to localStorage under `persist:gscamcb-auth`; RTK Query cache is not persisted. A fresh store is created per provider instance so server requests do not share session state. Persistence starts after browser mount and `PersistGate` waits for rehydration. Storage access tolerates SSR and disabled browser storage.

The auth slice exposes `setUser`, `logout`, and `selectCurrentUser`. `baseApi` includes credentials and attaches a Bearer token when available. The final authorization-header format must match the backend when authentication is implemented. Clearing auth does not clear RTK Query cache automatically; an eventual sign-out flow should also dispatch `baseApi.util.resetApiState()`.

`healthApi` calls the existing `/api/v1/health` endpoint. Authentication, refresh-token requests, private routes, and school feature APIs are intentionally pending their backend implementations. The dashboard is currently public; persisted state does not enforce access permissions. No reference branding assets, Firebase configuration, or credentials are copied.

## Formatting and checks

```bash
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run build
# If your environment restricts Turbopack worker sockets:
npm run build -- --webpack
```

Prettier uses the same formatting options as the backend, with VS Code format on save configured. Install the recommended Prettier extension. After adding or moving routes, run `npx next typegen` before standalone type checking to update generated route types.

The online dependency audit during setup reported five high-severity advisories in the existing Next.js ESLint development-tool chain (`eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, `braces`). The proposed automatic fix downgrades the lint configuration to Next.js 14; it was not applied to this Next.js 16 project.
