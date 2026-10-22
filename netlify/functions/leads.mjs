import {
  CONTACT_EMAIL,
  isAuthorized,
  jsonResponse,
  sendLeadEmail,
  supabaseRequest,
  toLeadRecord,
  validateLead,
} from './_shared.mjs'

const LEAD_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function hasAdminKey() {
  return Boolean(process.env.ADMIN_KEY)
}

async function createLead(event) {
  let body
  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body || '{}'
    if (Buffer.byteLength(rawBody) > 20 * 1024) {
      return jsonResponse(413, { error: 'The request is too large.' })
    }
    body = JSON.parse(rawBody)
  } catch {
    return jsonResponse(400, { error: 'The request body must be valid JSON.' })
  }

  const validation = validateLead(body)
  if (validation.error) return jsonResponse(400, { error: validation.error })
  const { lead } = validation

  try {
    await supabaseRequest('leads', {
      method: 'POST',
      prefer: 'return=minimal',
      body: {
        id: lead.id,
        created_at: lead.createdAt,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        message: lead.message,
        delivery_status: lead.deliveryStatus,
      },
    })
  } catch (error) {
    console.error('Failed to save project brief:', error.message)
    return jsonResponse(500, { error: 'We could not save your brief. Please try again.' })
  }

  try {
    await sendLeadEmail(lead)
  } catch (error) {
    console.error('Failed to send project brief email:', error.message)
    try {
      await supabaseRequest(`leads?id=eq.${encodeURIComponent(lead.id)}`, {
        method: 'PATCH',
        prefer: 'return=minimal',
        body: { delivery_status: 'failed' },
      })
    } catch (statusError) {
      console.error('Failed to update project brief delivery status:', statusError.message)
    }
    return jsonResponse(502, {
      error: 'Your brief was saved, but we could not email the team. Please try again later.',
      saved: true,
    })
  }

  try {
    await supabaseRequest(`leads?id=eq.${encodeURIComponent(lead.id)}`, {
      method: 'PATCH',
      prefer: 'return=minimal',
      body: { delivery_status: 'sent' },
    })
  } catch (error) {
    console.error('Email was sent, but its delivery status could not be saved:', error.message)
    return jsonResponse(500, {
      error: 'Your email was delivered, but we could not update the saved brief.',
      saved: true,
      delivered: true,
    })
  }

  return jsonResponse(201, { ok: true, saved: true, delivered: true })
}

async function listLeads(event) {
  if (!hasAdminKey()) {
    return jsonResponse(503, { error: 'Admin access is not configured on the server.' })
  }
  if (!isAuthorized(event)) return jsonResponse(401, { error: 'Wrong admin key.' })

  try {
    const rows = await supabaseRequest('leads?select=*&order=created_at.desc')
    return jsonResponse(200, rows.map(toLeadRecord))
  } catch (error) {
    console.error('Failed to load project briefs:', error.message)
    return jsonResponse(500, { error: 'We could not load the saved briefs.' })
  }
}

async function deleteLead(event) {
  if (!hasAdminKey()) {
    return jsonResponse(503, { error: 'Admin access is not configured on the server.' })
  }
  if (!isAuthorized(event)) return jsonResponse(401, { error: 'Wrong admin key.' })

  const id = event.queryStringParameters?.id || event.path.split('/').filter(Boolean).at(-1)
  if (!LEAD_ID_PATTERN.test(id || '')) {
    return jsonResponse(400, { error: 'A valid lead ID is required.' })
  }

  try {
    const deleted = await supabaseRequest(`leads?id=eq.${encodeURIComponent(id)}&select=id`, {
      method: 'DELETE',
      prefer: 'return=representation',
    })
    if (!deleted.length) return jsonResponse(404, { error: 'Lead not found.' })
    return jsonResponse(200, { ok: true })
  } catch (error) {
    console.error('Failed to delete project brief:', error.message)
    return jsonResponse(500, { error: 'We could not delete the saved brief.' })
  }
}

export async function handler(event) {
  const lastPathSegment = event.path.split('/').filter(Boolean).at(-1)
  const routeId = event.queryStringParameters?.id
    || (lastPathSegment !== 'leads' ? lastPathSegment : null)

  if (event.httpMethod === 'POST' && !routeId) {
    return createLead(event)
  }
  if (event.httpMethod === 'GET' && !routeId) {
    return listLeads(event)
  }
  if (event.httpMethod === 'DELETE' && routeId) return deleteLead(event)
  return jsonResponse(405, { error: 'Method not allowed.' })
}
