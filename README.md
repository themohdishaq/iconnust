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

## Managing news order

In `/admin/news`, open an article and set **Display Order**. Lower numbers appear
first and higher numbers appear last; equal values show newest articles first,
with the ID breaking timestamp ties. This order applies to the admin list, public
news grid, search results, API results, and related articles. The first featured
article in that order is selected for the featured section. Reordering alone does
not send subscriber notifications. Existing articles receive order `0`, preserving
their previous newest-first order. Apply the database migration before deploying
the new code: preview with `npm run db:migrate:production`, then execute with
`npm run db:migrate:production -- --apply` using your cloud configuration.
With the local development server running, `node scripts/test-news-order.mjs`
checks order edits, invalid values, authorization, and sorting across news views
using temporary articles that it removes afterward.

## Managing the team

The public `/team` page loads members from `team_members` on every request in the
display order set by admins. Sign in at `/admin/team` to add, edit, reorder, or
delete members. Names, titles, departments, and photos appear on the public page;
bio and email are optional. Each write requires an authenticated admin session
and refreshes both the admin list and the public page.

To import the nine previously hardcoded members into an empty database once, run
`npm run seed:team`. For the cloud production database use
`node --env-file=.env.production.local scripts/seed-team.mjs` after applying its
schema. The import preserves existing team records and records completion in
`schema_migrations`, so reruns do not restore members deleted by admins. Without
records, the public page displays an empty state. Keep `public/uploads/team`
persistent on the hosting server so uploaded photos survive redeployments.
With the local development server running, `node scripts/test-team.mjs` verifies
authenticated CRUD, anonymous write rejection, photo uploads, display order, and
public-page updates using temporary records that it removes afterward.

## Updating an existing production database

To update the structure of a second existing database, configure its `DB_HOST`,
`DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` environment variables in Plesk
and run **`npm run db:scribe:mitigate`**. No `.env.production.local` file is needed
or loaded by the schema migration. It uses Plesk's process environment first,
with `.env.local` and `.env` as fallbacks for missing local configuration. This command
uses `scripts/migrate-production.mjs --apply` to add missing tables, columns with
safe defaults, and indexes defined in `lib/db/schema.sql`. The second database
can be hosted anywhere; it does not need to be a cloud service. Its existing
records stay in place. Local records are not copied, and seed scripts are not run.
Rerunning skips completed changes. The supported legacy default and column changes
are handled by the migration; arbitrary type changes, dropped columns and
collation conversions require a separate reviewed migration.

The optional data-transfer mode is separate: `node scripts/migrate-production.mjs
--sync-data` reads `.env.local` as its source and `.env.production.local` as its
destination. The full transfer requires Node.js 22. It saves the destination tables
and records in a private JSON backup under `backups/db` before changes, updates
both schemas, and transfers all application tables in a database transaction.
Pause production writes during the transfer so records cannot change between
the backup and import. Keep an independent provider snapshot for recovery too.

In data-transfer mode, local values replace records with matching primary keys, including admin accounts
and their password hashes. Cloud-only records remain. The command stops if a
unique email or slug belongs to a different cloud primary key; data changes are
rolled back, while schema changes already applied remain. Migration-history rows
are merged without overwriting existing history. Rerunning synchronizes the same
records without duplicating them. It sends no emails and does not run seed scripts.
Uploaded image files are separate from database records: deploy `public/team` and
`public/uploads` with the website. The command copies image paths, not files to a
remote web server. `.env.production.local` is required, so a missing cloud setup
cannot silently fall back to the local database.

Use `db:migrate:production` for an existing cloud MySQL 8.0+ database. This
command does not run seed scripts, reset passwords, overwrite content, or convert
existing collations. It adds missing tables, columns with safe defaults, and
indexes. Existing news, events, and stories receive `published` when their status
column is first added; future records default to `draft`. Required columns needing
a backfill, duplicate unique values, and incompatible foreign keys block the
entire plan before execution. Arbitrary existing column types are not reconciled.

Configure these environment variables for the npm command in Plesk (or use
`.env.local` / `.env` when running locally):

```dotenv
DB_HOST=your-cloud-mysql-host
DB_PORT=3306
DB_NAME=your-existing-database
DB_USER=your-migration-user
DB_PASSWORD=your-password
DB_SSL=true
# If the provider supplies its own certificate authority:
# DB_SSL_CA_FILE=C:/path/to/provider-ca.pem
```

Take a provider snapshot or verified backup before applying the changes. Preview
the plan and check the printed host and database name:

```bash
npm run db:migrate:production
```

You can also pass `-- --dry-run` explicitly. Run
`node scripts/migrate-production.mjs --help` for usage without a connection.

After reviewing the SQL, apply it during a maintenance window and verify it:

```bash
npm run db:migrate:production -- --apply
npm run db:migrate:production
```

The final preview should show zero pending statements. Index changes request
`ALGORITHM=INPLACE, LOCK=NONE`; they fail if MySQL cannot honor that request.
Column changes and new tables may still take locks. The script limits metadata
lock waits to ten seconds and serializes apply runs using a database advisory
lock. MySQL DDL commits individually: an execution failure can leave earlier steps
applied. Rerunning resumes from the current schema without repeating completed
changes. Automatic collation conversion and foreign-key replacement need a
separate reviewed migration because they can affect existing data and relations.

`npm run db:migrate` previews the database configured by the normal environment.
`node scripts/test-production-migration.mjs` tests upgrades in a temporary database
using those credentials; it requires CREATE/DROP DATABASE privileges and removes
only the database it creates.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
