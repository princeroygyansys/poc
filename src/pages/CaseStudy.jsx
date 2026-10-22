import { Link, useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { PROJECTS } from '../data'
import NotFound from './NotFound'
import CtaBand from '../components/CtaBand'

export default function CaseStudy() {
  const { slug } = useParams()
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  const p = PROJECTS[i]
  usePageTitle(p ? p.client : 'Not found')
  if (!p) return <NotFound />
  const next = PROJECTS[(i + 1) % PROJECTS.length]
  return (
    <>
      <div className="ph wrap">
        <p style={{ marginBottom: 12 }}><Link to="/work">← All campaigns</Link></p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,56px)' }}>{p.title}</h1>
        <p>{p.client} · {p.category}</p>
      </div>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cs-hero" style={{ background: p.color }} aria-hidden="true">{p.client[0]}</div>
          <div className="res">
            {p.results.map(([n, l]) => <div className="stat" key={l}><b>{n}</b>{l}</div>)}
          </div>
          <div className="prose">
            <h3>The challenge</h3><p>{p.challenge}</p>
            <h3>Our approach</h3><p>{p.solution}</p>
            <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
          <p style={{ marginTop: 48 }}><Link className="btn ghost" to={`/work/${next.slug}`}>Next: {next.client}</Link></p>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
