This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage by modifying `app/(home)/page.tsx`. The page auto-updates as you edit the file.

## Folder structure

- `app/<route>/page.tsx` owns page content, section order, and server-side data loading.
- `app/<route>/layout.tsx` owns route metadata and shared route configuration. The root layout owns site-wide metadata and chrome.
- `app/(home)/` contains the homepage and its metadata layout. This route group still serves `/`, and keeps home-only metadata and organization structured data out of other routes.
- `components/<feature>/` contains interactive sections that pages import, such as charts, animated sections, and inquiry forms. Sections with independent state are separate components; the commercialisation experience keeps its shared disclosure-modal state together.
- `components/admin/<feature>/` contains reusable admin forms and controls. Server actions remain beside their admin routes in `app/admin/(protected)/<feature>/actions.ts`.
- `lib/` contains database models, server utilities, and shared hooks. Database queries stay in server pages rather than client components.

The news article layout at `app/news/[slug]/layout.tsx` generates article-specific metadata. The special `app/not-found.tsx` retains its own 404 metadata so it does not affect valid routes.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Managing the innovation portfolio

Sign in and open **Admin → Sectors & Projects** (`/admin/innovation`). Add sectors,
then add projects or spin-offs and select one or more sectors. Titles, descriptions,
images, status, TRL highlights and display order can be edited. Sector URLs remain
fixed after creation. Assigned sectors cannot be deleted until their projects are
moved or removed. Counts are calculated from the assignments.

Run `npm run db:schema` when setting up or updating a database. This creates the
portfolio tables and imports `data/innovation-portfolio.json` once, tracked in
`schema_migrations`. Subsequent runs preserve admin changes, including deletions.
The seed maps the former Consumer Products & Design entry into Creative Industries,
Media & Tourism so the previously unlisted BBQ Grill project is accessible.
Public pages read MySQL directly; `lib/innovationSectors.ts` contains shared types.

The API supports public `GET` and authenticated `POST` on `/api/innovation/sectors`
and `/api/innovation/projects`, plus `GET`, `PUT` and `DELETE` on their `/{id}`
routes (a sector's ID is its slug). Filter projects with `?sector=<slug>`.
Send JSON using the shared `SectorInput` / `ProjectInput` fields, or multipart form
data containing a JSON `data` field and an optional image `file`. Writes require
the admin session cookie. Uploads use `public/uploads/innovation`; keep that
directory persistent on the hosting server. Replaced images are retained to avoid
breaking other entries that reuse an image path.

With the local development server running, `node scripts/test-innovation.mjs`
checks API authorization, validation, CRUD, assignments, counts, uploads and page
rendering using temporary entries that it removes afterward.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
