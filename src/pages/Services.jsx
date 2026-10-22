import usePageTitle from '../hooks/usePageTitle'
import { SERVICES } from '../data'
import { Link } from 'react-router-dom'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'

export default function Services() {
  usePageTitle('Services')
  return (
    <div className="services-page">
      <div className="ph wrap">
        <p className="eyebrow work-eyebrow"><span /> Strategy · creativity · measurable growth</p>
        <h1>Marketing built for growth.</h1>
        <p>Four connected digital marketing services that help you reach the right audience, earn their attention and grow revenue.</p>
      </div>
      <section className="services-section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="services-intro">
            <div>
              <span className="services-kicker">WHAT WE DO</span>
              <h2>Everything you need to grow online.</h2>
            </div>
            <p>Bring us a specific challenge or let us connect the dots across your whole digital marketing mix.</p>
          </div>
          <div className="service-list">
            {SERVICES.map((s, i) => (
              <article className="service-card" key={s.slug} style={{ '--service-color': s.color, '--service-index': i }}>
                <div className="service-card-head">
                  <span className="ic" aria-hidden="true">{s.icon}</span>
                  <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="service-card-copy">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <ul className="service-capabilities">
                  {s.items.map((item) => <li key={item}><span>{item}</span></li>)}
                </ul>
                <Link className="service-link" to="/contact" state={{ service: s.title }}>
                  Discuss this service <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <CtaBand />
    </div>
  )
}
