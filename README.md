# Loudbird — Digital marketing agency website

React, Vite, and React Router frontend with a local Express API and a Netlify production API.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
# Add local SMTP credentials and a strong ADMIN_KEY to .env.
npm run dev
```

The website runs at `http://localhost:5173`; its local API runs at `http://localhost:3001`.
Local inquiries are stored in `server/leads.json`. This file is for development only.

## Production architecture

The Netlify deployment uses:

- Netlify Functions for `POST /api/leads`, `GET /api/leads`, and `DELETE /api/leads/:id`.
- Supabase Postgres for persistent inquiry storage.
- Resend's API for inquiry notification emails.

The Express server and local SMTP workflow remain available for development. Netlify does not run `server/index.js` or persist `server/leads.json`.

## Deploy to Netlify

1. Push this project to a Git provider and import the repository in Netlify. The included `netlify.toml` configures `npm run build`, publishes `dist`, deploys `netlify/functions`, routes `/api/leads` to the API function, and sends other routes to the React app.
2. Create a Supabase project. In its SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql) to create the `public.leads` table. Row Level Security is enabled with no public policies; only the server-side service-role key can access it.
3. Create a Resend account and verify a domain you control. Choose a sender address on that verified domain.
4. In Netlify, add these variables under **Site configuration → Environment variables**, for the production deploy context:

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (secret; server-side only) |
   | `RESEND_API_KEY` | Resend API key (secret; server-side only) |
   | `RESEND_FROM` | Verified sender, e.g. `Loudbird <contact@your-verified-domain>` |
   | `CONTACT_EMAIL` | Inbox for inquiries; defaults to `princeku.ray143@gmail.com` |
   | `ADMIN_KEY` | Long, random, unique secret used by the leads dashboard |

5. Redeploy after setting the environment variables. Test the contact form with an inquiry you intend to send, then check the inbox and the `/admin` dashboard. Do not expose the Supabase service-role key, Resend API key, or admin key as `VITE_*` variables.

The email is sent from the verified `RESEND_FROM` address, with the visitor's address set as `Reply-To`. The visitor's email is not used as the sender. If sending fails after storage, the form reports the failure and the inquiry remains saved with a failed delivery status.

## Local SMTP settings

For local development, the Express API can deliver through SMTP. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` in `.env`. `SMTP_SECURE=true` is typical for port 465; port 587 typically uses `false`. `SMTP_FROM` is optional and defaults to `SMTP_USER`. `CONTACT_EMAIL` defaults to `princeku.ray143@gmail.com`.

Use an app-specific password for SMTP, keep `.env` private, and never commit real credentials. Netlify production uses Resend and Supabase; SMTP variables are not needed there.

## Security and operational notes

- Use strong, unique secrets and rotate any credentials that have been shared or exposed.
- Restrict Supabase access to the function's service-role key. Never put that key in browser code or add public table policies for inquiry data.
- Configure a Netlify rate limit for `POST /api/leads` and monitor function and email-provider logs to reduce spam and catch delivery failures.
- Free-tier services may have usage caps or pause inactive database projects. This is suitable to launch and validate the site, but review quotas and backup needs as real inquiries arrive.
- The admin page is protected by `ADMIN_KEY`; this is a simple shared-secret dashboard, not a full user-account system.

## Pages and content

Pages: `/`, `/services`, `/work`, `/work/:slug`, `/about`, `/contact`, `/admin`.

Page content lives in `src/data.js`; visual tokens and styles live in `src/styles.css`.
