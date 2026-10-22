import usePageTitle from '../hooks/usePageTitle'
import { TEAM, VALUES } from '../data'
import CtaBand from '../components/CtaBand'

export default function About() {
  usePageTitle('About')
  return (
    <>
      <div className="ph wrap">
        <h1>About us.</h1>
        <p>Loudbird is an independent digital marketing agency based in Bengaluru. Since 2017, we’ve helped businesses build visibility, connect with customers and grow through thoughtful strategy and measurable campaigns.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <h2>What we believe</h2>
          <div className="svcs">
            {VALUES.map(([t, d], i) => (
              <div className="svc" key={t}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Your growth team</h2>
          <div className="team">
            {TEAM.map((m) => (
              <div className="person" key={m.name}>
                <div className="avatar" style={{ background: m.color }} aria-hidden="true">{m.name.split(' ').map((w) => w[0]).join('')}</div>
                <h3>{m.name}</h3><p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
