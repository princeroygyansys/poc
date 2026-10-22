import express from 'express'
import fs from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, 'leads.json')
const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'princeku.ray143@gmail.com'
const PORT = process.env.PORT || 3001

const read = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : [])
const write = (d) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2))
const isAdmin = (req) => req.get('x-admin-key') === ADMIN_KEY

const createMailTransport = () => {
  const { SMTP_HOST, SMTP_PORT = '587', SMTP_USER, SMTP_PASS } = process.env
  const port = Number(SMTP_PORT)
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !Number.isInteger(port) || port < 1 || port > 65535) return null

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

const app = express()
app.use(express.json())

app.post('/api/leads', async (req, res) => {
  const { name, email, company = '', service = '', budget = '', timeline = '', message = '' } = req.body || {}
  if (!name || name.trim().length < 2) return res.status(400).json({ error: 'Name is required.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email || '')) return res.status(400).json({ error: 'A valid email is required.' })
  if (!message || message.trim().length < 10) return res.status(400).json({ error: 'Message must be at least 10 characters.' })
  const lead = { id: Date.now().toString(36), createdAt: new Date().toISOString(), name: name.trim(), email: email.trim(), company, service, budget, timeline, message: message.trim() }

  const mailTransport = createMailTransport()
  if (!mailTransport) return res.status(503).json({ error: 'Email delivery is not configured on the server.' })

  const text = [
    'A new project brief was submitted.',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || 'Not provided'}`,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    '',
    'Brief:',
    lead.message,
  ].join('\n')

  try {
    await mailTransport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_EMAIL,
      replyTo: lead.email,
      subject: 'New project brief',
      text,
    })
  } catch (error) {
    console.error('Failed to send project brief email:', error)
    return res.status(502).json({ error: 'Could not deliver the project brief email.' })
  }

  try {
    write([lead, ...read()])
  } catch (error) {
    console.error('Email was sent, but the project brief could not be saved:', error)
    return res.status(500).json({ error: 'Email was sent, but the project brief could not be saved.' })
  }

  res.status(201).json({ ok: true })
})

app.get('/api/leads', (req, res) => (isAdmin(req) ? res.json(read()) : res.status(401).json({ error: 'Wrong admin key.' })))

app.delete('/api/leads/:id', (req, res) => {
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

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
