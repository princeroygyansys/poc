# poc – Agency website proof of concept (React + Router + Express)

## Run locally
    npm install
    npm run dev          # site: http://localhost:5173   API: http://localhost:3001

## Production-style run
    npm start            # builds, then serves site + API on http://localhost:3001

## Pages
/ (Home) · /services · /work · /work/:slug (case study) · /about · /contact · /admin · 404

## Backend
`server/index.js` is a small Express API.
- POST /api/leads – emails a project brief to `princeku.ray143@gmail.com` and saves it to `server/leads.json`
- GET /api/leads, DELETE /api/leads/:id – need header `x-admin-key`
Set your own key: `ADMIN_KEY=secret npm run dev`. Default is `admin123`.

### Contact form
The website's contact form opens the visitor's default email app with the brief addressed to `princeku.ray143@gmail.com`. The visitor must press Send in their email app. This does not require SMTP or an email API subscription, but it does require the visitor to have an email app configured.

### Email delivery
SMTP is only needed if another client submits briefs directly to the backend's `POST /api/leads` endpoint. It is not used by the website contact form. For Gmail, use an app password for `SMTP_PASS`:

```powershell
$env:SMTP_HOST = "smtp.gmail.com"
$env:SMTP_PORT = "587"
$env:SMTP_SECURE = "false"
$env:SMTP_USER = "your-sender@gmail.com"
$env:SMTP_PASS = "your-app-password"
$env:SMTP_FROM = "your-sender@gmail.com"
npm run dev
```

`SMTP_FROM` is optional and defaults to `SMTP_USER`. Set `CONTACT_EMAIL` to override the recipient address. Brief submissions return an error if SMTP is not configured or delivery fails.

## Edit content
All dummy content lives in `src/data.js`. Colours are tokens at the top of `src/styles.css`.

## Ideas to extend
Swap leads.json for a database (SQLite/MongoDB), add a blog, deploy (Render / Railway).
