# HUNAR production foundation

Real Next.js + Supabase starter built on the HUNAR brand direction. Includes responsive marketing UI, Supabase sign-in/sign-up/reset calls, marketplace search, services, dashboard, admin shell, health API, relational schema, and RLS baseline.

## Run
```bash
cp .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000.

## Supabase
Create a project, run `supabase/schema.sql`, enable Email Auth, configure redirect URLs, and fill `.env.local`. Keep the service-role key server-only. Add private Storage buckets for avatars, portfolios, project files, and chat files with signed URL policies.

## Routes
`/`, `/login`, `/signup`, `/forgot-password`, `/marketplace`, `/services`, `/dashboard`, `/admin`, `/api/health`.

## Production work still required
Session middleware and protected route enforcement, server CRUD actions, admin RBAC, Realtime subscriptions, signed storage helpers, payment provider and webhooks, ledger reconciliation, moderation, rate limiting, audits, tests, error monitoring, legal policies, and deployment secrets. Payment, escrow, identity verification, and withdrawals are intentionally not faked.

## Deploy
```bash
npm run build
npm run start
```
Deploy to Vercel or another Node host and configure all environment variables. Use separate Supabase projects for staging and production.
