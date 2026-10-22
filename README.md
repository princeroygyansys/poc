# Loudbird — Digital marketing agency website

React and Vite frontend with a local Express API and a Netlify production API.

## Admin dashboard

The admin dashboard is a standalone page at `/admin`, outside the public site's navigation and footer. Admins must type `/admin` in the address bar and enter the shared access key. The API checks the key on every request to list or delete leads. The URL is not secret or access control; keep the key private. Do not put it in a `VITE_*` variable or commit it to source control.

Generate a strong key locally in PowerShell:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Copy the generated value into `ADMIN_KEY` in your local `.env`. Keep it private and give the same key only to the two admins. Since this is a shared key, either admin can access the dashboard as the same account; it does not provide separate identities or audit history. Rotate the key if it is exposed or an admin should lose access.

## Local setup and verification

```powershell
npm install
npm run dev
```

If you do not already have a `.env`, create it from the example with `Copy-Item .env.example .env`. Add or update these values in the existing `.env`:

| Variable | Value |
| --- | --- |
| `ADMIN_KEY` | Strong random key generated with the command above |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Supabase secret key; server-side database access only |
| `VITE_WHATSAPP_NUMBER` | WhatsApp destination with country code, digits only (for example, `91` followed by your number) |

Set `VITE_WHATSAPP_NUMBER` to the WhatsApp account that should receive visitor messages. Include the country calling code, using digits only: no `+`, spaces, or punctuation. This is a public contact number embedded in the website, not a secret. If it is empty or invalid, the WhatsApp link is not shown. Restart `npm run dev` after changing `.env`.

For local testing, the Express API saves inquiries in `server/leads.json`; it does not require Supabase database settings. Open `http://localhost:5173/admin`, enter the `ADMIN_KEY`, and confirm the dashboard loads. Submit a test inquiry from the Contact page and verify it appears. Sign out and confirm the dashboard asks for the key again.

## Deploy the public website and admin dashboard together to Netlify

Both pages are deployed in the same Netlify site and use the same API and Supabase database. The public website is at `/`; the admin dashboard is reached by manually navigating to `/admin`. Supabase Auth is not used.

1. **Set up Supabase.** Create a Supabase project. Open its SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql) to create the `public.leads` table. Row Level Security is enabled with no public policies.
2. **Push the project to a Git provider.** If it is not already in GitHub or another supported provider, create a repository and push the project. Do not commit `.env`; it is ignored by Git.
3. **Import the repository into Netlify.** Choose **Add new site → Import an existing project** and connect the repository. Netlify should use the included `netlify.toml`, which configures the build command (`npm run build`), publish directory (`dist`), Functions (`netlify/functions`), and API redirects.
4. **Set production environment variables** in Netlify under **Site configuration → Environment variables**:

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_SECRET_KEY` | Supabase secret key; server-side only |
   | `ADMIN_KEY` | Strong random key generated with the PowerShell command above |
   | `VITE_WHATSAPP_NUMBER` | WhatsApp destination with country code, digits only |

   Set the variables for the deploy context you will use (usually **Production**). `VITE_WHATSAPP_NUMBER` is intentionally public; never prefix secrets with `VITE_`.
5. **Deploy.** Trigger the initial deploy in Netlify. After a successful build, Netlify provides a public URL such as `your-site.netlify.app`.
6. **Verify the live workflow.** Open the public site and submit a test inquiry. Then navigate directly to `https://your-site.netlify.app/admin`, enter the shared admin key, and confirm the inquiry appears. Verify the dashboard rejects a wrong key and that sign-out returns to the key form. The Gmail reply link opens a pre-addressed compose draft; review and send the reply yourself.
7. **Share access safely.** Give admins the `/admin` URL and the key through a private channel. Anyone who obtains the shared key can view and delete leads. Rotate it in Netlify and redeploy if it is exposed or access must be revoked.

Keep the Supabase secret key and admin key private. Anyone who has the shared admin key can access all leads, so share it only with the two admins and rotate it if access needs to be revoked. Use HTTPS when accessing the deployed dashboard. The hidden route and the fact that you share its URL only with admins are not substitutes for the key check.

## Pages and content

Pages: `/`, `/services`, `/work`, `/work/:slug`, `/about`, `/contact`, `/admin`.

Page content lives in `src/data.js`; visual tokens and styles live in `src/styles.css`.
