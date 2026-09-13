# Setup checklist

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Create Supabase project and run `supabase/schema.sql`.
4. Enable Email Auth and add localhost plus production redirect URLs.
5. Run `npm install && npm run dev`.
6. Before launch, add protected middleware, review RLS, configure private storage, connect payments/webhooks, add tests and monitoring.
