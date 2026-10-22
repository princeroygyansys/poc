import usePageTitle from '../hooks/usePageTitle'
import { SERVICES } from '../data'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'

export default function Services() {
  usePageTitle('Services')
  return (
    <>
      <div className="ph wrap">
        <h1>What we do.</h1>
        <p>Four disciplines under one roof, so brand, product and growth all pull in the same direction.</p>
      </div>
      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          {SERVICES.map((s) => (
            <article className="svc row" key={s.slug}>
              <span className="ic" aria-hidden="true">{s.icon}</span>
              <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <Process />
      <CtaBand />
    </>
  )
}
