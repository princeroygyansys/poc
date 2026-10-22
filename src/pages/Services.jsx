import usePageTitle from '../hooks/usePageTitle'
import { SERVICES } from '../data'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'

export default function Services() {
  usePageTitle('Services')
  return (
    <>
      <div className="ph wrap">
        <h1>Marketing built for growth.</h1>
        <p>Four connected digital marketing services that help you reach the right audience, earn their attention and grow revenue.</p>
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
