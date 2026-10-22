import { Link } from 'react-router-dom'

export default function CtaBand() {
  return (
    <section className="band cta-band">
      <div className="wrap">
        <h2>Got a project in mind?</h2>
        <p style={{ fontSize: 22, margin: '0 0 28px' }}>Tell us about it. We reply within one working day.</p>
        <Link className="btn" to="/contact">Start a project</Link>
      </div>
    </section>
  )
}
