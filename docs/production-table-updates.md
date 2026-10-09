# Update production tables

Run the commands from the deployed project directory, with production `DB_HOST`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` configured. `DB_PORT`, `DB_SSL` and `DB_SSL_CA_FILE` are supported. This production entry point never loads `.env.local` or copies local database records.

Preview schema updates without writing:

```sh
npm run db:update:production
```

Apply the reviewed updates:

```sh
npm run db:update:production -- --apply
```

For the initial IP portfolio rollout, preview and then apply the one-time JSON import along with the schema update:

```sh
npm run db:update:production -- --import-ip
npm run db:update:production -- --apply --import-ip
```

The script adds missing tables, safe columns and indexes from `lib/db/schema.sql`, including IP portfolio, team, statistics, and innovation portfolio tables. Existing content is retained. A missing team email column is backfilled with an empty value. Unsafe conversions, incompatible foreign keys, duplicate unique-index values and required columns without defaults stop the migration for review.

The IP import uses a transaction and migration marker. Repeated runs preserve admin edits and deletions. If an IP table already contains rows without the import marker, the import stops before schema changes to avoid duplicating data.

MySQL schema changes commit individually. A rerun resumes remaining schema changes after an interruption. Rerun the preview afterward to confirm that no pending statements remain.

If configuration is stored in an explicit production environment file rather than server variables:

```sh
node --env-file=.env.production scripts/update-production-tables.mjs --apply --import-ip
```

This updates database tables only. Deploy the updated application and preserve the files under `public/uploads` when deploying so uploaded images remain available.
