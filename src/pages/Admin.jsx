import { useEffect, useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'

export default function Admin() {
  usePageTitle('Admin')
  const [key, setKey] = useState(() => sessionStorage.getItem('adminKey') || '')
  const [input, setInput] = useState('')
  const [leads, setLeads] = useState(null)
  const [error, setError] = useState('')

  const load = async (k) => {
    try {
      const res = await fetch('/api/leads', { headers: { 'x-admin-key': k } })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Server error.')
      setLeads(result); setError('')
      sessionStorage.setItem('adminKey', k); setKey(k)
    } catch (e) {
      setLeads(null); setKey(''); sessionStorage.removeItem('adminKey')
      setError(e.message === 'Failed to fetch' ? 'API server is not running.' : e.message)
    }
  }
  useEffect(() => { if (key) load(key) }, []) // eslint-disable-line

  const remove = async (id) => {
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { 'x-admin-key': key } })
    setLeads(leads.filter((l) => l.id !== id))
  }

  return (
    <>
      <div className="ph wrap"><h1>Leads.</h1><p>Project briefs submitted through the contact form.</p></div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          {!leads ? (
            <form className="formbox" style={{ maxWidth: 420 }} onSubmit={(e) => { e.preventDefault(); load(input) }}>
              <div className="f">
                <label htmlFor="k">Admin key</label>
                <input id="k" type="password" value={input} onChange={(e) => setInput(e.target.value)} />
                {error && <div className="err">{error}</div>}
              </div>
              <button className="btn" type="submit">Open dashboard</button>
              <p style={{ fontSize: 14, marginBottom: 0 }}>Set ADMIN_KEY in the server environment to enable dashboard access.</p>
            </form>
          ) : leads.length === 0 ? (
            <p>No leads yet. Submit the contact form to see one here.</p>
          ) : (
            <div className="tablewrap">
              <table>
                <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Need</th><th>Budget</th><th>Message</th><th>Email status</th><th></th></tr></thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id}>
                      <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                      <td>{l.name}<br /><small>{l.company}</small></td>
                      <td><a href={`mailto:${l.email}`}>{l.email}</a></td>
                      <td>{l.service}<br /><small>{l.timeline}</small></td>
                      <td>{l.budget}</td>
                      <td style={{ minWidth: 220 }}>{l.message}</td>
                      <td>{l.deliveryStatus || 'unknown'}</td>
                      <td><button className="chip" onClick={() => remove(l.id)} aria-label={`Delete lead from ${l.name}`}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
