import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { CLIENTS, PROJECTS, SERVICES, STATS } from '../data'
import ProjectCard from '../components/ProjectCard'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import CtaBand from '../components/CtaBand'

export default function Home() {
  usePageTitle('')
  return (
    <>
      <section className="hero">
        <div className="wrap herogrid">
          <div>
            <h1>We design and build digital products that earn trust and drive growth.</h1>
            <p className="lead">Loudbird is a Bengaluru-based digital agency. We help growing companies launch brands, websites and products that customers rely on, with clear scope, honest timelines and measurable results.</p>
            <div className="cta">
              <Link className="btn" to="/contact">Start a project</Link>
              <Link className="btn ghost" to="/work">View case studies</Link>
            </div>
          </div>
          <aside className="proof" aria-label="Agency at a glance">
            {STATS.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
          </aside>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p style={{ fontWeight: 600, margin: '0 0 16px' }}>Trusted by teams at</p>
          <div className="clients">{CLIENTS.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>What we do</h2>
          <div className="svcs">
            {SERVICES.map((s) => (
              <div className="svc" key={s.slug}>
                <span className="ic" aria-hidden="true">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32 }}><Link className="btn ghost" to="/services">All services</Link></p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Recent work</h2>
          <div className="grid">{PROJECTS.slice(0, 3).map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
          <p style={{ marginTop: 32 }}><Link className="btn ghost" to="/work">View all projects</Link></p>
        </div>
      </section>

      <Process />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap stats" style={{ marginTop: 0 }}>
          {STATS.map(([n, l]) => <div className="stat" key={l}><b>{n}</b>{l}</div>)}
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  )
}
