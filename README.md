# Loudbird – Digital marketing agency website (React + Router + Express)

## Run locally
    npm install
    npm run dev          # site: http://localhost:5173   API: http://localhost:3001

## Production-style run
    npm start            # builds, then serves site + API on http://localhost:3001

## Pages
/ (Home) · /services · /work · /work/:slug (case study) · /about · /contact · /admin · 404

## Backend
`server/index.js` is a small Express API.
- POST /api/leads – saves the inquiry and sends an email to `CONTACT_EMAIL`
- GET /api/leads, DELETE /api/leads/:id – require the configured `x-admin-key`

### SMTP setup
The contact form sends directly through the SMTP account configured on the server. It does not use the visitor's email app. The email is sent from your SMTP sender account, with the visitor's address set as Reply-To.

Copy `.env.example` to `.env` and add your SMTP credentials. For Gmail, enable 2-Step Verification and create a Google App Password for the sending account; use that for `SMTP_PASS` (not your regular Gmail password):

```powershell
Copy-Item .env.example .env
# Edit .env and set SMTP_USER, SMTP_PASS, and ADMIN_KEY.
npm run dev
```

`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` configure SMTP. `SMTP_SECURE=true` is typically used with port 465; port 587 usually uses `false`. `SMTP_FROM` is optional and defaults to `SMTP_USER`. Set `CONTACT_EMAIL` to change the recipient; it defaults to `princeku.ray143@gmail.com`. Keep `.env` private and configure the same variables in your hosting provider for deployment.

The API saves each inquiry before attempting delivery, and records whether email delivery succeeded. If SMTP is unavailable or rejects the message, the form reports the problem and the inquiry remains in the leads store.

### Production storage and delivery
`server/leads.json` is suitable for local development only. For a public deployment, use a persistent database and a durable email queue with retries and delivery monitoring; local files can be lost during redeploys, and an SMTP connection can fail temporarily. Protect lead and admin access with HTTPS and a strong, unique `ADMIN_KEY`. The admin dashboard is disabled until that key is set.

## Edit content
All dummy content lives in `src/data.js`. Colours are tokens at the top of `src/styles.css`.

## Ideas to extend
Swap leads.json for a database (SQLite/MongoDB), add campaign analytics, deploy (Render / Railway).
