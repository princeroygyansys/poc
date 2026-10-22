# Loudbird — Digital marketing agency website

React and Vite frontend with a local Express API and a Netlify production API.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
# Set a strong, unique ADMIN_KEY in .env for local dashboard access.
npm run dev
```

The website runs at `http://localhost:5173`; its local API runs at `http://localhost:3001`.
Local inquiries are stored in `server/leads.json`. The file is for development only and is not shared with the production database.

## Production architecture

The Netlify deployment uses:

- Netlify Functions for `POST /api/leads`, `GET /api/leads`, and `DELETE /api/leads/:id`.
- Supabase Postgres for persistent inquiry storage.

Contact form submissions are saved without automatically sending email. The `/admin` dashboard lists the inquiries; **Reply in Gmail** opens a pre-addressed Gmail compose window so you can review and send each reply yourself. Netlify does not run `server/index.js` or persist `server/leads.json`.

## Deploy to Netlify

1. Push this project to a Git provider and import the repository in Netlify. The included `netlify.toml` configures `npm run build`, publishes `dist`, deploys `netlify/functions`, routes `/api/leads` to the API function, and sends other routes to the React app.
2. Create a Supabase project. In its SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql) to create the `public.leads` table. Row Level Security is enabled with no public policies; only the server-side secret key can access it.
3. In Netlify, add these variables under **Site configuration → Environment variables**, for the production deploy context:

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_SECRET_KEY` | Supabase secret key (server-side only; never use a publishable key here) |
   | `ADMIN_KEY` | Long, random, unique secret used by the leads dashboard |

4. Redeploy after setting the environment variables. Test the contact form with an inquiry you intend to submit, then open `/admin` and confirm the inquiry appears. Do not expose the Supabase secret key or admin key as `VITE_*` variables.

The Gmail reply link opens Gmail with the visitor's address and a prefilled subject. It does not send automatically; review the message and click **Send** in Gmail.

## Security and operational notes

- Use a strong, unique admin key and rotate any credentials that have been shared or exposed.
- Restrict Supabase access to the function's secret key. Never put that key in browser code or add public table policies for inquiry data.
- Configure a Netlify rate limit for `POST /api/leads` and monitor function logs to reduce spam and catch failures.
- Free-tier services may have usage caps or pause inactive database projects. This is suitable to launch and validate the site, but review quotas and backup needs as real inquiries arrive.
- The admin page is protected by `ADMIN_KEY`; this is a simple shared-secret dashboard, not a full user-account system.

## Pages and content

Pages: `/`, `/services`, `/work`, `/work/:slug`, `/about`, `/contact`, `/admin`.

Page content lives in `src/data.js`; visual tokens and styles live in `src/styles.css`.
