# DemandScout AI

DemandScout AI is a dark-mode Next.js SaaS dashboard that helps founders discover high-demand SaaS opportunities from mocked public demand signals. The codebase is structured so real scrapers, APIs, Supabase persistence, and OpenAI analysis can be connected later.

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase-ready auth/database helpers
- OpenAI-ready analysis service
- Stripe-ready pricing section

## Routes

- `/` landing page
- `/dashboard`
- `/search/new`
- `/results/[searchId]`
- `/ideas/[ideaId]`
- `/api/search`

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Optional environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=
NEXT_PUBLIC_STRIPE_CHECKOUT_URL=
NEXT_PUBLIC_STRIPE_PRICE_ID=
```
