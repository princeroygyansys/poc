import { randomUUID, timingSafeEqual } from 'node:crypto'

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '')
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'princeku.ray143@gmail.com'

export function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  }
}

export function validateLead(body) {
  const {
    name,
    email,
    company = '',
    service = '',
    budget = '',
    timeline = '',
    message,
  } = body || {}

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) {
    return { error: 'Enter a name between 2 and 120 characters.' }
  }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
    return { error: 'Enter a valid email address.' }
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    return { error: 'Your brief must be between 10 and 5000 characters.' }
  }
  if ([company, service, budget, timeline].some((value) => typeof value !== 'string' || value.length > 200)) {
    return { error: 'One or more form fields are invalid.' }
  }

  return {
    lead: {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      service: service.trim(),
      budget: budget.trim(),
      timeline: timeline.trim(),
      message: message.trim(),
      deliveryStatus: 'pending',
    },
  }
}

export async function supabaseRequest(path, { method = 'GET', body, prefer } = {}) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (prefer) headers.Prefer = prefer

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  })
  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(`Supabase request failed (${response.status}): ${responseText.slice(0, 500)}`)
  }

  return responseText ? JSON.parse(responseText) : null
}

export async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    throw new Error('Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM.')
  }

  const text = [
    'A new project brief was submitted.',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || 'Not provided'}`,
    `Service: ${lead.service || 'Not provided'}`,
    `Budget: ${lead.budget || 'Not provided'}`,
    `Timeline: ${lead.timeline || 'Not provided'}`,
    '',
    'Brief:',
    lead.message,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAIL],
      reply_to: lead.email,
      subject: 'New digital marketing inquiry',
      text,
    }),
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Resend request failed (${response.status}): ${(await response.text()).slice(0, 500)}`)
  }
}

export function isAuthorized(event) {
  const adminKey = process.env.ADMIN_KEY
  const providedKey = event.headers?.['x-admin-key'] || event.headers?.['X-Admin-Key']
  if (!adminKey || typeof providedKey !== 'string') return false
  const expected = Buffer.from(adminKey)
  const actual = Buffer.from(providedKey)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

export function toLeadRecord(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    company: row.company,
    service: row.service,
    budget: row.budget,
    timeline: row.timeline,
    message: row.message,
    deliveryStatus: row.delivery_status,
  }
}
