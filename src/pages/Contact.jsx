import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { BUDGETS, SERVICES, TIMELINES } from '../data'

const EMPTY = { name: '', email: '', company: '', service: SERVICES[0].title, budget: BUDGETS[1], timeline: TIMELINES[1], message: '' }
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
const WHATSAPP_LINK = WHATSAPP_NUMBER && /^\d{8,15}$/.test(WHATSAPP_NUMBER)
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Loudbird Studio, I would like to discuss a marketing project.')}`
  : null

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
          <div className="contact-info">
            <div className="contact-details">
              <h2 style={{ fontSize: 'clamp(32px,5vw,56px)' }}>What would growth look like?</h2>
              <p>
                <strong>hello@loudbird.dev</strong>
                {WHATSAPP_LINK && <><br /><a href={WHATSAPP_LINK}>+{WHATSAPP_NUMBER}</a></>}
              </p>
              <p>Loudbird Studio<br />New Delhi, India</p>
            </div>
            {WHATSAPP_LINK && (
              <a
                className="whatsapp-card contact-whatsapp"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label="Start a WhatsApp chat with Loudbird Studio"
              >
                <span className="whatsapp-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" focusable="false">
                    <path d="M16 3.2a12.4 12.4 0 0 0-10.6 18.8L4 28l6.2-1.4A12.4 12.4 0 1 0 16 3.2Zm0 22.4a10 10 0 0 1-5.1-1.4l-.4-.2-3.7.9.9-3.6-.3-.5A10 10 0 1 1 16 25.6Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4 2.4 3.7 5.8 5.1c.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.3-.3-.6-.4Z" />
                  </svg>
                </span>
                <span className="whatsapp-card-copy">
                  <span className="whatsapp-card-eyebrow"><span /> Prefer a quick chat?</span>
                  <strong>Let’s talk on WhatsApp</strong>
                  <span className="whatsapp-card-description">Tell us what you’re looking to grow. We’ll take it from there.</span>
                  <span className="whatsapp-card-action">Start a conversation <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            )}
          </div>
          <div className="formbox">
            {status === 'done' ? (
              <div className="ok" role="status">
                <h3>Thanks, {v.name.split(' ')[0]}!</h3>
                <p>Your inquiry has been received. We’ll review your brief and reply to {v.email} within one working day.</p>
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
