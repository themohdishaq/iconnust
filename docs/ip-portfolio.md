# IP portfolio administration

Open `/admin/ip-portfolio` after signing in. The **IP Portfolio** sidebar link and dashboard card open the manager for patents, copyrights and industrial designs.

Each record has a title, IP type, field of invention, optional application number, optional award date, optional description, and Draft/Published status. Fields can be selected from suggestions or entered freely. Blank fields are shown as Unassigned. Published descriptions open in the public portfolio dialog; blank descriptions do not enable that dialog.

## Database setup

The portfolio uses `ip_portfolio_records` in the existing MySQL database configured through `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME`. It supports the existing `DB_SSL` and `DB_SSL_CA_FILE` settings.

Before running the updated application against another database, run:

```sh
npm run db:ip-portfolio
```

This creates the portfolio table and schema bookkeeping table if necessary, and imports all records from `data/nipo_top20_ip_records.json` as Published. The import runs in a transaction and is recorded as `seed-ip-portfolio-v1`. Repeating the command preserves admin edits and deletions and does not duplicate the imported records. `npm run db:schema` also runs this import.

After the import, MySQL is the source for the public portfolio and admin manager. Changes to the JSON file do not overwrite database records. Use the admin form to manage records and descriptions.

## API

- `GET /api/ip-portfolio`: published records only; no authentication required.
- `POST /api/ip-portfolio`: create a record.
- `PUT /api/ip-portfolio/:id`: edit a record.
- `DELETE /api/ip-portfolio/:id`: delete a record.

Mutations require a completed admin session and pass the application's request-origin check. Creation and updates accept JSON with `ip_title`, `ip_type` (`Utility Patent`, `Copyright`, or `Industrial Design`), `sector`, `description`, `application_no`, `award_date` (`YYYY-MM-DD` or blank), and `status` (`draft` or `published`). Blank application numbers and award dates are stored as NULL.

## Verification

With the local development server running, execute:

```sh
npm run test:ip-portfolio
```

The integration test creates temporary records for each IP type, checks CRUD, draft visibility, descriptions, dates, validation, authentication, origin protection and rendered pages, then removes its temporary records. It only runs against localhost or 127.0.0.1. Set `IP_PORTFOLIO_TEST_URL` if the local server uses a port other than 3000.
