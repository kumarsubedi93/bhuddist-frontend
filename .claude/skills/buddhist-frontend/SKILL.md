---
name: buddhist-frontend
description: Next.js 14 (App Router) + TypeScript admin dashboard for managing art/users/families, talking to the bhuddist-backend API. Use when working on pages, components, or env config in buddhist-frontend.
---

# buddhist-frontend

Next.js 14 App Router admin dashboard (package.json name: `bhuddist`) for managing art
records, users/families, and reports. Talks to `bhuddist-backend` over HTTP.

## Structure

- `src/app/` — routes: `admin/` (protected dashboard: art, users, reports, settings),
  `login/`, `api/rotatePdf/` (Next API route), root `page.tsx`
- `src/components/` — UI: tables, tabs, sidebar, frames/PDF export, forms, pagination,
  modals, data tables
- `src/lib/` — `helper.ts` (API call wrapper + `BASE_URL` from `NEXT_PUBLIC_API`),
  `action.ts`, `artIcons.ts`, `types.ts`
- `src/hooks/` — custom hooks (e.g. `useMobile`)
- `src/middleware.ts` — auth guard: redirects to `/login` if no `token` cookie when
  accessing `/admin/*` (cookie-based auth via `cookies-next`, not env-var driven)
- `src/fonts/`, `src/assets/` — static assets (custom font `KaiTi.ttf`)
- Styling: Tailwind CSS

## Env vars

See `.env.example`. Only `NEXT_PUBLIC_API` is used (in `src/lib/helper.ts`, as the backend
base URL for all API calls). Create a local `.env.local` (gitignored) with this value set
to the running `bhuddist-backend` instance URL.

## Scripts

- `npm run dev` — `next dev`
- `npm run build` — `next build`
- `npm run start` — `next start`
- `npm run lint` — `next lint`

## Notes

- Export features use `pdf-lib`, `react-to-print`, `export-to-csv`,
  `react-export-table-to-excel`.
- Three toast libraries are present (`react-hot-toast`, `react-toastify`, `sonner`) —
  check which one is already used in a given area before adding toasts, to avoid mixing.
