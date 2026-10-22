import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = process.env.LEADS_FILE || path.join(__dirname, 'leads.json')
const ADMIN_KEY = process.env.ADMIN_KEY
const PORT = process.env.PORT || 3001

const read = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : [])
const write = (d) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2))
const isAdmin = (req) => Boolean(ADMIN_KEY) && req.get('x-admin-key') === ADMIN_KEY

const app = express()
app.use(express.json({ limit: '20kb' }))

app.post('/api/leads', async (req, res) => {
  const body = req.body || {}
  const { name, email, company = '', service = '', budget = '', timeline = '', message } = body
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) {
    return res.status(400).json({ error: 'Enter a name between 2 and 120 characters.' })
  }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    return res.status(400).json({ error: 'Your brief must be between 10 and 5000 characters.' })
  }
  if ([company, service, budget, timeline].some((value) => typeof value !== 'string' || value.length > 200)) {
    return res.status(400).json({ error: 'One or more form fields are invalid.' })
  }

  const lead = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    service: service.trim(),
    budget: budget.trim(),
    timeline: timeline.trim(),
    message: message.trim(),
  }

  try {
    write([lead, ...read()])
  } catch (error) {
    console.error('Failed to save project brief:', error)
    return res.status(500).json({ error: 'We could not save your brief. Please try again.' })
  }

  res.status(201).json({ ok: true, saved: true })
})

app.get('/api/leads', (req, res) => {
  if (!ADMIN_KEY) return res.status(503).json({ error: 'Admin access is not configured on the server.' })
  return isAdmin(req) ? res.json(read()) : res.status(401).json({ error: 'Wrong admin key.' })
})

app.delete('/api/leads/:id', (req, res) => {
  if (!ADMIN_KEY) return res.status(503).json({ error: 'Admin access is not configured on the server.' })
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong admin key.' })
  write(read().filter((l) => l.id !== req.params.id))
  res.json({ ok: true })
})

// Serve the built site (npm start)
const dist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
  if (!ADMIN_KEY) console.warn('ADMIN_KEY is not configured; the leads dashboard is unavailable.')
})
