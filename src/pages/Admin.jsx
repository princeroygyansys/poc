import { useEffect, useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'

export default function Admin() {
  usePageTitle('Admin')
  const [adminKey, setAdminKey] = useState('')
  const [input, setInput] = useState('')
  const [leads, setLeads] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (providedKey) => {
    setLoading(true)
    try {
      const response = await fetch('/api/leads', {
        headers: { 'x-admin-key': providedKey },
      })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem('adminKey')
          setAdminKey('')
          setLeads(null)
        }
        throw new Error(result.error || 'We could not load the saved briefs.')
      }
      if (!Array.isArray(result)) throw new Error('The API returned an invalid leads response.')

      sessionStorage.setItem('adminKey', providedKey)
      setAdminKey(providedKey)
      setLeads(result)
      setError('')
    } catch (loadError) {
      setError(loadError.message === 'Failed to fetch'
        ? 'Could not reach the API service.'
        : loadError.message)
      if (loadError.message === 'Failed to fetch') {
        setLeads(null)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedKey = sessionStorage.getItem('adminKey')
    if (savedKey) load(savedKey)
  }, []) // eslint-disable-line

  const signIn = (event) => {
    event.preventDefault()
    if (input.trim()) load(input.trim())
  }

  const signOut = () => {
    sessionStorage.removeItem('adminKey')
    setAdminKey('')
    setInput('')
    setLeads(null)
    setError('')
  }

  const remove = async (id) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 401) signOut()
        throw new Error(result.error || 'We could not delete this lead.')
      }
      setLeads((current) => current.filter((lead) => lead.id !== id))
      setError('')
    } catch (deleteError) {
      setError(deleteError.message === 'Failed to fetch'
        ? 'Could not reach the API.'
        : deleteError.message)
    }
  }

  return (
    <>
      <div className="ph wrap">
        <h1>Admin dashboard.</h1>
        <p>Private workspace for project briefs.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          {error && <div className="err" role="alert" style={{ marginBottom: 16 }}>{error}</div>}
          {loading ? (
            <p role="status">Loading dashboard…</p>
          ) : !leads ? (
            <form className="formbox" style={{ maxWidth: 420 }} onSubmit={signIn}>
              <div className="f">
                <label htmlFor="admin-key">Admin access key</label>
                <input
                  id="admin-key"
                  type="password"
                  autoComplete="current-password"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  required
                />
              </div>
              <button className="btn" type="submit">Open dashboard</button>
            </form>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                <button className="btn ghost" type="button" onClick={signOut}>Sign out</button>
              </div>
              {leads.length === 0 ? (
                <p>No leads yet. Submit the contact form to see one here.</p>
              ) : (
                <div className="tablewrap">
                  <table>
                    <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Need</th><th>Budget</th><th>Message</th><th>Reply</th><th></th></tr></thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id}>
                          <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                          <td>{lead.name}<br /><small>{lead.company}</small></td>
                          <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                          <td>{lead.service}<br /><small>{lead.timeline}</small></td>
                          <td>{lead.budget}</td>
                          <td style={{ minWidth: 220 }}>{lead.message}</td>
                          <td>
                            <a
                              className="btn ghost"
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(`Re: ${lead.service || 'Your inquiry to Loudbird Studio'}`)}&body=${encodeURIComponent(`Hi ${lead.name.split(' ')[0]},\n\n\n\nBest,\nLoudbird Studio`)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Reply in Gmail
                            </a>
                          </td>
                          <td><button className="chip" onClick={() => remove(lead.id)} aria-label={`Delete lead from ${lead.name}`}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
