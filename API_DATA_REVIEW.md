# API and data review

Reviewed on October 2, 2026. Database inspection used SELECT queries only. No seed scripts, schema migrations, valid form submissions, or emails were executed. Existing page styling and database records were preserved.

## Fixes

- `/api/news`: normalize limits to positive integers capped at 20; negative, fractional, and non-finite values no longer cause SQL errors. Database failures return a JSON error.
- Homepage news: check HTTP status and array responses before rendering; cancel requests when the component unmounts.
- Homepage Tech Place cards: display the configured admin title alongside its value and subtitle, retaining existing defaults when records are absent.
- `/api/inquiries`: reject inherited object keys as sources, validate optional fields against storage limits, accept surrounding email whitespace, and return JSON on persistence failures.
- `/api/subscribe`: accept surrounding email whitespace and return JSON on persistence failures.
- `/api/invention-disclosures`: return JSON on database failures; its client checks HTTP status and array responses and cancels requests on unmount.

## Verified

- All six API handlers were inspected. Read endpoints return valid JSON. Invalid public submissions return HTTP 400 with JSON errors, and unauthenticated `/api/sendMail` requests return HTTP 401.
- News API titles and images match the published database records. Default, negative, fractional, zero, oversized, NaN, and Infinity limit cases pass.
- All four published news detail pages and their images load.
- The disclosure API returns only approved records; there are currently none.
- All four NIPO categories and all 22 download URLs load.
- Home, team, about, innovation/collaboration, industry services, commercialisation, news, news search, contact, IPO listing, and admin login pages return HTTP 200 in development.
- Local images referenced by database news, partners, stories, and team records exist. All current static team images exist.
- TypeScript validation passes. ESLint reports no errors in the changed API/component files, with existing unused-code warnings in the commercialisation component.
- Production build passes, including TypeScript and generation of all 33 static pages.
- Production-server smoke checks pass for six main pages and all three read APIs, including the previously failing news limit cases. Record counts across all 16 inspected content/submission tables match the initial read-only baseline.

## Current content and display gaps

| Content | Database records | Current public display |
| --- | ---: | --- |
| News | 4 | Published news API, homepage cards, news listing and article pages |
| FAQs | 21 | Page-specific FAQ sections |
| Stat tiles | 7 | Home and innovation sections |
| IP breakdown | 4 | Innovation portfolio chart |
| IP yearly stats | 14 | Innovation trend chart |
| Tech Place stats | 0 | Existing homepage defaults |
| Events | 0 | No database event cards |
| Stories | 0 | No database story cards |
| Team members | 0 | Team page uses its existing static leadership list |
| Partners | 35 | Partner component has no current public-page caller |
| Financial stats | 4 | Financial chart has no current public-page caller |
| Invention disclosures | 1 pending, 0 approved | Approved portfolio state is fetched but not rendered in the current commercialisation layout |

These display gaps were retained to preserve the current page content and layout. Admin team edits do not feed the static public team list.

## Verification limits

- Successful submission persistence and email delivery were not exercised because they would modify existing data or contact recipients.
- Authenticated admin mutations and browser visual interactions were not exercised.
- Repository-wide lint already fails in `components/Carousel.tsx` and `scripts/check-static-images.js`. The static-image script also references a removed team component; current team image paths were checked directly instead.
- Production build verification runs `next build` directly to avoid the database schema script configured in `prebuild`.
