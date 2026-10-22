import { Link } from 'react-router-dom'

export default function CtaBand() {
  return (
    <section className="band cta-band">
      <div className="wrap">
        <h2>Ready to grow your audience?</h2>
        <p style={{ fontSize: 22, margin: '0 0 28px' }}>Let’s find the right digital marketing strategy for your next stage.</p>
        <Link className="btn" to="/contact">Talk to our team</Link>
      </div>
    </section>
  )
}
