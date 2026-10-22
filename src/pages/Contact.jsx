import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { BUDGETS, SERVICES, TIMELINES } from '../data'

const EMPTY = { name: '', email: '', company: '', service: SERVICES[0].title, budget: BUDGETS[1], timeline: TIMELINES[1], message: '' }

export default function Contact() {
  const location = useLocation()
  usePageTitle('Talk digital marketing')
  const [v, setV] = useState(() => ({
    ...EMPTY,
    service: SERVICES.some((service) => service.title === location.state?.service)
      ? location.state.service
      : EMPTY.service,
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed
  const [submitError, setSubmitError] = useState('')
  const [emailLink, setEmailLink] = useState('')
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const n = {}
    if (v.name.trim().length < 2) n.name = 'Enter your name (at least 2 characters).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) n.email = 'Enter a valid email, like you@example.com.'
    if (v.message.trim().length < 10) n.message = 'Tell us a bit more (at least 10 characters).'
    setErrors(n)
    if (Object.keys(n).length) return

    const body = [
      `Name: ${v.name.trim()}`,
      `Email: ${v.email.trim()}`,
      `Company: ${v.company || 'Not provided'}`,
      `Service: ${v.service}`,
      `Budget: ${v.budget}`,
      `Timeline: ${v.timeline}`,
      '',
      'Brief:',
      v.message.trim(),
    ].join('\n')
    const link = `mailto:princeku.ray143@gmail.com?subject=${encodeURIComponent(`Marketing inquiry from ${v.name.trim()}`)}&body=${encodeURIComponent(body)}`
    setEmailLink(link)
    setSubmitError('')
    setStatus('sending')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      })
      const result = await res.json()
      if (!res.ok) {
        setSubmitError(result.error || 'We could not send your inquiry. Please try again.')
        setStatus('failed')
        return
      }
      setStatus('done')
    } catch {
      setSubmitError('We could not reach the inquiry service. Your message was not sent; please try again or email us directly.')
      setStatus('failed')
    }
  }

  const field = (id, label, key, type = 'text') => (
    <div className="f">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={v[key]} onChange={set(key)} aria-invalid={!!errors[key]} />
      {errors[key] && <div className="err">{errors[key]}</div>}
    </div>
  )
  const select = (id, label, key, opts) => (
    <div className="f">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={v[key]} onChange={set(key)}>{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </div>
  )

  return (
    <>
      <div className="ph wrap">
        <h1>Let’s grow your business.</h1>
        <p>Tell us what you want to achieve with digital marketing. We’ll get back to you within one working day.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap two" style={{ alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)' }}>What would growth look like?</h2>
            <p><strong>hello@loudbird.dev</strong><br />+91 80 5550 0123</p>
            <p>Loudbird Studio<br />12 Church Street, Bengaluru 560001</p>
          </div>
          <div className="formbox">
            {status === 'done' ? (
              <div className="ok" role="status">
                <h3>Thanks, {v.name.split(' ')[0]}!</h3>
                <p>Your inquiry has been sent to our team. We’ll reply to {v.email} within one working day.</p>
                <button className="btn ghost" onClick={() => { setV(EMPTY); setEmailLink(''); setStatus('idle') }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="row2">{field('n', 'Name', 'name')}{field('e', 'Email', 'email', 'email')}</div>
                {field('c', 'Company (optional)', 'company')}
                {select('s', 'What do you need?', 'service', SERVICES.map((s) => s.title))}
                <div className="row2">{select('b', 'Budget', 'budget', BUDGETS)}{select('t', 'Timeline', 'timeline', TIMELINES)}</div>
                <div className="f">
                  <label htmlFor="m">What are your marketing goals?</label>
                  <textarea id="m" rows="5" value={v.message} onChange={set('message')} aria-invalid={!!errors.message} />
                  {errors.message && <div className="err">{errors.message}</div>}
                </div>
                {status === 'failed' && (
                  <div className="err" role="alert" style={{ marginBottom: 12 }}>
                    {submitError} <a href={emailLink}>Email us directly</a>.
                  </div>
                )}
                <button className="btn pink" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send brief'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
