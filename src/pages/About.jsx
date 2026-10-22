import usePageTitle from '../hooks/usePageTitle'
import { TEAM, VALUES } from '../data'
import CtaBand from '../components/CtaBand'

export default function About() {
  usePageTitle('About')
  return (
    <>
      <div className="ph wrap">
        <h1>About us.</h1>
        <p>Loudbird started in 2017 with two designers, one developer and a shared belief that good work should be impossible to ignore. Today we’re a team of twelve based in Bengaluru, working with clients worldwide.</p>
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
          <h2>The team</h2>
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
