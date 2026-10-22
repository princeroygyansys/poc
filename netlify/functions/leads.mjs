import {
  isAdminKeyConfigured,
  isValidAdminKey,
  jsonResponse,
  supabaseRequest,
  toLeadRecord,
  validateLead,
} from './_shared.mjs'

const LEAD_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function authorizeAdmin(event) {
  if (!isAdminKeyConfigured()) {
    return jsonResponse(503, { error: 'Admin access is not configured on the server.' })
  }
  const providedKey = Object.entries(event.headers || {})
    .find(([name]) => name.toLowerCase() === 'x-admin-key')?.[1]
  if (!isValidAdminKey(providedKey)) return jsonResponse(401, { error: 'Wrong admin key.' })
  return null
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
      },
    })
  } catch (error) {
    console.error('Failed to save project brief:', error.message)
    return jsonResponse(500, { error: 'We could not save your brief. Please try again.' })
  }

  return jsonResponse(201, { ok: true, saved: true })
}

async function listLeads(event) {
  const authorizationError = authorizeAdmin(event)
  if (authorizationError) return authorizationError

  try {
    const rows = await supabaseRequest('leads?select=*&order=created_at.desc')
    return jsonResponse(200, rows.map(toLeadRecord))
  } catch (error) {
    console.error('Failed to load project briefs:', error.message)
    return jsonResponse(500, { error: 'We could not load the saved briefs.' })
  }
}

async function deleteLead(event) {
  const authorizationError = authorizeAdmin(event)
  if (authorizationError) return authorizationError

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
